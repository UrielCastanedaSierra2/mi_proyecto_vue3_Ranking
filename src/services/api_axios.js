// src/services/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;
const KEY  = import.meta.env.VITE_API_KEY;


// --- se crea la variales api_axios,  que contiene  la variante de axios  para incorporar 
// los datos de la  api_KEY dentro del proceso de CONSUMO o uso de una API
// De esta forma, cada vez que se haga uso de axios,  este ya incorpora la API_KEY  
export const api_axios = axios.create({
  baseURL: API_BASE,
  headers: { 'x-api-key': KEY }
});


/*  ****************  USO DE INTERSEPTORES
Un interceptor es un “gancho” que se ejecuta....
  -  antes de que salga una petición (request interceptor) 
  -  después de que llegue una respuesta (response interceptor).
Sirve para centralizar lógica que repites en muchos lugares:
  - Adjuntar headers (p.ej., x-api-key) en todas las requests.
  - Registrar logs de éxito/error.
  - Manejar tokens (renovar, redirigir a login en 401).
  - Transformar respuestas o errores.
  - Reintentos automáticos (con backoff).
*/

// Request interceptor (logs / headers adicionales)
// ------------------------------------------------------
api_axios.interceptors.request.use(
  (config) => {
    // console.debug('[API OUT]', config.method?.toUpperCase(), config.url);
    return config;
  },
  (resp) => { 
    
    alert(API_BASE + "   KEY=" + KEY + "    response: "+ response.data[0])
    resp},
  (err) => {
    console.error('API error:', err?.response?.status, err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

// Response interceptor (logs y manejo de errores)
// ------------------------------------------------------
api_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url    = error?.config?.url;
    const method = error?.config?.method?.toUpperCase();
    const data   = error?.response?.data;

    console.error('[API ERROR]', method, url, status, data || error.message);

    if (status === 401) {
      // showToast('No autorizado. Verifica tu API Key.', 'warning');
    }
    return Promise.reject(error);
  }
);
