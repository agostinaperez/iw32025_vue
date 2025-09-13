<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar
      app
      color="blue darken-2"
      dark
    >
      <v-toolbar-title>Mi Tienda</v-toolbar-title>
      <v-spacer />
      <v-btn
        text
        :to="{ name: 'productos' }"
      >
        Productos
      </v-btn>
      <v-btn
        text
        :to="{ name: 'login' }"
      >
        Iniciar Sesión
      </v-btn>
    </v-app-bar>

    <!-- Contenido -->
    <v-main>
      <v-container class="mt-5">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
</script>

