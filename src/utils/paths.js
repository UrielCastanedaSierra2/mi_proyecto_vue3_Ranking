// ===============================================
// Aquí definimos los principales parámetros de operación
// que utilizaremos en el sistema 
// ===============================================

export const PATH_FOTOS = '/imagenes/productos'

/* ======================================================
   CONFIGURACIÓN ÚNICA DE LA API
   👉 Solo cambia la BASE o el PATH,  
   direccionamos el Path de las APIs desde las variables de entorno (.env) 
   también se evalúa qué complementario se está utilizando y si la B.D. es simulada o real;
   esto con el fin de complementar el Path  definitivo (Ruta completa de la API).
   ====================================================== */

export const API_BASE = import.meta.env.VITE_API_URL;

var PATH_complementario_API = "";     
switch (API_BASE) {
  case   'https://dummyjson.com':            // (para esta API pública externa de pruebas)
         PATH_complementario_API = '/products';    // https://dummyjson.com/products   
         break; 

  default:  // Para nuestra API   (pruebas o producción)
            // evaluamos si es entorno de B.D. simulado o Real
         if(import.meta.env.VITE_BD_SIMULADA=='SI') 
            PATH_complementario_API = '/api/productos';
         else
            PATH_complementario_API = '/api/productos-db';
}
export const API_Productos = PATH_complementario_API; 
