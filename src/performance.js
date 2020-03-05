import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
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
class performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxValue: 0,
      minValue: 0,
      labelMax: 0,
      labelMin: 0
    }
  }

  async getData() {
    var carsdatareq = await fetch('https://raw.githubusercontent.com/halfice/reactNTensorflow/master/userdata.csv');
    var carsData = await carsdatareq.json();
    var cleaned = carsData.map(car => ({
      hours: car.HOURS,
      dob: car.DOB,
    }));
    return cleaned;
  }


  async componentDidMount() {
    this.run();
  }


  async run() {
   // this.createinitialgrpha();
    const data = await this.getData();
    const model = this.createmodel();
    tfvis.show.modelSummary({ name: "model summary" }, model);
    this.convertToTensor(data);
    const tensorData = this.convertToTensor(data);
    const { inputs, labels } = tensorData;
    console.log("Training Start.......");
    await this.trainmodel(model, inputs, labels);
    console.log("Training End.......");
    await this.TestModel(model, data, tensorData);
  }

  async TestModel(model, inputData, normalizeData) {
    const { inputMax, inputMin, labelMax, labelMin } = normalizeData;
    const [xs, preds] = tf.tidy(() => {
      const xs = tf.linspace(0, 1, 100);
      const preds = model.predict(xs.reshape([100, 1]));
      const unNormxs=xs.mul(inputMax.sub(inputMin)).add(inputMin);
      const unNormPreds=preds.mul(labelMin.sub(labelMin)).add(labelMin);
      return [unNormxs.dataSync(),unNormPreds.dataSync()];
    });

    const predictedpoints=Array.from(xs).map((val,i)=>{
      return {x:val,y:preds[i]}
    });

    const originalpoints=inputData.map(d=>({
      x:d.dob,
      y:d.hours
    }));


      //generate prediction for a uniform range of numbers between 1 and 0;
    //We un-normalize the data by doing the inverse of min-max scaling

    tfvis.render.scatterplot(
      { name: "Model Prediction vs original data" },
      { values: [originalpoints, predictedpoints], series: ['original', 'predicted'] },
      {
        xLabel: "Age",
        yLabel: "Hour Per week",
        height: 300,
      }

    );






  }

  async trainmodel(model, input, labels) {
    model.compile({
      optimizer: tf.train.adam(),
      loss: tf.losses.meanSquaredError,
      metrics: ['mse']
    });
    const batchsize = 5;
    const epochs = 50;
    return await model.fit(input, labels, {
      batchsize,
      epochs,
      shuffle: true,
      callbacks: tfvis.show.fitCallbacks(
        { name: "Training Performance" },
        ['loss', 'mse'],
        { height: 300, callbacks: ['onEpochEnd'] }
      )
    });
  }
  convertToTensor(data) {
    return tf.tidy(() => {
      tf.util.shuffle(data);
      const inputs = data.map(d => d.dob);
      const label = data.map(d => d.hours);
      const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
      const labelTensor = tf.tensor2d(label, [label.length, 1]);

      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();
      const normalizeInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
      const noarmalizelabel = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
      return {
        inputs: normalizeInputs,
        labels: noarmalizelabel,
        //return the min / max for later use
        inputMax,
        inputMin,
        labelMax,
        labelMin
      }

    });

  }
  createmodel() {

    //Bias is the  y intercept of value on grpha
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
    model.add(tf.layers.dense({ units: 1, useBias: true }));
    return model;
  }
  async createinitialgrpha() {
    const data = await this.getData();
    const values = data.map(d => ({
      x: d.dob,
      y: d.hours
    }));
    //creating graph
    tfvis.render.scatterplot(
      { name: "employee age performance" },
      { values },
      {
        xLabel: "Age",
        yLabel: "Hour Per week",
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
        <hr>
        </hr>
        <div className="divsfloatnone">
          Input Max : {this.state.maxValue}
          <br></br>
          Input Min : {this.state.minValue}
          <br></br>
          Label Max : {this.state.labelMax}
          <br></br>
          Label Min : {this.state.labelMin}
        </div>
      </div >
    );
  }
}

export default performance;
