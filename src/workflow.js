import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis';
import * as Papa from "papaparse";
import { resolve } from 'dns';
import { combineLocations } from '@tensorflow/tfjs-core/dist/ops/axis_util';
window.tf = tf;
window.tfvis = tfvis;
//Note  In this Poject we have use Two type of Train Model
//First using TensorFlow to Train model ComponentdidMountold
//Another method usign split data manually.

class workflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MainData: [],
      ProcurementMethod:0,
      isDirectManagerApprovalRequired:"",
      isDeptManagerApprovalRequired:"",
      isSectorManagerApprovalRequired:"",
      PR_MANAGER_APPROVAL:"",
      FINANCE_MANAGER_APPROVAL:"",
      IsPlannedPurchase:0, //1 yes , 2 no
      IsProjectRelated:"",//1 yes, 2 no,
      WorkflowEnd:"",
      StepAnswer:"",
      StepAnswerNo:"",
      PMO_TEAM_REVIEW:"",
      MainFlow:"PR_INITIATE",
      TECHEVAL_DETAILS:"",

    };
    this.divsclickevent = this.divsclickevent.bind(this);
    this.clickyes = this.clickyes.bind(this);
    this.clickno = this.clickno.bind(this);
    this.setisWorkflowEnd = this.setisWorkflowEnd.bind(this);
    
  }
  
 

 renderinitialdivs(){
   //11241
   //planned
   //7
   //is realted to project no
var Arrays=PR_INITIATE
DeptManagerApproval
SectorManagerApproval
FINANCE_MANAGER_APPROVAL
FINANCE_MANAGER_APPROVAL
PR_MANAGER_APPROVAL
TECHEVAL_DETAILS
DeptManagerApproval_Execution
SectorManagerApproval_Execution
FINANCE_MANAGER_APPROVAL_Execution
FINANCE_MANAGER_APPROVAL_Execution
RFC_FINANCE_MANAGER_APPROVAL_Execution
FINANCE_MANAGER_APPROVAL_Execution
FINANCE_MANAGER_APPROVAL_Execution
PR_MANAGER_APPROVAL_Execution
PR_MANAGER_APPROVAL_Execution
PR_TEAM_EXECUTION
PR_TEAM_ACTUAL_VALUE
FINANCE_ACTUAL_VALUE_APPROVAL
FINANCE_ACTUAL_VALUE_APPROVAL
PR_TEAM_CONTRACTING
PR_TEAM_DELIVERY
USER_RATING


   var TempArray=[];
   for(var x=1;x<7;x++){
    var NewData = {
      Title:"Method"+x,
      Id:x
    }
    TempArray.push(NewData)
}
this.setState({
  MainData: TempArray,
});
 }

  componentDidMount() {
    this.renderinitialdivs();
  }

  





  render() {
    var SubProjectArrays = this.state.MainData.map(function (item, i) {
      return <div className="divs"  key={item["Id"]}  >{item["Title"]}
      <hr>
      </hr>
      <button id={item["Id"]} onClick={this.divsclickevent}>Play</button>
      </div>
    }.bind(this));

   


    return (
      <div>
        <h1>BIS MILLAH HIR REHMAN NIR RAHEEEM</h1>
        <div className="divsfloatnone">
<h2>PR _ Initiated</h2>
<br></br>
        </div>
        <br></br>
        <hr></hr>
        <div>
          {SubProjectArrays}

        </div>
<br></br>

<div className="newdor">
{
     this.state.IsPlannedPurchase=="Yes" && 
     <div>
      <div className="divs">
         <h3>Is Purchased is Plan</h3>
       <button id="btnyes21" onClick={this.clickyes}>Yes</button>
       <button id="btnno31" onClick={this.clickno}>No</button>
         </div>
       </div>
   }


</div >


        <div className="newdor">
   {
     this.state.isDirectManagerApprovalRequired=="Yes" && 
     <div>
       <div className="divs">
         <h3>Direct Manger approval Taken</h3>
       <button id="btnyes" onClick={this.clickyes.bind(this)}>Yes</button>
       <button id="btnno" onClick={this.clickno.bind(this)}>No</button>
         </div>
       </div>
   }

   
   {
     this.state.isDeptManagerApprovalRequired=="Yes" && 
     <div>
       <div className="divs">
         <h3>Department Manger approval Taken</h3>
       <button id="btnyes2" onClick={this.clickyes}>Yes</button>
       <button id="btnno32" onClick={this.clickno}>No</button>
         </div>
       </div>
   }
   {
     this.state.isSectorManagerApprovalRequired=="Yes" && 
     <div>
       <div className="divs">
         <h3>Sector Manger approval Taken</h3>
       <button id="btnyes210" onClick={this.clickyes}>Yes</button>
       <button id="btnno310" onClick={this.clickno}>No</button>
         </div>
       </div>
   }
   </div>
   <div className="newdor">
{
     this.state.PR_MANAGER_APPROVAL=="Yes" && 
     <div>
       <div className="divs">
         <h3>PR  Manger approval Taken</h3>
       <button id="btnyes2100" onClick={this.clickyes}>Yes</button>
       <button id="btnno3100" onClick={this.clickno}>No</button>
         </div>
       </div>
   }
 </div>
  
 <div className="newdor">
{
     this.state.FINANCE_MANAGER_APPROVAL=="Yes" && 
     <div>
       <div className="divs">
         <h3>Finance  Manger approval Taken</h3>
       <button id="btnyes21123" onClick={this.clickyes}>Yes</button>
       <button id="btnno31123" onClick={this.clickno}>No</button>
         </div>
       </div>
   }
 </div>
 <div className="newdor">
{
     this.state.IsProjectRelated=="Yes" && 
     <div>
       <div className="divs">
         <h3>It is Related to Project</h3>
       <button id="btnyes211515" onClick={this.clickyes}>Yes</button>
       <button id="btnno311551" onClick={this.clickno}>No</button>
         </div>
       </div>
   }
 </div>



 <div className="newdor">
{
     this.state.PMO_TEAM_REVIEW=="Yes" && 
     <div>
       <div className="divs">
         <h3>PMO REVIEWED</h3>
       <button id="btnyes215151" onClick={this.clickyes}>Yes</button>
       <button id="btnno315151" onClick={this.clickno}>No</button>
         </div>
       </div>
   }
 </div>

 <div className="newdor">
{
     this.state.TECHEVAL_DETAILS=="Yes" && 
     <div>
       <div className="divs">
         <h3>TECHEVAL_DETAILS</h3>
       <button id="btnyes2TECHEVAL_DETAILS" onClick={this.clickyes}>Yes</button>
       <button id="TECHEVAL_DETAILS" onClick={this.clickno}>No</button>
         </div>
       </div>
   }
 </div>
  
   <div className="newdor">
{
     this.state.WorkflowEnd=="Yes" && 
     <div>
       <div className="divend">
         <h3>Worlflow Has been End</h3>
         </div>
       </div>
   }




   </div >
      </div >
    );
  }

  MethodNo1()
  {
// first check Is Planned or not
  if(this.state.IsPlannedPurchase!="Yes"){
  this.setIsPlannedPurchase();

  }
  
// if Purchased is Planned.
  if (this.state.IsPlannedPurchase=="Yes" && this.state.isDirectManagerApprovalRequired!="Yes")
    this.setisDirectManagerApprovalRequired();

    if (this.state.IsPlannedPurchase=="Yes" && this.state.isDeptManagerApprovalRequired!="Yes" && this.state.isDirectManagerApprovalRequired=="Yes")
    this.setisisDeptManagerApprovalRequired();

    if (this.state.IsPlannedPurchase=="Yes" && this.state.isSectorManagerApprovalRequired!="Yes" && this.state.isDeptManagerApprovalRequired=="Yes" && this.state.isDirectManagerApprovalRequired=="Yes")
    this.setisSectorManagerApprovalRequired();

    // is planned
    if (this.state.IsPlannedPurchase=="Yes" && this.state.isSectorManagerApprovalRequired=="Yes" && this.state.isDeptManagerApprovalRequired=="Yes" 
    && this.state.isDirectManagerApprovalRequired=="Yes" && this.state.FINANCE_MANAGER_APPROVAL!="Yes")
    this.setFinanceManagerApproal();
    
    if  (this.state.IsPlannedPurchase=="Yes" && this.state.IsProjectRelated=="" && this.state.isSectorManagerApprovalRequired=="Yes" && this.state.isDeptManagerApprovalRequired=="Yes" 
    && this.state.isDirectManagerApprovalRequired=="Yes" && this.state.FINANCE_MANAGER_APPROVAL=="Yes")
    this.setIsProjectRelated();

    if (this.state.IsPlannedPurchase=="Yes" &&  this.state.IsProjectRelated=="Yes")
    {
     if (this.state.StepAnswer=="No"){
        this.setisPR_MANAGER_APPROVAL();
      }if (this.state.StepAnswer=="Yes" && this.state.PMO_TEAM_REVIEW!="Yes"){
        this.setPMO_TEAM_REVIEW();
      }
      if (this.state.StepAnswer=="Yes" && this.state.PMO_TEAM_REVIEW=="Yes"){
        this.setisPR_MANAGER_APPROVAL();
      }
      
    }

    //if Purchased is plan End

    if  (this.state.IsPlannedPurchase=="No" && this.state.TECHEVAL_DETAILS!="Yes")
    {
this.setTECHEVAL_DETAILS();
    }


    if  (this.state.IsPlannedPurchase=="No" && this.state.TECHEVAL_DETAILS=="Yes"  && this.state.isDirectManagerApprovalRequired!="Yes")
    {
this.setisDirectManagerApprovalRequired();
    }

    if  (this.state.IsPlannedPurchase=="No" && this.state.TECHEVAL_DETAILS=="Yes"  
    && this.state.isDirectManagerApprovalRequired=="Yes" && this.state.isDeptManagerApprovalRequired!="Yes"
    )
    {
this.setisisDeptManagerApprovalRequired();
    }

    if  (this.state.IsPlannedPurchase=="No" && this.state.TECHEVAL_DETAILS=="Yes"  
    && this.state.isDirectManagerApprovalRequired=="Yes" 
    && this.state.isDeptManagerApprovalRequired=="Yes"
    && this.state.isSectorManagerApprovalRequired!="Yes"
    )
    {
this.setisSectorManagerApprovalRequired();
    }


  }

  MethodNo2()
  {

  }

  MethodNo3()
  {

  }

  MethodNo4()
  {

  }

  MethodNo5()
  {

  }

  MethodNo6()
  {
    if (this.state.setisDirectManagerApprovalRequired!="Yes")
    this.setisDirectManagerApprovalRequired();

    if (this.state.isDeptManagerApprovalRequired!="Yes" && this.state.isDirectManagerApprovalRequired=="Yes")
    this.setisisDeptManagerApprovalRequired();

    if (this.state.isSectorManagerApprovalRequired!="Yes" && this.state.isDeptManagerApprovalRequired=="Yes" && this.state.isDirectManagerApprovalRequired=="Yes")
    this.setisSectorManagerApprovalRequired();

    if (this.state.PR_MANAGER_APPROVAL!="Yes" && 
    this.state.isSectorManagerApprovalRequired=="Yes" && this.state.isDeptManagerApprovalRequired=="Yes" && this.state.isDirectManagerApprovalRequired=="Yes")
    this.setisPR_MANAGER_APPROVAL();

    if (this.state.PR_MANAGER_APPROVAL=="Yes" && 
    this.state.isSectorManagerApprovalRequired=="Yes" && this.state.isDeptManagerApprovalRequired=="Yes" && this.state.isDirectManagerApprovalRequired=="Yes")
    this.setisWorkflowEnd();

/*
 this.setState({
       isDirectManagerApprovalRequired: "Yes",
       isDeptManagerApprovalRequired: "Yes",
       isSectorManagerApprovalRequired: "Yes",
       PR_MANAGER_APPROVAL: "Yes",
       WorkflowEnd: "Yes",
     });

*/
  }
}

export default workflow;
