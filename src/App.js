import React, { Component } from 'react';
import logo from './Media/book_circle.png';
import './App.css';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

import Table_own from './Table_component/Table_component';
import Pop_up_form from './Pop_up_form/Pop_up';
//import Home from './Home/Home';
import Queue from './Home/Queue_list';
import Add_table from './Add_table/Add_table'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB1VI7oMtsBNI0MWJ6G05ZipZZqMOO6juY",
  authDomain: "queue-application-firebase.firebaseapp.com",
  databaseURL: "https://queue-application-firebase.firebaseio.com",
  projectId: "queue-application-firebase",
  storageBucket: "queue-application-firebase.appspot.com",
  messagingSenderId: "1076263555456",
  appId: "1:1076263555456:web:17a4639326abcd87d73165",
  measurementId: "G-646G47PCD9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.database();
//firebase.analytics();

let value='';
let tables=null;
let summary=null;


class App extends Component {
  state = {
    title_names:[],
    counter: {count:7},
    open: false,    //to open table1 pop-up
    open2:false,    //to open table2 pop-up
    button: 0,
    active: '',
    newMyDetails: {},
    waitMyDetails:{},
    home:true,
    addNewButtonTableName: '',
    addNewButtonTableNameWaiting:false,
    renderTable:'',
    tablePopUp:false,
  }

  handleClickOpen = ev => {
    this.setState({addNewButtonTableNameWaiting:false})
    this.setState({ open: true });
    const table_name = ev.currentTarget.value;
    console.log(table_name);
    this.setState({addNewButtonTableName:table_name});
    //console.log(input);
    //console.log(this.state.addNewButtonTableName);
   // document.getElementById(this.state.addNewButtonTableName+"_name_details").focus();
   // input.focus();

    //document.getElementById("name_details").focus();
  };

  handleClickOpen2 = ev => {
    this.setState({addNewButtonTableNameWaiting:true})
    this.setState({ open: true });
    const table_name = ev.currentTarget.value;
    //console.log(table_name);
    this.setState({addNewButtonTableName:table_name});
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({active: ''});
    this.setState({addNewButtonTableNameWaiting:false})
  };
  handleClose2 = () => {
    this.setState({ open2: false });
    this.setState({active: ''});
  };
  handleSizeButtonClick = ev => {
    const value = ev.currentTarget.value;
    this.setState({ button: value });
    console.log(ev.currentTarget.value);

    //Stay highlight after selection
    const clicked = ev.target.getAttribute('id');
    console.log(ev.target.id);
    if(this.state.active === clicked) { 
        this.setState({active: ''});
        
    } else {
        this.setState({active: clicked})
   }
  }
  nameInput =ev => {
    const name_inp=ev.target.value;
    console.log(name_inp);
  }

  submitForm = () => {
    console.log(this.state.addNewButtonTableNameWaiting);
    const newName = document.getElementById(this.state.addNewButtonTableName+"_name_details").value;
    const newSize = this.state.button;//document.getElementById("size_details").value;
    const newPhone = document.getElementById(this.state.addNewButtonTableName+"_phone_details").value;
    const table_name= this.state.addNewButtonTableName;
    // const myDetails={ name:newName, size:newSize, phone:newPhone}
    if(this.state.addNewButtonTableNameWaiting){
      db.ref("/all_queues/"+table_name+"/waiting_list").push({ name: newName, size: newSize, phone: newPhone });
    }
    else{
      db.ref("/all_queues/"+table_name+"/main_list").push({ name: newName, size: newSize, phone: newPhone });
    }
    
    this.setState({active: ''});
    this.setState({ open: false });
    this.setState({ open2: false });
  }
  submitWaitingForm=()=>{
    this.setState({ open: false });
    this.setState({ open2: false });
    const newName = document.getElementById("name_details").value;
    const newSize = this.state.button;//document.getElementById("size_details").value;
    const newPhone = document.getElementById("phone_details").value;
    // const myDetails={ name:newName, size:newSize, phone:newPhone}
    db.ref("/all_queues/dine_in_customers/waiting_list").push({ name: newName, size: newSize, phone: newPhone });
    this.setState({active: ''});
  }
  loadTable=(tableName)=>{
    this.setState({home:!this.state.home})
    console.log(this.state.title_names);
    this.setState({renderTable:tableName})
  }

  deleteTable=(tableName)=>{
    console.log(tableName);
    db.ref("/all_queues/"+tableName).remove(); // remove from firebase DB
    this.setState({title_names: this.state.title_names.filter(function(title) { 
      return title !== tableName
     })});
    //const { [row_key]: _, ...newMyDetails1 } = this.state.newMyDetails; //remove from local state 
    //this.setState({newMyDetails:newMyDetails1}) // update local state after removing 
  }

