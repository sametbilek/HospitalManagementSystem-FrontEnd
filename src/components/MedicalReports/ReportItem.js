import React from 'react';

const ReportItem = ({ report }) => {
    return (
        <div>
            <h3>Report ID: {report.id}</h3>
            <p>Patient ID: {report.patientId}</p>
            <p>Doctor ID: {report.doctorId}</p>
            <p>Date: {report.reportDate}</p>
            <p>Content: {report.reportContent}</p>
        </div>
    );
};

export default ReportItem;
