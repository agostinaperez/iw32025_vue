import { ref, computed, watch } from 'vue';

const STORAGE_KEY = 'mi_app_cart_v1';
const cart = ref([]);

// Productos base (catálogo original con stock máximo)
const productosBase = ref([
  { id: 1, nombre: 'Gorra', precio: 100, stock: 5 },
  { id: 2, nombre: 'Buzo', precio: 200, stock: 0 },
  { id: 3, nombre: 'Campera', precio: 150, stock: 10 },
  { id: 4, nombre: 'Bandolera', precio: 100, stock: 5 },
  { id: 5, nombre: 'Chomba', precio: 200, stock: 3 },
  { id: 6, nombre: 'Camisa', precio: 150, stock: 12 },
]);

const stockOriginal = {
  1: 5,
  2: 0,
  3: 10,
  4: 5,
  5: 3,
  6: 12,
};
// Catálogo reactivo
const productos = ref(productosBase);

// Carrito persistido en localStorage
const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  try { cart.value = JSON.parse(saved); } catch {}
}

watch(cart, newCart => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
}, { deep: true });

// Productos con stock ajustado en base al carrito
const productosConStock = computed(() =>
  productos.value.map(p => {
    const enCarrito = cart.value.find(i => i.id === p.id);
    return {
      ...p,
      stock: stockOriginal[p.id] - (enCarrito ? enCarrito.cantidad : 0)
    };
  })
);

// ---- Funciones carrito ----
function addToCart(producto) {
  const index = cart.value.findIndex(i => i.id === producto.id);
  if (index > -1) {
    cart.value[index] = { ...cart.value[index], cantidad: cart.value[index].cantidad + 1 };
  } else {
    cart.value.push({ ...producto, cantidad: 1 });
  }
}

function increment(id) {
  const index = cart.value.findIndex(i => i.id === id);
  if (index === -1) return;

  const producto = productos.value.find(p => p.id === id);
  if (!producto) return;

  const cantidadEnCarrito = cart.value[index].cantidad;
  const stockDisponible = stockOriginal[id] - cantidadEnCarrito;

  if (stockDisponible <= 0) return; // no incrementar más allá del stock

  cart.value[index] = { ...cart.value[index], cantidad: cantidadEnCarrito + 1 };
}

function decrement(id) {
  const index = cart.value.findIndex(i => i.id === id);
  if (index === -1) return;

  if (cart.value[index].cantidad <= 1) {
    cart.value.splice(index, 1);
  } else {
    cart.value[index] = { ...cart.value[index], cantidad: cart.value[index].cantidad - 1 };
  }
}

function removeFromCart(id) {
  const index = cart.value.findIndex(i => i.id === id);
  if (index > -1) cart.value.splice(index, 1);
}

const total = computed(() =>
  cart.value.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
);

export function useCart() {
  return {
    cart,
    productosConStock,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    total
  };
}
