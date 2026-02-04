<script setup>
import { ref } from 'vue'
import { obtenerProductos } from '@/services/productosService'
import { obtenerImagen } from '@/utils/images'

const posicion = ref('')
const resultado = ref(null)
const error = ref(null)

async function buscarPorPosicion() {
  error.value = null
  resultado.value = null

  const productos = await obtenerProductos()

  const ordenados = [...productos].sort(
    (a, b) => b.votacion - a.votacion
  )

  const index = Number(posicion.value) - 1

  if (isNaN(index) || index < 0 || index >= ordenados.length) {
    error.value = 'Posición fuera de rango.'
    return
  }

  resultado.value = ordenados[index]
}
</script>

<template>
  <section>
    <h2>Consultar producto por posición</h2>

    <input
      v-model="posicion"
      type="number"
      placeholder="Ingrese posición"
      class="input-busqueda"
    />
    <button @click="buscarPorPosicion">🔍 Buscar</button>

    <p v-if="error" class="error">{{ error }}</p>

    <article v-if="resultado" class="tarjeta-producto">
      <img :src="obtenerImagen(resultado.foto)" :alt="resultado.nombre" />
      <h3>{{ resultado.nombre }}</h3>
      <p>Votos: {{ resultado.votacion }}</p>
    </article>
  </section>
</template>
