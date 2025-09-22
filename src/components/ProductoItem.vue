<template>
  <v-card :class="{'red lighten-4': producto.stock === 0}">
    <v-card-title>{{ producto.nombre }}</v-card-title>
    <v-card-text>
      Precio: {{ producto.precio }} <br>
      Stock: {{ producto.stock }}
      <span v-if="producto.stock === 0"> (Agotado)</span>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :disabled="producto.stock === 0"
        @click="$emit('add-to-cart', producto.id)"
      >
        Agregar al carrito
      </v-btn>
      <v-btn
        text
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
