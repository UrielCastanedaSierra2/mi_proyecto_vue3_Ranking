// ===============================================
// Funciones utilitarias para tratamiento de imágenes
// ===============================================

import { PATH_FOTOS } from './paths'
import { API_BASE } from './paths'

export function obtenerImagen(nombreArchivo) {
  /*
  if (!nombreArchivo) {
    return `${PATH_FOTOS}/no-image.jpg`
  }
  */
  return `${PATH_FOTOS}/${nombreArchivo}`
  //para este ejemplo retorna.... `/imagenes/productos/${nombreArchivo}`  
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
export function urlFoto(foto) {
  // Si viene de API pública con URL completa, úsa esa misma  (ya tiene la url completa).
  if (foto && esUrlAbsoluta(foto)) return foto;

  // Si es local (solo nombre de archivo), servir desde backend/public/imagenes/productos
  if (foto) return `${API_BASE}${PATH_FOTOS}/${foto}`;

  // Fallback opcional (imagen genérica o nada)
  return '';
}
