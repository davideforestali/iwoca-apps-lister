import React, { useEffect, useState } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from './ui/Button/Button'

const networkErrorMsg = 'Something went wrong'
const initialPageToLoad = 1

const Applications = () => {
  const [applications, setApplications] = useState(null)
  const [networkError, setNetworkError] = useState(null)
  const [currentPageLoaded, setCurrentPageLoaded] = useState(initialPageToLoad)

  useEffect(() => {
    fetchApplicationsHandler(initialPageToLoad)
  }, [])

  useEffect(() => {
    fetchApplicationsHandler(currentPageLoaded)
  }, [currentPageLoaded])

  const fetchApplicationsHandler = (pageNumber) => {
    fetch(`http://localhost:3001/api/applications?_page=${pageNumber}&_limit=5`)
      .then(response => {
        if (!response.ok) {throw new Error (networkErrorMsg)}
        return response.json()
      })
      .then(data => {
        applications
        ? setApplications([...applications, ...data])
        : setApplications(data)
      })
      .catch(error => setNetworkError(error))
  }

  const loadMoreHandler = () => {
    setCurrentPageLoaded((prev) => prev + 1)
  }

  let applicationsToRender = <p aria-label='loading message' role='alert'>Loading...</p>

  if (networkError) {
    applicationsToRender = <p aria-label='error message' role='alert'>{networkErrorMsg}</p>
  }

  if (applications) {
    applicationsToRender = applications.map(app => {
      return (
        <li key={app.id}>
          <SingleApplication application={app} />
        </li>
      )
    })
  }

  return (
    <div className={styles.Applications}>
      <ul>
       {applicationsToRender}
      </ul>
      <Button onClick={loadMoreHandler}>Load more</Button>
    </div>
  );
};

export default Applications;
