/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Badge, Box, Container, Grid, Typography } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react";
import JobCard from "../components/JobCard";
import MultiSelectRole from "../components/MultiSelectRole";
import useFetchJobsData from "../hooks/useFetchJobsData";
import SingleSelectConfig from "../components/SingleSelectConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Job } from "../../types/types";
import useFilteredJobsData from "../hooks/useFilteredJobsData";
import { clearAllFilters} from "../slice/jobSlice";
import SeachCompanyInput from "../components/SeachCompanyInput";

function SearchJobs() {
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const { jobsData, hasMore, isLoading } = useFetchJobsData({page: currentPage});
    const [filteredJobsData, setFilteredJobsData] = useState<Job[]>([]);

    const selectedOptions = useSelector((state: RootState) => state.selectedOptions);

    const {filteredData} = useFilteredJobsData({jobsData});

    useEffect(() => {
        setFilteredJobsData(filteredData);
    }, [jobsData, selectedOptions]);

    // Function for infiniyte scrolling
    const handleScroll = () => {
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (isAtBottom) {
            console.log(isAtBottom)
            console.log(currentPage)
            setCurrentPage(prevPage => prevPage + 1);
        }
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore, currentPage, jobsData]);

    // Handle to clear all the filters
    const handleClearFilters = () => {
        dispatch(clearAllFilters());
    };

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Box component="div" className="header">
                <Typography variant="h1" className="main_heading">Weekday Assignment</Typography>
                <Badge badgeContent={filteredJobsData.length} color="primary">
                    Search Jobs
                </Badge>
                <Box
                sx={{display: 'flex', alignItems: 'center', gap: "10px", flexWrap: "wrap"}} 
                component="div"
                >
                    <MultiSelectRole />
                    <SingleSelectConfig />
                    <SeachCompanyInput />
                    <span className="toggle-details-btn" onClick={handleClearFilters}>Clear all filters</span>
                </Box>
            </Box>
            <Box component="div" sx={{ marginTop: 7 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        filteredJobsData.length > 0 ? 
                        filteredJobsData.map((job) => (
                            <Grid item sm={4} md={4} key={job.jdUid}>
                                <JobCard job={job} />
                            </Grid>
                        )) : (
                            <Box component="div" className="no-data">
                                <img loading="lazy" src="https://jobs.weekday.works/_next/static/media/nothing-found.4d8f334c.png" alt="No Data found" />
                                <p>No Jobs available for this category at the moment</p>
                            </Box>
                        )
                    }
                </Grid>
            </Box>
        </Container>
    )
}

export default SearchJobs