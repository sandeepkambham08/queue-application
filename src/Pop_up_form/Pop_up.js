import React, { Component } from 'react';


import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import '../Pop_up_form/Pop_up.css'


class Pop_up_form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      formIsValid:false,
    }
  }
  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = false;

    //Name
    if(!fields["name"]){
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if(typeof fields["name"] !== "undefined"){
      if(!fields["name"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["name"] = "Only letters!!";
      }      	
    }
    //Phone
    if(!fields["phone"]){
      formIsValid = false;
      errors["phone"] = "Cannot be empty";
   }

   if(typeof fields["phone"] !== "undefined"){
      if(!fields["phone"].match(/^[0-9]+$/) || !fields["phone"].match(/^[0-9]{9,15}$/)){
         formIsValid = false;
         errors["phone"] = "Only numbers";
      }        
   }
   if(typeof fields["phone"] !== "undefined"){
    if(fields["phone"].match(/^[0-9]+$/) && !fields["phone"].match(/^[0-9]{9,15}$/)){
       formIsValid = false;
       errors["phone"] = "Mininum length : 9 digits ";
    }        
 }


   if(errors.name ===undefined && errors.phone=== undefined){
     console.log('inside no errors');
     console.log(errors);
     this.setState({formIsValid:true})

   }

    this.setState({errors: errors});
    return formIsValid;
  }

  contactSubmit(e){
    e.preventDefault();
    this.handleValidation()

  }

  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  render(){
    if(this.props.name!==''){
      return(
          <Dialog className={this.props.name} open={this.props.open} onClose={this.props.close} aria-labelledby="form-dialog-title">
          <DialogTitle className='Pop-up-header' id="form-dialog-title"> 
          <p>{this.props.header} </p>
          </DialogTitle>
          {/*{console.log(this.props.name)}*/}
          <form>
            <div className='Name-details-block'>
              <TextField className='Name-details' id={(this.props.name)+"_name_details"} label="Enter Name :" 
              variant="outlined" 
              style={{ margin: '5% 10% 0% 10%', }} autoFocus 
              required
              // onBlur={(e)=>{this.props.nameInputChange(e)}}
              
              onBlur={()=>{this.handleValidation()}} 
              onChange={this.handleChange.bind(this, "name")} 
              />
             {console.log((this.props.name)+"_name_details")}
             <label className="error" >{this.state.errors["name"]}</label> 
            </div>
  
            {/* <div className='Phone-details-block'>
              <TextField type='text' className='Phone-details' 
              id={(this.props.name)+"_phone_details"} 
              pattern='[0-9]*' 
              label=" Phone " 
              variant="filled" 
              style={{ margin: '2% 10%', }} />
            </div> */}
            <div className="Phone-details-block">
            <TextField ref="phone" type="text"
            className='Phone-details' 
            id={(this.props.name)+"_phone_details"} 
            onBlurCapture={()=>{this.handleValidation()}} 
            onChange={this.handleChange.bind(this, "phone")} 
            label=" Phone " 
            variant="filled" 
            style={{ margin: '5% 10% 0% 10%' }}
            />
             <label className="error">{this.state.errors["phone"]}</label>  
            </div>
           
  
            <div className='Party-size-block'>
              <p className='Party-size-text' > * Select party size ! * </p>
              <div className='Buttons-block'>
                <div className='Button-first-set'>
                  <ButtonGroup id='size_details' label='Size details' name="size_details" variant="contained" >
                    <Button value="1" onClick={this.props.size_select} id={(this.props.name)+"button_1"} className={`check1 ${this.props.active===(this.props.name)+"button_1"? 'active':''}`} >1</Button>
                    <Button value="2" onClick={this.props.size_select} id={(this.props.name)+"button_2"} className={`check1 ${this.props.active===(this.props.name)+"button_2"? 'active':''}`} >2</Button>
                    <Button value="3" onClick={this.props.size_select} id={(this.props.name)+"button_3"} className={`check1 ${this.props.active===(this.props.name)+"button_3"? 'active':''}`} >3</Button>
                  </ButtonGroup>
                </div>
                <div className='Button-second-set'> 
                  <ButtonGroup variant="contained" >
                    <Button value="4" onClick={(e)=>{this.props.size_select(e)}} className={`check1 ${this.props.active===(this.props.name)+"button_4"? 'active':''}`} id={(this.props.name)+"button_4"} >4</Button>
                    <Button value="5" onClick={this.props.size_select} className={`check1 ${this.props.active===(this.props.name)+"button_5"? 'active':''}`} id={(this.props.name)+"button_5"}  >5</Button>
                    <Button value="6" onClick={this.props.size_select} className={`check1 ${this.props.active===(this.props.name)+"button_6"? 'active':''}`} id={(this.props.name)+"button_6"} >6</Button>
                  </ButtonGroup>
                </div>
                <div className='Button-third-set'>
                  <ButtonGroup variant="contained" >
                    <Button value="7" onClick={this.props.size_select} className={`check1 ${this.props.active===(this.props.name)+"button_7"? 'active':''}`} id={(this.props.name)+"button_7"} >7</Button>
                    <Button value="8" onClick={this.props.size_select} className={`check1 ${this.props.active===(this.props.name)+"button_8"? 'active':''}`} id={(this.props.name)+"button_8"} >8</Button>
                    <Button value="9" onClick={this.props.size_select} className={`check1 ${this.props.active===(this.props.name)+"button_>9"? 'active':''}`} id={(this.props.name)+"button_>9"} >>8</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </form>
  
          <DialogActions>
            <Button onClick={this.props.close}  color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.submit} color="primary" disabled={!this.state.formIsValid}>
             Done
            </Button>
  
          </DialogActions>
        </Dialog>
      );
    }
    else return null;
  }
    
}


export default React.memo(Pop_up_form);