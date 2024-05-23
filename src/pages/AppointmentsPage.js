import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Modal, Form } from "semantic-ui-react";
import './AppointmentsPage.css'; // CSS dosyasını import edin

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateAppointment = async () => {
    try {
      const response = await axios.put(`/appointments/${selectedAppointment.id}`, formData);
      console.log('Appointment updated:', response.data);
      setAppointments(appointments.map(appointment => 
        appointment.id === selectedAppointment.id ? { ...appointment, ...formData } : appointment
      ));
      alert('Appointment updated successfully.');
      handleCloseModal();
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('An error occurred while updating the appointment.');
    }
  };

  return (
    <div className="appointments-container">
      <h2 className="page-title">Randevular</h2>
      <Card.Group centered>
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="appointment-card">
            <Card.Content>
              <Card.Header>{`Hasta ID: ${appointment.patientId}`}</Card.Header>
              <Card.Meta>{`Doktor ID: ${appointment.doctorId}`}</Card.Meta>
              <Card.Description>
                {`Tarih: ${appointment.appointmentDate}`}
                <br />
                {`Saat: ${appointment.appointmentTime}`}
              </Card.Description>
              <Button color='blue' onClick={() => handleOpenModal(appointment)}>Güncelle</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      <Modal open={isModalOpen} onClose={handleCloseModal} centered={true}>
        <Modal.Header>Randevuyu Güncelle</Modal.Header>
        <Modal.Content>
          <Form className="modal-form">
            <Form.Field className="field">
              <label>Hasta ID</label>
              <input
                name='patientId'
                value={formData.patientId}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="field">
              <label>Doktor ID</label>
              <input
                name='doctorId'
                value={formData.doctorId}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="field">
              <label>Tarih</label>
              <input
                name='appointmentDate'
                value={formData.appointmentDate}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="field">
              <label>Saat</label>
              <input
                name='appointmentTime'
                value={formData.appointmentTime}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="cancel" onClick={handleCloseModal}>İptal</Button>
          <Button className="update" onClick={handleUpdateAppointment}>Güncelle</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default AppointmentsPage;