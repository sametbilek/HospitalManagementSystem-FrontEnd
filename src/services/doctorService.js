import axios from 'axios';

// Axios için bir örnek oluştur
const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1' // Varsayılan base URL
});

export const getDoctors = async () => {
    return await instance.get('/doctors');
};
export const addDoctors = async (name, surname,profession,workplace ) => {
    const response = await instance.post('/doctors', { name, surname,profession,workplace  });
    return response.data;
};


export const checkIsDoctor = async (id) => {
    try {
        const response = await instance.get(`/doctors/${id}`);
        if (response.status === 200 && response.data.length > 0) {
            return response.data;
        } else {
            throw new Error('Doktor bulunamadı');
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Doktor bulunamadı');
        } else {
            throw new Error('Beklenmeyen bir hata oluştu');
        }
    }
};


