import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
import './AdminPage.css'; // CSS dosyasını import edin

function AdminPage() {
  return (
    <Container className="admin-container">
      <h1 className="page-title">Hastane Yönetim Sistemine Hoşgeldiniz</h1>
      <div className="button-group">
        <Link to="/add-patient">
          <Button className="custom-button" primary>Hasta Ekle</Button>
        </Link>
        <Link to="/add-doctor">
          <Button className="custom-button" primary>Doktor Ekle</Button>
        </Link>
        <Link to="/add-medical-report">
          <Button className="custom-button" primary>Medical Rapor Ekle</Button>
        </Link>
        <Link to="/patients">
          <Button className="custom-button" primary>Hastalar</Button>
        </Link>
        <Link to="/doctors">
          <Button className="custom-button" primary>Doktorlar</Button>
        </Link>
        <Link to="/appointments">
          <Button className="custom-button" primary>Randevular</Button>
        </Link>
        <Link to="/medicalreports">
          <Button className="custom-button" primary>Medical Raporlar</Button>
        </Link>
      </div>
    </Container>
  );
}

export default AdminPage;