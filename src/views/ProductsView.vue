<template>
  <v-container class="products-background py-6">
    <!-- Buscador -->
    <v-text-field
      v-model="busqueda"
      label="Buscar productos"
      outlined
      dense
      class="mb-6"
      color="#f48fb1"
    />

    <!-- Lista de productos -->
    <v-row>
      <v-col
        v-for="producto in productosFiltrados"
        :key="producto.id"
        cols="12"
        sm="6"
        md="4"
      >
        <ProductoItem
          :producto="producto"
          @add-to-cart="handleAddToCart"
          @ver-detalle="verDetalle"
        />
      </v-col>
    </v-row>

    <p v-if="productosFiltrados.length === 0" class="text-center mt-6">
      No se encontraron productos.
    </p>

   <v-snackbar
      v-model="snackbar"
      color="green"
      timeout="2000"
      location="bottom center"
    >
      {{ mensajeSnackbar }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useCart } from '../composables/useCart';
import ProductoItem from '../components/ProductoItem.vue';

const router = useRouter();
const auth = useAuth();
const snackbar = ref(false);
const mensajeSnackbar = ref('');
const { addToCart, productosConStock } = useCart();

const busqueda = ref('');

// Filtrado dinámico
const productosFiltrados = computed(() =>
  productosConStock.value.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
);

function handleAddToCart(id) {
  if (!auth.isAuthenticated()) {
    router.push({ name: 'login' });
    return;
  }

  const producto = productosConStock.value.find(p => p.id === id);
  if (!producto || producto.stock <= 0) return;

  addToCart(producto);
  mensajeSnackbar.value = `${producto.nombre} agregado al carrito`;
  snackbar.value = true;
}

function verDetalle(id) {
  router.push({ name: 'producto-detalle', params: { id } });
}
</script>

<style scoped>
.products-background {
  background-color: #ffffff;
  min-height: 100vh;
  padding-bottom: 50px;
}

.text-center {
  text-align: center;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
