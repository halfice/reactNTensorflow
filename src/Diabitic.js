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
class Diabitic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvdDataset: [],
      csvUrl: `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`,
      MainData: [],
      OutComes: [],

    };
  }



  async PreparePlotScater() {
    var csvUr = `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`;
    Papa.parse(csvUr, {
      download: true,
      header: true,
      complete: function (results) {
        var listen = results.data;
        //stat mapping
        const values = listen.map(d => ({
          x: d.Glucose,
          y: d.Outcome          ,
        }));
        //end mapping
        //scatter plot start
        tfvis.render.scatterplot(
          { name: 'Diabitic with Health' },
          { values },
          {
            xLabel: 'Glucose',
            yLabel: 'Sugar',
            height: 300
          }
        );
        //scatter plot end
      }//function end
      // rest of config ...
    });


    
  }


  renderOutcomes = data => {
    var outcomes = data.data.map(r => r.Outcome);
    this.setState({ OutComes: outcomes });

  }

  oneHot(outcomes) {
    return Array.from(tf.oneHot(outcomes, 2).dataSync());
  }

  createDataSets(data, features, testSize, batchSize) {
    var X = data.map(r =>
      features.map(f => {
        var val = r[f];
        return val === undefined ? 0 : val;
      }));//x end


    const y = data.map(r => {
      const outcome = r.Outcome === undefined ? 0 : r.Outcome;
      return this.oneHot(outcome);
    });


    const splitIdx = parseInt((1 - testSize) * data.length, 10);


    const ds = tf.data.zip({ xs: tf.data.array(X), ys: tf.data.array(y) }).shuffle(data.length, 42);
    return [
      ds.take(splitIdx).batch(batchSize),
      ds.skip(splitIdx + 1).batch(batchSize),
      tf.tensor(X.slice(splitIdx)),
      tf.tensor(y.slice(splitIdx))
    ];




  }


  trainLogisticRegression = async (featureCount, trainDs, validDs) => {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 2,
        activation: "softmax",
        inputShape: [featureCount]
      })
    );
    const optimizer = tf.train.adam(0.001);
    model.compile({
      optimizer: optimizer,
      loss: "binaryCrossentropy",
      metrics: ["accuracy"]
    });
    const trainLogs = [];
    const lossContainer = document.getElementById("loss-cont");
    const accContainer = document.getElementById("acc-cont");
    console.log("Training...");
    await model.fitDataset(trainDs, {
      epochs: 5,
      validationData: validDs,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          trainLogs.push(logs);
          tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
          tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"]);
        }
      }
    });

    return model;
  };

  showLineGraph()
  {
    var csvUr = `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`;
    Papa.parse(csvUr, {
      download: true,
      header: true,
      complete: function (results) {
        var listen = results.data;

        const series = listen.map(d => ({
          x: d.BloodPressure,
          y: d.Outcome          ,
        }));
        
      // const data = { values: [series1,series] }
      const data = { values: [series] }
        //end mapping
        //scatter plot start
        const surface = { name: 'Glucose VS Diabietic', tab: 'Charts' };
        tfvis.render.linechart(surface, data, { zoomToFit: false }
        );
        //scatter plot end




        
      }//function end
      // rest of config ...
    });
  // Render to visor
 
  }

  async componentDidMount() {
   // this.PreparePlotScater();
   this.showLineGraph();




    //preparing data start
    const data = await this.prepareData();
    this.renderOutcomes(data);
    //console.log(this.state.OutComes);
    // const features = ["Glucose"];
    const features = ["Glucose", "Age", "Insulin", "BloodPressure"]
    //const [trainDs, validDs, xTest, yTest] = this.createDataSets(data.data, features, 0.1, 16);
    //const model = await this.trainLogisticRegression(
     // features.length,
      //trainDs,
     // validDs
    //);

    // const features = ["Glucose", "Age", "Insulin", "BloodPressure"];

    // const [trainDs, validDs, xTest, yTest] = createDataSets(
    //   data,
    //   features,
    //   0.1,
    //   16
    // );

    // const model = await trainComplexModel(features.length, trainDs, validDs);

    //const preds = model.predict(xTest).argMax(-1);
   // const labels = yTest.argMax(-1);

   // const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
   // const container = document.getElementById("confusion-matrix");

    //tfvis.render.confusionMatrix(container, {
      //values: confusionMatrix,
     // tickLabels: ["Healthy", "Diabetic"]
   // });
   // var trainData = {
    //  Glucose: [148],
    //  Age: [50],
          //Insulin: [0],
            //BloodPressure: [75]

   // } 


  }
 




  async prepareData() {
    var file = `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`
    return new Promise(function (complete, error) {
      Papa.parse(file, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete,
        error
      });
    });
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

export default Diabitic;
