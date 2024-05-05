/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from 'react'
import {Job} from "../../types/types"

interface IFetchProps {
    page: number;
}

function useFetchJobsData({page}:IFetchProps) {
    const [jobsData, setJobsData] = useState<Job[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchJobsData = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const body = JSON.stringify({
                "limit": 10,
                "offset": (pageNumber - 1) * 10
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
            setJobsData(prevData => {
                const existingIds = new Set(prevData.map(job => job.jdUid));
                const newData = result.jdList.filter((job: Job) => !existingIds.has(job.jdUid));
                return [...prevData, ...newData];
            });
            setHasMore(result.jdList.length > 0);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobsData(page);
    }, [page]);
    
    return { isLoading, error, jobsData, hasMore }
}

export default useFetchJobsData