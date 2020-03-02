import React from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs'

class careprediction extends React.Component {
  constructor(props) {
    super(props);
   
  }
  async componentDidMount() {
    this.getData();
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




  render() {
    return (
      <div>
        <h1>BIS MILLAH HIR REHMAN NIR RAHEEEM</h1>
                
      </div >
    );
  }

  
}

export default careprediction;