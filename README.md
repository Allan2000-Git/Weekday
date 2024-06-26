# Candidate Application Platform

## Overview
Created a candidate application platform that allows users to view job listings, filter jobs based on various criteria, and implement infinite scroll for a seamless browsing experience. The platform should provide a user-friendly interface for viewing and applying to jobs.

## Requirements
Job Cards: Each job listing should be displayed as a card containing the following information:
- Job title
- Company name
- Location
- Job description (limited to a certain number of characters with an option to expand)
- Experience required
- Apply button/link

## Filters
Implemented filters to allow users to refine the job listings based on:
- Min experience
- Company name
- Location
- Role
- Min base pay

## Infinite Scroll
Implemented infinite scroll to load additional job listings as the user scrolls down the page. The platform fetches and display more jobs automatically without requiring the user to click on a "Load More" button.
Responsive Design

### Platform is responsive and works well on different screen sizes, including mobile devices.

## Assumptions
- Confused between location & Remote/on-site because some jobs had location as remote. Couldn't understand how to differentiate dropdowns for that, so used location & remote as the same.
- Tech stack wasn't included in the API response.

## Technology Stack
- React.js + TypeScript
- Redux Toolkit
- CSS
- Material UI

## Running the Application
- Clone the repository.
  ```
    git clone https://github.com/Allan2000-Git/Weekday
  ```
- Navigate to the project directory.
  ```
    cd weekday-jobs
  ```
- Run npm install to install dependencies.
  ```
    npm install
  ```
- Run npm start to start the development server.
  ```
    npm run dev
  ```
- Open your web browser and go to **http://localhost:3000** to view the application.

## Performance Optimization
- Used debounce technique when searching for company name.
- Used React.memo for components & useCallback hook for functions to return the memoized version of it that do not depend on props and state.
- Optimized material UI CSS styles using useMemo hook which returns a memoized value of it.

## Additional Information
Ensure that you have Node.js installed on your system before running the application.
For any issues or inquiries, please contact **allanfernandes459@gmail.com**.