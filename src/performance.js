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
class performance extends React.Component {
  constructor(props) {
    super(props);
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
    const data =await this.getData();
    const values = data.map(d=>({
x:d.hours,
y:d.dob
    }));
//creating graph
tfvis.render.scatterplot(
    {name:"employee age performance"},
    {values},
    {height:300}
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

export default performance;
