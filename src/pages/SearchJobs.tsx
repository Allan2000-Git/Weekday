/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Container, Grid } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react";
import JobCard from "../components/JobCard";
import {Job} from "../../types/types"

function SearchJobs() {
    const [jobsData, setJobsData] = useState<Job[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJobsData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const body = JSON.stringify({
                    "limit": 10,
                    "offset": 0
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body
                };

                const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setJobsData(result.jdList);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchJobsData();
    }, []);

    console.log(jobsData)

    return (
        <Container maxWidth="lg">
            Search Jobs
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