<template>
  <v-container class="detalle-container fill-height d-flex flex-column align-center justify-center">
    <div class="detalle-box pa-6 rounded-2xl">
      <h2 class="detalle-titulo mb-4">Detalle del producto</h2>

      <div v-if="producto" class="detalle-texto">
        <p><strong>Nombre:</strong> {{ producto.nombre }}</p>
        <p><strong>Precio:</strong> ${{ producto.precio }}</p>
        <p><strong>Stock:</strong> {{ producto.stock }}</p>

        <v-btn
          color="#f48fb1"
          dark
          rounded
          class="mt-4"
          @click="volver"
        >
          Volver
        </v-btn>
      </div>

      <div v-else class="detalle-texto">
        Producto no encontrado
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const productos = [
  { id: 1, nombre: 'Producto A', precio: 100, stock: 5 },
  { id: 2, nombre: 'Producto B', precio: 200, stock: 0 },
  { id: 3, nombre: 'Producto C', precio: 150, stock: 10 },
];

const producto = productos.find(p => p.id === parseInt(route.params.id));

function volver() {
  router.push({ name: 'productos' });
}
</script>

<style scoped>
.detalle-container {
  min-height: 70vh;
}

.detalle-box {
  color: #880e4f;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.detalle-titulo {
  font-size: 1.5rem;
  font-weight: bold;
}

.detalle-texto p {
  margin: 8px 0;
  font-size: 1.1rem;
}

.v-btn {
  text-transform: none;
}
</style>
