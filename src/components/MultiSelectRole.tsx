/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoles } from '../slice/jobSlice';
import { RootState } from '../app/store';

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
    'NLP',
    'Web3',
    'SRE',
    'Data Engineer',
    'Legal',
    'HR',
    'Finance',
    'Hardware',
    'Mechanical',
    'Systems',
    'Management',
    'Marketing'
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

    const dispatch = useDispatch();
    const selectedOptions = useSelector((state: RootState) => state.selectedOptions);
    const { roles } = selectedOptions;

    const handleChange = (event: any) => {
        // store the input as an array. Eg: Frontend, Backend etc..
        const selectedValues = Array.isArray(event.target.value)
            ? event.target.value as string[]
            : [event.target.value as string];
        
        dispatch(setRoles(selectedValues));
    };

    const memoizedRenderValue = useMemo(() => (
        (selected: string[]) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value: string) => (
                    <Chip key={value} label={value} />
                ))}
            </Box>
        )
    ), []);

    return (
        <div>
            <FormControl sx={{ m: 1, width: 250 }} size="small">
                <InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
                <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={roles}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={memoizedRenderValue}
                MenuProps={MenuProps}
                >
                {names.map((name) => (
                    <MenuItem
                    className="menu-item"
                    key={name}
                    value={name}
                    style={getStyles(name, roles, theme)}
                    >
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    );
}
