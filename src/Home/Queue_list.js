import React, { Component } from 'react';
import './Queue_list.css'

const Queue = (props) =>{
    return(
        <div className='Queue_block'>
        <button className='tableDeleteButton' onClick={()=>{props.button(props.name)}}>X</button>
        <div className='Queue_list' onClick={()=>{props.clicked(props.name)}} >
        <h2>{props.name}</h2>
        
        Customers in line : {props.size}
        
        </div>
        {/* <button className='tableDeleteButton' onClick={()=>{props.button(props.name)}}>delete</button> */}
        </div>
    );

}

export default Queue;