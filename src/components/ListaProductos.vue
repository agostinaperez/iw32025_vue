<template>
  <div class="product-list">
    <h2>Listado de Productos</h2>

    <!-- Input de búsqueda -->
    <input
      v-model="search"
      type="text"
      placeholder="Buscar producto..."
      class="search"
    >

    <!-- Lista de productos -->
    <ul v-if="filteredProducts.length > 0">
      <li
        v-for="p in filteredProducts"
        :key="p.id"
        :class="{ 'out-of-stock': p.stock === 0 }"
      >
        {{ p.nombre }} — ${{ p.precio }}  
        <span v-if="p.stock === 0">(Sin stock)</span>
        <button
          :disabled="p.stock === 0"
          @click="$emit('add-to-cart', p.id)"
        >
          Agregar al carrito
        </button>
      </li>
    </ul>

    <!-- Estado vacío -->
    <p v-else>
      No se encontraron productos
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const search = ref("");

const products = ref([
  { id: 1, nombre: "Manzana", precio: 100, stock: 5 },
  { id: 2, nombre: "Banana", precio: 80, stock: 0 },
  { id: 3, nombre: "Naranja", precio: 120, stock: 10 },
]);

// Filtro case-insensitive
const filteredProducts = computed(() =>
  products.value.filter((p) =>
    p.nombre.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<style scoped>
.search {
  margin-bottom: 12px;
  padding: 6px;
}
.out-of-stock {
  color: #999;
}
button {
  margin-left: 10px;
}
</style>
