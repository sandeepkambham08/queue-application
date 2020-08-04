import React, { Component } from 'react';
import check_logo from '../Media/check_logo.png';
import cross_logo from '../Media/cross_logo.png';
import alert_logo from '../Media/bell_icon.png';
import call_logo from '../Media/call_icon.png';
import calling_logo from '../Media/calling_icon.gif';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import swal from '@sweetalert/with-react'



import Button from '@material-ui/core/Button';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'right', },
  { id: 'size', label: 'Size', minWidth: 170, align: 'right', },
  { id: 'phone', label: 'Phone', minWidth: 170, align: 'right', },
  // { id: 'actions', label: 'Actions',  minWidth: 170, align: 'right',},
];

const table_list = (props) =>{
  if (props.details === null || typeof props.details === 'undefined')
  {
    console.log(typeof props.details)
    return(
      <div>
        Table already deleted please go back
      </div>
    )
  }
  else if(props.details !== null || typeof props.details !== 'undefined'){
    console.log(typeof props.details)
    return ( 
      <div>
      <Paper style={{ width: "80%", padding: '2% 10%', boxShadow: '0 0 0', }}>
      <p> * * {props.title} * * </p>
        <TableContainer className='Table_block'>
          <Table stickyHeader aria-label="sticky table">
            {/* <TableHead className='stickyTry'> */}
            
            <TableRow className='Table-head-row-own'>
            <TableCell
                  key='position'
                  align='right'
                  style={{ minWidth: '70px' }}
                >
                Position
              </TableCell>
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
              <TableCell
                  key='alert'
                  align='right'
                  style={{ minWidth: '70px' }}
                >
              Alerts
              </TableCell>
              
             </TableRow>
             
            {/* </TableHead> */}
             <TableBody>
              {Object.keys(props.details).map((key, index) => {
                const name_value  = props.details[key].name;
                const size_value  = props.details[key].size;
                const phone_value = props.details[key].phone;
                const position_value = props.details[key].position;
                if(size_value!==undefined){
                  //console.log("size value :: :: "+size_value);
                  props.customerPositionUpdater(props.title,key,index+1);
                }
                return (
                  <TableRow hover key={key}>
                    {/*{console.log(key)}*/}
                    <TableCell key={columns.position} align='right'>
                    {index+1}{position_value}
                    </TableCell>
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
                      <img onClick={() => { props.check(props.title,key,index+1) }}  src={check_logo} alt='check-in' style={{cursor:'pointer', height: '24px', width: '24px', paddingRight: '10px' }} />
                      <img onClick={props.cross} src={cross_logo} alt='cross' style={{ cursor:'pointer',height: '24px', width: '24px' }} />
                    </TableCell>
                    <TableCell align='right'>
                      <img onClick={()=>{swal('Sending email alert',{timer:1000,})}} src={alert_logo} alt='check-in' style={{ cursor:'pointer',height: '24px', width: '24px', paddingRight: '10px' }} />
                      <img onClick={()=>{swal(<div><p>Calling :- {name_value}</p> <img src={calling_logo} style={{ height: '40px', width: '40px', paddingRight: '10px'}}/></div>,{buttons: false,timer:2500,})}} src={call_logo} alt='cross' style={{ cursor:'pointer',height: '24px', width: '24px' }} />
                    </TableCell> 
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <div>
      <button className={`check ${this.state.active==="first"? 'active':''}`} id="first" >Hello World</button>
      <button className={`check ${this.state.active==="second"? 'active':''}`}id="second" >Good Bye World</button>
        </div> */}
      <p>{props.sizeComment} {props.size}</p> 
      <br></br> <Button variant="outlined" color="primary" onClick={props.add_new} value={props.title} > {props.comment} </Button> 
      
      
      </Paper>
      </div>
      ); 
  }

}


export default React.memo(table_list);

// <Table_own
// name={this.state.newMyDetails}
// check={this.clicked}
// cross={this.reset}
// add_new={this.handleClickOpen}
// comment='+Add new'
// size={this.totalSizeValue()}
// sizeComment='Total customers in line: '
//     /> 
// {/* Add new button*/}
//  <Pop_up_form
//     open={this.state.open}
//     close={this.handleClose}
//     size_select={this.handleSizeButtonClick}
//     active={this.state.active}
//     submit={this.submitForm}
//     header='Fill in the customer details'
//   />

// {/*Table2*/}
// <Table_own
// name={this.state.waitMyDetails}
// check={this.waitingClicked}
// cross={this.reset}
// add_new={this.handleClickOpen2}
// comment='+Waiting list'
// size={this.totalWaitingSizeValue()}
// sizeComment='Total customers waiting line: '
//     />

// {/* Add waiting list button*/}
//   <Pop_up_form
//     open={this.state.open2}
//     close={this.handleClose2}
//     size_select={this.handleSizeButtonClick}
//     active={this.state.active}
//     submit={this.submitWaitingForm}
//     header= {<p> Waiting list - 
//     fill in the customer details</p>}
// />