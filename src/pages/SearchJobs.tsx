/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Container, Grid } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react";
import JobCard from "../components/JobCard";
import MultiSelectRole from "../components/MultiSelectRole";
import useFetchJobsData from "../hooks/useFetchJobsData";
import SingleSelectConfig from "../components/SingleSelectConfig";

function SearchJobs() {
    const [currentPage, setCurrentPage] = useState(1);

    const {
        jobsData,
        hasMore,
        isLoading,
        error
    } = useFetchJobsData({page: currentPage});

    const handleScroll = async () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore, currentPage, jobsData]);

    return (
        <Container maxWidth="lg">
            Search Jobs
            <Box
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}} 
            component="div"
            >
                <MultiSelectRole />
                <SingleSelectConfig />
            </Box>
            <Box component="div" sx={{ marginTop: 7 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        jobsData.map((job) => (
                            <Grid item sm={4} md={4} key={job.jdUid}>
                                <JobCard job={job} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Container>
    )
}

export default SearchJobs