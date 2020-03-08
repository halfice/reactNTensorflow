import React from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis';
window.tf = tf;
window.tfvis = tfvis;
class calefornia extends React.Component {
    constructor(props) {
        super(props);

    }
    async componentDidMount() {
        this.run();
    }
    async run() {
        this.getData();
    }

    async getData()
    {
        var californiadatareq=await fetch('https://raw.githubusercontent.com/halfice/reactNTensorflow/master/california_housing_train.csv');
        const csvUrl1="https://raw.githubusercontent.com/halfice/reactNTensorflow/master/california_housing_train.csv";
        
        const csvDataset = tf.data.csv(
            csvUrl1, {
            columnConfigs: {
                median_house_value: {
                isLabel: true
              }
            }
          });
          const numOfFeatures = (await csvDataset.columnNames()).length - 1;
          const flattenedDataset =
          csvDataset
            .map(({ xs, ys }) => {
              // Convert xs(features) and ys(labels) from object form (keyed by column
              // name) to array form.
              return { xs: Object.values(xs), ys: Object.values(ys) };
            })
            .batch(10);
        console.log(flattenedDataset);


    }


    render() {
        return (
            <div>
                <div>
                    <h1>BIS MILLAH HIR REHMAN NIR RAHEEEM</h1>
                </div >
                <hr></hr>
                <div>
                    <h1>Note : </h1>
                    Remember: If there is no structure (patterns) in the data (i.e. the data is random), the model won't really be able to learn anything.
</div>
                <hr></hr>

                <div id="outcome-cont" />
                <div id="insulin-cont" />
                <div id="glucose-cont" />
                <div id="age-cont" />
                <div id="glucose-age-cont" />
                <div id="skin-bmi-cont" />
                <div id="loss-cont"></div>
                <div id="acc-cont"></div>
                <div id="confusion-matrix"></div>
            </div>
        );
    }
}

export default calefornia;