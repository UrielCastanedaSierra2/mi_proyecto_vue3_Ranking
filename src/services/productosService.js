/**
 * Este módulo del proyecto es el responsable de obtener los 
 * productos desde una API REST.
 * El objetivo es utilizar axios para interactuar con el servdor
 * Aunque en esta versión simularemos dicha conexión.
 */

// Importamos axios para realizar peticiones HTTP
import axios from 'axios'

import { PATH_FOTOS } from '@/utils/paths'
// import { API_BASE } from '@/utils/paths'
import { API_PATH } from '@/utils/paths'

// direcconamos el Path de las APIs desde las variables de entorno (.env)
const API_BASE = import.meta.env.VITE_API_URL;

/*
  Función que representa una llamada al servidor.
  En esta versión:
  - Usamos axios para ilustrar su uso
  - Simulamos la respuesta con un Promise
*/
export async function obtenerProductos() {
  try {
    // EJEMPLO REAL (comentado para uso futuro)
    // const response = await axios.get('https://api.midominio.com/productos')
    // return response.data

    const url = `${API_BASE}${API_PATH}`;
    console.log('URL consultada:', url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

    // transferimos los datos leidos (en formato json) a un array (arreglo de Registros u objetos)
     const data = await response.json();
     
    // preprocesamos los datos leidos para normalizar su contenido
    // dependiendo de la fuente de datos. Estas fuentes las revisa la función normalizar().

    return new Promise((resolve) => {
        resolve([...normalizar(data)])
    })

  } catch (error) {
    console.error('Error al obtener los productos:', error)
    throw new Error('No fue posible obtener los productos')
  }
}

/** -----------------------------------------
 * Envía un voto al backend para incrementar la votación
 * ------------------------------------------
 */
export async function votarProducto(nombre) {
  try {
    const url = `${API_BASE}${API_PATH}/votar/${encodeURIComponent(nombre)}`

    const response = await fetch(url, {
      method: 'PUT'
    })

    if (!response.ok)
      throw new Error(`HTTP ${response.status}`)

    return await response.json()

  } catch (error) {
    console.error('Error al votar:', error)
    throw new Error('No fue posible registrar el voto')
  }
}



/* ==========================================================
   FUNCIONES Utilitarias para tratamiento de URLs de imágenes
   ========================================================== */

// ==== Auxiliar: Determina si el dato es URL absoluta? 
function esUrlAbsoluta(str) {
  return typeof str === 'string' && /^https?:\/\//i.test(str);
}

// ==== Auxiliar: Constructor de la URL de la foto indicada en p 
//      en e HTML asigne la referencia usando esta función
//      <img  :src="urlFoto(variable_que_contiene_el_dato_de_la_foto) />
function urlFoto(foto) {

  // Si viene de API pública con URL completa, úsa esa misma  (ya tiene la url completa).
  if (foto && esUrlAbsoluta(foto)) return foto;

  // Si es local (solo nombre de archivo), servir desde backend/public/imagenes/productos
  if (foto) return `${API_BASE}${PATH_FOTOS}/${foto}`;

  // Fallback opcional (imagen genérica o nada)
  return '';
}



/* (Opcional) Normalizador simple por si a futuro mezclas orígenes */
function normalizar(raw) {
  // Ya vienen en tu formato local
  if (Array.isArray(raw) && raw.length && 'nombre' in raw[0]) return raw;

  // Fake Store API: arreglo con 'title', 'image', 'rating.count'
  if (Array.isArray(raw) && raw.length && 'title' in raw[0]) {

  

    return raw.map(p => ({
      nombre: p.title,
      foto: p.image,                // puede ser absoluta
      votacion: p.rating?.count ?? 0
    }));
  }
 

  // DummyJSON: { products: [...] }
  if (raw && Array.isArray(raw.products)) {
    return raw.products.map(p => ({
      nombre: p.title,
      foto: p.thumbnail || p.images?.[0], // puede ser absoluta
      votacion: Math.round((p.rating ?? 0) * 20)
    }));
  }

  return [];
}


