import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientsPage from './pages/PatientsPage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import MedicalReportsPage from './pages/MedicalReportsPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PatientForm from './components/Patients/PatientForm';
import DoctorForm from './components/Doctors/DoctorForm';
import ReportForm from './components/MedicalReports/ReportForm';
import DoctorPatientsPage from './pages/DoctorPatientsPage';
import PatientPage from './pages/PatientPage';
import CreateAppointmentPage from './pages/CreateAppointmentPage';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/medicalreports" element={<MedicalReportsPage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/add-patient" element={<PatientForm />} /> 
        <Route path="/add-doctor" element={<DoctorForm />} />
        <Route path="/add-medical-report" element={<ReportForm />} />
        <Route path="/doctor/:doctorId" element={<DoctorPatientsPage />} />
        <Route path="/patient/:patientId" element={<PatientPage />} />
        <Route path="/create-appointment/:patientId" element={<CreateAppointmentPage />} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
