import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Grid, Header, Segment, Icon } from 'semantic-ui-react';
import './DoctorPatientsPage.css'; // CSS dosyasını import ediyoruz

function DoctorPatientsPage() {
  const { doctorId } = useParams();
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Tüm hastaları çekme
    axios.get(`http://localhost:8080/api/v1/patients`)
      .then(response => {
        console.log('Patients data:', response.data); // Debugging için
        setPatients(response.data);
      })
      .catch(error => console.error('Error fetching patients:', error));

    // Tüm raporları çekme
    axios.get(`http://localhost:8080/api/v1/medicalreports`)
      .then(response => {
        console.log('Medical reports data:', response.data); // Debugging için
        setReports(response.data);
      })
      .catch(error => console.error('Error fetching medical reports:', error));
  }, []);

  // Doktor ID'sine göre raporları filtreleme
  const filteredReports = reports.filter(report => report.doctorId === parseInt(doctorId));
  console.log('Filtered Reports:', filteredReports); // Debugging için

  // Doktorun hastalarını filtreleme
  const doctorPatientIds = [...new Set(filteredReports.map(report => report.patientId))];
  console.log('Doctor Patient IDs:', doctorPatientIds); // Debugging için
  const filteredPatients = patients.filter(patient => doctorPatientIds.includes(patient.id));
  console.log('Filtered Patients:', filteredPatients); // Debugging için

  return (
    <div className="doctor-patients-page">
      <Header as='h2' textAlign='center' className="page-header">Hastalarım ID: {doctorId}</Header>
      <Grid container stackable padded centered>
        {filteredPatients.length > 0 ? filteredPatients.map(patient => (
          <Grid.Column key={patient.id} width={16}>
            <Card fluid className="patient-card">
              <Card.Content>
                <Card.Header>{patient.name} {patient.surname}</Card.Header>
                <Card.Meta>{new Date(patient.dob).toLocaleDateString()} - {patient.gender}</Card.Meta>
                <Card.Description>
                  <Icon name='phone' /> {patient.phonenumber}<br />
                  <Icon name='home' /> {patient.adress}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Header as='h4'>Medical Raporlarım</Header>
                {filteredReports.filter(report => report.patientId === patient.id).map(report => (
                  <Segment key={report.id} className="report-segment">
                  <p><strong>Rapor Tarihi:</strong> {new Date(report.reportDate).toLocaleDateString()}</p>
                  <p><strong>Rapor İçeriği:</strong> {report.reportContent}</p>
                </Segment>
              ))}
            </Card.Content>
          </Card>
        </Grid.Column>
      )) : (
        <p>No patients found for this doctor.</p>
      )}
    </Grid>
  </div>
);
}

export default DoctorPatientsPage;