  checkHeader=_.throttle(() => { 
    // Run JavaScript stuff here
    let scrollPosition = Math.round(window.scrollY);
    console.log('scrolling' + scrollPosition)
    if (scrollPosition > 30){
      document.querySelector('header').classList.add('sticky');
      document.querySelector(".App-logo").classList.add('sticky');
     }
  // If not, remove "sticky" class from header
    else if(scrollPosition < 30){
        document.querySelector('header').classList.remove('sticky');
        document.querySelector(".App-logo").classList.remove('sticky');
   }
   
}, 200);

    addTable=()=>{
      this.setState({tablePopUp:true})
    }
    closeTablePopUp=()=>{
      this.setState({tablePopUp:false})
    }
    tableNameSubmit=()=>{
      const newName = document.getElementById("newTableName").value;
      console.log(newName);
      this.setState({tablePopUp:false})
      this.setState({title_names:[...this.state.title_names,newName]});
      db.ref("all_queues/"+newName+"/main_list/").push(0);
      db.ref("all_queues/"+newName+"/waiting_list/").push(0);
    }


  render() {
// ********** Summary view *********
    if(this.state.home){
      summary=(
        <div>
          {this.state.title_names.map((names)=>{
            //console.log(names);
            let total_size=0;
            let temp_table= this.table_pull(names);
           Object.keys(temp_table).map((key) => {
            const size_value  = temp_table[key].size;
            total_size = total_size+Number(size_value);
           })
            return (
              <Queue
              name={names}
              size={total_size}
              clicked={this.loadTable}
              button={this.deleteTable}
              />
            )
          })}
          
        </div>
      )
      return(
        <div className="App">
          <header className="App-header">
            <img id="appLogo" src={logo} className='App-logo' alt='App_logo' />
            <p className="App-title"> * * Manage your queues here * * </p>
          </header>
          <br></br><br></br>
          
        <button className="buttonCustom newTable" variant="outlined" color="primary" onClick={this.addTable}>+ New Queue</button>
          {/* <Button onClick={this.loadTable} variant="outlined" color="primary" >Click to go to tables</Button><br></br> */}
          {/*<input type='text' placeholder='Enter new table name' onKeyDown={(e)=>this.search(e)} onChange={(e)=>this.handleChange(e)}/>
          <Home/>*/}
          
          <Add_table
          open={this.state.tablePopUp}
          close={this.closeTablePopUp}
          submit={this.tableNameSubmit}
          />
          {window.addEventListener('scroll',this.checkHeader)}
          {summary}

         
        </div>
      )
    }

// ********** Table detailed view *************
    if(!this.state.home){
      const that = this;
      tables = ( 
        <div> 
          {this.state.title_names.map((names)=>{
          if(names===this.state.renderTable){
            let total_size=0;
            let wait_total_size=0;
          let temp_table= this.table_pull(names);
          Object.keys(temp_table).map((key) => {
            const size_value  = temp_table[key].size;
            total_size = total_size+Number(size_value);
          })
          let wait_temp_table= this.wait_table_pull(names);
          
          console.log(typeof wait_temp_table);
          //console.log(temp_table);
          if(typeof wait_temp_table === "undefined"){
            return <div>
              
            <Table_own
              title={names}
              details={temp_table}
              check={this.clicked}
              cross={this.reset}
              add_new={this.handleClickOpen}
              comment='+Add new'
              size={total_size}
              sizeComment='Total customers in line: '
             />
             <p>undefined</p>
             </div>
          }
          else if(wait_temp_table!==null || typeof wait_temp_table !== 'undefined') {
            Object.keys(wait_temp_table).map((key) => {
              const wait_size_value  = wait_temp_table[key].size;
              wait_total_size = wait_total_size+Number(wait_size_value);
            })
            return <div>
             
              <Table_own
              title={names}
              details={temp_table}
              check={this.clicked}
              cross={this.reset}
              add_new={this.handleClickOpen}
              comment='+Add new'
              size={total_size}
              sizeComment='Total customers in line: '
             />
             <Table_own
              title={names}
              details={wait_temp_table}
              check={this.waitingClicked}
              cross={this.reset}
              add_new={this.handleClickOpen2}
              comment='+Waiting list'
              size={wait_total_size}
              sizeComment='Total customers waiting line: '
              />
               <p>Both</p>
            </div>
          }
          
          }

           })}
        </div>)
      return (
      
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt='App_logo' />
            <p className="App-title"> * * Manage your queues here * * </p>
          </header>
          <br></br>
          {/* <p>You have clicked {this.state.counter['count']} number of times</p> */}
           {/*Table1*/}
          <button className="buttonCustom" onClick={this.loadTable} variant="outlined" color="primary" >Home</button>
          {/*Tables after this.*/}
          {window.addEventListener('scroll',this.checkHeader)}
          {tables}
          <Pop_up_form
            name={this.state.addNewButtonTableName}
            open={this.state.open}
            close={this.handleClose}
            name_input={this.nameInput}
            size_select={this.handleSizeButtonClick}
            active={this.state.active}
            submit={()=>this.submitForm()}
            header='Fill in the customer details'
           />
        
          {/* Add waiting list  button*/}
        </div>
      );
      
    }
  }

