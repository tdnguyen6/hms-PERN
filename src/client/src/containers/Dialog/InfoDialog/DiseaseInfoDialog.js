import React, {Component} from 'react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Divider} from "@material-ui/core";

class DiseaseInfoDialog extends Component {
    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false);
    }

    render() {
        return (
            <Dialog
                open    =   { this.props.open }
                onClose = { this.handleDialogClose }
                aria-describedby = "alert-dialog-description">
                <DialogContent>
                    <DialogTitle id="form-dialog-title">
                        { this.props.disease ? this.props.disease.charAt(0).toUpperCase() + this.props.disease.slice(1) : '' }
                    </DialogTitle>
                    {/*<DialogContentText id="alert-dialog-description">*/}
                        { this.props.descriptions }
                    {/*</DialogContentText>*/}
                    <Divider style={{marginTop: '2rem'}}/>
                    <DialogTitle id="form-dialog-title">
                        Suggested Treatment
                    </DialogTitle>
                    {/*<DialogContentText id="alert-dialog-description">*/}
                        { this.props.medical_service } - { this.props.price }
                    {/*</DialogContentText>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick = { this.handleDialogClose } color="primary">
                        Got it!
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DiseaseInfoDialog;
