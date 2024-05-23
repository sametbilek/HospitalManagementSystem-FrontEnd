import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'semantic-ui-react';
import axios from 'axios';
import './Register.css'; // CSS dosyasını import edin

function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState(''); // Doğum tarihi
  const [gender, setGender] = useState(''); // Cinsiyet
  const [adress, setAdress] = useState(''); // Adres
  const [phonenumber, setPhoneNumber] = useState(''); // Telefon numarası
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/patients', {
        name,
        surname,
        dob,
        gender,
        adress,
        phonenumber
      });
      alert('Hasta başarıyla oluşturuldu!');
      navigate('/'); // Kayıt olduktan sonra login sayfasına yönlendir
    } catch (error) {
      console.error(error);
      alert('Hasta oluşturulurken bir hata oluştu');
    }
  };

  return (
    <Container className="register-container">
      <h2 className="form-header">Kayıt Ol</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field className="form-field">
          <label className="input-label">Ad</label>
          <input
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field className="form-field">
          <label className="input-label">Soyad</label>
          <input
            type="text"
            className="input-field"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field className="form-field">
          <label className="input-label">Doğum Tarihi</label>
          <input
            type="date"
            className="input-field"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field className="form-field">
          <label className="input-label">Cinsiyet</label>
          <input
            type="text"
            className="input-field"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field className="form-field">
          <label className="input-label">Adres</label>
          <input
            type="text"
            className="input-field"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field className="form-field">
          <label className="input-label">Telefon Numarası</label>
          <input
            type="text"
            className="input-field"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Field>
        <Button type="submit" className="submit-button" primary>Kayıt Ol</Button>
      </Form>
    </Container>
  );
}

export default Register;