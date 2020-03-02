import React from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs'

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvdDataset: [],
      csvUrl: `https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlow-js/master/src/data/diabetes.csv`,
      MainData: [],
      OutComes: [],

    };
  }

  async componentDidMount() {
    //this is low level
    //this is core api start    
    //this.Create1d2dTensor();
    //this is core api end


    //this is high level
    //this is layer api start
this.layerapimethod();
    //this is layer api end
  }

//core api start 
async Create1d2dTensor()
{
  const t1=tf.tensor1d([1,2,3]);
  //t1.print();
  const t2=tf.tensor2d([1,2,3,4],[2,2]);
  //t2.print();
 // const shape=[4,1];
  const t3=tf.tensor3d([[[1,2],[3,4],[5,6]]]);
 // t3.print();
  const t4=tf.tensor4d([[[[1,2,],[3,4],[5,6],[7,8]]]]);
  //t4.print();
 // this.Predict1dModel();
// this.Predic2dModel();
//this.createconstanttensor();
//this.operations();
//this.tidycode();


}
  async Predict1dModel()
  {
    const model=tf.sequential();
        model.add(tf.layers.dense({units:1, inputShape:[1]}));
        model.compile({loss:'meanSquaredError',optimizer:'adam'});
        const xs=tf.tensor1d([1,2,3]);
        const ys=tf.tensor1d([100,200,300]);
       model.fit(xs,ys).then(()=>{
      model.predict(tf.tensor1d([3])).print();
       });//then end
  }

  async Predic2dModel()
  {
    const model=tf.sequential();
    model.add(tf.layers.dense({units:1,inputShape:[2]}));
    model.compile({loss:'meanSquaredError',optimizer:'adam'});
    
    const xs=tf.tensor2d([[0,0],[0,1],[1,0],[1,1]],[4,2]);
    const ys=tf.tensor2d([0,1,1,0],[4,1]);
    model.fit(xs,ys).then(()=>{
      model.predict(tf.tensor2d([[0,1],[1,2]])).print();

    });



  }

 async createconstanttensor()
 {
   const t1=tf.tensor1d([1,2,3,4,5]);
   t1.print();
  t1.data(d=>{
    console.log(d);
  });
  console.log(t1.dataSync());


   const t2=tf.tensor2d([1,2,3,4],[2,2]);
   t2.print();
 }
 async operations()
 {
   const t1=tf.tensor([1,2,3,4]);
   const t2=tf.tensor([10,20,30,40]);
   t1.add(t2).print();
   t1.mul(t2).print();

   console.log(tf.memory());


  }
  tidycode()
  {
    const a=tf.tensor([1,2,3]);
    const y=tf.tidy(()=>{
      const res=a.log().neg().round();
      return res;
    }).print();
  }
//core api end



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

  //layer api start
  async layerapimethod()
  {
//we have two option sequential model
//
//input vector of 784 dimentsion in 1st layer 
// in 2nd layer out put will be in 10 
const model = tf.sequential({
  layers: [
    tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
    tf.layers.dense({units: 10, activation: 'softmax'}),
  ]
 });
console.log(model.summary());
//we can use the funcitonal model
  }
  //layer api end
}

export default Books;