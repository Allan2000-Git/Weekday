/* eslint-disable @typescript-eslint/no-unused-vars */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { setExperience, setLocation, setMinimumBasePaySalary } from '../slice/jobSlice';
import { useCallback, useState } from 'react';
import { configOptions } from '../constants/configOptions';

export default function SingleSelectConfig() {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState<{ [key: string]: string }>({});

    const handleChange = useCallback((event: SelectChangeEvent) => {
        const { name, value } = event.target;

        // store the input as key-value pair. Eg: {exp: 3, salary: 60, location: Bangalore}
        setSelectedOption(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'exp') {
            dispatch(setExperience(Number(value)));
        } else if (name === 'salary') {
            // since value is stored as 10L, so we need to remove characters from it
            const parsedValue = Number(value.replace(/[^0-9]/g, ''));
            dispatch(setMinimumBasePaySalary(parsedValue));
        } else if(name === 'location') {
            dispatch(setLocation(value));
        }
    },[dispatch]);

    return (
        <>
            {configOptions.map((option, index) => (
                <FormControl key={index} sx={{ m: 1, minWidth: `${option.width}px` }} size="small">
                    <InputLabel id={`select-label-${index}`}>{option.label}</InputLabel>
                    <Select
                        labelId={`select-label-${index}`}
                        value={selectedOption[option.key] || ''}
                        onChange={handleChange}
                        label={option.label}
                        name={option.key}
                    >
                        <MenuItem className="menu-item" value="">
                            <em>None</em>
                        </MenuItem>
                        {option.values.map((value, index) => (
                            <MenuItem className="menu-item" key={index} value={value} aria-label={value.toString()}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}
        </>
    );
}
