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

class TFAPP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvdDataset: [],
      csvUrl: `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`,
      MainData: [],
      OutComes:[],

    };
  }


  oneHot(outcomes){
    return Array.from(tf.oneHot(outcomes, 2).dataSync());
   }

  async componentDidMount() {
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
    console.log(flattenedDataset);

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

   model.fitDataset(flattenedDataset, {
      epochs: 10,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          console.log(epoch, logs.loss);
        }
      }
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

export default TFAPP;
