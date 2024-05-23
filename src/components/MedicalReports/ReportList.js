import React, { useState, useEffect } from 'react';
import { getReports } from '../services/reportService';
import ReportItem from './ReportItem';

const ReportList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReports();
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Medical Reports</h2>
            {reports.map(report => (
                <ReportItem key={report.id} report={report} />
            ))}
        </div>
    );
};

export default ReportList;
