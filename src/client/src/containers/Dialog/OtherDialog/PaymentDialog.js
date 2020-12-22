import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

let paymentMethod = [
    {
        name: "Bank"
    }
];

class PaymentDialog extends Component {
    state = {
        payment: null
    };
    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false, "payment");
    };
    handlePaymentChange = async (event) => {
        await this.setState({ payment: event.target.value });
        console.log(this.state.payment);
    };
    handlePay = async (event) => {
        this.handleDialogClose();
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogTitle id="form-dialog-title">Payment</DialogTitle>
                    <Grid container spacing = {2}>
                        <Grid item xs = {12}>
                            <DialogContentText id="alert-dialog-description">
                                You are about to pay ${this.props.price}, please choose payment method below.
                            </DialogContentText>
                        </Grid>
                        <Grid item xs = {12}>
                            <TextField
                                autoFocus fullWidth select
                                variant       = "outlined"
                                id            = "payment"
                                label         = "Payment Method"
                                value         = { this.state.payment }
                                onChange      = { this.handlePaymentChange }>{
                                paymentMethod.map((option) => (
                                    <MenuItem key = { option.name } value = { option.name }>
                                        { option.name }
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        { (this.state.payment === 'Bank') &&
                            <React.Fragment>
                            <Grid item xs = {6}>
                                <TextField
                                    required fullWidth autoFocus
                                    name="Name"
                                    variant="outlined"
                                    id="Name"
                                    label="Name on Card" />
                            </Grid>
                            <Grid item xs = {6}>
                                <TextField
                                    required fullWidth
                                    name="Account"
                                    variant="outlined"
                                    id="Account"
                                    label="Account number"
                                    autoFocus/>
                            </Grid>
                            <Grid item xs = {6}>
                                <TextField
                                    required fullWidth autoFocus
                                    name="Valid thru"
                                    variant="outlined"
                                    id="Valid"
                                    label="Valid thru" />
                            </Grid>
                            <Grid item xs = {6}>
                                <TextField
                                    required fullWidth
                                    name="CVV"
                                    variant="outlined"
                                    id="CVV"
                                    label="CVV"
                                    autoFocus/>
                            </Grid>
                        </React.Fragment> }
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick = { this.handlePay } color = "primary" align = "right">
                        Pay
                    </Button>
                    <Button onClick = { this.handle } color = "primary" align = "right">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default PaymentDialog;
