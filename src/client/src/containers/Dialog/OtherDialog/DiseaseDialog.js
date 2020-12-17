import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from "@material-ui/core/Chip";
import {withStyles} from "@material-ui/core/styles";
import DiseaseInfoDialog from "../InfoDialog/DiseaseInfoDialog";

const style = (theme) => ({
    chip: {
        margin: theme.spacing(0.5),
    },
});

class DiseaseDialog extends Component {
    state = {
        diseaseInfoDialog: false,
        diseaseInfo: null,
    }
    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false, "disease");
    }
    handleInfoDialogClose = async (close) => {
        this.setState({
            diseaseInfoDialog: close
        })
    }
    handleChipClick = async (disease) => {
        await this.setState({
            diseaseInfoDialog: true,
            diseaseInfo: disease
        });
        console.log(this.state.diseaseInfo);
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Dialog
                    open = { this.props.open }
                    onClose = { this.handleDialogClose }
                    aria-describedby = "alert-dialog-description">
                    <DialogContent>
                        <DialogTitle id="form-dialog-title">Possible Disease</DialogTitle>
                        <DialogContentText id="alert-dialog-description">
                            {
                                this.props.diseaseList.map((disease) => (
                                    <Chip
                                        clickable
                                        label = { disease.disease }
                                        color = "primary"
                                        className = { classes.chip }
                                        onClick = { () => this.handleChipClick(disease) } />
                                ))
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = { this.handleDialogClose } color="primary">
                            Got it!
                        </Button>
                    </DialogActions>
                </Dialog>
                <DiseaseInfoDialog open = { this.state.diseaseInfoDialog }
                               close = { this.handleInfoDialogClose }
                               { ...this.state.diseaseInfo } />
            </React.Fragment>
        );
    }
}

export default withStyles(style, {withTheme: true})(DiseaseDialog);
