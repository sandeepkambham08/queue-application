import React, { Component } from 'react';
import './Queue_list.css'
import { Backdrop } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const Queue = (props) =>{
    
    if(props.name!==undefined){
    return(
        <div className='Queue_block' >
        {/* <div className='Queue_block'> */}
        {/* <button className='tableDeleteButton' onClick={()=>{props.button(props.name)}}>X</button>
        <div className='Queue_list' onClick={()=>{props.clicked(props.name)}} >
        <h2 className='Queue_name'>
            <br></br>{props.name}</h2>
        
        Customers in line : {props.size}
        
        </div> */}
        <button className='tableDeleteButton' onClick={()=>{props.button(props.name)}}>X</button>
        <Card variant="outlined" className='Queue_list'>
        <CardContent style={{padding:'0px'}} onClick={()=>{props.clicked(props.name)}}>
        <Typography  className='Queue_name' gutterBottom>
        {props.name}
        </Typography>
        <Typography variant="body2" component="p">
        Customers in line : 
          <br />
        {props.size}
        </Typography>
      </CardContent>
    </Card>
        </div>
    );
    }
    if(props.name===undefined){
        return(
            <div className='Queue_block' >
            <Card variant="outlined" className='Queue_list'>
            <CardContent style={{padding:'0px'}} onClick={props.add_new_table}>
            <Typography  className='Queue_name' gutterBottom style={{fontSize:"30px", backgroundColor: "rgba(26, 25, 25, 0.677)"}}>
            +
            </Typography>
            <Typography variant="body2" component="p" style={{fontSize:"15px",color:"gray"}}>
            Create new Queue
              <br />
            {props.size}
            </Typography>
          </CardContent>
        </Card>
            </div>
        );
        }

}

export default Queue;