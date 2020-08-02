import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import classes from './Customer.css'

class customer extends Component {
    render(){
        return (
            <div className={classes.Testing}>
                <h1>testing</h1>
            </div> 
        )
    }

    componentDidMount(){
        console.log(this.props);
    }

}

export default customer; 