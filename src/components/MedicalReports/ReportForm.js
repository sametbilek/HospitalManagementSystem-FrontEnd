import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container } from 'semantic-ui-react';
import './ReportForm.css'; // CSS dosyasını import edin

function ReportForm() {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [reportDate, setreportDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/medicalreports', { patientId, doctorId, reportDate, reportContent });
      alert('Medical report created successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the medical report');
    }
  };

  return (
    <Container className="report-form-container">
      <h2 className="form-header">Medical Rapor Ekle</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field className="form-field">
          <label className="input-label">Hasta ID</label>
          <input
            type="text"
            className="input-field"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field className="form-field">
          <label className="input-label">Doktor ID</label>
          <input
            type="text"
            className="input-field"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field className="form-field">
          <label className="input-label">Rapor Tarihi</label>
          <input
            type="date"
            className="input-field"
            value={reportDate}
            onChange={(e) => setreportDate(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field className="form-field">
          <label className="input-label">Rapor İçeriği</label>
          <textarea
            className="textarea-field"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            required
          />
        </Form.Field>
        <Button type="submit" className="submit-button" primary>Medical Rapor Ekle</Button>
      </Form>
    </Container>
  );
}

export default ReportForm;
