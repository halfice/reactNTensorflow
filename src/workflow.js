
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ArcherContainer, ArcherElement } from 'react-archer';
const rootStyle = { display: 'flex', justifyContent: 'center' };
const rowStyle = { margin: '100px 0', display: 'flex', justifyContent: 'space-between', }
const boxStyle = { padding: '10px', border: '1px solid black', margin:'11px', width:'120px' };
//Note  In this Poject we have use Two type of Train Model
//First using TensorFlow to Train model ComponentdidMountold
//Another method usign split data manually.

class workflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MainData: [],
      PlannedData:[],
      IsProjectRelateData:[],
      ProcurementMethod:0,
      
      IsPlannedPurchase:0, //1 yes , 2 no
      IsProjectRelated:"",//1 yes, 2 no,
      WorkflowEnd:"",
      StepAnswer:"",
      workflowdata:[],
      ProcMethodName:"",

      

    };
    this.divsclickevent = this.divsclickevent.bind(this);  
    this.divsclickeventplanned = this.divsclickeventplanned.bind(this);    
    this.clickrelatedtoproject = this.clickrelatedtoproject.bind(this);    
    
  }
  getMethodname(id)
  {
    var result="";

    switch(id){
      case 1:
        result= "Public Tender"
        break;
        case 2:
          result="Limited Tender"
        break;
        case 3:
          result="Practice Tender"
        break;
        case 4:
          result= "Direct order"
        break;
        case 5:
          result="Exceptional Direct order"
        break;
        case 6:
          result= "RFI"
        break;
        case 7:
          result="Amendment Order"
        break;
    }
    return result;
  }
  buildarray(){
var result=0;
    //11241
    //planned 1 
    //7
    //is realted to project no 2
    //7 yes no
    if (this.state.ProcurementMethod==7 && this.state.IsPlannedPurchase=="1" 
    && this.state.IsProjectRelated==2)
    {
      result=1;
      var Arrays01="PR_INITIATE,DeptManagerApproval,SectorManagerApproval,FINANCE_MANAGER_APPROVAL,FINANCE_MANAGER_APPROVAL,PR_MANAGER_APPROVAL,TECHEVAL_DETAILS,DeptManagerApproval_Execution,SectorManagerApproval_Execution,FINANCE_MANAGER_APPROVAL_Execution,RFC_FINANCE_MANAGER_APPROVAL_Execution,FINANCE_MANAGER_APPROVAL_Execution,FINANCE_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_EXECUTION,PR_TEAM_ACTUAL_VALUE,FINANCE_ACTUAL_VALUE_APPROVAL,FINANCE_ACTUAL_VALUE_APPROVAL,PR_TEAM_CONTRACTING,PR_TEAM_DELIVERY,USER_RATING";
      this.buildhtml(Arrays01,7);
    }

   
    //11830 , not planned , method 4 , is related to proec tno
    
    if (this.state.ProcurementMethod==4 && this.state.IsPlannedPurchase=="2" 
    && this.state.IsProjectRelated==2)
    { result=1;
      var Array02 ="PR_INITIATE,REQUESTER_FINAL_REVIEW,DeptManagerApproval_Execution,SectorManagerApproval_Execution,FINANCE_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_EXECUTION,PR_TEAM_ACTUAL_VALUE,PR_TEAM_CONTRACTING,PR_TEAM_DELIVERY,USER_RATING,USER_RATING";
      this.buildhtml(Array02,4);

    }




    //11289
    //pl yes metho 3, is projected related - no
   
    if (this.state.ProcurementMethod==3 && this.state.IsPlannedPurchase=="1" 
    && this.state.IsProjectRelated==2)
    { result=1;
var array03="PR_INITIATE,DeptManagerApproval,SectorManagerApproval,FINANCE_MANAGER_APPROVAL,FINANCE_MANAGER_APPROVAL,PR_MANAGER_APPROVAL,TECHEVAL_DETAILS,DeptManagerApproval_Execution,SectorManagerApproval_Execution,FINANCE_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_EXECUTION,PR_TEAM_TENDERING,PR_TEAM_Tech_Eval,PR_TEAM_Commercial_Eval,PR_TEAM_CONTRACTING,PR_TEAM_DELIVERY,USER_RATING,USER_RATING";
      this.buildhtml(array03,3);
    }
    
    //11660
    // pl no, moethod 5, projected related no
        if (this.state.ProcurementMethod==5 && this.state.IsPlannedPurchase=="2" 
    && this.state.IsProjectRelated==2)
    { result=1;
      var array04="PR_INITIATE,REQUESTER_FINAL_REVIEW,DeptManagerApproval_Execution,SectorManagerApproval_Execution,FINANCE_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_EXECUTION,PR_TEAM_ACTUAL_VALUE,PR_TEAM_CONTRACTING,PR_TEAM_DELIVERY,USER_RATING";
      this.buildhtml(array04,5);
    }

    //pl yes, method =4, pr=no
      if (this.state.ProcurementMethod==4 && this.state.IsPlannedPurchase=="1" 
    && this.state.IsProjectRelated==1)
   { result=1;
    var array05="PR_INITIATE,DirectManagerApproval,RFC_DirectManagerApproval,DirectManagerApproval,DeptManagerApproval,SectorManagerApproval,FINANCE_MANAGER_APPROVAL,FINANCE_MANAGER_APPROVAL,PR_MANAGER_APPROVAL,TECHEVAL_DETAILS,DirectManagerApproval_Execution,DeptManagerApproval_Execution,SectorManagerApproval_Execution,FINANCE_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_EXECUTION,PR_TEAM_ACTUAL_VALUE,PR_TEAM_CONTRACTING,PR_TEAM_DELIVERY,USER_RATING";
      this.buildhtml(array05,4);
    }
    
    //11699
    //pl no , method 7, pr no
    if (this.state.ProcurementMethod==7 && this.state.IsPlannedPurchase=="2" 
    && this.state.IsProjectRelated==2)
   { result=1;
    var array06="PR_INITIATE,REQUESTER_FINAL_REVIEW,DirectManagerApproval_Execution,DeptManagerApproval_Execution,SectorManagerApproval_Execution,FINANCE_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_EXECUTION,PR_TEAM_ACTUAL_VALUE,PR_TEAM_CONTRACTING,PR_TEAM_DELIVERY,USER_RATING";
      this.buildhtml(array06,7);
    }
    
    
    //11335
    //pl yes, method 5 pr no
    
    if (this.state.ProcurementMethod==7 && this.state.IsPlannedPurchase=="1" 
    && this.state.IsProjectRelated==2)
   { result=1;
    var array07="PR_INITIATE,DeptManagerApproval,SectorManagerApproval,FINANCE_MANAGER_APPROVAL,PR_MANAGER_APPROVAL,RFC_PR_MANAGER_APPROVAL,PR_MANAGER_APPROVAL,REQUESTER_FINAL_REVIEW,DirectManagerApproval_Execution,DeptManagerApproval_Execution,SectorManagerApproval_Execution,FINANCE_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_ACTUAL_VALUE,PR_TEAM_CONTRACTING,PR_TEAM_DELIVERY,USER_RATING";
      this.buildhtml(array07,7);
    }
    
    //11427
    //pl no, m 6 pr no
    if (this.state.ProcurementMethod==6 && this.state.IsPlannedPurchase=="2" 
    && this.state.IsProjectRelated==2)
   { result=1;
    var array08="PR_INITIATE,TECHEVAL_DETAILS,DeptManagerApproval_Execution,SectorManagerApproval_Execution,FINANCE_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_EXECUTION,PR_TEAM_ACTUAL_VALUE,PR_TEAM_CONTRACTING,PR_TEAM_DELIVERY,USER_RATING";
      this.buildhtml(array08,6);
    }
    
    //11452
    //pl no, m 3
    
    
    if (this.state.ProcurementMethod==3 && this.state.IsPlannedPurchase=="2" 
    && this.state.IsProjectRelated==2)
   { result=1;
    var array09 ="PR_INITIATE,TECHEVAL_DETAILS,DeptManagerApproval_Execution,SectorManagerApproval_Execution,FINANCE_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,RFC_PR_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,RFC_PR_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_EXECUTION,PR_TEAM_TENDERING,PR_MANAGER_APPROVAL_Execution,RFC_PR_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,RFC_PR_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,RFC_PR_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,RFC_PR_MANAGER_APPROVAL_Execution,PR_MANAGER_APPROVAL_Execution,PR_TEAM_EXECUTION,PR_TEAM_TENDERING,PR_TEAM_Tech_Eval,PR_TEAM_Commercial_Eval,PR_TEAM_ACTUAL_VALUE,FINANCE_ACTUAL_VALUE_APPROVAL,PR_TEAM_CONTRACTING,PR_TEAM_DELIVERY,USER_RATING";
      this.buildhtml(array09,3);
    }

if ( result==0)
{
  alert ("Not found");
}
  

   



  }

  buildhtml(ArrayList,methodid){
    var MethodName=this.getMethodname(methodid);
    var Arraydimen=ArrayList.split(',');
    var TempArray=[];
    for(var x=0;x<Arraydimen.length;x++){
     var NewData = {
       Title:Arraydimen[x],
       Id:x
     }
     TempArray.push(NewData)
    }
    this.setState({
      workflowdata:TempArray,
      ProcMethodName:MethodName
    },()=>{

    });
  }

  clickrelatedtoproject(item){
    //alert(item.target.id)\
    //1 is yes
    // 2 is no
    this.setState({
      IsProjectRelated:item.target.id
    },()=>{
this.buildarray();
    });
    


  }

  divsclickeventplanned(item){
//alert(item.target.id)
//1 is yes
//2 is no
this.setState({
  IsPlannedPurchase:item.target.id
 
},()=>{
this.isProjectRelateddivs();
});

  }


