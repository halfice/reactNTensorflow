// Simple Linear Regression in TensorFlow.js

import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis';
import * as Papa from "papaparse";
import { resolve } from 'dns';
import { combineLocations } from '@tensorflow/tfjs-core/dist/ops/axis_util';
import { train } from '@tensorflow/tfjs';
window.tf = tf;
window.tfvis = tfvis;

class SimpleLRTF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OutComes: [],

        };
    }

    async PreparePlotScater(values) {
        // Load and plot the original input data that we are going to train on.
        //We want to predict the column "mdev" , which represents a median value of a 
        //home in $1000 , so we mark it as a label.
        //end mapping
        //scatter plot start
        tfvis.render.scatterplot(
            { name: 'Horsepower v MPG' },
            { values },
            {
                xLabel: 'sizeMB',
                yLabel: 'timeSec',
                height: 300
            }
        );
        //scatter plot end
    }

    componentDidMount() {
        var trainData = {
            sizeMB: [0.080, 9.000, 0.001, 0.100, 8.000, 5.000, 0.100, 6.000, 0.050, 0.500,
                0.002, 2.000, 0.005, 10.00, 0.010, 7.000, 6.000, 5.000, 1.000, 3.000],
            timeSec: [0.135, 0.739, 0.067, 0.126, 0.646, 0.435, 0.069, 0.497, 0.068, 0.116,
                0.070, 0.289, 0.076, 0.744, 0.083, 0.560, 0.480, 0.399, 0.153, 0.149]
        }
        var testData = {
            sizeMB: [5.000, 0.200, 0.001, 9.000, 0.002, 0.020, 0.008, 4.000, 0.001, 1.000,
                0.005, 0.080, 0.800, 0.200, 0.050, 7.000, 0.005, 0.002, 8.000, 0.008],
            timeSec: [0.425, 0.098, 0.052, 0.686, 0.066, 0.078, 0.070, 0.375, 0.058, 0.136,
                0.052, 0.063, 0.183, 0.087, 0.066, 0.558, 0.066, 0.068, 0.610, 0.057]
        };
        var finalObj = [];
        for (let i = 0; i < trainData.sizeMB.length; i++) {
            finalObj.push({ "x": + trainData.sizeMB[i], "y": trainData.timeSec[i] });
        }

        var trainTensors={
            sizeMB:tf.tensor2d(testData.sizeMB,[20,1]),
            timeSec:tf.tensor2d(testData.timeSec,[20,1])
        }

        var testTensors = {
            sizeMB: tf.tensor2d(testData.sizeMB, [20, 1]),
            timeSec: tf.tensor2d(testData.timeSec, [20, 1])
          };
        
        this.PreparePlotScater(finalObj);

        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
        const optimizer = tf.train.adam(0.001);
        //model.compile({
           // optimizer: optimizer,
          //  loss: "binaryCrossentropy",
           // metrics: ["accuracy"]
        //});
        model.compile({optimizer: 'sgd', loss: 'meanAbsoluteError'});

        const trainLogs = [];
        const lossContainer = document.getElementById("loss-cont");
        const accContainer = document.getElementById("acc-cont");
        console.log("Training...");
         model.fit(trainTensors.sizeMB,
            trainTensors.timeSec,
            {
                epochs: 10,
                callbacks: {
                    onEpochEnd: async (epoch, logs) => {
                        trainLogs.push(logs);
                        tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
                        tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"]);
                    }
                }

            });

            model.evaluate(testTensors.sizeMB, testTensors.timeSec).print();
            model.predict(tf.tensor2d([[5.000]])).print();




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

export default SimpleLRTF;
