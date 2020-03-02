//https://www.tensorflow.org/js/guide/train_models

import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis';
import * as Papa from "papaparse";
import { resolve } from 'dns';
window.tf = tf;
window.tfvis = tfvis;


class tensorflowweb extends React.Component {
  constructor(props) {
    super(props);
  }


//here unit is size of int 32
  componentDidMount() {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
        tf.layers.dense({units: 10, activation: 'softmax'}),
      ]
     });
    console.log(model.summary());
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

export default tensorflowweb;
