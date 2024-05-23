import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Grid, Header, Button, Icon } from 'semantic-ui-react';
import './PatientPage.css'; // CSS dosyasını import ediyoruz

function PatientPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Hasta bilgilerini çekme
    axios.get(`http://localhost:8080/api/v1/patients`)
      .then(response => {
        const patientData = response.data.find(patient => patient.id === parseInt(patientId));
        console.log('Patient data:', patientData); // Debugging için
        setPatient(patientData);
      })
      .catch(error => console.error('Error fetching patient info:', error));

    // Hasta randevularını çekme
    axios.get(`http://localhost:8080/api/v1/appointments`)
      .then(response => {
        const filteredAppointments = response.data.filter(appointment => appointment.patientId === parseInt(patientId));
        console.log('Appointments data:', filteredAppointments); // Debugging için
        setAppointments(filteredAppointments);
      })
      .catch(error => console.error('Error fetching appointments:', error));

    // Hasta raporlarını çekme
    axios.get(`http://localhost:8080/api/v1/medicalreports`)
      .then(response => {
        const filteredReports = response.data.filter(report => report.patientId === parseInt(patientId));
        console.log('Medical reports data:', filteredReports); // Debugging için
        setReports(filteredReports);
      })
      .catch(error => console.error('Error fetching medical reports:', error));
  }, [patientId]);

  const handleCreateAppointment = () => {
    navigate(`/create-appointment/${patientId}`);
  };

  const handleDeleteAppointment = (appointmentId) => {
    axios.delete(`http://localhost:8080/api/v1/appointments/${appointmentId}`)
      .then(response => {
        console.log('Appointment deleted:', response.data);
        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
      })
      .catch(error => console.error('Error deleting appointment:', error));
  };

  return (
    <div className="patient-page">
      <Header as='h2' textAlign='center' className="page-header">Hasta Bilgileri</Header>
      {patient ? (
        <Card fluid className="patient-card">
          <Card.Content>
            <Card.Header>{patient.name} {patient.surname}</Card.Header>
            <Card.Meta>{new Date(patient.dob).toLocaleDateString()} - {patient.gender}</Card.Meta>
            <Card.Description>
              <Icon name='phone' /> {patient.phonenumber}<br />
              <Icon name='home' /> {patient.adress}
            </Card.Description>
          </Card.Content>
        </Card>
      ) : (
        <p>Loading patient information...</p>
      )}
      <Header as='h3' textAlign='center' className="section-header">Randevular</Header>
      <Button primary onClick={handleCreateAppointment} className="create-appointment-button">Randevu Oluştur</Button>
      <Grid container stackable padded centered>
        {appointments.length > 0 ? appointments.map(appointment => (
          <Grid.Column key={appointment.id} width={16}>
            <Card fluid className="appointment-card">
              <Card.Content>
                <Card.Header>Randevu Tarihi {new Date(appointment.appointmentDate).toLocaleDateString()}</Card.Header>
                <Card.Meta>Randevu Saati: {appointment.appointmentTime}</Card.Meta>
                <Card.Description>
                  Doktor ID: {appointment.doctorId}
                </Card.Description>
                <Button color='red' onClick={() => handleDeleteAppointment(appointment.id)}>Randevu İptal</Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        )) : (
          <p>No appointments found.</p>
        )}
      </Grid>
      <Header as='h3' textAlign='center' className="section-header">Medical Raporlar</Header>
      <Grid container stackable padded centered>
        {reports.length > 0 ? reports.map(report => (
          <Grid.Column key={report.id} width={16}>
            <Card fluid className="report-card">
              <Card.Content>
                <Card.Header>Rapor Tarihi {report.reportDate ? new Date(report.reportDate).toLocaleDateString() : 'N/A'}</Card.Header>
                <Card.Description>
                  İçerik: {report.reportContent || 'N/A'}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        )) : (
          <p>No medical reports found.</p>
        )}
      </Grid>
    </div>
  );
}

export default PatientPage;