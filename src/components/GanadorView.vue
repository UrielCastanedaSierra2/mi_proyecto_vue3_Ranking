<script setup>
import { ref, onMounted } from 'vue'
import { obtenerProductos } from '@/services/productosService'
import { obtenerImagen } from '@/utils/images'
import { urlFoto } from '@/utils/images'

// Estados reactivos
const productoGanador = ref(null)
const cargando = ref(true)
const error = ref(null)

// Se ejecuta al montar el componente
onMounted(async () => {
  try {
    const productos = await obtenerProductos()

    // Se ordenan los datos en forma descendente por votos
    // con ello el primer elemento del vector será el de mayor votación
    productoGanador.value = [...productos]
      .sort((a, b) => b.votacion - a.votacion)[0]

    error.value = null;    // Aseguramos que el proceso finalizó sin errores
  } catch (err) {
    console.error('Error cargando productos:', err);
    error.value = `No fue posible obtener el producto ganador - (${err.message})`    
    productos.value = [];   // dejamos el vector vacío 
                            // así aseguramos borrado de datos inconsistentes
  } finally {
    // en caso de final satisfactorio, indicamos "final del estado cargando datos"
    cargando.value = false
  }  
})
</script>


<template>
  <section>
    <h2>🏆 Producto Ganador</h2>

    <p v-if="cargando">Cargando información...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <article v-if="productoGanador" class="tarjeta-producto">

      <!-- Imagen renderizada desde URL -->
      <img
        :src="urlFoto(productoGanador.foto)"
        :alt="productoGanador.nombre"
      />
      <h3>{{ productoGanador.nombre }}</h3>
      <p>Votos obtenidos: {{ productoGanador.votacion }}</p>
    </article>
  </section>
</template>

<!-- ------ eliminar  despues de probar -----------
<template>
  <section>
    <h2>🏆 Producto Ganador</h2>

    <p v-if="cargando">Cargando información...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <article v-if="productoGanador" class="tarjeta-producto">

      <img
        :src="productoGanador.foto"
        :alt="productoGanador.nombre"
      />
      <h3>{{ productoGanador.nombre }}</h3>
      <p>Votos obtenidos: {{ productoGanador.votacion }}</p>
    </article>
  </section>
</template>
--> 