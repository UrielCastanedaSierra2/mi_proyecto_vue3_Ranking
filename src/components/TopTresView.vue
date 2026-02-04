<script setup>
/**
 * Componente que muestra los 3 productos
 * con mayor votación.
 */

import { ref, onMounted } from 'vue'
import { obtenerProductos } from '@/services/productosService'
import { obtenerImagen } from '@/utils/images'

const topTres = ref([])
const cargando = ref(true)
const error = ref(null)

/**
 * Se optienen y se ordenan los productos de mayor a menor votación
 * y se toman solo los primeros 3
 */
onMounted(async () => {
  try {
    const productos = await obtenerProductos()

    topTres.value = [...productos]
      .sort((a, b) => b.votacion - a.votacion)
      .slice(0, 3)

  } catch (e) {
    error.value = 'Error al cargar el Top 3.'
  } finally {
    cargando.value = false
  }
})
</script>

<template>
  <section>
    <h2>🥇🥈🥉 Top 3 Productos</h2>

    <p v-if="cargando">Cargando ranking...</p>
    <p v-if="error" class="error">{{ error }}</p>
    
    <div class="tabla-wrapper">

      <table v-if="topTres.length" class="tabla-ranking">
        <tr v-for="(producto, index) in topTres" :key="producto.nombre">
          <td class="col-posicion">
            <strong>#{{ index + 1 }}</strong><br />
            {{ producto.votacion }} votos
          </td>
          <td class="col-imagen">
            <img :src="obtenerImagen(producto.foto)" :alt="producto.nombre" />
          </td>
          <td class="col-nombre">
            {{ producto.nombre }}
          </td>
        </tr>
      </table>

    </div>    
  </section>
</template>
