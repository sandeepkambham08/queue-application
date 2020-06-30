import React, { Component } from 'react';
import './Queue_list.css'

const Queue = (props) =>{
    return(
        <div className='Queue_list' onClick={props.clicked} >
    <h1 style={{background:'rgb(11, 100, 93)', color:'white'}}>{props.name}</h1> 
        Customers in line : {props.size}
        </div>

    );

}

export default Queue;