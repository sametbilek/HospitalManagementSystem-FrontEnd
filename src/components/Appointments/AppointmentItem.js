// AppointmentItem.js
import React from 'react';

const AppointmentItem = ({ appointment }) => {
    return (
        <div>
            <h3>Appointment ID: {appointment.id}</h3>
            <p>Patient ID: {appointment.patientId}</p>
            <p>Doctor ID: {appointment.doctorId}</p>
            <p>Date: {appointment.appointmentDate}</p>
            <p>Time: {appointment.appointmentTime}</p>
        </div>
    );
};

export default AppointmentItem;
