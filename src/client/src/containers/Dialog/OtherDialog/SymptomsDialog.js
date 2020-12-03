import React, { Component }                     from 'react';

import Grid                               from "@material-ui/core/Grid";
import FormControlLabel                   from "@material-ui/core/FormControlLabel";
import Checkbox                           from "@material-ui/core/Checkbox";

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import {diseaseBySymptom} from "../../../components/API/DiseaseBySymptom";
import TextField from "@material-ui/core/TextField";

/*
Children of NewAppointmentDialog.
In NewAppointmentDialog, when user click disease textfield, this dialog is triggered.
This query all symptoms (API1) and displays as list of checkbox,
This also request disease prediction after sending all checked symptoms (API2)
 */
class SymptomsDialog extends Component {
    state = {
        listOfSymptom: '',
        searchInput: '',
        checkedListOfSymptom: [],
        filteredListOfSymptom: [],
    };
    handleDialogClose = async () => {
        await this.setState({ listOfSymptom: '' });
        // send close state back to parent: AppointmentTable
        this.props.close(false, "symptoms");
    }
    handleDiseasePredict = async () => {
        try {
            await this.props.loading(true);
            console.log('loading');
            console.log('disease predict test', this.state.listOfSymptom);
            let res = await diseaseBySymptom(this.state.listOfSymptom);
            console.log('disease by symptom res', res);
            await this.props.disease(res);
        } finally {
            await this.props.loading(false);
            console.log('loaded');
        }
    }
    handleCheckBoxChange = async (event) => {
        let tmpListOfSymptom = this.state.listOfSymptom;
        let tmpCheckedListOfSymptom = this.state.checkedListOfSymptom;
        if (event.target.checked && !tmpListOfSymptom.includes(event.target.id)) {
            tmpListOfSymptom += event.target.id + ' ';
            tmpCheckedListOfSymptom.push({id: event.target.id, name: event.target.name});
        }
        await this.setState({
            listOfSymptom: tmpListOfSymptom,
            checkedListOfSymptom: tmpCheckedListOfSymptom
        });
    }
    handleSearch = async (event) => {
        let input = event.target.value;
        await this.setState({
            searchInput: input
        });
        const filtered = this.props.symptom.filter((symptom) => {
            return symptom.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
        });
        await this.setState({
            filteredListOfSymptom: filtered
        })
        console.log(this.state.filteredListOfSymptom);
    }
    handleSave = async () => {
        await this.handleDiseasePredict();
        await this.handleDialogClose();
    }

    render() {
        let splitter = Math.ceil(this.props.symptom.length / 3);
        let symptomColumns = [this.props.symptom.slice(0, splitter),
                              this.props.symptom.slice(splitter, 2 * splitter),
                              this.props.symptom.slice(2 * splitter)];
        return (
            <Dialog
                maxWidth={"xl"}
                open              = { this.props.open }
                onClose           = { this.handleDialogClose }
                aria-describedby  = "alert-dialog-description">
                <DialogContent>
                    <DialogTitle id="form-dialog-title">Symptom Log</DialogTitle>
                    <DialogContentText id = "alert-dialog-description">
                        What's your symptoms babe?
                    </DialogContentText>
                    <Grid container fullWidth spacing = {12}>
                        <Grid item xs = {12}>
                            <TextField
                                required fullWidth autoFocus
                                autoComplete  = "name"
                                name          = "Name"
                                variant       = "outlined"
                                id            = "Name"
                                label         = "Name"
                                value         = { this.state.searchInput }
                                onChange      = { this.handleSearch }/>
                        </Grid>
                        {/* Checked Symptoms */}
                        <Grid item xs>{
                            this.state.checkedListOfSymptom.map((symptom) => {
                                    return (<FormControlLabel
                                        control = { <Checkbox
                                            name = { symptom.name }
                                            id = { symptom.id }
                                            onChange = { this.handleCheckBoxChange }
                                            color = "primary"/> }
                                        label = { symptom.name }
                                        style = {{ display: "inline-block", width: "100%" }}/>);
                                }
                            )
                        }</Grid>
                        <Grid item xs>{
                            this.state.filteredListOfSymptom.map((symptom) => {
                                    return (<FormControlLabel
                                        control = { <Checkbox
                                            name = { symptom.name }
                                            id = { symptom.id }
                                            onChange = { this.handleCheckBoxChange }
                                            color = "primary"/> }
                                        label = { symptom.name }
                                        style = {{ display: "inline-block", width: "100%" }}/>);
                                }
                            )
                        }</Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick = { this.handleSave } color = "primary" align = "right">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default SymptomsDialog;
