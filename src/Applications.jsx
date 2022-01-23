import React, { useEffect, useState } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from './ui/Button/Button'
import Spinner from "./ui/Spinner/Spinner";

const networkErrorMsg = 'Something went wrong'
const initialPageToLoad = 1

const Applications = () => {
  const [applications, setApplications] = useState(null)
  const [networkError, setNetworkError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(false)
      })
      .catch(error => {
        setNetworkError(error)
        setIsLoading(false)
      })
  }

  const loadMoreHandler = () => {
    setIsLoading(true)
    setCurrentPageLoaded((prev) => prev + 1)
  }

  let applicationsToRender = <Spinner className='fixed' />
  let loadMoreButtonToRender = null
  const loadMoreButtonModifier = isLoading ? styles.hidden : ''

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

    loadMoreButtonToRender = (
      <>
        <Button onClick={loadMoreHandler} className={loadMoreButtonModifier}>Load more</Button>
        {isLoading && <Spinner />}
      </>
    )
  }

  return (
    <div className={styles.Applications}>
      <ul className={styles.list}>
       {applicationsToRender}
      </ul>
      <div className={styles.buttonBlock}>
        {loadMoreButtonToRender}
      </div>
    </div>
  );
};

export default Applications;
