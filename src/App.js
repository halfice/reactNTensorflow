import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis';
import * as Papa from "papaparse";
import { resolve } from 'dns';
import { combineLocations } from '@tensorflow/tfjs-core/dist/ops/axis_util';
window.tf = tf;
window.tfvis = tfvis;
//Note  In this Poject we have use Two type of Train Model
//First using TensorFlow to Train model ComponentdidMountold
//Another method usign split data manually.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvdDataset: [],
      csvUrl: `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`,
      MainData: [],
      OutComes:[],

    };
  }

  async componentDidMountold() {
    const csvUrl1 = 'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv';
    //We want to predict the column "mdev" , which represents a median value of a 
    //home in $1000 , so we mark it as a label.
    const csvDataset = tf.data.csv(
      csvUrl1, {
      columnConfigs: {
        medv: {
          isLabel: true
        }
      }
    });
    //const json = await response.json();
    //this.setState({ csvdDataset: json });
    const numOfFeatures = (await csvDataset.columnNames()).length - 1;
    // Prepare the Dataset for training.
    const flattenedDataset =
      csvDataset
        .map(({ xs, ys }) => {
          // Convert xs(features) and ys(labels) from object form (keyed by column
          // name) to array form.
          return { xs: Object.values(xs), ys: Object.values(ys) };
        })
        .batch(10);
    //console.log(flattenedDataset);

    // Define the model.
    const model = tf.sequential();
    model.add(tf.layers.dense({
      inputShape: [numOfFeatures],
      units: 1
    }));
    model.compile({
      optimizer: tf.train.sgd(0.000001),
      loss: 'meanSquaredError'
    });

    return model.fitDataset(flattenedDataset, {
      epochs: 10,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          console.log(epoch, logs.loss);
        }
      }
    });



  }

  async PreparePlotScater() {
    var csvUr = `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`;
    // Load and plot the original input data that we are going to train on.
    //We want to predict the column "mdev" , which represents a median value of a 
    //home in $1000 , so we mark it as a label.
    Papa.parse(csvUr, {
      download: true,
      header: true,
      complete: function (results) {
        var listen = results.data;
        //stat mapping
        const values = listen.map(d => ({
          x: d.Glucose,
          y: d.Age,
        }));
        //end mapping
        //scatter plot start
        tfvis.render.scatterplot(
          { name: 'Horsepower v MPG' },
          { values },
          {
            xLabel: 'Glucose',
            yLabel: 'Age',
            height: 300
          }
        );
        //scatter plot end
      }//function end
      // rest of config ...
    })
  }


  renderOutcomes = data =>{
    var outcomes=data.data.map(r=>r.Outcome);
    this.setState({OutComes:outcomes});
   
  }

  oneHot(outcomes){
   return Array.from(tf.oneHot(outcomes, 2).dataSync());
  }

  createDataSets(data,features,testSize,batchSize)
{
var X=data.map(r=>
  features.map(f=>{
 var val=r[f];
 return val ===undefined ?0 : val;
  }));//x end
  

  const y = data.map(r => {
    const outcome = r.Outcome === undefined ? 0 : r.Outcome;
    return this.oneHot(outcome);
  });
  

  const splitIdx = parseInt((1 - testSize) * data.length, 10);
  

  const ds=tf.data.zip({xs:tf.data.array(X),ys:tf.data.array(y)}).shuffle(data.length,42);
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
    epochs: 100,
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

  async componentDidMount() {
    this.PreparePlotScater();
    //preparing data start
    const data = await this.prepareData();
    this.renderOutcomes(data);
    //console.log(this.state.OutComes);
   // const features = ["Glucose"];
    const features = ["Glucose", "Age", "Insulin", "BloodPressure"]
    const [trainDs, validDs, xTest, yTest] =this.createDataSets(data.data,features,0.1,16);
    const model = await this.trainLogisticRegression(
      features.length,
      trainDs,
      validDs
    );

      // const features = ["Glucose", "Age", "Insulin", "BloodPressure"];

  // const [trainDs, validDs, xTest, yTest] = createDataSets(
  //   data,
  //   features,
  //   0.1,
  //   16
  // );

  // const model = await trainComplexModel(features.length, trainDs, validDs);

  const preds = model.predict(xTest).argMax(-1);
  const labels = yTest.argMax(-1);

  const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
  const container = document.getElementById("confusion-matrix");

  tfvis.render.confusionMatrix(container, {
    values: confusionMatrix,
    tickLabels: ["Healthy", "Diabetic"]
  });


  }

  MakeMyTestData()
  {
    var file = `D:\tensorflow\bostonhousingReactapp\mlbostonhose\mydata.csv`
    return new Promise(function(complete, error) {
      Papa.parse(file, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete,
        error
      });
    });
  }


  async prepareData() {
    var file = `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`
    return new Promise(function(complete, error) {
      Papa.parse(file, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete,
        error
      });
    });
  }
  
  async prepareData1() {
    var Url = `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`
    let data;
    Papa.parse(Url, {
      download: true,
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      complete: function (results) {
        const data = results.data;
        this.SetState={MainData:data};
       
      }//function end
      
    });
  }

 
  




  render() {
    return (
      <div>
        <h1>BIS MILLAH HIR REHMAN NIR RAHEEEM</h1>
        <div>
          43

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

export default App;
