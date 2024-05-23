import React from 'react';

const DoctorItem = ({ doctor }) => {
    return (
        <div>
            <h3>Doctor ID: {doctor.id}</h3>
            <p>Name: {doctor.name}</p>
            <p>Surname: {doctor.surname}</p>
            <p>Profession: {doctor.profession}</p>
            <p>Workplace: {doctor.workplace}</p>
        </div>
    );
};

export default DoctorItem;
