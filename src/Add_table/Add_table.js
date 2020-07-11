import React, {component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
//import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';



const Add_table = (props) =>{
    
    return(
        <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className='Pop-up-header' id="alert-dialog-title">{"Enter the new table details"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <TextField className='Name-details' label="Table Name :" id="newTableName" variant="outlined" style={{ margin: '5% 10% 0% 10%', }} autoFocus/>
           
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={props.submit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  
}


export default React.memo(Add_table);