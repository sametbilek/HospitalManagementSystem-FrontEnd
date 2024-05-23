import axios from 'axios';

// Axios için bir örnek oluştur
const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1' // Varsayılan base URL
});

// Tüm istekler bu base URL'e gönderilecek

export const checkIsAdmin = async (username, password) => {
    try {
        const response = await instance.post('/admin', { username, password });
        return response.data;
    } catch (error) {
        alert('Başarısız!'); // Kırmızı uyarı
        throw error.response.data;
    }
};