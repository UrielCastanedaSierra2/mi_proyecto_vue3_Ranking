<script setup>
import { ref } from 'vue'
import { obtenerProductos } from '@/services/productosService'
import { urlFoto } from '@/utils/images'
import { urlFotoGenericaFront } from '@/utils/images'

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

// constante que identifica la fotografía a mostrar cuando 
// no se encuentra la foto solicitada o el servidor que la provee falla
// en este caso la foto reside en el mismo servidor del Front.
const urlFotoGenerica = (e) => {
  e.target.src = urlFotoGenericaFront("producto");
};
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
      <img  :src="urlFoto(resultado.foto)" 
            @error="urlFotoGenerica"      
            :alt="resultado.nombre" />
      <h3>{{ resultado.nombre }}</h3>
      <p>Votos: {{ resultado.votacion }}</p>
    </article>
  </section>
</template>
