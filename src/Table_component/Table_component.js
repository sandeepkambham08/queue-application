import React, { Component } from 'react';
import check_logo from '../check_logo.png';
import cross_logo from '../cross_logo.png';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'right', },
  { id: 'size', label: 'Size', minWidth: 170, align: 'right', },
  { id: 'phone', label: 'Phone', minWidth: 170, align: 'right', },
  // { id: 'actions', label: 'Actions',  minWidth: 170, align: 'right',},
];

const table_list = (props) =>{

return ( 
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
        {Object.keys(props.name).map((key, index) => {
          const name_value  = props.name[key].name;
          const size_value  = props.name[key].size;
          const phone_value = props.name[key].phone;
          return (
            <TableRow hover key={key}>
              {/*console.log(key)*/}
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
                <img onClick={() => { props.check(key) }} src={check_logo} alt='check-in' style={{ height: '24px', width: '24px', paddingRight: '10px' }} />
                <img onClick={props.cross} src={cross_logo} alt='cross' style={{ height: '24px', width: '24px' }} />
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
<br></br> <Button variant="outlined" color="primary" onClick={props.add_new} > {props.comment} </Button> 
</Paper> ); 
}


export default table_list;