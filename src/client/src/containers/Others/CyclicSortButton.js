import React, {useEffect, useState} from "react";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const style = theme => ({
    icon: {
    },
    iconContainer: {
        width: '24px',
        height: '24px'
    }
});

const CyclicSortButton = props => {
    const { classes } = props;

    const [iconState, setIconState] = useState(0);

    useEffect(() => {
        (async () => {
            switch (iconState) {
                case 1:
                    await props.sortTools.updateCriteria('add', props.columnID, 'asc');
                    break;
                case 2:
                    await props.sortTools.updateCriteria('add', props.columnID, 'dsc');
                    break;
                default:
                    await props.sortTools.updateCriteria('del', props.columnID);
            }
            await props.sortTools.sort();
        })()
    }, [iconState]);

    const handleClick = async () => {
        await setIconState(s => (s + 1) % 3);
    };

    return (
        <TableSortLabel
            active = { iconState === 1 || iconState === 2 }
            direction = { iconState === 2 ? 'dsc' : 'asc'}
            onClick = { handleClick }>
            { props.children }
        </TableSortLabel>
    );
}

export default withStyles(style)(CyclicSortButton);
