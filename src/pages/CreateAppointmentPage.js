import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button, Header } from 'semantic-ui-react';
import './CreateAppointmentPage.css'; // CSS dosyasını import ediyoruz

function CreateAppointmentPage() {
  const { patientId } = useParams();
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/api/v1/appointments', {
            patientId,
            doctorId,
            appointmentDate,
            appointmentTime
        });
        console.log('Appointment created:', response.data);
        alert('Appointment created successfully!');
    } catch (error) {
        if (error.response && error.response.status === 400) {
            alert('An appointment already exists for this doctor at the specified date and time.');
        } else {
            console.error('Error creating appointment:', error);
            alert('Error creating appointment. Please try again.');
        }
    }
};

  return (
    <div className="create-appointment-page">
      <Header as='h2' textAlign='center' className="page-header">Randevu Oluştur</Header>
      <Form onSubmit={handleSubmit} className="appointment-form">
        <Form.Field>
          <label>Doktor ID</label>
          <input
            placeholder='Doctor ID'
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Randevu Tarihi</label>
          <input
            type='date'
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Randevu Zamanı</label>
          <input
            type='time'
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </Form.Field>
        <Button type='submit' primary>Oluştur</Button>
      </Form>
    </div>
  );
}

export default CreateAppointmentPage;