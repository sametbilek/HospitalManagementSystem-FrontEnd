import React, { useState, useEffect } from 'react';
import { getDoctors } from '../services/doctorService';
import DoctorItem from './DoctorItem';
import { addDoctors } from '../../services/doctorService';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctorName, setnewDoctorName] = useState('');
    const [newDoctorSurname, setnewDoctorSurname] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDoctors();
                setDoctors(response);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddDoctor = async () => {
        try {
            await addDoctors(newDoctorName, newDoctorSurname);
            setnewDoctorName('');
            setnewDoctorSurname('');
            alert('Doctor added successfully!');
            // Tekrar tüm hastaları getirerek güncellemek için fetch fonksiyonunu çağırabiliriz
            const response = await getDoctors();
            setDoctors(response);
        } catch (error) {
            console.error('Error adding doctor:', error);
            alert('An error occurred while adding the doctor');
        }
    };

    return (
        <div>
        <h2>Doctors</h2>
        <div>
            <input
                type="text"
                placeholder="Name"
                value={newDoctorName}
                onChange={(e) => setnewDoctorName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Surname"
                value={newDoctorSurname}
                onChange={(e) => setnewDoctorSurname(e.target.value)}
            />
            <button onClick={handleAddDoctor}>Add Doctor</button>
        </div>
        {doctors.map(doctors => (
            <DoctorItem key={doctors.id} doctor={doctor} />
        ))}
    </div>
    );
};

export default DoctorList;
