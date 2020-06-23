import React, { Component } from 'react';
import logo from './book_circle.png';
import './App.css';
import * as firebase from 'firebase';

import Table_2 from './Table_component/Table_component'
import Pop_up_form from './Pop_up_form/Pop_up'

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
const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'right', },
  { id: 'size', label: 'Size', minWidth: 170, align: 'right', },
  { id: 'phone', label: 'Phone', minWidth: 170, align: 'right', },
  // { id: 'actions', label: 'Actions',  minWidth: 170, align: 'right',},
];

// const rows = [
//   {name:'India', count:1, phone:9950366893},
//   createData('China', 4, 8950363895),
//   createData('Italy',  2, 7950346892),
//   createData('United States',  3, 9618939501),
//   createData('Canada', 2, 9503679898),
// ];


// var newMyDetails = {};   // Initializing the object to store all the details
// for (const property in newMyDetails) {
//   console.log(`${newMyDetails[property].name}`);
// }

class App extends Component {

  state = {
    counter: {count:7},
    open: false,    //to open table1 pop-up
    open2:false,    //to open table2 pop-up
    button: 0,
    active: '',
    newMyDetails: {
    },
  }

   omitfunction = () =>{ 
   // const value = this.state.newMyDetails.filter(i=> i.'MANRDtTDjvPtcLMsF0V');
   console.log('notjhing')
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
  handleButtonClick = ev => {
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

  submitForm = () => {
    this.setState({ open: false });
    this.setState({ open2: false });
    const newName = document.getElementById("name_details").value;
    const newSize = this.state.button;//document.getElementById("size_details").value;
    const newPhone = document.getElementById("phone_details").value;
    // const myDetails={ name:newName, size:newSize, phone:newPhone}
    db.ref("/persons_list").push({ name: newName, size: newSize, phone: newPhone });
    this.setState({active: ''});
  }

  addActiveClass=(e)=>{
    //console.log(this.state.active);
    const clicked = e.target.getAttribute('id');
    console.log(e.target.id);
    if(this.state.active === clicked) { 
        this.setState({active: ''});
        
    } else {
        this.setState({active: clicked})
   }
}

  render() {
    return (
      
      <div className="App">
        
        
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt='App_logo' />
          <h3 className="App-title"> * * Manage your queues here * * </h3>
        </header>
        <p>You have clicked {this.state.counter['count']} number of times</p>
{/*Table1*/}
        <Table_2
        name={this.state.newMyDetails}
        check={this.clicked}
        cross={this.reset}
        add_new={this.handleClickOpen}
        comment='+Add new'
        />
{/*Table1*/}
    {/* Add new button*/}
    <Pop_up_form
      open={this.state.open}
      close={this.handleClose}
      size_select={this.handleButtonClick}
      active={this.state.active}
      submit={this.submitForm}
    />
    {/* Add new button*/}
{/*Table2*/}
        <Table_2
        name={this.state.newMyDetails}
        check={this.clicked}
        cross={this.reset}
        add_new={this.handleClickOpen2}
        comment='+Waiting list'
        />
{/*Table2*/}
 {/* Add new button*/}
 <Pop_up_form
      open={this.state.open2}
      close={this.handleClose2}
      size_select={this.handleButtonClick}
      active={this.state.active}
      submit={this.submitForm}
    />
{/* Add new button*/}
<button onClick={this.omitfunction}> check omit </button>
      </div>
    );
  }
  clicked = (row_key) => {
    console.log('h');
    console.log(row_key);
    db.ref("/persons_list/" + row_key).remove(); // remove from firebase DB
    const { [row_key]: _, ...newMyDetails1 } = this.state.newMyDetails; //remove from local state 
    this.setState({newMyDetails:newMyDetails1}) // update local state after removing 

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

    const docRefPersons = db.ref('/persons_list/');
    docRefPersons.on("child_added", function (snapshot) {
      const key_1 = snapshot.key;
      const value = snapshot.val();
      that.setState({ newMyDetails: { ...that.state.newMyDetails, [key_1]: value } });

    })
    docRefPersons.on("child_added", function (snapshot) {
      const key_1 = snapshot.key;
      const value = snapshot.val();
      that.setState({ newMyDetails: { ...that.state.newMyDetails, [key_1]: value } });

    })

  }
}

export default App;