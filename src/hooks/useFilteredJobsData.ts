import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Job } from "../../types/types";

interface IFilterJobsProps {
    jobsData: Job[];
}

function useFilteredJobsData({jobsData}:IFilterJobsProps) {
    const selectedOptions = useSelector((state: RootState) => state.selectedOptions);

    const filteredData = jobsData.filter((job: Job) => {
        const { roles, minExp, minJdSalary, location } = selectedOptions;
        
        // Filter by roles
        const lowerCaseRoles = roles.map(role => role.toLowerCase());
        const lowerCaseJobRole = job.jobRole.toLowerCase();
        const hasMatchingRoles = roles.length === 0 || lowerCaseRoles.includes(lowerCaseJobRole);

        // Filter by minimum experience and minimum salary
        const minExpNumber = Number(minExp);
        const minJdSalaryNumber = Number(minJdSalary);

        const filterByExperience = minExpNumber === 0 || job.minExp === minExpNumber;
        const filterByMinBasePaySalary = minJdSalaryNumber === 0 || job.minJdSalary >= minJdSalaryNumber || job.maxJdSalary >= minJdSalaryNumber;

        // Filter by location (remote or office)
        const isRemote = location.length === 0 || job.location.toLowerCase().includes(location);
        const isOffice = !isRemote;
        
        // return all the jobs that match the condition
        return hasMatchingRoles && filterByExperience && filterByMinBasePaySalary && (isRemote || isOffice);
    });

    return {filteredData};
}

export default useFilteredJobsData