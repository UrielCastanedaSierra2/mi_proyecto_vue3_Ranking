// ===============================================
// Funciones utilitarias para tratamiento de imágenes
// ===============================================

import { PATH_FOTOS } from './paths'
import { API_BASE } from './paths'

export function obtenerImagen(nombreArchivo) {
  
  if (!nombreArchivo) {
    return `${PATH_FOTOS}/no-imagen.jpg`
  }
  
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
  // primero verificamos si viene informado el nombre o url de la foto
  if (!foto) {
    // si no viene foto, Fallback opcional (se muestra imagen o nada)
    foto `${API_BASE}${PATH_FOTOS}/no-imagen.jpg`
    //return '';    
  }

  // Si viene de API pública con URL completa, úsa esa misma  (ya tiene la url completa).
  if (foto && esUrlAbsoluta(foto)) return foto;

  // Si NO, entonces es porque solo se está informando el nombre del archivo
  // (la foto es local o propia) servir desde el path definido para el backend
  return `${API_BASE}${PATH_FOTOS}/${foto}`;

}
