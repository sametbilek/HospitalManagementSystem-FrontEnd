import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Icon, Grid, Segment, Header, Button, Modal, Form } from 'semantic-ui-react';
import './PatientsPage.css'; // CSS dosyasını import edin

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    dob: '',
    gender: '',
    adress: '',
    phonenumber: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const handleDeletePatient = (patientId) => {
    axios.delete(`http://localhost:8080/api/v1/patients/${patientId}`)
      .then(response => {
        console.log('Patient deleted:', response.data);
        setPatients(patients.filter(patient => patient.id !== patientId));
      })
      .catch(error => console.error('Error deleting patient:', error));
  };

  const handleOpenModal = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      name: patient.name,
      surname: patient.surname,
      dob: patient.dob,
      gender: patient.gender,
      adress: patient.adress,
      phonenumber: patient.phonenumber
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdatePatient = () => {
    axios.put(`http://localhost:8080/api/v1/patients/${selectedPatient.id}`, formData)
      .then(response => {
        console.log('Patient updated:', response.data);
        setPatients(patients.map(patient => patient.id === selectedPatient.id ? { ...patient, ...formData } : patient));
        alert('Patient updated successfully.');
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error updating patient:', error);
        alert('An error occurred while updating the patient.');
      });
  };

  return (
    <div className="patients-container">
      <Header as='h2' textAlign='center' className="page-header">Hastalar</Header>
      <Grid container stackable padded centered>
        <Grid.Row columns={3}>
          {patients.map(patient => (
            <Grid.Column key={patient.id}>
              <Segment raised className="custom-segment">
                <Card fluid className="custom-card">
                  <Card.Content>
                    <Card.Header className="card-header">{`${patient.name} ${patient.surname}`}</Card.Header>
                    <Card.Meta className="card-meta">
                      <span className='date'>{`Doğum Tarihi: ${patient.dob}`}</span>
                    </Card.Meta>
                    <Card.Meta className="card-meta">
                      <span>{`Cinsiyet: ${patient.gender}`}</span>
                    </Card.Meta>
                    <Card.Description className="card-description">
                      <Icon name='phone' className="icon-style" />
                      {`Telefon Numarası: ${patient.phonenumber}`}
                      <br />
                      <Icon name='home' className="icon-style" />
                      {`Adres: ${patient.adress}`}  
                    </Card.Description>
                    <Button color='red' onClick={() => handleDeletePatient(patient.id)}>Sil</Button>
                    <Button color='blue' onClick={() => handleOpenModal(patient)}>Güncelle</Button>
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>

      <Modal open={isModalOpen} onClose={handleCloseModal} centered={true}>
        <Modal.Header>Hastayı Güncelle</Modal.Header>
        <Modal.Content>
          <Form className="modal-form">
            <Form.Field className="field">
              <label>Ad</label>
              <input
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="field">
              <label>Soyad</label>
              <input
                name='surname'
                value={formData.surname}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="field">
              <label>Doğum Tarihi</label>
              <input
                name='dob'
                value={formData.dob}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="field">
              <label>Cinsiyet</label>
              <input
                name='gender'
                value={formData.gender}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="field">
              <label>Adres</label>
              <input
                name='adress'
                value={formData.adress}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="field">
              <label>Telefon Numarası</label>
              <input
                name='phonenumber'
                value={formData.phonenumber}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="cancel" onClick={handleCloseModal}>İptal</Button>
          <Button className="update" onClick={handleUpdatePatient}>Güncelle</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default PatientsPage;