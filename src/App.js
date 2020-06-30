import React, { Component } from 'react';
import logo from './book_circle.png';
import './App.css';
import * as firebase from 'firebase';
import Button from '@material-ui/core/Button';


import Table_own from './Table_component/Table_component';
import Pop_up_form from './Pop_up_form/Pop_up';
import Home from './Home/Home';
import Queue from './Home/Queue_list';
import table_list from './Table_component/Table_component';

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

let total=0;
let value='';
let tables=null;

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
    home:false,
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    //document.getElementById("name_details").focus();
  };

  handleClickOpen2 = () => {
    this.setState({ open2: true });
    //document.getElementById("name_details").focus();
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({active: ''});
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

  submitForm = (names) => {
    this.setState({ open: false });
    this.setState({ open2: false });
    const newName = document.getElementById("name_details").value;
    const newSize = this.state.button;//document.getElementById("size_details").value;
    const newPhone = document.getElementById("phone_details").value;
    // const myDetails={ name:newName, size:newSize, phone:newPhone}
    db.ref("/all_queues/"+names+"/main_list").push({ name: newName, size: newSize, phone: newPhone });
    this.setState({active: ''});
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
  loadTable=()=>{
   // this.setState({home:!this.state.home})
    console.log(this.state.title_names);
  }

  render() {
    if(this.state.home){
      return(
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt='App_logo' />
            <h3 className="App-title"> * * Manage your queues here * * </h3>
          </header>
          <Button onClick={this.loadTable} variant="outlined" color="primary" >Click to go to tables</Button>
          <Home
          size={this.totalSizeValue()}
          />
          <Queue 
          name='Main queue' 
          size={this.totalSizeValue()}
          clicked={this.loadTable}
          />
          <Queue
          name='Waiting queue'
          size={this.totalWaitingSizeValue()}/>
          <p>This is a conditional rendered home page</p>
        </div>
      )
    }

    if(!this.state.home){
      const that = this;
      tables = ( 
        <div> 
          
          {this.state.title_names.map((names)=>{
          
          let temp_table= this.table_pull(names);
          console.log(temp_table);
          return <div><Table_own
            title={names}
            name={temp_table}
            check={this.clicked}
            cross={this.reset}
            add_new={this.handleClickOpen}
            comment='+Add new'
            size={this.totalSizeValue()}
            sizeComment='Total customers in line: '
             />
             <Pop_up_form
            open={this.state.open}
            close={this.handleClose}
            size_select={this.handleSizeButtonClick}
            active={this.state.active}
            submit={()=>this.submitForm(names)}
            header='Fill in the customer details'
   />
             </div>

           })}
        </div>)
      return (
      
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt='App_logo' />
            <h3 className="App-title"> * * Manage your queues here * * </h3>
          </header>
          <br></br>
          <input type='text' onKeyDown={(e)=>this.search(e)} onChange={(e)=>this.handleChange(e)}/><br></br>
          {/* <p>You have clicked {this.state.counter['count']} number of times</p> */}
  {/*Table1*/}
          <Button onClick={this.loadTable} variant="outlined" color="primary" >Home</Button>
          {/*Tables after this.*/}
          {tables}
          
          
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
              console.log(names);
              console.log(key_1);
              temp_details = {...temp_details,[key_1]:value};
              console.log(temp_details);
            })
            return temp_details;
  }

  

  search=(e)=>{
    if(e.keyCode === 13){
     // console.log(e.target.value);
      this.setState({title_names:[...this.state.title_names,value]});
      db.ref("all_queues/"+e.target.value+"/main_list").push(1);
      //db.ref("/all_queues/dine_in_customers/main_list").push({ name:' ', size: ' ', phone: ' ' });
      e.target.value='';
      //console.log(this.state.value);
      // put the login here  
   }
   
}

handleChange(e) {
  value=e.target.value;
}

  clicked = (row_key) => {
    console.log('h');
    console.log(row_key);
    db.ref("/all_queues/dine_in_customers/main_list/" + row_key).remove(); // remove from firebase DB
    const { [row_key]: _, ...newMyDetails1 } = this.state.newMyDetails; //remove from local state 
    this.setState({newMyDetails:newMyDetails1}) // update local state after removing 
  }
  waitingClicked=(row_key)=>{
    const oldRef = db.ref('/all_queues/dine_in_customers/waiting_list/'+row_key);
    const newRef = db.ref('/all_queues/dine_in_customers/main_list/'+row_key);
    oldRef.once('value', function(snap){
         newRef.set( snap.val(), function(error) {
          if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
    db.ref("/all_queues/dine_in_customers/waiting_list/" + row_key).remove(); // remove from firebase DB
    const { [row_key]: _, ...waitMyDetails1 } = this.state.waitMyDetails; //remove from local state 
    this.setState({waitMyDetails:waitMyDetails1}) // update local state after removing     
  }


  reset = () => {
    //const current= Number(this.state.counter['count']); 
    db.ref("/").update({ count: 0 });
  }

  componentDidMount() {
    const that = this;

    const docRef = db.ref('/');
    docRef.on('value', function (snapshot) {
      const value1 = snapshot.val();
      that.setState({ counter: value1 });
    })
    const docRefPersons = db.ref('/all_queues/dine_in_customers/main_list/');
    docRefPersons.on("child_added", function (snapshot) {
      const key_1 = snapshot.key;
      const value = snapshot.val();
      that.setState({ newMyDetails: { ...that.state.newMyDetails, [key_1]: value } });
    })

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

  totalSizeValue=()=>{
    let total_size=0;
    Object.keys(this.state.newMyDetails).map((key) => {
      const size_value  = this.state.newMyDetails[key].size;
      total_size = total_size+Number(size_value);
    })
    return total_size;
  }
  totalWaitingSizeValue=()=>{
    let total_size=0;
    Object.keys(this.state.waitMyDetails).map((key) => {
      const size_value  = this.state.waitMyDetails[key].size;
      total_size = total_size+Number(size_value);
    })
    return total_size;
  }
}

export default App;