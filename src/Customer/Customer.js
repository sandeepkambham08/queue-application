import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import * as firebase from 'firebase';
import './Customer.css'

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

  const app1 = firebase.initializeApp(firebaseConfig,"other"); // added to use firebase queries
  const db = app1.database();

class customer extends Component {
    state={
        all_profiles:[],
        customerName:'',
    }

    checkEnterPress=(e)=>{
        if(e.keyCode===13){
            console.log(e.target.value);
            this.setState({customerName:e.target.value});
            this.searchFromDb(e.target.value);
        }
        
    }

    searchFromDb=(customerName)=>{
        db.ref("/Users/").on('child_added',function(restaurants){
            //console.log(snapshot.val());
            restaurants.forEach(function(allQueues) 
            {//console.log(child);
            allQueues.forEach(function(individual_queue){
               // console.log(child.key);
                individual_queue.forEach(function(lists){
                        lists.forEach(function(child){
                            if(child.val()!==0){
                                if(child.val().name===customerName)
                                { //console.log(child.val().phone);
                                    //console.log(child.val().size)
                                    console.log('Details of your reservation at restaurant: '+restaurants.child('/profile_Details/name').val());
                                    console.log('You are in : '+individual_queue.key+' queue');
                                    console.log('Your position in queue is :: '+child.val().position) }
                            }
                        })
                    })
                 })
            });
        })
    }

    render(){
        return (
            <div className="Testing">
                 <button className="buttonCustom" variant="outlined" color="primary" onClick={()=>{this.props.toggle()}}>Home view</button>
                <h1>testing</h1>
                <input placeholder="Type your name" onKeyUp={(e)=>{this.checkEnterPress(e)}}/>
            </div> 
        )
    }

    componentDidMount(){
        //console.log(this.props);

        const that =this;
            const docRefTables = db.ref("/Users/103367997627556847006/all_queues/");
            docRefTables.on("child_added", function (snapshot) {
            const table_key = snapshot.key;
            //const value = snapshot.val();
            console.log();
           // that.setState({ title_names: [...that.state.title_names, table_key] });
            //that.setState({ newMyDetails: { ...that.state.newMyDetails, [key_1]: value } });
      })

            db.ref("/Users/")
            .child("103367997627556847006/all_queues/reservations/")
            .child("main_list")
            .orderByChild('name')
            .equalTo('sandeep')
            .on('value',function(snapshot){
               // console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                //this will be the actual email value found
               //console.log(childData.name);
               });         
            })

            db.ref("/Users/").on('child_added',function(snapshot){
                //console.log(snapshot.val());
                //console.log(snapshot.key);
                let profiles = snapshot.key;

                //that.setState({all_profiles:[...that.state.all_profiles,profiles]});
            })
            
    }

}

export default customer; 