import React, { Component } from 'react';
import logo from './book_circle.png';
import './App.css';
import * as firebase from 'firebase';
//For table //
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//For table end//
//For new user details pop up// 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
  const app=firebase.initializeApp(firebaseConfig);
  const db=app.database();
  //firebase.analytics();
  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'size', label: 'Size', minWidth: 170, align: 'right', },
    { id: 'phone', label: 'Phone', minWidth: 170, align: 'right',},
  ];
  
  // const rows = [
  //   {name:'India', count:1, phone:9950366893},
  //   createData('China', 4, 8950363895),
  //   createData('Italy',  2, 7950346892),
  //   createData('United States',  3, 9618939501),
  //   createData('Canada', 2, 9503679898),
  // ];
  
  var names_list=[];
  var size_list=[];
  var phone_list=[];

  var myDetails=[];
  var rows=myDetails;
class App extends Component {
  
  state={
    page:0,
    rowsPerPage:10,
    counter:{},
    open:false,
}

handleClickOpen = () => {
  this.setState({open:true});
  console.log(names_list);
  console.log(myDetails);
};

handleClose = () => {
  this.setState({open:false});
};

submitForm=()=>{
  this.setState({open:false});
  console.log('form now submitted');
  var newName = document.getElementById("name_details").value;
  names_list.push(newName);
  var newSize = document.getElementById("size_details").value;
  size_list.push(newSize);
  var newPhone = document.getElementById("phone_details").value;
  phone_list.push(newPhone);
  myDetails.push({name:newName,size:newSize,phone:newPhone});
  console.log(myDetails);
}
  
  render() {

    const{page,rowsPerPage} = this.state; 
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Manage your queues here</h1>
        </header>
        
        <p>You have clicked {this.state.counter['count']} number of times</p>
        <button onClick={this.clicked}>Click here</button>
        <button onClick={this.reset}>Reset count</button>
        <Paper style={{width:"80%", padding:'2% 10%'}}>
        <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(rows)}
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </TableContainer>
          <TablePagination
        // rowsPerPageOptions={[5,10,15]}
        // component="div"
        // count={rows.length}
        // rowsPerPage={rowsPerPage}
        // page={page}
        // onChangePage={this.handleChangePage}
        // onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
      </Paper> 
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}> Add new</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Fill the customer details below</DialogTitle>
       <form>
        <label htmlFor="name_details">First name:</label>
        <input type="text" id="name_details" name="name_details" required></input><br></br><br></br>
        <label htmlFor="size_details">Size:</label>
        <select id="size_details" name="size_details">
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
        </select><br></br><br></br>
        <label htmlFor="phone_details">Contact no:</label>
        <input type="tel" id="phone_details" name="phone_details" pattern="[0-9]{10}" required></input>
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
  clicked=() => { const current= Number(this.state.counter['count']); db.ref("/").update({count:current+1});
}
reset=() => { const current= Number(this.state.counter['count']); db.ref("/").update({count:0});
}
  componentDidMount(){
    const that=this;
    const docRef = db.ref('/');
    docRef.on('value',function(snapshot){
      const value1= snapshot.val();
      that.setState({counter:value1});
      //console.log(that.state);
    })
  }
}

export default App;