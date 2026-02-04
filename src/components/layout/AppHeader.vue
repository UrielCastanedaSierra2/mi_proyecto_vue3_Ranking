<script setup>
/**
 * Componente Header principal
 * Contiene:
 * - Logo L'Oréal
 * - Título centrado
 */
import logoLoreal from '../../assets/logo_loreal_2.png'
</script>

<template>
  <header class="app-header">
    <div class="header-logo">
      <img :src="logoLoreal" alt="Logo L'Oréal" />
    
    </div>

    <div class="header-titulo">
      <h1>Consulta de Ranking de Productos</h1>
    </div>
  </header>
</template>

