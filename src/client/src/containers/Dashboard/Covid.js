import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {covid} from "../../components/API/Covid";
import Grid from "@material-ui/core/Grid";

class Covid extends Component {
    state = {
        confirmed: null,
        death: null,
        recovered: null
    }
    async componentDidMount() {
        let res = await covid();
        await this.setState({
            confirmed: res.data[0].confirmed,
            death: res.data[0].deaths,
            recovered: res.data[0].recovered
        });
        console.log(this.state);
    }
    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    COVID in Vietnam
                </Typography>
                <Grid container spacing = {3}>
                    <Grid item xs = {12} md = {4}>
                        <Typography component="p" variant="p" color="primary" gutterBottom>
                            Confirmed cases
                        </Typography>
                        <Typography component="p" variant="h3">
                            { this.state.confirmed }
                        </Typography>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Typography component="p" variant="p" color="primary" gutterBottom>
                            Death cases
                        </Typography>
                        <Typography component="p" variant="h3">
                            { this.state.death }
                        </Typography>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Typography component="p" variant="p" color="primary" gutterBottom>
                            Recovered cases
                        </Typography>
                        <Typography component="p" variant="h3">
                            { this.state.recovered }
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Covid;