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

let symptoms = [
    {
        id: 1,
        checked: false,
        name: "abdominal pain"
    },
    {
        id: 2,
        checked: false,
        name: "chest pain"
    },
    {
        id: 3,
        checked: false,
        name: "cough"
    },
    {
        id: 4,
        checked: false,
        name: "headache"
    },
    {
        id: 5,
        checked: false,
        name: "diarrhea"
    },
    {
        id: 6,
        checked: false,
        name: "difficulty swallowing"
    },
    {
        id: 7,
        checked: false,
        name: "dizzy"
    },
    {
        id: 8,
        checked: false,
        name: "eye problems"
    },
    {
        id: 9,
        checked: false,
        name: "foot or ankle pain"
    },
    {
        id: 10,
        checked: false,
        name: "fever"
    },
    {
        id: 11,
        checked: false,
        name: "sore throat"
    },
    {
        id: 12,
        checked: false,
        name: "sneezing"
    },
    {
        id: 13,
        checked: false,
        name: "nausea"
    },
    {
        id: 14,
        checked: false,
        name: "nasal congestion"
    },
    {
        id: 15,
        checked: false,
        name: "urinary problems"
    },
    {
        id: 16,
        checked: false,
        name: "vomit"
    },
    {
        id: 17,
        checked: false,
        name: "fatigue"
    },
    {
        id: 18,
        checked: false,
        name: "runny nose"
    },
    {
        id: 19,
        checked: false,
        name: "body aches"
    },
    {
        id: 20,
        checked: false,
        name: "toothache"
    },
    {
        id: 21,
        checked: false,
        name: "wheezing"
    },
    {
        id: 22,
        checked: false,
        name: "loss of appetite"
    },
    {
        id: 23,
        checked: false,
        name: "abnormal heart rate"
    },
    {
        id: 24,
        checked: false,
        name: "nervous, restless or tense"
    },
    {
        id: 26,
        checked: false,
        name: "panic"
    },
    {
        id: 27,
        checked: false,
        name: "hyperventilation"
    },
    {
        id: 28,
        checked: false,
        name: "feeling weak or tired"
    },
    {
        id: 29,
        checked: false,
        name: "avoid things that trigger anxiety"
    },
    {
        id: 25,
        checked: false,
        name: "abnormal sweating"
    },
    {
        id: 30,
        checked: false,
        name: "feelings of helplessness and hopelessness"
    },
    {
        id: 31,
        checked: false,
        name: "loss of interest in daily activities"
    },
    {
        id: 32,
        checked: false,
        name: "insomnia"
    },
    {
        id: 40,
        checked: false,
        name: "weight fluctuations"
    },
    {
        id: 41,
        checked: false,
        name: "easily offended"
    },
    {
        id: 42,
        checked: false,
        name: "difficult to trust others"
    },
    {
        id: 43,
        checked: false,
        name: "cannot cope with criticism"
    },
    {
        id: 44,
        checked: false,
        name: "assign harmful meanings to other people’s remarks"
    },
    {
        id: 45,
        checked: false,
        name: "be always on the defensive"
    },
    {
        id: 46,
        checked: false,
        name: "not be able to compromise"
    },
    {
        id: 47,
        checked: false,
        name: "find it difficult, if not impossible, to ‘forgive and forget’"
    },
    {
        id: 48,
        checked: false,
        name: "overly suspicious"
    },
    {
        id: 49,
        checked: false,
        name: "find relationships difficult "
    },
    {
        id: 50,
        checked: false,
        name: "believe in unfounded ‘conspiracy theories’"
    },
    {
        id: 51,
        checked: false,
        name: "not be able to confide in anyone"
    },
    {
        id: 53,
        checked: false,
        name: "muffling of sounds"
    },
    {
        id: 54,
        checked: false,
        name: "difficulty understanding speeches"
    },
    {
        id: 55,
        checked: false,
        name: "trouble hearing consonants"
    },
    {
        id: 56,
        checked: false,
        name: "feeling volume is too low"
    },
    {
        id: 57,
        checked: false,
        name: "difficulty in expressing thoughts"
    },
    {
        id: 58,
        checked: false,
        name: "difficulty processing information"
    },
    {
        id: 59,
        checked: false,
        name: "difficulty understanding others"
    },
    {
        id: 60,
        checked: false,
        name: "shortened attention span"
    },
    {
        id: 61,
        checked: false,
        name: "memory loss"
    },
    {
        id: 62,
        checked: false,
        name: "swelling and tenderness around the injury"
    },
    {
        id: 63,
        checked: false,
        name: "bruising"
    },
    {
        id: 64,
        checked: false,
        name: "deformity"
    }
];
/*
Children of NewAppointmentDialog.
In NewAppointmentDialog, when user click disease textfield, this dialog is triggered.
This query all symptoms (API1) and displays as list of checkbox,
This also request disease prediction after sending all checked symptoms (API2)
 */
class SymptomsDialog extends Component {
    state = {
        listOfSymptom: ''
    };
    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false);
        console.log(this.state.listOfSymptom);
        this.setState({
            listOfSymptom: ''
        });
    }

    handleCheckBoxChange = (event) => {
        let tmpListOfSymptom = this.state.listOfSymptom;
        if (event.target.checked && !tmpListOfSymptom.includes(event.target.id)) {
            tmpListOfSymptom += event.target.id + ' ';
        }
        this.setState({
            listOfSymptom: tmpListOfSymptom
        });
    }

    handleSave = () => {
        this.props.close(false);
    }



    render() {
        let splitter = Math.ceil(symptoms.length / 3);
        let symptomColumns = [symptoms.slice(0, splitter),
                              symptoms.slice(splitter, 2 * splitter),
                              symptoms.slice(2 * splitter)];
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
                    <Grid container fullWidth spacing = {12}>{
                        symptomColumns.map(symptomColumn => {
                            return (<Grid item xs>{
                                symptomColumn.map((symptom) => {
                                   return (<FormControlLabel
                                            control = {<Checkbox
                                                name = { symptom.name }
                                                id = { symptom.id }
                                                onChange = { this.handleCheckBoxChange }
                                                color = "primary"/>}
                                            label = { symptom.name } />);
                                    }
                                )
                            }</Grid>);
                        })
                    }
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
