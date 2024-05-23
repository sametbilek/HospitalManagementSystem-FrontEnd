// PatientList.js
import React, { useState, useEffect } from 'react';
import { getPatients, addPatient } from '../services/patientService';
import PatientItem from './PatientItem';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [newPatientName, setNewPatientName] = useState('');
    const [newPatientSurname, setNewPatientSurname] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPatients();
                setPatients(response);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddPatient = async () => {
        try {
            await addPatient(newPatientName, newPatientSurname);
            setNewPatientName('');
            setNewPatientSurname('');
            alert('Patient added successfully!');
            // Tekrar tüm hastaları getirerek güncellemek için fetch fonksiyonunu çağırabiliriz
            const response = await getPatients();
            setPatients(response);
        } catch (error) {
            console.error('Error adding patient:', error);
            alert('An error occurred while adding the patient');
        }
    };

    return (
        <div>
            <h2>Patients</h2>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={newPatientSurname}
                    onChange={(e) => setNewPatientSurname(e.target.value)}
                />
                <button onClick={handleAddPatient}>Add Patient</button>
            </div>
            {patients.map(patient => (
                <PatientItem key={patient.id} patient={patient} />
            ))}
        </div>
    );
};

export default PatientList;
