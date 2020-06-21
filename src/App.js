import React, { Component } from 'react';
import logo from './book_circle.png';
import check_logo from './check_logo.png';
import cross_logo from './cross_logo.png';
import './App.css';
import * as firebase from 'firebase';
//For table //
//import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
//import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//For table end//
//For new user details pop up// 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';

//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// For new user details pop up end//

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
    counter: {},
    open: false,
    button: 0,
    newMyDetails: {
    },
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleButtonClick = ev => {
    const value = ev.currentTarget.value;
    this.setState({ button: value });
  }
  submitForm = () => {
    this.setState({ open: false });
    const newName = document.getElementById("name_details").value;
    const newSize = this.state.button;//document.getElementById("size_details").value;
    const newPhone = document.getElementById("phone_details").value;
    // const myDetails={
    //   name:newName,
    //   size:newSize,
    //   phone:newPhone
    //   }
    //console.log(myDetails);
    db.ref("/persons_list").push({ name: newName, size: newSize, phone: newPhone });
  }
  // isNumber=(evt) => {
  //   const value = (evt.target.validity.valid) ? evt.target.value : this.state.value;
  //   this.setState({ value});
  // }


  render() {
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt='App_logo' />
          <h3 className="App-title"> * * Manage your queues here * * </h3>
        </header>

        <p>You have clicked {this.state.counter['count']} number of times</p>

        <Paper style={{ width: "80%", padding: '2% 10%', boxShadow: '0 0 0', }}>
          <TableContainer className='Table_block'>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className='Table-head-own'>
                <TableRow className='Table-head-row-own'>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    key='actions'
                    align='right'
                    style={{ minWidth: '170px' }}
                  >
                    Actions
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(this.state.newMyDetails).map((key, index) => {
                  const name_value = this.state.newMyDetails[key].name;
                  const size_value = this.state.newMyDetails[key].size;
                  const phone_value = this.state.newMyDetails[key].phone;
                  return (
                    <TableRow hover key={key}>
                      {console.log(key)}
                      <TableCell key={columns.name} align='right'>
                        {name_value}
                      </TableCell>
                      <TableCell key={columns.size} align='right'>
                        {size_value}
                      </TableCell>
                      <TableCell key={columns.phone} align='right'>
                        {phone_value}
                      </TableCell>
                      <TableCell align='right'>
                        <img onClick={() => { this.clicked(key) }} src={check_logo} alt='check-in' style={{ height: '24px', width: '24px', paddingRight: '10px' }} />
                        <img onClick={this.reset} src={cross_logo} alt='cross' style={{ height: '24px', width: '24px' }} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}> Add new</Button>
        <Dialog className='PopUp' open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle className='Pop-up-header' id="form-dialog-title">

            <p>Fill the customer details below </p>
          </DialogTitle>

          <form>
            <div className='Name-details-block'>
              <TextField className='Name-details' id="name_details" label="Enter Name :" variant="outlined" style={{ margin: '5% 10% 0% 10%', }} />
            </div>

            <div className='Phone-details-block'>
              <TextField type='text' className='Phone-ddetails' id="phone_details" pattern='[0-9]*' onInput={this.isNumber} label=" Phone " variant="filled" style={{ margin: '2% 10%', }} />
            </div>

            <div className='Party-size-block'>
              <p className='Party-size-text' > * Select party size * </p>
              <div className='Buttons-block'>
                <div className='Button-first-set'>
                  <ButtonGroup id='size_details' label='Size details' name="size_details" variant="contained" >
                    <Button value="1" onClick={this.handleButtonClick}>1</Button>
                    <Button value="2" onClick={this.handleButtonClick}>2</Button>
                    <Button value="3" onClick={this.handleButtonClick}>3</Button>
                  </ButtonGroup>
                </div>
                <div className='Button-second-set'>
                  <ButtonGroup variant="contained" >
                    <Button value="4" onClick={this.handleButtonClick}>4</Button>
                    <Button value="5" onClick={this.handleButtonClick}>5</Button>
                    <Button value="6" onClick={this.handleButtonClick}>6</Button>
                  </ButtonGroup>
                </div>
                <div className='Button-third-set'>
                  <ButtonGroup variant="contained" >
                    <Button value="7" onClick={this.handleButtonClick}>7</Button>
                    <Button value="8" onClick={this.handleButtonClick}>8</Button>
                    <Button value="9" onClick={this.handleButtonClick}>>8</Button>
                  </ButtonGroup>
                </div>
              </div>


            </div>

          </form>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitForm} color="primary">
              Done
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
  clicked = (row_key) => {
    console.log(row_key);
    db.ref("/persons_list/" + row_key).remove();
    const that = this;

    const docRefPersons = db.ref('/persons_list/');
    docRefPersons.on("child_removed", function (snapshot) {
      const key_1 = snapshot.key;
      const value = snapshot.val();
      that.setState({ newMyDetails: { ...that.state.newMyDetails, [key_1]: value } });

    })

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