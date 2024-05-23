// AppointmentList.js
import React, { useState, useEffect } from 'react';
import { getAllAppointments } from '../services/appointmentService';
import AppointmentItem from './AppointmentItem';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllAppointments();
                console.log("app : ", response)
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Appointments</h2>
            {appointments.map(appointment => (
                <AppointmentItem key={appointment.id} appointment={appointment} />
            ))}
        </div>
    );
};

export default AppointmentList;
