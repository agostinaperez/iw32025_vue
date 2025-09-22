<template>
  <v-card
    elevation="4"
    class="pa-4 rounded-2xl producto-card"
    :class="{ 'producto-agotado': producto.stock === 0 }"
  >
    <v-card-title class="font-weight-bold">
      {{ producto.nombre }}
    </v-card-title>

    <v-card-text class="producto-texto">
      Precio: ${{ producto.precio }} <br>
      Stock: {{ producto.stock }}
      <span v-if="producto.stock === 0" class="agotado-texto"> (Agotado)</span>
    </v-card-text>

    <v-card-actions class="justify-space-between">
      <v-btn
        :disabled="producto.stock === 0"
        dark
        rounded
        @click="$emit('add-to-cart', producto.id)"
      >
        Agregar al carrito
      </v-btn>

      <v-btn
        text
        color="#880e4f"
        @click="$emit('ver-detalle', producto.id)"
      >
        Ver detalle
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  producto: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.producto-card {
  background-color: #ffc9db;
  color: #880e4f; 
  transition: transform 0.2s;
}

.producto-card:hover {
  transform: translateY(-5px);
}

.producto-agotado {
  background-color: #ffe5f3; /* rosa más claro si está agotado */
  color: #880e4f;
}

.agotado-texto {
  font-weight: bold;
  color: #b71c1c;
}

.producto-texto {
  font-size: 0.95rem;
}
</style>
