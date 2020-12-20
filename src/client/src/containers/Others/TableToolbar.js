import React, {useEffect, useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Divider, MenuItem, Select} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SearchIcon from '@material-ui/icons/Search';
import {fade} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

const style = theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
});

const TableToolbar = props => {
    const {classes} = props;

    const [keyword, changeKW] = useState('');
    const [defaultRows, setDefaultRows] = useState();

    useEffect(() => {
        (async () => {
            // try {
                await props.loadingHandle(true);
                await setDefaultRows(await props.defaultRows());
        })()
    },[]);
    useEffect(() => {
        (async () => {
            if (defaultRows) {
                props.updateRowHandle(defaultRows);
                await props.loadingHandle(false);
            }
        })()
    }, [defaultRows]);

    const filter = async (event) => {
        let filteredDuplicatedRows = [];
        props.columns.map(column => {
            console.log(column.id);
            let filteredRow = defaultRows.filter(row => (row[column.id] + '').toLowerCase().includes(keyword.toLowerCase()));
            filteredDuplicatedRows = [...filteredDuplicatedRows, ...filteredRow];
            console.log(filteredRow, filteredDuplicatedRows);
        });
        // remove duplicated
        const filteredRows = filteredDuplicatedRows.reduce((result, row) =>{
            return (result.includes(row)) ? result : [...result, row];
        }, []);

        await props.updateRowHandle(filteredRows);
    }

    const handleEnterKW = async event => {
        if (event.keyCode === 13) {
            await filter(event);
        }
    }
    const handleKWChange = async event => {
        await changeKW(event.target.value);
    }

    return (
        <Toolbar>
            <Typography className={classes.title} variant="h6" color="primary" noWrap>
                {props.title}
            </Typography>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon onClick={filter}/>
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                    value={keyword}
                    onChange={handleKWChange}
                    onKeyDown={handleEnterKW}
                />
            </div>
        </Toolbar>
    );
}

export default withStyles(style)(TableToolbar);
