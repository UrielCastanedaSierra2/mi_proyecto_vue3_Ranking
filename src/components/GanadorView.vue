<script setup>
import { ref, onMounted } from 'vue'
import { obtenerProductos } from '@/services/productosService'
import { obtenerImagen } from '@/utils/images'

// Estados reactivos
const productoGanador = ref(null)
const cargando = ref(true)
const error = ref(null)

// Se ejecuta al montar el componente
onMounted(async () => {
  try {
    const productos = await obtenerProductos()

    // Orden descendente por votos
    productoGanador.value = [...productos]
      .sort((a, b) => b.votacion - a.votacion)[0]

  } catch (e) {
    error.value = 'No fue posible obtener el producto ganador.'
  } finally {
    cargando.value = false
  }
})

/*
const obtenerImagen = (foto) => {
  return `/imagenes/productos/${foto}`
}
*/
</script>

<template>
  <section>
    <h2>🏆 Producto Ganador</h2>

    <p v-if="cargando">Cargando información...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <article v-if="productoGanador" class="tarjeta-producto">
      <img
        :src="obtenerImagen(productoGanador.foto)"
        :alt="productoGanador.nombre"
      />
      <h3>{{ productoGanador.nombre }}</h3>
      <p>Votos obtenidos: {{ productoGanador.votacion }}</p>
    </article>
  </section>
</template>
