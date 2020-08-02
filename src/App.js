import React, { Component } from 'react';
import logo from './Media/book_circle.png';
//import cross_logo from '../Media/cross_logo.png';
import './App.css';
import * as firebase from 'firebase';
//import Button from '@material-ui/core/Button';
import _ from 'lodash';

import Table_own from './Table_component/Table_component';
import Pop_up_form from './Pop_up_form/Pop_up';
//import Home from './Home/Home';
import Queue from './Home/Queue_list';
import Add_table from './Add_table/Add_table';

import Customer from './Customer/Customer'
import {Route, Link, NavLink} from 'react-router-dom'

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

let value = '';
let tables = null;
let summary = null;


class App extends Component {
  state = {
    title_names: [],
    counter: { count: 7 },
    open: false,    //to open table1 pop-up
    open2: false,    //to open table2 pop-up
    button: 0,
    active: '',
    newMyDetails: {},
    waitMyDetails: {},
    home: true,
    addNewButtonTableName: '',
    addNewButtonTableNameWaiting: false,
    renderTable: '',
    tablePopUp: false,
    isSignedIn: false, // for google sign-in
    userLogo:'',
    userId:'',
    userName:'',
    customer:true,
  }

  handleClickOpen = ev => {
    this.setState({ addNewButtonTableNameWaiting: false })
    this.setState({ open: true });
    const table_name = ev.currentTarget.value;
    console.log(table_name);
    this.setState({ addNewButtonTableName: table_name });
  };

