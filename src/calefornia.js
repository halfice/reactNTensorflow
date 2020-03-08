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
        const data = await this.getData();
        this.createinitialgrpha();
        const model = this.createModel();
        tfvis.show.modelSummary({ name: "model summary" }, model);
        this.convertToTensor(data);
        const tensorData = this.convertToTensor(data);
        const { inputs, labels } = tensorData;
        const { inputMax, inputMin, labelMax, labelMin } = tensorData;
        console.log("Training Start.......");
        await this.trainmodel(model, inputs, labels);
        console.log("Training End.......");
        await this.TestModel(model, data, tensorData);



    }

    async getData() {
        var californiadatareq = await fetch('https://raw.githubusercontent.com/halfice/reactNTensorflow/master/california_housing_train.json');
        var calirforniadata = await californiadatareq.json();
        var cleaned = calirforniadata.map(dt => ({
            median_house_value: dt.median_house_value,
            total_rooms: dt.total_rooms
        })).filter(dt => (
            dt.median_house_value != null && dt.total_rooms != null
        ));
        return cleaned;
    }

    async createinitialgrpha() {
        const data = await this.getData();
        const values = data.map(d => ({
            x: d.median_house_value * 1000,
            y: d.total_rooms
        }));
        //creating graph
        tfvis.render.scatterplot(
            { name: "California housign" },
            { values },
            {
                xLabel: "Prce",
                yLabel: "Rooms",
                height: 300,
            }
        );

    }

    createModel() {
        //Bias is the  y intercept of value on grpha
        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
        model.add(tf.layers.dense({ units: 1, useBias: true }));
        return model;

    }
    convertToTensor(data) {
        return tf.tidy(() => {
            tf.util.shuffle(data);
            const inputs = data.map(d => d.total_rooms);
            const label = data.map(d => d.median_house_value);
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

    async TestModel(model, inputData, normalizeData) {
        const { inputMax, inputMin, labelMax, labelMin } = normalizeData;
        const [xs, preds] = tf.tidy(() => {
          const xs = tf.linspace(0, 1, 1000);
          const preds = model.predict(xs.reshape([1000, 1]));
          const unNormxs=xs.mul(inputMax.sub(inputMin)).add(inputMin);
          const unNormPreds=preds.mul(labelMin.sub(labelMin)).add(labelMin);
          return [unNormxs.dataSync(),unNormPreds.dataSync()];
        });
    
        const predictedpoints=Array.from(xs).map((val,i)=>{
          return {x:val,y:preds[i]}
        });
    
        const originalpoints=inputData.map(d=>({
          x:d.total_rooms,
          y:d.median_house_value
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
        const batchsize = 10;
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