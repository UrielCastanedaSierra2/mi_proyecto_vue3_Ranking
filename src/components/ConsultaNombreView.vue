<script setup>
import { ref } from 'vue'
import { obtenerProductos } from '@/services/productosService'
import { obtenerImagen } from '@/utils/images'

const nombreBuscado = ref('')
const resultado = ref(null)
const error = ref(null)

async function buscarProducto() {
  error.value = null
  resultado.value = null

  const productos = await obtenerProductos()

  const encontrado = productos.find(
    p => p.nombre.toLowerCase() === nombreBuscado.value.toLowerCase()
  )

  if (!encontrado) {
    error.value = 'Producto no encontrado.'
  } else {
    resultado.value = encontrado
  }
}
</script>

<template>
  <section>
    <h2>Consultar producto por nombre</h2>

    <input
      v-model="nombreBuscado"
      type="text"
      placeholder="Ingrese nombre del producto"
      class="input-busqueda"
    />
    <button @click="buscarProducto">🔍 Buscar</button>

    <p v-if="error" class="error">{{ error }}</p>

    <article v-if="resultado" class="tarjeta-producto">
      <img :src="obtenerImagen(resultado.foto)" :alt="resultado.nombre" />
      <h3>{{ resultado.nombre }}</h3>
      <p>Votos: {{ resultado.votacion }}</p>
    </article>
  </section>
</template>
