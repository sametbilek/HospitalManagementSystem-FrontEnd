import React, { useState } from 'react';
import { Button, Form, Container } from 'semantic-ui-react';
import { addPatient } from '../../services/patientService';
import './PatientForm.css'; // CSS dosyasını import edin

function PatientForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState(''); // Doğum tarihi
  const [gender, setGender] = useState(''); // Cinsiyet
  const [adress, setAdress] = useState(''); // Adres
  const [phonenumber, setPhoneNumber] = useState(''); // Telefon numarası

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPatient(name, surname, dob, gender, adress, phonenumber);
      alert('Hasta başarıyla oluşturuldu!');
      setName('');
      setSurname('');
      setDob('');
      setGender('');
      setAdress('');
      setPhoneNumber('');
    } catch (error) {
      console.error(error);
      alert('Hasta oluşturulurken bir hata oluştu');
    }
  };

  const generateRandomPatient = () => {
    const names = ['Ahmet', 'Mehmet', 'Osman', 'Ali', 'Samet', 'Selin', 'Sude', 'Buse', 'Ayşe', 'Fatma'];
    const surnames = ['Yılmaz', 'Kaya', 'Demir', 'Bilek', 'Güler', 'Uysal', 'Yeşil', 'Aslan', 'Kılıç', 'Dağ'];
    const genders = ['Erkek', 'Kadın'];
    const addresses = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Şanlıurfa', 'Mersin'];
    const phoneNumbers = ['05551234567', '05552345678', '05553456789', '05554567890', '05555678901', '05556789012', '05557890123', '05558901234', '05559012345', '05550123456'];

    const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomDate = () => {
      const start = new Date(1950, 0, 1);
      const end = new Date(2005, 0, 1);
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0];
    };

    return {
      name: randomElement(names),
      surname: randomElement(surnames),
      dob: randomDate(),
      gender: randomElement(genders),
      adress: randomElement(addresses),
      phonenumber: randomElement(phoneNumbers)
    };
  };

  const handleGenerateRandomPatients = async () => {
    const randomPatients = Array.from({ length: 10 }, generateRandomPatient);

    try {
      for (const patient of randomPatients) {
        await addPatient(patient.name, patient.surname, patient.dob, patient.gender, patient.adress, patient.phonenumber);
      }
      alert('10 rastgele hasta başarıyla oluşturuldu!');
    } catch (error) {
      console.error(error);
      alert('Rastgele hastalar oluşturulurken bir hata oluştu');
    }
  };

  return (
    <Container className="patient-form-container">
      <h2 className="form-header">Hasta Ekle</h2>
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
        <Button type="submit" className="submit-button" primary>Hasta Ekle</Button>
        <Button type="button" className="submit-button" secondary onClick={handleGenerateRandomPatients}>Rastgele 10 Hasta Ekle</Button>
      </Form>
    </Container>
  );
}

export default PatientForm;