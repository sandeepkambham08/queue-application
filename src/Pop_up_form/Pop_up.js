import React, {component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';



const Pop_up_form = (props) =>{

    return(
        <Dialog className='PopUp' open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
        <DialogTitle className='Pop-up-header' id="form-dialog-title">
          <p>Fill the customer details below </p>
        </DialogTitle>

        <form>
          <div className='Name-details-block'>
            <TextField className='Name-details' id="name_details" label="Enter Name :"  autoFocus variant="outlined" style={{ margin: '5% 10% 0% 10%', }} />
          </div>

          <div className='Phone-details-block'>
            <TextField type='text' className='Phone-ddetails' id="phone_details" pattern='[0-9]*' label=" Phone " variant="filled" style={{ margin: '2% 10%', }} />
          </div>

          <div className='Party-size-block'>
            <p className='Party-size-text' > * Select party size ! * </p>
            <div className='Buttons-block'>
              <div className='Button-first-set'>
                <ButtonGroup id='size_details' label='Size details' name="size_details" variant="contained" >
                  <Button value="1" onClick={props.size_select} id="button_1" className={`check1 ${props.active==="button_1"? 'active':''}`} >1</Button>
                  <Button value="2" onClick={props.size_select} id="button_2" className={`check1 ${props.active==="button_2"? 'active':''}`} >2</Button>
                  <Button value="3" onClick={props.size_select} id="button_3" className={`check1 ${props.active==="button_3"? 'active':''}`} >3</Button>
                </ButtonGroup>
              </div>
              <div className='Button-second-set'> 
                <ButtonGroup variant="contained" >
                  <Button value="4" onClick={props.size_select} className={`check1 ${props.active==="button_4"? 'active':''}`} id="button_4" >4</Button>
                  <Button value="5" onClick={props.size_select} className={`check1 ${props.active==="button_5"? 'active':''}`}id="button_5"  >5</Button>
                  <Button value="6" onClick={props.size_select} className={`check1 ${props.active==="button_6"? 'active':''}`} id="button_6" >6</Button>
                </ButtonGroup>
              </div>
              <div className='Button-third-set'>
                <ButtonGroup variant="contained" >
                  <Button value="7" onClick={props.size_select} className={`check1 ${props.active==="button_7"? 'active':''}`} id="button_7" >7</Button>
                  <Button value="8" onClick={props.size_select} className={`check1 ${props.active==="button_8"? 'active':''}`} id="button_8" >8</Button>
                  <Button value="9" onClick={props.size_select} className={`check1 ${props.active==="button_>9"? 'active':''}`} id="button_>9" >>8</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </form>

        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={props.submit} color="primary">
            Done
          </Button>

        </DialogActions>
      </Dialog>
    );
}


export default Pop_up_form;