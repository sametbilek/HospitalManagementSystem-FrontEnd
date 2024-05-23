import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Icon, Grid, Header, Button, Modal, Form } from 'semantic-ui-react';
import './DoctorsPage.css'; // CSS dosyasını import edin

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    workplace: '',
    profession: ''
  });

  useEffect(() => {
    axios.get('/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const handleDeleteDoctor = (doctorId) => {
    axios.delete(`/doctors/${doctorId}`)
      .then(response => {
        console.log('Doctor deleted:', response.data);
        setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
      })
      .catch(error => {
        console.error('Error deleting doctor:', error);
        if (error.response && error.response.status === 400) {
          alert('This doctor cannot be deleted because there are appointments linked to this doctor.');
        } else {
          alert('An error occurred while deleting the doctor.');
        }
      });
  };

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      surname: doctor.surname,
      workplace: doctor.workplace,
      profession: doctor.profession
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

const handleUpdateDoctor = () => {
  axios.put(`/doctors/${selectedDoctor.id}`, formData)
    .then(response => {
      console.log('Doctor updated:', response.data);
      setDoctors(doctors.map(doctor => doctor.id === selectedDoctor.id ? { ...doctor, ...formData } : doctor));
      alert('Doctor updated successfully.');
      handleCloseModal();
    })
    .catch(error => {
      console.error('Error updating doctor:', error);
      alert('An error occurred while updating the doctor.');
    });
};

  return (
    <div className="doctors-container">
      <Header as='h2' textAlign='center' className="page-header">Doktorlar</Header>
      <Grid container stackable padded centered>
        <Grid.Row columns={4}>
          {doctors.map(doctor => (
            <Grid.Column key={doctor.id}>
              <Card raised fluid className="doctor-card">
                <Card.Content>
                  <Card.Header>{`${doctor.name} ${doctor.surname}`}</Card.Header>
                  <Card.Meta>{`Uzmanlık Alanı: ${doctor.profession}`}</Card.Meta>
                  <Card.Description>
                    <Icon name='hospital' className="icon-hospital" />
                    {` Çalıştığı Hastane: ${doctor.workplace}`}
                  </Card.Description>
                  <Button color='red' onClick={() => handleDeleteDoctor(doctor.id)}>Sil</Button>
                  <Button color='blue' onClick={() => handleOpenModal(doctor)}>Güncelle</Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>Doktoru Güncelle</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label='Ad'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            <Form.Input
              label='Soyad'
              name='surname'
              value={formData.surname}
              onChange={handleChange}
            />
            <Form.Input
              label='Çalışma Yeri'
              name='workplace'
              value={formData.workplace}
              onChange={handleChange}
            />
                        <Form.Input
              label='Uzmanlık'
              name='profession'
              value={formData.profession}
              onChange={handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleCloseModal}>İptal</Button>
          <Button color='green' onClick={handleUpdateDoctor}>Güncelle</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default DoctorsPage;
