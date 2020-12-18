import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import {diseaseBySymptom} from "../../../components/API/DiseaseBySymptom";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LoadingDialog from "./LoadingDialog";

// why do you need the below line?
// import index from "recharts/demo/component";

/*
Children of NewAppointmentDialog.
In NewAppointmentDialog, when user click disease textfield, this dialog is triggered.
This query all symptoms (API1) and displays as list of checkbox,
This also request disease prediction after sending all checked symptoms (API2)
 */

const style = (theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
        height: '100%',
    },
});

class SymptomsDialog extends Component {
    state = {
        searchInput: '',
        listOfSymptom: [],
        checkedListOfSymptom: [],
        checkedListOfSymptomID: [],
        filteredListOfSymptom: this.props.symptom,
        loading: false
    };
    handleDialogClose = async () => {
        await this.setState({
            searchInput: '',
            listOfSymptom: [],
            checkedListOfSymptom: [],
            checkedListOfSymptomID: [],
            filteredListOfSymptom: [],
            loading: false
        });
        // send close state back to parent: AppointmentTable
        this.props.close(false, "symptoms");
    }
    handleDiseasePredict = async () => {
        try {
            await this.setState({ loading: true });
            // console.log('disease predict test', this.state.checkedListOfSymptomID);
            let res = await diseaseBySymptom(this.state.checkedListOfSymptomID);
            // console.log('disease by symptom res', res);
            await this.props.disease(res);
        } finally {
            await this.setState({ loading: false });
        }
    }
    handleSearch = async (event) => {
        let input = event.target.value;
        await this.setState({
            searchInput: input
        });
        if (this.state.searchInput) {
            const filtered = this.props.symptom.filter((symptom) => {
                return symptom.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
            });
            await this.setState({
                filteredListOfSymptom: filtered
            });
        } else {
            await this.setState({
                filteredListOfSymptom: []
            });
        }
    }
    handleChipClick = async (chip) => {
        let selectedChip = this.props.symptom.find((symptom) => symptom.id === chip.id);
        let checkedChip = this.state.checkedListOfSymptom;
        let checkedChipID = this.state.checkedListOfSymptomID;
        if (!checkedChip.includes(selectedChip)) {
            checkedChip.push(selectedChip);
            checkedChipID.push(selectedChip.id);
        }
        await this.setState({
            checkedListOfSymptom: checkedChip,
            checkedListOfSymptomID: checkedChipID
        });

        // console.log('click', checkedChip);
    };
    handleChipDelete = async (chip) => {
        let checkedChip = this.state.checkedListOfSymptom;
        let checkedChipID = this.state.checkedListOfSymptomID;
        // console.log('delete', checkedChip);
        let selectedChip = checkedChip.find((symptom) => symptom.id === chip.id);
        let indexOfSelectedChip = checkedChip.indexOf(selectedChip);
        if (indexOfSelectedChip > -1) {
            checkedChip.splice(indexOfSelectedChip, 1);
            checkedChipID.splice(indexOfSelectedChip, 1);
        }
        await this.setState({
            checkedListOfSymptom: checkedChip,
            checkedListOfSymptomID: checkedChipID
        });

        // console.log('delete', checkedChip);
    };
    handleSave = async () => {
        await this.handleDiseasePredict();
        await this.handleDialogClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Dialog
                    fullWidth
                    open={this.props.open}
                    onClose={this.handleDialogClose}
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="form-dialog-title">Symptom Log</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            What's your symptoms babe?
                        </DialogContentText>
                        <Grid container spacing={3}>
                            {/* Checked Symptoms */}
                            <Grid item xs className={classes.root}>{
                                this.state.checkedListOfSymptom.map((symptom) => (
                                        <span key={symptom.id} style={{margin: '0.5rem 0'}}>
                                          <Chip
                                              clickable
                                              color="secondary"
                                              label={<Typography element='p' variant='body2' style={{whiteSpace: 'normal'}}>{symptom.name}</Typography>}
                                              onDelete={() => this.handleChipDelete(symptom)}
                                              onClick={() => this.handleChipDelete(symptom)}
                                              className={classes.chip}
                                          />
                                        </span>
                                    )
                                )
                            }</Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required fullWidth autoFocus
                                    name="Symptom"
                                    variant="outlined"
                                    id="Symptom"
                                    label="Symptom"
                                    value={this.state.searchInput}
                                    onChange={this.handleSearch}/>
                            </Grid>
                            <Grid item xs className={classes.root}>{
                                this.state.filteredListOfSymptom.map((symptom) => (
                                        <span key={symptom.id} style={{margin: '0.5rem 0'}}>
                                            <Chip
                                                clickable
                                                color="primary"
                                                label={<Typography element='p' variant='body2' style={{whiteSpace: 'normal'}}>{symptom.name}</Typography>}
                                                onClick={() => this.handleChipClick(symptom)}
                                                className={classes.chip}
                                            />
                                        </span>
                                    )
                                )
                            }</Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSave} color="primary" align="right">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <LoadingDialog open = {this.state.loading}/>
            </React.Fragment>

        );
    }
}

export default withStyles(style, {withTheme: true})(SymptomsDialog);
