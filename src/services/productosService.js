/**
 * Este módulo del proyecto es el responsable de obtener los 
 * productos desde una API REST.
 * El objetivo es utilizar axios para interactuar con el servidor
 * ------------------------------------.
 * En esta versión incorporamos la utilización de la API_KEY,  necesaria
 * para proteger y restringir su tilización únicamente por parte de quienes 
 * posean dicha clave.
 * Por lo tanto las trasnacciones de APIs consumidas por esta aplicación
 * Debieron ser ajustadas incorporando en su cueró de datos (en su cabecera), el dato
 * correspondiente a la API_KEY, oblogatoria para que el BackEnd acepte procesar las
 * peticiones de datos. 
 * -------------------------------------
 *  Al crear el objeto api_axios automáticante se transfiere a su cabecera los datos:
 *  - PATH_BASE de la API  (equivale a la dirección web del servidor backEnd)
 *  - API_KEY              (equivale a la clave requerida para que el BackEnd  acepte lapetición API
*/

// Importamos  y creamos el objeto [api_axios]   Automáticamente inyecta en su cabecera los datos 
// parametrizados  de PATH_Base y API_KEY. 
import { api_axios } from './api_axios';

 // path complementario de la API, ruta localizada luego de la URL del servidor
import { API_Productos } from '@/utils/paths'    

// =====================================================
// Declaración de los servicios Requiere el FRONT para
// acceder  al la Base de Datos  mediante APIs 
//------------------------------------------------------

// OBTENER el conjunto completo de datos de PRODUCTOS
export async function obtenerProductos() {
  try {
    console.log('Solicitud del listado de productos: ',`${API_Productos}`);
    // Petición HTTP GET usando axios
    // Axios devuelve directamente el objeto de respuesta

    const  response  = await api_axios.get(API_Productos);

    // Axios ya entrega los datos convertidos a JSON
    // por lo tanto no es necesario transferirlos a formato json (como se hizo al utilizar fetch)
    // en data ya queda listo el array (arreglo de Registros u objetos en formato json)

    const data = response.data;

    // Normalizamos los datos según la fuente recibida, para adaptarlos a la estructura de nuestro
    // registro de productos
    return new Promise((resolve) => {
      resolve([...normalizar(data)]);
    });

  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw new Error('No fue posible obtener los productos');
  }
}

/** -----------------------------------------
 * Envía un voto al backend para incrementar la votación
 * ------------------------------------------
 */
export async function votarProducto(nombre) {
  try {
    // Construimos la URL completa enviando el nombre codificado
    // const url = `${API_BASE}${API_Productos}/votar/${encodeURIComponent(nombre)}`;
    const url = `${API_Productos}/votar/${encodeURIComponent(nombre)}`;

    // Petición HTTP PUT usando axios
    // Axios lanza error automáticamente si el estado HTTP es 4xx o 5xx
    // ---- const response = await axios.put(url);  --- borrar

    const response  = await api_axios.put(url);

    // Axios ya entrega la respuesta convertida a JSON en response.data
    return response.data;

  } catch (error) {
    console.error('Error al votar:', error);
    throw new Error('No fue posible registrar el voto');
  }
}

/* ==========================================================
   FUNCIONES Utilitarias para tratamiento de URLs de imágenes
   ========================================================== */

/* (Opcional) Normalizador simple por si a futuro mezclas orígenes */
// se analiza la estructura del registro leido,  
// si viene de la API propia   o de  una API externa de prueba
//----------------
function normalizar(raw) {
   // Ya vienen en tu formato local (API propia)
  if (Array.isArray(raw) && raw.length && 'nombre' in raw[0]) return raw;

  // para el caso de la API servida por https://dummyjson.com 
  // Fake Store API: arreglo con 'title', 'image', 'rating.count'
  // en su primera posición viene el campo 'title'
  if (Array.isArray(raw) && raw.length && 'title' in raw[0]) {

    // Realizamos la transferencia de valor de los campos al registro PROPIO
    return raw.map(p => ({
      nombre: p.title,
      foto: p.image,         // puede ser absoluta   o  solo nombre de archivo
      votacion: p.rating?.count ?? 0
    }));
  }
 
  // DummyJSON: { products: [...] }
  if (raw && Array.isArray(raw.products)) {
    return raw.products.map(p => ({
      nombre: p.title,
      foto: p.thumbnail || p.images?.[0], // puede ser absoluta o solo archivo
      votacion: Math.round((p.rating ?? 0) * 20)
    }));
  }

  return [];
}


