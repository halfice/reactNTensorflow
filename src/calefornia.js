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
        var californiadatareq=await fetch('https://download.mlcc.google.com/mledu-datasets/california_housing_train.csv');
        var calirforniadata=await californiadatareq.json();
        console.log(calirforniadata);
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