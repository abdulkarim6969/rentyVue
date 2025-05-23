// src/services/oggettiService.js

import api from "./api";


export default {
  /**
   * Carica un nuovo oggetto con immagine
   * @param {Object} payload
   * @param {String} payload.emailProprietario
   * @param {String} payload.nomeCategoria
   * @param {String} payload.nome
   * @param {String} payload.descrizione
   * @param {Number} payload.prezzoGiornaliero
   * @param {File}   payload.file
   */
  uploadOggetto({ emailProprietario, nomeCategoria, nome, descrizione, prezzoGiornaliero, file }) {
    const formData = new FormData();
    formData.append('emailProprietario', emailProprietario);
    formData.append('nomeCategoria', nomeCategoria);
    formData.append('nome', nome);
    formData.append('descrizione', descrizione);
    formData.append('prezzoGiornaliero', prezzoGiornaliero);
    formData.append('immagine', file);

    return api.post('/api/oggetti', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  /**
   * Scarica l'immagine di un oggetto
   * @param {Number} idOggetto
   * @returns Promise<Blob>
   */
  fetchImmagine(idOggetto) {
    return api.get(`/oggetti/${idOggetto}/immagine`, {
      responseType: 'blob'
    });
  }
};
