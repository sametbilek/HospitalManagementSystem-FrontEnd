import axios from 'axios';

// Axios için bir örnek oluştur
const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1' // Varsayılan base URL
});

export const getReports = async () => {
    return await instance.get('/medicalreports');
};
export const addReports = async (patient_id, doctor_id, report_date, report_content) => {
    const response = await instance.post('/medicalreports', { patient_id, doctor_id, report_date, report_content });
    return response.data;
};

