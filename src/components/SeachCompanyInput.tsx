import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../slice/jobSlice';

function SeachCompanyInput() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuery(event.target.value);
        dispatch(setSearchQuery(event.target.value))
    };

    return (
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField 
            value={query}
            onChange={handleSearchChange}
            className="menu-item" 
            id="outlined-basic" 
            label="Search Company Name" 
            variant="outlined" 
            size="small" />
        </Box>
    )
}

export default SeachCompanyInput