
<template>
  <AppHeader />

  <main>
    <section class="bienvenida">
      <p>Bienvenido al sistema de consulta de productos</p>
    </section>

    <section class="acciones">
      <button @click="productoGanador">Producto ganador</button>
      <button @click="topTres">Top 3 más votados</button>
      <button @click="bottomTres">Top 3 menos votados</button>
    </section>

    <section class="consultas">
      <article>
        <h3>Consultar por nombre</h3>
        <input v-model="nombreBusqueda" />
        <button @click="buscarPorNombre">Buscar</button>
      </article>

      <article>
        <h3>Consultar por posición</h3>
        <input v-model.number="posicionBusqueda" type="number" />
        <button @click="buscarPorPosicion">Buscar</button>
      </article>
    </section>

    <section v-if="loading">Cargando datos...</section>
    <section v-if="error" class="error">{{ error }}</section>

    <section v-if="resultado">
      <figure>
        <img :src="`/imagenes/productos/${resultado.foto}`" />
        <figcaption>
          {{ resultado.nombre }} - Votos: {{ resultado.votacion }}
        </figcaption>
      </figure>
    </section>
  </main>

  <AppFooter />
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { obtenerProductos } from './services/productosService'

export default {

  components: {
    AppHeader,
    AppFooter
  },
  
  data() {
    return {
      productos: [],
      loading: false,
      error: null,
      resultado: null,
      nombreBusqueda: '',
      posicionBusqueda: null
    }
  },

  async mounted() {
    this.loading = true
    try {
      this.productos = await obtenerProductos()
    } catch (e) {
      this.error = 'Error al cargar productos'
    } finally {
      this.loading = false
    }
  },

  methods: {
    productoGanador() {
      this.resultado = [...this.productos].sort(
        (a, b) => b.votacion - a.votacion
      )[0]
    },

    topTres() {
      alert(
        JSON.stringify(
          [...this.productos]
            .sort((a, b) => b.votacion - a.votacion)
            .slice(0, 3),
          null,
          2
        )
      )
    },

    bottomTres() {
      alert(
        JSON.stringify(
          [...this.productos]
            .sort((a, b) => a.votacion - b.votacion)
            .slice(0, 3),
          null,
          2
        )
      )
    },

    buscarPorNombre() {
      if (!this.nombreBusqueda) {
        this.error = 'Debe ingresar un nombre'
        return
      }
      this.resultado = this.productos.find(
        p => p.nombre.toLowerCase() === this.nombreBusqueda.toLowerCase()
      )
      if (!this.resultado) this.error = 'Producto no encontrado'
    },

    buscarPorPosicion() {
      if (
        isNaN(this.posicionBusqueda) ||
        this.posicionBusqueda < 1 ||
        this.posicionBusqueda > this.productos.length
      ) {
        this.error = 'Posición inválida'
        return
      }
      this.resultado = this.productos[this.posicionBusqueda - 1]
    }
  }
}
</script>
