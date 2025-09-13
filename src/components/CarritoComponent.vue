<template>
  <v-card class="mt-6">
    <v-card-title>Carrito</v-card-title>
    <v-card-text v-if="props.items.length === 0">
      El carrito está vacío
    </v-card-text>
    <v-card-text v-else>
      <v-row
        v-for="item in props.items"
        :key="item.id"
        class="mb-2"
      >
        <v-col>{{ item.nombre }}</v-col>
        <v-col>
          <v-btn
            small
            @click="decrementar(item)"
          >
            −
          </v-btn>
          {{ item.cantidad }}
          <v-btn
            small
            @click="incrementar(item)"
          >
            +
          </v-btn>
        </v-col>
        <v-col>Subtotal: {{ item.precio * item.cantidad }}</v-col>
      </v-row>
      <p class="mt-2 font-bold">
        Total: {{ total }}
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
  },
  default: {
    type: [String, Number, Boolean, Array, Object], 
    default: ""
  }
})

const emit = defineEmits(['update:items']);

function incrementar(item) {
  item.cantidad++;
}

function decrementar(item) {
  item.cantidad--;
  if (item.cantidad <= 0) {
    const index = props.items.indexOf(item);
    if (index > -1) props.items.splice(index, 1);
  }
}

const total = computed(() => {
  return props.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
});
</script>
