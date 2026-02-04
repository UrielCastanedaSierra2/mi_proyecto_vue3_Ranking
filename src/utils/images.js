// ===============================================
// Funciones utilitarias para tratamiento de imágenes
// ===============================================

import { PATH_FOTO_PRODUCTOS } from './paths'

export function obtenerImagen(nombreArchivo) {
  /*
  if (!nombreArchivo) {
    return `${PATH_FOTO_PRODUCTOS}/no-image.jpg`
  }
  */
  return `${PATH_FOTO_PRODUCTOS}/${nombreArchivo}`
  //return `/imagenes/productos/${nombreArchivo}`  
}
