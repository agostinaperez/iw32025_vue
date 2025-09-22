<template>
  <v-container class="mt-6">
    <h2 class="mb-4">Mi Carrito</h2>

    <div v-if="cart.length === 0" class="text-center">
      El carrito está vacío
    </div>

    <v-row v-else>
      <v-col
        v-for="item in cart"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="pa-4 rounded-2xl detalle-box">
          <v-card-title>{{ item.nombre }}</v-card-title>
          <v-card-text>
            Precio: ${{ item.precio }} <br>
            Cantidad: {{ item.cantidad }}
          </v-card-text>
          <v-card-actions>
            <v-btn small @click="decrement(item.id)">−</v-btn>
            <v-btn small @click="increment(item.id)">+</v-btn>
            <v-btn small color="red darken-2" dark @click="removeFromCart(item.id)">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="cart.length > 0" class="mt-4 text-right detalle-texto">
      <strong>Total: ${{ total }}</strong>
    </div>
  </v-container>
</template>

<script setup>
import { useCart } from '../composables/useCart';

const { cart, increment, decrement, removeFromCart, total } = useCart();
</script>


<style scoped>
.detalle-box {
  color: #880e4f; 
}

.detalle-texto {
  font-size: 1.2rem;
  color: #880e4f;
}
</style>
