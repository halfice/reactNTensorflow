import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis';
import * as Papa from "papaparse";
import { resolve } from 'dns';
import { combineLocations } from '@tensorflow/tfjs-core/dist/ops/axis_util';

// data from:
// https://www.kaggle.com/uciml/pima-indians-diabetes-database/kernels
// https://datahub.io/machine-learning/diabetes#resource-diabetes_arff

window.tf = tf;
window.tfvis = tfvis;
class carcylinderpredicion extends React.Component {
  constructor(props) {
    super(props);
  }

  async getData() {
    var carsdatareq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
    var carsData = await carsdatareq.json();
    var cleaned = carsData.map(car => ({
      mpg: car.Miles_per_Gallon,
      Weight_in_lbs: car.Weight_in_lbs,
    })).filter(car => (
      car.mpg != null && car.Weight_in_lbs != null
    ));
    return cleaned;
  }


  async componentDidMount() {
    this.run();
  }


  async run() {
    const data = await this.getData();
    const model = this.createModel();
    tfvis.show.modelSummary({ name: "model summary" }, model);
    const tensorData = this.converttoTensor(data);
    const {input,labels}=tensorData;
    await this.trainmodel(model,input,labels);
    this.testmodel(model, data, tensorData);
    console.log(`traiing complete`);
  }

  createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
    model.add(tf.layers.dense({ units: 1, useBias: true }));
    return model;
  }

  converttoTensor(data) {
    return tf.tidy(() => {
      tf.util.shuffle(data);
      const input = data.map(d => d.Weight_in_lbs);
      const labels = data.map(d => d.mpg);
      const inputTensor = tf.tensor2d(input, [input.length, 1]);
      const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();
      const normalizeInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
      const normalizeLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
      return {
        input: normalizeInputs,
        labels: normalizeLabels,
        inputMax,
        inputMin,
        labelMax,
        labelMin
      };



    });
  }

  async trainmodel(model,inputs,labels)
  {
    model.compile({
      optimizer:tf.train.adam(),
      loss:tf.losses.meanSquaredError,
      metrics:['mse']
    });
    const batchSize=10;
      const epochs = 100;

    return await model.fit(inputs,labels,{
      batchSize,
      epochs,
      callback:tfvis.show.fitCallbacks(
    {name:"Training Performance"},
    ['loss','mse'],
    {height:300,callbacks:['onEpochEnd']}

      )
    });

  }

  async testmodel(model,inputData,normalizationData){
    const { inputMax, inputMin, labelMax, labelMin } = normalizationData;

    const [xs,preds]=tf.tidy(()=>{
      const xs=tf.linspace(0,1,100);
      const preds=model.predict(xs.reshape([100,1]));

      const unNormXs=xs
      .mul(inputMax.sub(inputMin))
      .add(inputMin);

      const unNormPred=preds
      .mul(labelMax.sub(labelMin))
      .add(labelMin)
      return [unNormXs.dataSync(),unNormPred.dataSync()];
    });


    const predictedpoints = Array.from(xs).map((val, i) => {
      return { x: val, y: preds[i] }
    });

    const originalpoints = inputData.map(d => ({
      x: d.Weight_in_lbs, y: d.mpg
    }));
    tfvis.render.scatterplot(
      { name: "Model Prediction vs original data" },
      { values: [originalpoints, predictedpoints], series: ['original', 'predicted'] },
      {
        xLabel: "Weight_in_lbs",
        yLabel: "MPG",
        height: 300,
      }

    );



  }








  render() {
    return (
      <div>
        <h1>BIS MILLAH HIR REHMAN NIR RAHEEEM</h1>
        <div>
        </div>

        <div id="outcome-cont" />
        <div id="insulin-cont" />
        <div id="glucose-cont" />
        <div id="age-cont" />
        <div id="glucose-age-cont" />
        <div id="skin-bmi-cont" />
        <div id="loss-cont"></div>
        <div id="acc-cont"></div>
        <div id="confusion-matrix"></div>
      </div >
    );
  }
}

export default carcylinderpredicion;
