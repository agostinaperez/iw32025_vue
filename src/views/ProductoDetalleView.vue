<template>
  <v-container>
    <h2>Detalle del producto</h2>
    <div v-if="producto">
      <p>Nombre: {{ producto.nombre }}</p>
      <p>Precio: {{ producto.precio }}</p>
      <p>Stock: {{ producto.stock }}</p>
      <v-btn @click="volver">
        Volver
      </v-btn>
    </div>
    <p v-else>
      Producto no encontrado
    </p>
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
