import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../slice/jobSlice';
import { RootState } from '../app/store';
import { useCallback } from 'react';
import { debounce } from 'lodash';

function SeachCompanyInput() {
    const dispatch = useDispatch();
    const selectedOptions = useSelector((state: RootState) => state.selectedOptions);
    const { searchQuery } = selectedOptions;

    const handleSearchChange = useCallback(
        debounce((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            dispatch(setSearchQuery(event.target.value));
        }, 300),
        [dispatch]
    );

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
            value={searchQuery}
            onChange={handleSearchChange}
            className="menu-item" 
            id="outlined-basic" 
            label="Search Company Name" 
            variant="outlined" 
            size="small" 
            aria-label="Search Company Name" 
            />
        </Box>
    )
}

export default SeachCompanyInput