<script setup>
// Importamos herramientas reactivas
import { ref } from 'vue'

// Importamos componentes de layout
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

// Importamos las "vistas" (componentes que se mostrarán según el botón)
import HomeView from './components/HomeView.vue'
import GanadorView from './components/GanadorView.vue'
import TopTresView from './components/TopTresView.vue'
import UltimosTresView from './components/UltimosTresView.vue'
import ConsultaNombreView from './components/ConsultaNombreView.vue'
import ConsultaPosicionView from './components/ConsultaPosicionView.vue'

// Estado reactivo que controla qué vista se muestra
// Es el equivalente a la navegación sin router
const vistaActual = ref('home')
</script>

<template>
  <!-- Cabecera -->
  <AppHeader />

  <!-- Contenido principal -->
  <main class="layout">

    <!-- Panel lateral -->
    <aside class="menu-lateral">
      <!-- botones -->
      <!--  por ahora no mostramos botón de inicio  (soamente actua como vista inicial)
      <button @click="vistaActual = 'inicio'">🏠 Inicio</button>
      -->
      <button @click="vistaActual = 'ganador'">🥇 Producto ganador</button>
      <button @click="vistaActual = 'top3'">🏆 Top 3</button>
      <button @click="vistaActual = 'ultimos3'">📉 Últimos 3</button>
      <button @click="vistaActual = 'nombre'">🔍 Buscar por nombre</button>
      <button @click="vistaActual = 'posicion'">🔢 Buscar por posición</button>
    </aside>

    <!-- Panel central -->
    <section class="panel-central">
      <div class="panel-contenido">
        <HomeView v-if="vistaActual === 'home'" />
        <GanadorView v-if="vistaActual === 'ganador'" />
        <TopTresView v-if="vistaActual === 'top3'" />
        <UltimosTresView v-if="vistaActual === 'ultimos3'" />
        <ConsultaNombreView v-if="vistaActual === 'nombre'" />
        <ConsultaPosicionView v-if="vistaActual === 'posicion'" />
      </div>      
    </section>

  </main>

  <!-- Pie de página -->
  <AppFooter />
</template>
