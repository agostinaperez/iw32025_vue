<template>
  <v-container class="text-center">
    <h1 class="display-1 mb-4">
      Bienvenido a Mi Tienda
    </h1>
    <p class="subtitle-1 mb-6">
      Gestiona tus productos y clientes fácilmente.
    </p>
    <v-btn
      color="blue darken-2"
      dark
      :to="{ name: 'login' }"
    >
      Iniciar Sesión
    </v-btn>
  </v-container>
</template>

<script setup>
</script>
