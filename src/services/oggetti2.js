// src/services/oggettiService.js
import api from './api';

export const fetchOggettiRandom = async (start, end, emailProprietario) => {
  const response = await api.get(`/api/oggetti/random/${start}/${end}/${emailProprietario}`);
  return response.data;
};
