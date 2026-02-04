import axios from 'axios'

const productos = [
  { nombre: 'Revitalift', foto: 'revitalift.avif', votacion: 120 },
  { nombre: 'Elseve', foto: 'elseve.jpg', votacion: 98 },
  { nombre: 'Infallible', foto: 'infallible.jfif', votacion: 150 },
  { nombre: 'Elvive', foto: 'elvive.avif', votacion: 87 },
  { nombre: 'True Match', foto: 'truematch.webp', votacion: 110 },
  { nombre: 'Preference', foto: 'preference.jpg', votacion: 65 },
  { nombre: 'Men Expert', foto: 'menexpert.jpg', votacion: 45 },
  { nombre: 'Age Perfect', foto: 'ageperfect.webp', votacion: 72 },
  { nombre: 'Casting Crème', foto: 'castingcreme.webp', votacion: 90 },
  { nombre: 'Studio Line', foto: 'studioline.jpg', votacion: 30 }
]

// Simulación de llamada con Axios
export function obtenerProductos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos)
    }, 1500)
  })
}
