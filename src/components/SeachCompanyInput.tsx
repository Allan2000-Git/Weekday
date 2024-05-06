import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../slice/jobSlice';
import { RootState } from '../app/store';
import { debounce } from 'lodash';

function SeachCompanyInput() {
    const dispatch = useDispatch();
    const selectedOptions = useSelector((state: RootState) => state.selectedOptions);
    const { searchQuery } = selectedOptions;

    // use of debounce to limit the number of network calls made to the api to fetch the data
    const betterFunction = debounce((query: string) => dispatch(setSearchQuery(query)), 300);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {    
        betterFunction(event.target.value);
    }

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