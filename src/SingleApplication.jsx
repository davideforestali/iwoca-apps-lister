import React from "react";
import { getFormattedDate } from "./helpers";
import styles from "./SingleApplication.module.css";

const SingleApplication = ({ application }) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        {application.email}
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        {application.loan_amount} £
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {getFormattedDate(application.date_created)}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {getFormattedDate(application.expiry_date)}
      </div>
    </div>
  );
};

export default SingleApplication;
