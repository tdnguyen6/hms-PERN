import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

class LoadingDialog extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                    }
                }}>
                <DialogContent>
                    <CircularProgress size={60} style={{'color': 'white'}}/>
                </DialogContent>
            </Dialog>
        )
    }
}

export default LoadingDialog;