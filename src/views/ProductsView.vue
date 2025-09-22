<template>
  <v-container>
    <v-text-field
      v-model="busqueda"
      label="Buscar productos"
      class="mb-4"
    />

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

    <p v-if="productosFiltrados.length === 0">
      No se encontraron productos.
    </p>

    <CarritoComponent
      :items="carrito"
      @update:items="actualizarCarrito"
      :productos="productos"
    />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductoItem from '../components/ProductoItem.vue';
import CarritoComponent from '../components/CarritoComponent.vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const auth = useAuth();

const productos = ref([
  { id: 1, nombre: 'Producto A', precio: 100, stock: 5 },
  { id: 2, nombre: 'Producto B', precio: 200, stock: 0 },
  { id: 3, nombre: 'Producto C', precio: 150, stock: 10 },
]);

const stockOriginal = {
  1: 5,
  2: 0,
  3: 10
};

const busqueda = ref('');
const carrito = ref([]);

const productosFiltrados = computed(() =>
  productos.value.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
);

function handleAddToCart(id) {
  if (!auth.isAuthenticated()) {
    router.push({ name: 'login' });
    return;
  }

  const producto = productos.value.find(p => p.id === id);
  if (!producto || producto.stock <= 0) return;

  producto.stock--;

  const item = carrito.value.find(i => i.id === id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.value.push({ ...producto, cantidad: 1 });
  }
}

function actualizarCarrito(nuevoCarrito) {
  carrito.value = nuevoCarrito;

  // Recalcular stock
  productos.value.forEach(p => {
    const enCarrito = carrito.value.find(i => i.id === p.id);
    const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;
    p.stock = stockOriginal[p.id] - cantidadEnCarrito;
  });
}

function verDetalle(id) {
  router.push({ name: 'producto-detalle', params: { id } });
}
</script>
