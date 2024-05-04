import { Box, Button, Dialog, DialogContent, DialogContentText, DialogProps, DialogTitle, Typography } from "@mui/material";
import { Job } from "../../types/types";
import { useEffect, useRef, useState } from "react";

interface IJobProps {
    job: Job;
}

function JobCard({job}:IJobProps) {

    return (
        <Box className="job-card" component="div">
            <div className="company-container">
                <img className="company-logo" src={job.logoUrl} alt={job.companyName} />
                <div className="company-details">
                    <Typography variant="h2">{job.companyName}</Typography>
                    <Typography variant="h3">{job.jobRole}</Typography>
                    <p>{job.location}</p>
                </div>
            </div>
            <Typography variant="body2">
                Estimated Salary: 
                {
                    job.minJdSalary && job.maxJdSalary && ` ₹${job.minJdSalary} - ${job.maxJdSalary}LPA `
                }
                {
                    !job.minJdSalary && ` upto ₹${job.maxJdSalary}LPA `
                }
                {
                    !job.maxJdSalary && ` starting ₹${job.maxJdSalary}LPA `
                }
                <span>✅</span>
            </Typography>
            <Box className="about-company-wrapper" component="div">
                <Typography className="about-company-heading" variant="body1">About Company</Typography>
                <Box className="about-company-container" component="div">
                    <p>{job.jobDetailsFromCompany && job.jobDetailsFromCompany.slice(0, 300) + "..."}</p>
                    <ScrollDialog jobDescription={job.jobDetailsFromCompany} />
                </Box>
            </Box>
            <Box className="company-details">
                {
                    job.minExp ? (
                        <>
                        <Typography variant="h2">Minimum Experience</Typography>
                        <Typography variant="h3">{job.minExp} years</Typography>
                        </>
                    ):(
                        <Typography variant="h2">No Experience required</Typography>
                    )
                }
            </Box>
            <Button sx={{
                    '&:hover': {
                        background: 'rgb(85, 239, 196)',
                    },
                }} 
                className="apply-btn" 
                variant="contained"
            >
                ⚡ Easy Apply
            </Button>
        </Box>
    )
}

function ScrollDialog({jobDescription}:{
    jobDescription: string
}) {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
            descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <span className="toggle-details-btn" onClick={handleClickOpen('paper')}>Show more</span>
            <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="md"
            >
            <DialogTitle sx={{textAlign: "center", fontSize: "24px", fontWeight: "bold"}} id="scroll-dialog-title">Job Description</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
                >
                    <Typography sx={{textAlign: "left"}} className="main_heading" variant="h1">About Company</Typography>
                {jobDescription}
                </DialogContentText>
            </DialogContent>
            </Dialog>
        </>
    );
}

export default JobCard