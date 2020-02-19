import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis';

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          csvdDataset: [],
          csvUrl: `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`,
          MainData: [],
          OutComes:[],
    
        };
      }

      async componentDidMount()
    {
        const model=tf.sequential();
        //create multi layers preception
        model.add(tf.layers.dense({units:1, inputShape:[2]}));
        model.compile({loss:'meanSquaredError',optimizer:'adam'});
        //two dimensional inputs
        const xs=tf.tensor2d([[0,0],[0,1],[1,0],[1,1]],[4,2]);
        const ys=tf.tensor2d([0,1,1,0],[4,1]);
       model.fit(xs,ys).then(()=>{
        var temp= model.predict(tf.tensor2d([[0,1]],[1,2])).print();
        console.log(temp);
       });//then end
       
      }
      render() {
        return (
          <div>
            <h1>BIS MILLAH HIR REHMAN NIR RAHEEEM</h1>
            <div>
              {this.state.OutComes}
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

export default Books;