<script setup>
import { ref, onMounted, computed } from 'vue'
import { obtenerProductos, votarProducto } from '@/services/productosService'
import { urlFoto } from '@/utils/images'

// ====== ESTADOS REACTIVOS ======
const productos = ref([])
const productoSeleccionado = ref(null)
const cargando = ref(true)
const mensaje = ref(null)
const error = ref(null)

// ====== CARGA INICIAL ======
onMounted(async () => {
  try {
    const data = await obtenerProductos()

    // Ordenamos por nombre alfabético
    productos.value = [...data].sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    )

  } catch (err) {
    console.error('Error cargando productos:', err)
    error.value = 'No fue posible cargar los productos'
  } finally {
    cargando.value = false
  }
})

// ====== ACCIÓN DE VOTAR ======
async function votar() {
  if (!productoSeleccionado.value) return

  try {
    await votarProducto(productoSeleccionado.value.nombre)

    mensaje.value = '✅ Gracias por tu voto… ¡Registro efectuado correctamente!'
    error.value = null

  } catch (err) {
    console.error('Error registrando voto:', err)
    mensaje.value = null
    error.value = '❌ ERROR - No fue posible registrar tu voto, inténtalo más tarde'
  }
}
</script>

<template>
  <section>
    <h2>🗳️ Vota por tu producto preferido</h2>

    <p v-if="cargando">Cargando productos...</p>

    <!-- COMBOBOX -->
    <select v-model="productoSeleccionado">
      <option disabled value="">Seleccione un producto</option>
      <option
        v-for="p in productos"
        :key="p.nombre"
        :value="p"
      >
        {{ p.nombre }}
      </option>
    </select>

    <!-- IMAGEN -->
    <article v-if="productoSeleccionado" class="tarjeta-producto">
      <img
        :src="urlFoto(productoSeleccionado.foto)"
        :alt="productoSeleccionado.nombre"
      />

      <!-- BOTÓN VOTAR -->
      <button @click="votar">
        👍 Efectúa tu voto…
      </button>
    </article>

    <!-- MENSAJES -->
    <p v-if="mensaje" class="exito">{{ mensaje }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>
