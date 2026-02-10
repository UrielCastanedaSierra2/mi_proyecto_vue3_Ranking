<script setup>
import { ref, onMounted } from 'vue'
import { obtenerProductos } from '@/services/productosService'
import { obtenerImagen } from '@/utils/images'

// Estados reactivos
const productoGanador = ref(null)
const cargando = ref(true)
const error = ref(null)



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

/* ==========================================================
   FUNCIONES Utilitarias para tratamiento de URLs de imágenes
   ========================================================== */

// ==== Auxiliar: Determina si el dato es URL absoluta? 
function esUrlAbsoluta(str) {
  return typeof str === 'string' && /^https?:\/\//i.test(str);
}

// ==== Auxiliar: Constructor de la URL de la foto indicada en p 
//      en e HTML asigne la referencia usando esta función
//      <img  :src="urlFoto(variable_que_contiene_el_dato_de_la_foto) />
function urlFoto(foto) {
  // Si viene de API pública con URL completa, úsa esa misma  (ya tiene la url completa).
  if (foto && esUrlAbsoluta(foto)) return foto;

  // Si es local (solo nombre de archivo), servir desde backend/public/imagenes/productos
  if (foto) return `${API_BASE}/imagenes/productos/${foto}`;

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

onMounted(async () => {
  try {
    const url = `${API_BASE}${API_PATH}`;
    console.log('URL consultada:', url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

    // transferimos los datos leidos (en formato json) a un array (arreglo de Registros u objetos)
     const data = await res.json();
     
    // preprocesamos los datos leidos para normalizar su contenido
    // dependiendo de la fuente de datos. Estas fuentes las revisa la función normalizar().
    const productos = [...normalizar(data)];

    // Se ordenan los datos en forma descendente por votos
    // con ello el primer elemento del vector será el de mayor votación
    productoGanador.value = [...productos]
      .sort((a, b) => b.votacion - a.votacion)[0]

/*
   alert("aqui voy  "  + productoGanador.value.nombre 
   + "   " + urlFoto(productoGanador.value.foto)
   + "   " + productoGanador.value.votacion  );
*/  

    error.value = null;    // Aseguramos que el proceso finalizó sin errores
  } catch (err) {
    console.error('Error cargando productos:', err);
    error.value = `No fue posible obtener el producto ganador\n(${err.message})`    
    productos.value = [];   // dejamos el vector vacío 
                            // así aseguramos borrado de datos inconsistentes
  } finally {
    // en caso de final satisfactorio, indicamos "final del estado cargando datos"
    cargando.value = false
  }  
});


/*
const obtenerImagen = (foto) => {
  return `/imagenes/productos/${foto}`
}
*/
</script>

<template>
  <section>
    <h2>🏆 Producto Ganador</h2>

    <p v-if="cargando">Cargando información...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <article v-if="productoGanador" class="tarjeta-producto">

      <!-- Imagen renderizada desde URL -->
      <img
        :src="productoGanador.foto"
        :alt="productoGanador.nombre"
      />
      <h3>{{ productoGanador.nombre }}</h3>
      <p>Votos obtenidos: {{ productoGanador.votacion }}</p>
    </article>
  </section>
</template>
