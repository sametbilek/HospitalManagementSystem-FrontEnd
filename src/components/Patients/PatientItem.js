import React from 'react';

const PatientItem = ({ patient }) => {
    return (
        <div>
            <h3>Patient ID: {patient.id}</h3>
            <p>Name: {patient.name}</p>
            <p>Surname: {patient.surname}</p>
            <p>Date of Birth: {patient.dob}</p>
            <p>Gender: {patient.gender}</p>
            <p>Address: {patient.adress}</p>
            <p>Phone Number: {patient.phonenumber}</p>
        </div>
    );
};

export default PatientItem;
