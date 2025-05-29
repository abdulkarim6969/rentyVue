// src/services/oggettiService.js
import api from './api';

import axios from 'axios';

const publicApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchOggettiRandomPublic = async (start, end) => {
  const url = `http://localhost:8080/api/oggetti/randomPublic/${start}/${end}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Errore HTTP! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Errore nella chiamata API:', error);
    throw error;
  }
};


export const fetchOggettiRandom = async (start, end, emailProprietario) => {
  const response = await api.get(`/api/oggetti/random/${start}/${end}/${emailProprietario}`);
  return response.data;
};



