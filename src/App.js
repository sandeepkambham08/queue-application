import React, { Component } from 'react';
import logo from './logo.svg';
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
    {
      id: 'count',
      label: 'Count',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'phone',
      label: 'Phone',
      minWidth: 170,
      align: 'right',
    },
  ];
  
  function createData(name, count, phone) {
    return { name,count, phone };
  }
  
  const rows = [
    createData('India', 1, 9950366893),
    createData('China', 4, 9596961),
    createData('Italy',  2, 301340),
    createData('United States',  3, 9833520),
    createData('Canada', 2, 9984670),
    createData('Australia',  3, 7692024),
    createData('Germany', 4, 357578),
    createData('Ireland', 6, 70273),
    createData('Mexico', 4, 1972550),
    createData('Japan',  2, 377973),
    createData('France', 1, 640679),
    createData('United Kingdom',  3, 242495),
    createData('Russia',  4, 17098246),
    createData('Nigeria',  5, 923768),
    createData('Brazil',  1, 8515767),
  ];
  
  const useStyles = makeStyles({
    root: {
      width: '50%',
    },
    container: {
      maxHeight: 440,
    },
  });
  

class App extends Component {
  
  state={
    page:0,
    setpage:0,
    rowsPerPage:10,
    setRowsPerPage:10,
    counter:{},
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

  clicked=() => {
    console.log("Button clicked on site"); 
    //console.log(this.state.counter)
    const current= Number(this.state.counter['count']);
    console.log('this is current value : '+ current);
    db.ref("/").update({count:current+1});
    }
  reset=() => {
      console.log("Reset Button clicked"); 
      //console.log(this.state.counter)
      const current= Number(this.state.counter['count']);
      console.log('this is current value : '+ current);
      db.ref("/").update({count:0});
      }

  handleChangePage = (event, newPage) => {
      this.setState({setPage:newPage});
    };
  
  handleChangeRowsPerPage = (event) => {
      this.setState({setRowsPerPage:+event.target.value});
      this.setState({setPage:0});
    };
  render() {
    console.log('this is checking styles'+ useStyles.root);
    const{page,setPage,rowsPerPage,setRowsPerPage} = this.state; 
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('./SeekPng.com_instagram-circle-png_432878.png')} className="App-logo" alt="logo" />
          <h1 className="App-title">Manage your queues here</h1>
        </header>
    <p>You have clicked {this.state.counter['count']} number of times</p>
        <button onClick={this.clicked}>Click here</button>
        <button onClick={this.reset}>Reset count</button>
      <Paper className={useStyles.root} style={{width:"80%", padding:'2% 10%'}}>
       
      <TableContainer className={useStyles.container}>
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
        rowsPerPageOptions={[5,10,15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    );
  }
}

export default App;