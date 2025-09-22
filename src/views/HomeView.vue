<template>
  <v-app class="home-app">
    <v-container
      class="fill-height d-flex flex-column justify-center align-center pa-0"
      fluid
    >
      <v-card
        class="pa-8 text-center"
        elevation="6"
        rounded="xl"
        max-width="800"
        color="#f8bbd0"
      >
        <v-card-title class="justify-center">
          <h1 class="display-2 font-weight-bold" style="color:#880e4f;">
            Bienvenido a Mi Tienda
          </h1>
        </v-card-title>

        <v-card-text>
          <p class="subtitle-1 mb-6" style="color:#4a148c;">
            Gestiona tus productos y clientes fácilmente.
          </p>

          <v-btn
            large
            rounded
            elevation="3"
            color="#880e4f"
            dark
            :to="{ name: 'login' }"
          >
            Iniciar Sesión
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
</script>

<style scoped>
.home-app {
  min-height: 100vh;
  background-color: white
}

.fill-height {
  min-height: 100vh;
}
</style>

