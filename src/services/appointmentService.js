import axios from 'axios';

// Axios için bir örnek oluştur
const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1' // Varsayılan base URL
});

// Tüm istekler bu base URL'e gönderilecek

export const getAllAppointments = async () => {
    return await instance.get('/appointments');
};