isProjectRelateddivs()
{
  var TempArray=[];
 
  var NewData = {
    Title:"Is Related to Project Yes",
    Id:1
  }
  TempArray.push(NewData)
  var NewData = {
   Title:"Is Related to Project No",
   Id:2
 }
 TempArray.push(NewData)

 
this.setState({
  IsProjectRelateData: TempArray,
  
});
}


  
  divsclickevent(itemid)
{
  var ProcurementMethodId=itemid.target.id;
  var TempArray=[];
 
   var NewData = {
     Title:"Is Purchased Plan Yes",
     Id:1
   }
   TempArray.push(NewData)
   var NewData = {
    Title:"Is Purchased Plan No",
    Id:2
  }

  TempArray.push(NewData)
this.setState({
  PlannedData: TempArray,
 ProcurementMethod:ProcurementMethodId,
});

}


 renderinitialdivs(){
  

   var TempArray=[];
   for(var x=1;x<8;x++){
     var mthodnametemp=this.getMethodname(x);
    var NewData = {
      Title:"Method"+x,
      Id:x,
      ProcName:mthodnametemp
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
      <div>{item["ProcName"]}</div>
      <hr>
      </hr>
      <button id={item["Id"]} onClick={this.divsclickevent}>Play</button>
      </div>
    }.bind(this));


    var plannedhtml = this.state.PlannedData.map(function (item, i) {
      return <div className="divs"  key={item["Id"]}  >{item["Title"]}
      <hr>
      </hr>
      <button id={item["Id"]} onClick={this.divsclickeventplanned}>Play</button>
      </div>
    }.bind(this));
   
    

    var proelatedhtml = this.state.IsProjectRelateData.map(function (item, i) {
      return <div className="divs"  key={item["Id"]}  >{item["Title"]}
      <hr>
      </hr>
      <button id={item["Id"]} onClick={this.clickrelatedtoproject}>Play</button>
      </div>
    }.bind(this));


    var workflowhtml = this.state.workflowdata.map(function (item, i) {
      return <div>
        
        <div className="divsworkfow"  key={item["Id"]}  > 
      <div>
      {item["Title"]}
      </div>    
      </div>
      </div>
    }.bind(this));



    var archs=this.state.workflowdata.map((item,i)=>{
      return (
        <div className="arrowsdiv">
<ArcherElement
      id={i}
      relations={[{
        targetId: i+1,
        targetAnchor: 'right',
        sourceAnchor: 'left',
        style: { strokeColor: 'blue', strokeWidth: 1 },
        label:item["Title"],
      }]}
    >
      <div style={boxStyle}>{item["Title"]}</div>
    </ArcherElement>
    <br></br>

        </div>
        );
    });


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
     this.state.PlannedData.length>0 && 
     <div>
      {plannedhtml}
       </div>
   }


</div >





<div className="newdor">
{
     this.state.IsProjectRelateData.length>0 && 
     <div>
      {proelatedhtml}
       </div>
   }


</div >





<div className="newdor">
{
     this.state.workflowdata.length>0 && 
     <div>
       <h2>Procurement Method : #{this.state.ProcMethodName}</h2>
       <hr></hr>
      {workflowhtml}

<hr>
</hr>



<div>

<ArcherContainer strokeColor='red' >


  <div style={rowStyle}>
    {archs}

   

  </div>
</ArcherContainer>

</div>

       </div>
   }


</div >

  
      </div >
    );
  }
}

export default workflow;