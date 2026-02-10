<script setup>

import { ref, computed, onMounted } from 'vue';

/* ======================================================
   CONFIGURACIÓN ÚNICA DE LA API
   👉 Solo cambia la BASE o el PATH
   ====================================================== */

// BACK LOCAL (nuestra API):
// API privada local (la desconectamos Alternandola con la PÚBLICA)
// const API_BASE = 'http://localhost:3000';
// const API_PATH = '/api/productos'; 

// 👉 Aquí SOLO registras el path (una o varias carpetas)

// ---------- API PÚBLICA  -------
const API_BASE = 'https://dummyjson.com';
const API_PATH = '/products';    // (para las APIs pública de ejemplo)


// -- Si en algún momento usas Fake Store o DummyJSON, solo cambia API_BASE y API_PATH --
// const API_BASE = 'https://fakestoreapi.com'; const API_PATH = '/products';
// const API_BASE = 'https://dummyjson.com';    const API_PATH = '/products';

const productos = ref([]);
const error = ref(null);

/* Auxiliar: ¿es URL absoluta? */
function esUrlAbsoluta(str) {
  return typeof str === 'string' && /^https?:\/\//i.test(str);
}

/* Auxiliar: construir URL de la foto */
function urlFoto(p) {
  // Si viene de API pública con URL completa, úsala.
  if (p?.foto && esUrlAbsoluta(p.foto)) return p.foto;

  // Si es local (solo nombre de archivo), servir desde backend/public/imagenes/productos
  if (p?.foto) return `${API_BASE}/imagenes/productos/${p.foto}`;

  // Fallback opcional (imagen genérica o nada)
  return '';
}

/* (Opcional) Normalizador simple por si a futuro mezclas orígenes */
function normalizar(raw) {
  // Ya vienen en tu formato local
  if (Array.isArray(raw) && raw.length && 'nombre' in raw[0]) return raw;

  // Fake Store API: arreglo con 'title', 'image', 'rating.count'
  if (Array.isArray(raw) && raw.length && 'title' in raw[0]) {
    return raw.map(p => ({
      nombre: p.title,
      foto: p.image,                // puede ser absoluta
      votacion: p.rating?.count ?? 0
    }));
  }

  // DummyJSON: { products: [...] }
  if (raw && Array.isArray(raw.products)) {
    return raw.products.map(p => ({
      nombre: p.title,
      foto: p.thumbnail || p.images?.[0], // puede ser absoluta
      votacion: Math.round((p.rating ?? 0) * 20)
    }));
  }

  return [];
}

/* Primer producto (para la sección inferior) */
const primerProducto = computed(() => productos.value[0] ?? null);

onMounted(async () => {
  try {
    const url = `${API_BASE}${API_PATH}`;
    console.log('URL consultada:', url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

    const data = await res.json();
    productos.value = normalizar(data);
    error.value = null;
  } catch (err) {
    console.error('Error cargando productos:', err);
    error.value = `No se pudo cargar la información (${err.message})`;
    productos.value = []; // ← corregido
  }
});


</script>

<template>
  <main>
    <h1>Mi primera app Vue</h1>

    <!-- ✅ Mensaje de error visible -->
    <p v-if="error" style="color: red; font-weight: bold;">
      ⚠️ {{ error }}
    </p>

    <!-- ✅ Listado normal -->
    <ul v-else>
      <li v-for="p in productos" :key="p.nombre">
        {{ p.nombre }} - {{ p.foto }} - {{ p.votacion }}
      </li>
    </ul>


    <!-- ====== Sección complementaria ====== -->
    <hr />

    <section v-if="primerProducto" style="margin-top: 1rem;">
      <h2 style="margin: 0 0 0.5rem 0;">Producto destacado (primero del listado)</h2>
      <p>
        <strong>Nombre:</strong> {{ primerProducto.nombre }}<br />
        <strong>Foto (valor del campo):</strong> {{ primerProducto.foto }}<br />
        <strong>Votación:</strong> {{ primerProducto.votacion }}
      </p>

      <!-- Imagen renderizada desde URL -->
      <img
        :src="urlFoto(primerProducto)"
        alt="Foto del producto"
        style="max-width: 280px; border: 1px solid #ddd; padding: 6px; border-radius: 6px;"
      />
    </section>

  </main>
</template>