  handleClickOpen2 = ev => {
    this.setState({ addNewButtonTableNameWaiting: true })
    this.setState({ open: true });
    const table_name = ev.currentTarget.value;
    //console.log(table_name);
    this.setState({ addNewButtonTableName: table_name });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ active: '' });
    this.setState({ addNewButtonTableNameWaiting: false })
  };

  handleSizeButtonClick = ev => {
    const value = ev.currentTarget.value;
    this.setState({ button: value });
    console.log(ev.currentTarget.value);

    //Stay highlight after selection
    const clicked = ev.target.getAttribute('id');
    console.log(ev.target.id);
    if (this.state.active === clicked) {
      this.setState({ active: '' });

    } else {
      this.setState({ active: clicked })
    }
  }
  nameInput = ev => {
    const name_inp = ev.target.value;
    console.log(name_inp);
  }

  submitForm = () => {
    console.log(this.state.addNewButtonTableNameWaiting);
    const newName = document.getElementById(this.state.addNewButtonTableName + "_name_details").value;
    const newSize = this.state.button;//document.getElementById("size_details").value;
    const newPhone = document.getElementById(this.state.addNewButtonTableName + "_phone_details").value;
    const table_name = this.state.addNewButtonTableName;
    // const myDetails={ name:newName, size:newSize, phone:newPhone}
    if (this.state.addNewButtonTableNameWaiting) {
      db.ref("/Users/"+this.state.userId+"/all_queues/" + table_name + "/waiting_list").push({ name: newName, size: newSize, phone: newPhone });
    }
    else {
      db.ref("/Users/"+this.state.userId+"/all_queues/" + table_name + "/main_list").push({ name: newName, size: newSize, phone: newPhone });
    }

    this.setState({ active: '' });
    this.setState({ open: false });
    this.setState({ open2: false });
  }
 
  loadTable = (tableName) => {
    this.setState({ home: !this.state.home })
    console.log(this.state.title_names);
    this.setState({ renderTable: tableName })
  }

  deleteTable = (tableName) => {
    console.log(tableName);
    db.ref("/Users/"+this.state.userId+"/all_queues/" + tableName).remove(); // remove from firebase DB
    this.setState({
      title_names: this.state.title_names.filter(function (title) {
        return title !== tableName
      })
    });
    //const { [row_key]: _, ...newMyDetails1 } = this.state.newMyDetails; //remove from local state 
    //this.setState({newMyDetails:newMyDetails1}) // update local state after removing 
  }

  checkHeader = _.throttle(() => {
    // Run JavaScript stuff here
    let scrollPosition = Math.round(window.scrollY);
    console.log('scrolling' + scrollPosition)
    if (scrollPosition > 30) {
      document.querySelector('header').classList.add('sticky');
      document.querySelector(".App-logo").classList.add('sticky');
    }
    // If not, remove "sticky" class from header
    else if (scrollPosition < 30) {
      document.querySelector('header').classList.remove('sticky');
      document.querySelector(".App-logo").classList.remove('sticky');
    }

  }, 200);

  addTable = () => {
    this.setState({ tablePopUp: true })
  }
  closeTablePopUp = () => {
    this.setState({ tablePopUp: false })
  }
  tableNameSubmit = () => {
    const newName = document.getElementById("newTableName").value;
    console.log(newName);
    this.setState({ tablePopUp: false })
    this.setState({ title_names: [...this.state.title_names, newName] });
    db.ref("/Users/"+this.state.userId+"/all_queues/" + newName + "/main_list/").push(0);
    db.ref("/Users/"+this.state.userId+"/all_queues/" + newName + "/waiting_list/").push(0);
  }
  getContent() {
    if (this.state.isSignedIn) {
      return <p>hello user, you're signed in </p>
    } else {
      return (
        <div>
          <p>You are not signed in. Click here to sign in.</p>
          <div id="loginButton" className='loginButton' onClick={()=>{this.initializeGoogleSignIn()}}>Login with Google</div>
        </div>
      )
    }

  }
  forceMyOwnLogout = ((response) => {
    
    if (window.gapi) {
        const auth2 = window.gapi.auth2.getAuthInstance()
        if (auth2 != null) {
            auth2.signOut().then(
                auth2.disconnect().then(this.props.onLogoutSuccess)
            )
        }
    }
    this.forceUpdate()
})
revokeAllScopes = function() {
  const auth2 = window.gapi.auth2.getAuthInstance();
  auth2.disconnect();
  console.log(auth2);
  this.setState({isSignedIn:false},()=>{
    window.location.reload();
    console.log('reloading after logout')
  });
}

  render() {
    // ********** Testing customer view *************
    if(this.state.customer){
      return(
      <div  className="App">
      <header className="App-header">
        <div className="appHeaderInner">
        <img id="appLogo" src={logo} className='App-logo' alt='App_logo' />
        <p className="App-title"> * * Manage your queues here * * </p>
        </div>
        {/* {userLogo} */}
      </header>
      <div className="Toolbar"> 
          <nav>
              <ul>
                <li><NavLink exact to="/"        >Home</NavLink></li>
                <li><NavLink to="/routing" >Routing</NavLink></li>
                <li><NavLink to="/Customer">Customer</NavLink></li>
              </ul>
            </nav>
          </div>
      <Route path="/Customer" exact component={Customer}/>
      <body><h2>Routing</h2></body>

      </div>
      )
    }

   else if (!this.state.isSignedIn){
      return(
        <div className="App">
        <header className="App-header">
          <img id="appLogo" src={logo} className='App-logo' alt='App_logo' />
          {console.log(this.state.isSignedIn)}
          <p className="App-title"> * * Manage your queues here * * </p>
          {/* {this.getContent()} */}
          <div id="loginButton" className='loginButton'></div>
          {/* <button id="loginButton_own" className='loginButton_own' onClick={this.initializeGoogleSignIn}>Login with Google</button> */}
        </header>
      </div>
      )
    }
    

// ********** Summary view *********
    else if (this.state.isSignedIn && this.state.home && !this.state.customer) {
      summary = (
        <div>
          {this.state.title_names.map((names) => {
            //console.log(names);
            let total_size = 0;
            let temp_table = this.table_pull(names);
            Object.keys(temp_table).map((key) => {
              const size_value = temp_table[key].size;
              total_size = total_size + Number(size_value);
            })
            return (
              <Queue
                key={names}
                name={names}
                size={total_size}
                clicked={this.loadTable}
                button={this.deleteTable}
              />
            )
          })}
        </div>
      )
      let userLogo;
      if(this.state.isSignedIn && !this.state.customer){
        userLogo= <div className="loggedUser">
          <img id="appLogo" src={this.state.userLogo} className='userLogo' alt='App_logo' />
          <p>Hello, {this.state.userName}</p>
          <button className="logoutButton" onClick={()=>{this.revokeAllScopes()}} alt="logout"  >logout</button>
          </div>
      }
      
      return (
        <div className="App">
          <header className="App-header">
            <div className="appHeaderInner">
            <img id="appLogo" src={logo} className='App-logo' alt='App_logo' />
            {console.log(this.state.isSignedIn)}
            <p className="App-title"> * * Manage your queues here * * </p>
            </div>
            {userLogo}
            {/* {this.getContent()} */}
            {/* <div id="loginButton" className='loginButton' >Login with Google</div> */}
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
          {window.addEventListener('scroll', this.checkHeader)}
          {summary}
        </div>
      )
    }

// ********** Table detailed view *************
    else if (this.state.isSignedIn && !this.state.home && !this.state.customer) {
      const that = this;
      let userLogo;
      if(this.state.isSignedIn){
        userLogo= <div className="loggedUser">
          <img id="appLogo" src={this.state.userLogo} className='userLogo' alt='App_logo' />
          <p>Hello, {this.state.userName}</p>
          <button className="logoutButton" onClick={()=>{this.revokeAllScopes()}} alt="logout"  >logout</button>
          </div>
      }
      tables = (
        <div>
          {this.state.title_names.map((names) => {
            if (names === this.state.renderTable) {
              let total_size = 0;
              let wait_total_size = 0;
              let temp_table = this.table_pull(names);
              Object.keys(temp_table).map((key) => {
                const size_value = temp_table[key].size;
                total_size = total_size + Number(size_value);
              })
              let wait_temp_table = this.wait_table_pull(names);
              //console.log(typeof wait_temp_table);
              //console.log(temp_table);
              if (typeof wait_temp_table === "undefined") {
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
              else if (wait_temp_table !== null || typeof wait_temp_table !== 'undefined') {
                Object.keys(wait_temp_table).map((key) => {
                  const wait_size_value = wait_temp_table[key].size;
                  wait_total_size = wait_total_size + Number(wait_size_value);
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
          <div className="appHeaderInner">
            <img src={logo} className="App-logo" alt='App_logo' />
            <p className="App-title"> * * Manage your queues here * * </p>
          </div>
            {userLogo}
          </header>
          <br></br>
          {/* <p>You have clicked {this.state.counter['count']} number of times</p> */}
          {/*Table1*/}
          <button className="buttonCustom" onClick={this.loadTable} variant="outlined" color="primary" >Home</button>
          {/*Tables after this.*/}
          {window.addEventListener('scroll', this.checkHeader)}
          {tables}
          <Pop_up_form
            name={this.state.addNewButtonTableName}
            open={this.state.open}
            close={this.handleClose}
            name_input={this.nameInput}
            size_select={this.handleSizeButtonClick}
            active={this.state.active}
            submit={() => this.submitForm()}
            header='Fill in the customer details'
          />

          {/* Add waiting list  button*/}
        </div>
      );
    }

  }

  table_pull = (names) => {
    let temp_details;
    const docTablePersons = db.ref("/Users/"+this.state.userId+'/all_queues/' + names + '/main_list/');
    docTablePersons.on("child_added", function (snapshot) {
      const key_1 = snapshot.key;
      const value = snapshot.val();
      //console.log(names);
      //console.log(key_1);
      temp_details = { ...temp_details, [key_1]: value };
      //console.log(temp_details);
    })
    return temp_details;
  }
  wait_table_pull = (names) => {
    let temp_details;
    const docTablePersons = db.ref("/Users/"+this.state.userId+'/all_queues/' + names + '/waiting_list/');
    docTablePersons.on("child_added", function (snapshot) {
      const key_1 = snapshot.key;
      const value = snapshot.val();
      //console.log(names);
      //console.log(key_1);
      temp_details = { ...temp_details, [key_1]: value };
      //console.log(temp_details);
    })
    return temp_details;
  }

  clicked = (table, row_key) => {
    console.log('Deleted selected row:' + row_key + "from" + table);
    db.ref("/Users/"+this.state.userId+"/all_queues/" + table + "/main_list/" + row_key).remove(); // remove from firebase DB
    const { [row_key]: _, ...newMyDetails1 } = this.state.newMyDetails; //remove from local state 
    this.setState({ newMyDetails: newMyDetails1 }) // update local state after removing 
  }
  waitingClicked = (table, row_key) => {
    console.log(table);
    console.log('inside waiting clicked')
    const oldRef = db.ref("/Users/"+this.state.userId+"/all_queues/" + table + "/waiting_list/" + row_key);
    const newRef = db.ref("/Users/"+this.state.userId+"/all_queues/" + table + "/main_list/" + row_key);
    oldRef.once('value', function (snap) {
      newRef.set(snap.val(), function (error) {
        if (error && typeof (console) !== 'undefined' && console.error) { console.error(error); }
      });
    });
    db.ref("/Users/"+this.state.userId+"/all_queues/" + table + "/waiting_list/" + row_key).remove(); // remove from firebase DB
    const { [row_key]: _, ...waitMyDetails1 } = this.state.waitMyDetails; //remove from local state 
    this.setState({ waitMyDetails: waitMyDetails1 }) // update local state after removing     
  }


  reset = () => {
    //const current= Number(this.state.counter['count']); 
    db.ref("/").update({ count: 0 });
  }
  insertGapiScript(){
    const script= document.createElement('script');
    script.src='https://apis.google.com/js/api.js';
    script.onload=()=>{
      this.initializeGoogleSignIn();
      console.log(' script loaded')
    }
    document.body.appendChild(script);
  }

  initializeGoogleSignIn(){
    window.gapi.load('auth2', () => {
      //var auth2 = gapi.auth2.init();
      window.gapi.auth2.init({
        client_id: '91388112809-582c2i440llgjfbb1a73dpiflpgau1lu.apps.googleusercontent.com',
      })
      console.log('App inited')
      window.gapi.load('signin2',()=>{
        const params={
          onsuccess:(googleUser)=>{
            const profile = googleUser.getBasicProfile();
            console.log(googleUser);
            console.log('user signed in ');
            console.log("Name: " + profile.getName());
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Image URL: ' + profile.getImageUrl());
            this.setState({userLogo:profile.getImageUrl()});
            console.log('Email: ' + profile.getEmail()); 
            //console.log(auth2.currentUser.get().getBasicProfile().getName());
            this.setState({isSignedIn:true})
            this.setState({userId:profile.getId()});
            this.setState({userName:profile.getGivenName()});
            console.log(this.state.userId);
            //db.ref("/Users/"+userId+"/").push({email:userEmail})

            const that =this;
            const docRefTables = db.ref("/Users/"+that.state.userId+'/all_queues/');
            docRefTables.on("child_added", function (snapshot) {
            const table_key = snapshot.key;
            //const value = snapshot.val();
            console.log(that.state.userId);
            that.setState({ title_names: [...that.state.title_names, table_key] });
            //that.setState({ newMyDetails: { ...that.state.newMyDetails, [key_1]: value } });
      })

            db.ref("/Users/"+this.state.userId+"/profile_Details/").set({ name: profile.getGivenName(), userLogo: profile.getImageUrl(), userEmail: profile.getEmail() })
          }
        }
       window.gapi.signin2.render('loginButton', params)
      })

    })
  }

  componentDidMount() {
    const that = this;

    // const docRef = db.ref('/');
    // docRef.on('value', function (snapshot) {
    //   const value1 = snapshot.val();
    //   that.setState({ counter: value1 });
    // })

      this.insertGapiScript();
      // const docRefTables = db.ref("/Users/"+that.state.userId+'/all_queues/');
      // docRefTables.on("child_added", function (snapshot) {
      //   const table_key = snapshot.key;
      //   //const value = snapshot.val();
      //   console.log(that.state.userId);
      //   that.setState({ title_names: [...that.state.title_names, table_key] });
      //   //that.setState({ newMyDetails: { ...that.state.newMyDetails, [key_1]: value } });
      // })
    
      const docRefWaiting = db.ref("/Users/"+that.state.userId+'/all_queues/dine_in_customers/waiting_list/');
      docRefWaiting.on("child_added", function (snapshot) {
        const key_2 = snapshot.key;
        const value_wait = snapshot.val();
        that.setState({ waitMyDetails: { ...that.state.waitMyDetails, [key_2]: value_wait } });
  
      })
    
  }
}
export default App;













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

  // submitWaitingForm = () => {
  //   this.setState({ open: false });
  //   this.setState({ open2: false });
  //   const newName = document.getElementById("name_details").value;
  //   const newSize = this.state.button;//document.getElementById("size_details").value;
  //   const newPhone = document.getElementById("phone_details").value;
  //   // const myDetails={ name:newName, size:newSize, phone:newPhone}
  //   db.ref("/all_queues/dine_in_customers/waiting_list").push({ name: newName, size: newSize, phone: newPhone });
  //   this.setState({ active: '' });
  // }


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