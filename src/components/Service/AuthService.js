// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'https://apinews-c75x.onrender.com/user';  //Thay bằng url 

export const googleLogin = async (credential) => {
  try {
    const response = await axios.post(`${API_URL}/auth/google`, {
      credential: credential
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};