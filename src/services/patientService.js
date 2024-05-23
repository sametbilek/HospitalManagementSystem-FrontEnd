import axios from 'axios';

// Axios için bir örnek oluştur
const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1' // Varsayılan base URL
});

export const getPatients = async () => {
    return await instance.get('/patients');
};
export const addPatient = async (name, surname, dob, gender, adress, phonenumber) => {
    const response = await instance.post('/patients', { name, surname, dob, gender, adress, phonenumber });
    return response.data;
};

export const checkIsPatient = async (id) => {
    try {
        const response = await instance.get(`/patients/${id}`);
        // Eğer yanıtın durum kodu 200 ise ve yanıtın içeriği boş değilse doktor bulunmuş demektir
        if (response.status === 200 && response.data.length > 0) {
            return response.data;
        } else {
            throw new Error('Hasta bulunamadı');
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Hasta bulunamadı');
        } else {
            throw new Error('Beklenmeyen bir hata oluştu');
        }
    }
};