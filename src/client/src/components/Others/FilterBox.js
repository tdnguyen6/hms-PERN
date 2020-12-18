import React, {useEffect, useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Divider, MenuItem, Select} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const style = theme => ({
    filterBtn: {
        margin: theme.spacing(3, 0, 2),
    },

    divider: {
        margin: '1rem 0'
    },

    byContainer: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '2rem'
        },
    },

    checkBoxContainer: {
        // [theme.breakpoints.down('sm')]: {
            marginTop: '1rem'
        // },
    }
});

const FilterBox = props => {
    const {classes} = props;

    const [keyword, changeKW] = useState('');
    const [column, setColumn] = useState('');
    const [matchCase, setMatchCase] = useState(false);
    const [matchCell, setMatchCell] = useState(false);
    const [defaultRows, setDefaultRows] = useState();

    useEffect(() => {
        (async () => {
            await props.loadingHandle(true);
            await setDefaultRows(await props.defaultRows());
            await props.loadingHandle(false);
        })()

    },[]);

    useEffect(() => {
        if (props.columns.length && !column)
            setColumn(props.columns[0].id);
    }, [props.columns]);

    const filter = async event => {
        let filteredRows;
        if (matchCase && matchCell) {
            filteredRows = defaultRows.filter(r => (r[column] + '') === keyword);
        } else if (matchCase && !matchCell) {
            filteredRows = defaultRows.filter(r => (r[column] + '').includes(keyword));
        } else if (!matchCase && matchCell) {
            filteredRows = defaultRows.filter(r => (r[column] + '').toUpperCase() === keyword.toUpperCase());
        } else {
            filteredRows = defaultRows.filter(r => (r[column] + '').toUpperCase().includes(keyword.toUpperCase()));
        }
        await props.updateRowHandle(filteredRows);
    }

    const handleKWChange = async event => {
        await changeKW(event.target.value);
    }

    const handleColumnChange = async event => {
        await setColumn(event.target.value);
    }

    const handleCheckMatchCase = async event => {
        await setMatchCase(event.target.checked);
    }

    const handleCheckMatchCell = async event => {
        await setMatchCell(event.target.checked);
    }

    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>Search by Column</Typography>
            <Grid container>
                <Grid item container xs={12} alignItems='space-between'>
                    <Grid item xs={12} md={8}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Keywords"
                            autoFocus
                            required
                            value={keyword}
                            onChange={handleKWChange}
                        />
                    </Grid>
                    <Grid container item xs={12} md={4} className={classes.byContainer}>
                        <Grid item xs={3} container justify='center' alignItems='center'>
                            <Typography component="body1" variant="body1" align={"center"} gutterBottom>by</Typography>
                        </Grid>
                        <Grid item xs={9} container justify='center' alignItems='center'>
                            <Select
                                value={column}
                                onChange={handleColumnChange}
                                label="Column"
                                // className={classes.selectEmpty}
                                fullWidth
                                required
                            >
                                {props.columns.map(c =>
                                    <MenuItem value={c.id}>
                                        <em>{c.label}</em>
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} container justify='flex-end' alignItems='center'>
                    <Grid xs={6} md={4} item justify='center' alignItems='center' container className={classes.checkBoxContainer}>
                        <Grid item xs={12} sm={6} container justify='center' alignItems='center' wrap='nowrap'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={matchCell}
                                        onChange={handleCheckMatchCell}
                                        color="primary"
                                    />
                                }
                                label="Match cell"
                            />
                        </Grid>
                        <Grid item xs={12}  sm={6} container justify='center' alignItems='center' wrap='nowrap'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={matchCase}
                                        onChange={handleCheckMatchCase}
                                        color="primary"
                                    />
                                }
                                label="Match case"
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={6} md={3} item justify='center' alignItems='center' container>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.filterBtn}
                            onClick={filter}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider className={classes.divider}/>
        </>
    );
}

export default withStyles(style)(FilterBox);
