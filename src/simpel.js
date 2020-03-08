// Simple Linear Regression in TensorFlow.js

import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis';
import * as Papa from "papaparse";
import { resolve } from 'dns';
import { combineLocations } from '@tensorflow/tfjs-core/dist/ops/axis_util';
import { train, mod } from '@tensorflow/tfjs';
window.tf = tf;
window.tfvis = tfvis;

class simpel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.createModel();


        console.log("Model has been Created!!!");
    }



    createModel() {


        
        const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
        const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
        //loss: Here we’re using the meanSquaredError loss function. 
        //In general a loss function is used to map values of one or more variables onto a real 
        //number that represents some “costs” associated with the value. 
        //If the model is trained it tries to minimize the result of the loss function.
        // The mean squared error of an estimator measures the average of the squares of the errors — 
        //that is, the average squared difference between the estimated values and what is estimated.
        //optimizer: The optimizer function to use. 
        //For our linear regression machine learning task we’re using the sgd function. 
        //Sgd stands for Stochastic Gradient Descent and it an optimizer function which is suitable for 
        //linear regression tasks like in our case.
        model.fit(xs, ys, { epochs: 500 }).then(() => {
            model.predict(tf.tensor2d([-10], [1, 1])).print();
        });
        this.createinitialgrpha();



    }

    async createinitialgrpha() {
        var data=[];
        data.push({x:-1,y:-3});
        data.push({x:0,y:-1});
        data.push({x:1,y:1});
        data.push({x:2,y:3});
        data.push({x:3,y:5});
        data.push({x:4,y:7});

        const values = data.map(d => ({
          x: d.x,
          y: d.y
        }));
        //creating graph
        tfvis.render.scatterplot(
          { name: "Y=(2X)-1 FORMULA - LINEAR REGRESSION" },
          { values },
          {
            xLabel: "Y",
            yLabel: "X",
            height: 300,
          }
        );
    
      }




    render() {
        return (
            <div>
                <h1>BIS MILLAH HIR REHMAN NIR RAHEEEM</h1>


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

export default simpel;
