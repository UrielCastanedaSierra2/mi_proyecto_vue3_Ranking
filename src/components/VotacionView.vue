<script setup>
import { ref, onMounted } from 'vue'
import { obtenerProductos, votarProducto } from '@/services/productosService'
import { urlFoto } from '@/utils/images'

// ====== ESTADOS ======
const productos = ref([])
const productoSeleccionado = ref('')

const cargando = ref(true)
const mensaje = ref('')
const esError = ref(false)

const votoRealizado = ref(false)
const mostrarNuevaVotacion = ref(false)


// ====== CARGA DE PRODUCTOS ======
onMounted(async () => {
  try {
    const data = await obtenerProductos()

    productos.value = [...data].sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    )

  } catch (err) {
    console.error('Error cargando productos:', err)
    mensaje.value = '❌ No fue posible cargar los productos'
    esError.value = true
  } finally {
    cargando.value = false
  }
})


// ====== REGISTRAR VOTO ======
async function votar() {
  if (!productoSeleccionado.value) return

  try {
    await votarProducto(productoSeleccionado.value.nombre)

    mensaje.value = '✅ Gracias por tu voto..! Registro efectuado correctamente.'
    esError.value = false

  } catch (err) {
    console.error('Error registrando voto:', err)

    mensaje.value = '❌ ERROR - No fue posible registrar tu voto. Inténtalo más tarde.'
    esError.value = true
  }

  // 🔒 bloquear botón y mostrar opción de nueva votación
  votoRealizado.value = true
  mostrarNuevaVotacion.value = true
}


// ====== NUEVA VOTACIÓN ======
function nuevaVotacion() {
  productoSeleccionado.value = ''
  mensaje.value = ''
  esError.value = false

  votoRealizado.value = false
  mostrarNuevaVotacion.value = false
}
</script>


<template>
  <section>
    <h2>🗳️ Vota por tu producto preferido</h2>

    <p v-if="cargando">Cargando productos...</p>

    <!-- ===== COMBO ===== -->
    <select
      v-model="productoSeleccionado"
      class="combo-productos"
    >
      <option disabled value="">
        Selecciona tu producto...
      </option>

      <option
        v-for="p in productos"
        :key="p.nombre"
        :value="p"
      >
        {{ p.nombre }}
      </option>
    </select>


    <!-- ===== FOTO + BOTÓN VOTAR ===== -->
    <div v-if="productoSeleccionado" class="tarjeta-producto">

      <img
        :src="urlFoto(productoSeleccionado.foto)"
        :alt="productoSeleccionado.nombre"
      />

      <button
        @click="votar"
        :disabled="votoRealizado"
      >
        🗳️ Efectúa tu voto
      </button>
    </div>


    <!-- ===== MENSAJE ===== -->
    <p
      v-if="mensaje"
      :style="{ color: esError ? 'red' : 'green', marginTop: '10px' }"
    >
      {{ mensaje }}
    </p>


    <!-- ===== NUEVA VOTACIÓN ===== -->
    <button
      v-if="mostrarNuevaVotacion"
      @click="nuevaVotacion"
      style="margin-top: 12px;"
    >
      🔄 Realizar nueva votación
    </button>
  </section>
</template>

<!--
<style scoped>
.combo-productos {
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  min-height: 45px;
}
</style>
-->