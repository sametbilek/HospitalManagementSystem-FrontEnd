import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form } from 'semantic-ui-react';
import './MedicalReportsPage.css'; // CSS dosyasını import edin

function MedicalReportsPage() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    reportDate: '',
    reportContent: ''
  });

  useEffect(() => {
    axios.get('/medicalreports')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching medical reports:', error);
      });
  }, []);

  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setFormData({
      patientId: report.patientId,
      doctorId: report.doctorId,
      reportDate: report.reportDate,
      reportContent: report.reportContent
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateReport = async () => {
    try {
      const response = await axios.put(`/medicalreports/${selectedReport.id}`, formData);
      console.log('Medical report updated:', response.data);
      setReports(reports.map(report => 
        report.id === selectedReport.id ? { ...report, ...formData } : report
      ));
      alert('Medical report updated successfully.');
      handleCloseModal();
    } catch (error) {
      console.error('Error updating medical report:', error);
      alert('An error occurred while updating the medical report.');
    }
  };

  return (
    <div className="reports-container">
      <h2 className="page-title">Medical Raporlar</h2>
      <Card.Group>
        {reports.map(report => (
          <Card key={report.id} className="report-card">
            <Card.Content>
              <Card.Header>{`Hasta ID: ${report.patientId}`}</Card.Header>
              <Card.Meta>{`Doktor ID: ${report.doctorId}`}</Card.Meta>
              <Card.Description>
                {`Tarih: ${report.reportDate}`}
                <br />
                {`İçerik: ${report.reportContent}`}
              </Card.Description>
              <Button color='blue' onClick={() => handleOpenModal(report)}>Güncelle</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      <Modal open={isModalOpen} onClose={handleCloseModal} centered={true}>
        <Modal.Header>Raporu Güncelle</Modal.Header>
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
                name='reportDate'
                value={formData.reportDate}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="field">
              <label>İçerik</label>
              <input
                name='reportContent'
                value={formData.reportContent}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="cancel" onClick={handleCloseModal}>İptal</Button>
          <Button className="update" onClick={handleUpdateReport}>Güncelle</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default MedicalReportsPage;