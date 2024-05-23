import React, { useState } from 'react';
import { checkIsAdmin } from '../services/adminService';
import { useNavigate } from 'react-router-dom';
import { checkIsDoctor } from '../services/doctorService';
import { checkIsPatient } from '../services/patientService';
import './LoginPage.css'; // CSS dosyasını import edin

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    if (role === 'admin') {
      try {
        const response = await checkIsAdmin(username, password);
        console.log(response);
        navigate('/adminpage');
      } catch (error) {
        console.error(error);
      }
    } else if (role === 'doctor') {
      try {
        const response = await checkIsDoctor(id);
        console.log(JSON.stringify(response));
        console.log("Doctor ID:", id);
        navigate(`/doctor/${id}`); 
      } catch (error) {
        console.error(error);
        setErrorMsg('Girilen id ye sahip Doktor bulunamadı');
      }
    } else if (role === 'patient') {
      try {
        const response = await checkIsPatient(id);
        console.log(JSON.stringify(response));
        console.log("Patient ID:", id);
        navigate(`/patient/${id}`);
      } catch (error) {
        console.error(error);
        setErrorMsg('Girilen id ye sahip Hasta bulunamadı');
      }
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Giriş Yap</h2>
      <div>
        <div className="form-group">
          <label className="input-label">Rol:</label>
          <select
            className="input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Rol Seçin</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doktor</option>
            <option value="patient">Hasta</option>
          </select>
        </div>
        {role === 'admin' && (
          <div className="form-group">
            <label className="input-label">Kullanıcı Adı:</label>
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="input-label">Şifre:</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {(role === 'doctor' || role === 'patient') && (
          <div className="form-group">
            <label className="input-label">ID:</label>
            <input
              type="text"
              className="input-field"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        )}
        <button className="submit-button" onClick={handleLogin}>Giriş Yap</button>
        <button className="register-button" onClick={handleRegister}>Kayıt Ol</button>
      </div>
      {errorMsg && <div className="error-message">{errorMsg}</div>}
    </div>
  );
}

export default LoginPage;