import React, { useState } from 'react';
import { Button, Form, Container } from 'semantic-ui-react';
import { addDoctors } from '../../services/doctorService';
import './DoctorForm.css'; // CSS dosyasını import edin

function DoctorForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [profession, setProfession] = useState('');
  const [workplace, setWorkplace] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoctors(name, surname, profession, workplace);
      alert('Doctor created successfully!');
      setName('');
      setSurname('');
      setProfession('');
      setWorkplace('');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the doctor');
    }
  };

  const generateRandomDoctor = () => {
    const names = ['Ahmet', 'Mehmet', 'Osman', 'Ali', 'Samet', 'Selin', 'Sude', 'Buse', 'Ayşe', 'Fatma'];
    const surnames = ['Yılmaz', 'Kaya', 'Demir', 'Bilek', 'Güler', 'Uysal', 'Yeşil', 'Aslan', 'Kılıç', 'Dağ'];
    const professions = ['Kardiyolog', 'Dermatolog', 'Nörolog', 'Pediatrist', 'Psikiyatrist', 'Cerrah', 'Radyolog', 'Onkolog', 'Ortopedist', 'Ürolog'];
    const workplaces = ['Hacettepe Hastanesi', 'Gazi Hastanesi', 'Cerrahpaşa Hastanesi', 'Kocaeli Hastanesi', 'Bolu Hastanesi'];

    const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

    return {
      name: randomElement(names),
      surname: randomElement(surnames),
      profession: randomElement(professions),
      workplace: randomElement(workplaces)
    };
  };

  const handleGenerateRandomDoctors = async () => {
    const randomDoctors = Array.from({ length: 10}, generateRandomDoctor);

    try {
      for (const doctor of randomDoctors) {
        await addDoctors(doctor.name, doctor.surname, doctor.profession, doctor.workplace);
      }
      alert('10 random doctors created successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating random doctors');
    }
  };

  return (
    <Container className="doctor-form-container">
      <h2 className="form-header">Doktor Ekle</h2>
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
          <label className="input-label">Uzmanlık Alanı</label>
          <input
            type="text"
            className="input-field"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field className="form-field">
          <label className="input-label">Çalıştığı Hastane</label>
          <input
            type="text"
            className="input-field"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
            required
          />
        </Form.Field>
        <Button type="submit" className="submit-button" primary>Doktor Ekle</Button>
        <Button type="button" className="submit-button" secondary onClick={handleGenerateRandomDoctors}>Rastgele 10 Doktor Ekle</Button>
      </Form>
    </Container>
  );
}

export default DoctorForm;