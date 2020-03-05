//https://codelabs.developers.google.com/codelabs/tfjs-training-regression/index.html#2
//Target :
//Our goal is to train a model that will take one number, Horsepower and learn to predict one number, Miles per Gallon. Remember that one-to-one mapping, as it will be important for the next section.


//Note This model is sequential because its inputs flow straight down to its output.
//A dense layer is a type of layer that multiplies its inputs by a matrix (called weights)
//this is the first layer of the network, we need to define our inputShape. The inputShape is [1] 
//because we have 1 number as our input (the horsepower of a given car).
//units sets how big the weight matrix will be in the layer. 
//By setting it to 1 here we are saying there will be 1 weight for each of the input features of the data.
//Note: Dense layers come with a bias term by default, so we do not need to set useBias to true, we will omit from further calls to tf.layers.dense

import React from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis';
window.tf = tf;
window.tfvis = tfvis;
class careprediction extends React.Component {
  constructor(props) {
    super(props);

  }
  async componentDidMount() {
    this.run();
  }

  async getData() {
    var cardatareq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
    var carsData = await cardatareq.json();
    var cleaned = carsData.map(car => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower,
    })).filter(car => (
      car.mpg != null && car.horsepower != null
    ));
    return cleaned;

  }

  async run() {
    const data = await this.getData();
    const values = data.map(d => ({
      x: d.horsepower,
      y: d.mpg
    }));
    //Creating a Graph
    // tfvis.render.scatterplot(
    //{ name: "Horse Power vs Milage Per Gallon" },
    // { values }, {
    //xLabel: 'Horsepwer',
    // ylabel: "Milage Per G",
    // height: 300,
    //}
    //);//tfvis scater plot end

    const model = this.createModel();
    tfvis.show.modelSummary({ name: "Model summary" }, model);
    const tensorData = this.converttoTensor(data);
    const { inputs, labels } = tensorData;

    //Train the model
    await this.trainmodel(model, inputs, labels);
    // Make some predictions using the model and compare them to the
    // original data
    this.testModel(model, data, tensorData);
    console.log(`traiing complete`);
  }

  createModel() {
    //Note This model is sequential because its inputs flow straight down to its output.
    //A dense layer is a type of layer that multiplies its inputs by a matrix (called weights)
    //this is the first layer of the network, we need to define our inputShape.
    //The inputShape is [1] because we have 1 number as our input (the horsepower of a given car).
    //units sets how big the weight matrix will be in the layer. By setting it to 1 here we are 
    //saying there will be 1 weight for each of the input features of the data.
    //Note: Dense layers come with a bias term by default, so we do not need to set useBias to true, we will omit from further calls to tf.layers.dense
    const model = tf.sequential();
    //add a single hidden layer
    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
    //add out put layer
    model.add(tf.layers.dense({ units: 1, useBias: true }));
    //The code above creates our output layer. We set units to 1 because we want to output 1 number.
      return model;


  }

  converttoTensor(data) {
    //Best Practice 1: You should always shuffle your data before handing it to the training algorithms in TensorFlow.js
    //using tidy to dispose the objecti n memory
    return tf.tidy(() => {
      //step 1 shuffle the data
      tf.util.shuffle(data);

      //Step 2 convert data to Tensor
      const inputs = data.map(d => d.horsepower);
      const labels = data.map(d => d.mpg);

        //We then convert each array data to a 2d tensor. 
        //The tensor will have a shape of[num_examples, num_features_per_example]. 
      //Here we have inputs.length examples and each example has 1 input feature (the horsepower).
      // input.len is num of examples
      // 1 is showing that number of feature in each example
      const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
      const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

      //step 3 normalize the data
      //You will have more success training your models if you get into the habit of 
      //normalizing your data to some reasonable range.
      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();

      const normalizeInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
      const normalizeLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

      return {
        inputs: normalizeInputs,
        labels: normalizeLabels,
        //return the min/max so that we can use them later
        inputMax,
        inputMin,
        labelMax,
        labelMin
      }

    });



  }

  async trainmodel(model, inputs, labels) {
    //prepare the model for training

    //mean squared error. it takes the distance of y from x.  square it and take mean of all 
    // greater the the MSE OR mean squared error weak the mdoel
      //Mean square error (MSE) is the average squared loss per example over the whole dataset. 
    model.compile({
      optimizer: tf.train.adam(),
      loss: tf.losses.meanSquaredError,
      metrics: ['mse'],
    });

    const batchSize = 10;
    const epochs = 100;
    //loss: this is a function that will tell the model how well it is doing on 
    //learning each of the batches (data subsets) that it is shown. Here we use 
    //meanSquaredError to compare the predictions made by the model with the true values.

    //epochs refers to the number of times the model is going to look at the entire dataset that you 
    //provide it. Here we will take 50 iterations through the dataset.
    return await model.fit(inputs, labels, {
      batchSize,
      epochs,
      callbacks: tfvis.show.fitCallbacks(
        { name: 'Training Performance' },
        ['loss', 'mse'],
        { height: 200, callbacks: ['onEpochEnd'] }
      )
    });
  }

  //making prediction
  async testModel(model, inputData, normalizationData) {
    const { inputMax, inputMin, labelMax, labelMin } = normalizationData;
    const [xs, preds] = tf.tidy(() => {

      //We generate 100 new ‘examples' to feed to the model. 
        //tf.linespace  =>Generates values in an interval.
      const xs = tf.linspace(0, 1, 100);
      // Model.predict is how we feed those examples into the model. Note that they need to be have a 
      //  similar shape          ([num_examples, num_features_per_example]) as when we did training.
      const preds = model.predict(xs.reshape([100, 1]));

      const unNormXs = xs
        .mul(inputMax.sub(inputMin))
        .add(inputMin);

      const unNormPreds = preds
        .mul(labelMax.sub(labelMin))
        .add(labelMin);
      return [unNormXs.dataSync(), unNormPreds.dataSync()];

    });

    const predictedpoints = Array.from(xs).map((val, i) => {
      return { x: val, y: preds[i] }
    });

    const originalpoints = inputData.map(d => ({
      x: d.horsepower, y: d.mpg
    }));


    //generate prediction for a uniform range of numbers between 1 and 0;
    //We un-normalize the data by doing the inverse of min-max scaling

    tfvis.render.scatterplot(
      { name: "Model Prediction vs original data" },
      { values: [originalpoints, predictedpoints], series: ['original', 'predicted'] },
      {
        xLabel: "HorsePower",
        yLabel: "MPG",
        height: 300,
      }

    );


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

export default careprediction;