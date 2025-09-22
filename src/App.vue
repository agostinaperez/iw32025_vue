<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar app color="blue darken-2" dark>
      <v-toolbar-title>Mi Tienda</v-toolbar-title>
      <v-spacer />

      <v-btn text :to="{ name: 'productos' }">
        Productos
      </v-btn>

      <template v-if="auth.state.user">
        <span class="mr-4">{{ auth.state.user.email }}</span>
        <v-btn text @click="handleLogout">Cerrar sesión</v-btn>
      </template>
      <template v-else>
        <v-btn text :to="{ name: 'login' }">Iniciar Sesión</v-btn>
      </template>
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
import { useAuth } from "./composables/useAuth"
import { useRouter } from "vue-router"

const auth = useAuth()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push({ name: "login" })
}
</script>
