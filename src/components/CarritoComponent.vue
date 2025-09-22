<template>
  <v-card class="mt-6 pa-4 carrito-card">
    <v-card-title class="font-weight-bold carrito-titulo">
      Carrito
    </v-card-title>

    <v-card-text v-if="items.length === 0" class="carrito-texto">
      El carrito está vacío
    </v-card-text>

    <v-card-text v-else>
      <v-row
        v-for="item in items"
        :key="item.id"
        class="mb-3 align-center"
      >
        <v-col class="carrito-texto">{{ item.nombre }}</v-col>

        <v-col class="d-flex align-center">
          <v-btn
            small
            color="#f48fb1"
            dark
            @click="decrementar(item)"
          >
            −
          </v-btn>
          <span class="mx-2 carrito-texto">{{ item.cantidad }}</span>
          <v-btn
            small
            color="#f48fb1"
            dark
            @click="incrementar(item)"
          >
            +
          </v-btn>
        </v-col>

        <v-col class="carrito-texto">
          Subtotal: ${{ item.precio * item.cantidad }}
        </v-col>
      </v-row>

      <p class="mt-4 font-weight-bold carrito-texto">
        Total: ${{ total }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:items']);

function incrementar(item) {
  if (item.stock <= 0) return;

  item.cantidad++;
  item.stock--;

  emit('update:items', [...props.items]);
}

function decrementar(item) {

  item.cantidad--;
  item.stock++;

    if (item.cantidad <= 0) {
    const index = props.items.indexOf(item);
    if (index > -1) props.items.splice(index, 1);
  }

  emit('update:items', [...props.items]);
}

const total = computed(() => {
  return props.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
});
</script>

<style scoped>
.carrito-card {
  background-color: #ffffff; 
  color: #880e4f; 
}

.carrito-titulo {
  color: #880e4f;
  font-size: 1.3rem;
}

.carrito-texto {
  color: #880e4f;
  font-size: 0.95rem;
}
</style>