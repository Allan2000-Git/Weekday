/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRoles } from '../slice/jobSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const names = [
    'Backend',
    'Frontend',
    'Full Stack',
    'IOS',
    'Flutter',
    'React Native',
    'Android',
    'Tech Lead',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name: string, allRoles: readonly string[], theme: Theme) {
    return {
        fontWeight:
        allRoles.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

export default function MultiSelectRole() {
    const theme = useTheme();
    const [allRoles, setAllRoles] = useState<string[]>([]);

    const dispatch = useDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValues = Array.isArray(event.target.value)
            ? event.target.value as string[]
            : [event.target.value as string];

        setAllRoles(selectedValues);
        dispatch(setRoles(allRoles));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 250 }} size="small">
                <InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
                <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={allRoles}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {
                        selected.map((value: string) => (
                            <Chip key={value} label={value} />
                        ))
                    }
                    </Box>
                )}
                MenuProps={MenuProps}
                >
                {names.map((name) => (
                    <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, allRoles, theme)}
                    >
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    );
}