  table_pull=(names)=>{
    let temp_details;
          const docTablePersons = db.ref('/all_queues/'+names+'/main_list/');
              docTablePersons.on("child_added", function (snapshot) {
              const key_1 = snapshot.key;
              const value = snapshot.val();
              //console.log(names);
              //console.log(key_1);
              temp_details = {...temp_details,[key_1]:value};
              //console.log(temp_details);
            })
            return temp_details;
  }
  wait_table_pull=(names)=>{
    let temp_details;
          const docTablePersons = db.ref('/all_queues/'+names+'/waiting_list/');
              docTablePersons.on("child_added", function (snapshot) {
              const key_1 = snapshot.key;
              const value = snapshot.val();
              //console.log(names);
              //console.log(key_1);
              temp_details = {...temp_details,[key_1]:value};
              //console.log(temp_details);
            })
            return temp_details;
  }

  

//   search=(e)=>{
//     if(e.keyCode === 13){
//      // console.log(e.target.value);
//       this.setState({title_names:[...this.state.title_names,value]});
//       db.ref("all_queues/"+e.target.value+"/main_list/").push(0);
//       db.ref("all_queues/"+e.target.value+"/waiting_list/").push(0);
//       //db.ref("/all_queues/dine_in_customers/main_list").push({ name:' ', size: ' ', phone: ' ' });
//       e.target.value='';
//       //console.log(this.state.value);
//       // put the login here  
//    }
   
// }

// handleChange(e) {
//   value=e.target.value;
// }

  clicked = (table,row_key) => {
    console.log('Deleted selected row:'+row_key+"from"+table);
    db.ref("/all_queues/"+table+"/main_list/" + row_key).remove(); // remove from firebase DB
    const { [row_key]: _, ...newMyDetails1 } = this.state.newMyDetails; //remove from local state 
    this.setState({newMyDetails:newMyDetails1}) // update local state after removing 
  }
  waitingClicked=(table,row_key)=>{
    console.log(table);
    console.log('inside waiting clicked')
    const oldRef = db.ref("/all_queues/"+table+"/waiting_list/"+row_key);
    const newRef = db.ref("/all_queues/"+table+"/main_list/"+row_key);
    oldRef.once('value', function(snap){
         newRef.set( snap.val(), function(error) {
          if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
    db.ref("/all_queues/"+table+"/waiting_list/" + row_key).remove(); // remove from firebase DB
    const { [row_key]: _, ...waitMyDetails1 } = this.state.waitMyDetails; //remove from local state 
    this.setState({waitMyDetails:waitMyDetails1}) // update local state after removing     
  }


  reset = () => {
    //const current= Number(this.state.counter['count']); 
    db.ref("/").update({ count: 0 });
  }

  componentDidMount() {
    const that = this;

    // const docRef = db.ref('/');
    // docRef.on('value', function (snapshot) {
    //   const value1 = snapshot.val();
    //   that.setState({ counter: value1 });
    // })

    const docRefTables = db.ref('/all_queues/');
    docRefTables.on("child_added", function (snapshot) {
      const table_key = snapshot.key;
      //const value = snapshot.val();
      that.setState({title_names:[...that.state.title_names,table_key]});
      //that.setState({ newMyDetails: { ...that.state.newMyDetails, [key_1]: value } });
    })

    const docRefWaiting = db.ref('/all_queues/dine_in_customers/waiting_list/');
    docRefWaiting.on("child_added", function (snapshot) {
      const key_2 = snapshot.key;
      const value_wait = snapshot.val();
      that.setState({ waitMyDetails: { ...that.state.waitMyDetails, [key_2]: value_wait } });

    })
  }

  // totalSizeValue=()=>{
  //   let total_size=0;
  //   Object.keys(this.state.newMyDetails).map((key) => {
  //     const size_value  = this.state.newMyDetails[key].size;
  //     total_size = total_size+Number(size_value);
  //   })
  //   return total_size;
  // }
  // totalWaitingSizeValue=()=>{
  //   let total_size=0;
  //   Object.keys(this.state.waitMyDetails).map((key) => {
  //     const size_value  = this.state.waitMyDetails[key].size;
  //     total_size = total_size+Number(size_value);
  //   })
  //   return total_size;
  // }
}

export default App;