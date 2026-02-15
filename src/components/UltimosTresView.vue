<script setup>
/**
 * Componente que muestra los 3 productos
 * con menor votación (ranking inferior).
 * 
 * IMPORTANTE:
 * - Se trabaja con axios simulado
 * - NO se usa router
 * - La numeración corresponde al ranking real
 */
import { ref, onMounted } from 'vue'
import { obtenerProductos } from '@/services/productosService'
import { urlFoto } from '@/utils/images'
import { urlFotoGenericaFront } from '@/utils/images'

const ultimosTres = ref([])
const cargando = ref(true)
const error = ref(null)

/**
 * Se ordenan de menor a mayor votación
 * y se toman los últimos 3
 */
onMounted(async () => {
  try {
    //  Obtener todos los productos e identificar el total   
    const productos = await obtenerProductos()
    const totalProductos = productos.length

    // Ordenar por menor votación (peores primero)
    const peoresTres = [...productos]
      .sort((a, b) => a.votacion - b.votacion)
      .slice(0, 3)

    /**
     * Reordenar y enriquecer datos:
     * - Antepenúltimo → total - 2 😟
     * - Penúltimo     → total - 1 😢
     * - Último        → total     😭
     */
    ultimosTres.value = [
      {
        ...peoresTres[2],
        posicion: totalProductos - 2,
        emoji: '😟'
      },
      {
        ...peoresTres[1],
        posicion: totalProductos - 1,
        emoji: '😢'
      },
      {
        ...peoresTres[0],
        posicion: totalProductos,
        emoji: '😭'
      }
    ]

  } catch (e) {
    error.value = 'Error al cargar los últimos productos.'
  } finally {
    cargando.value = false
  }
})

// constante que identifica la fotografía a mostrar cuando 
// no se encuentra la foto solicitada o el servidor que la provee falla
// en este caso la foto reside en el mismo servidor del Front.
const urlFotoGenerica = (e) => {
  e.target.src = urlFotoGenericaFront("producto");
};
</script>

<template>
  <section>
    <h2>📉 Últimos 3 Productos</h2>

    <p v-if="cargando">Cargando ranking...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <table v-if="ultimosTres.length" class="tabla-ranking">
      <tr v-for="producto in ultimosTres" :key="producto.nombre">

        <!-- Columna de posición real + emoji -->        
        <td class="col-posicion">
          <strong>#{{ producto.posicion }}</strong>
          <span> {{ producto.emoji }}</span><br />
          {{ producto.votacion }} votos
        </td>

        <!-- Imagen del producto -->
        <td class="col-imagen">
          <img  :src="urlFoto(producto.foto)" 
                @error="urlFotoGenerica"                  
                :alt="producto.nombre" />
        </td>

        <!-- Nombre del producto -->        
        <td class="col-nombre">
          {{ producto.nombre }}
        </td>
      </tr>
    </table>
  </section>
</template>
