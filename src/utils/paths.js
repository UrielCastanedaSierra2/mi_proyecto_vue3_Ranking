// ===============================================
// Aquí definimos los principales parámetros de operación
// que utilizaremos en el sistema 
// ===============================================

export const PATH_FOTOS = '/imagenes/productos'

/* ======================================================
   CONFIGURACIÓN ÚNICA DE LA API
   👉 Solo cambia la BASE o el PATH
   ====================================================== */

// BACK LOCAL (nuestra API):
// API privada local (la desconectamos Alternandola con la PÚBLICA)
//export const API_BASE = 'http://localhost:3000';
//export const API_PATH = '/api/productos'; 

// 👉 Aquí SOLO registras el path (una o varias carpetas)

// ---------- API PÚBLICA  -------
export const API_BASE = 'https://dummyjson.com';
export const API_PATH = '/products';    // (para las APIs pública de ejemplo)

