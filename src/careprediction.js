//https://codelabs.developers.google.com/codelabs/tfjs-training-regression/index.html#2
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

  async getData()
  {
    var cardatareq=await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
    var carsData=await cardatareq.json();
    var cleaned=carsData.map(car=>({
      mpg:car.Miles_per_Gallon,
      horsepower:car.Horsepower,
    })).filter(car =>(
car.mpg!=null && car.horsepower!=null
    ));
    return cleaned;

  }

  async run()
  {
    const data=await this.getData();
    const values = data.map(d=>({
      x:d.horsepower,
      y:d.mpg
    }));
    //Creating a Graph
    tfvis.render.scatterplot(
      {name:"Horse Power vs Milage Per Gallon"},
      {values},{
        xLabel:'Horsepwer',
        ylabel:"Milage Per G",
        height:300,
      }
    );//tfvis scater plot end
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