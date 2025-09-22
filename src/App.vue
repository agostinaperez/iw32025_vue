<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar
      app
      color="#880e4f"
      dark
      elevate-on-scroll
    >
      <v-toolbar-title class="font-weight-bold">Mi Tienda</v-toolbar-title>
      <v-spacer />

      <v-btn text :to="{ name: 'productos' }">
        Productos
      </v-btn>

      <template v-if="auth.state.user">
        <span class="mr-4 font-weight-medium">
          {{ auth.state.user.email }}
        </span>
        <v-btn
          text
          color="white"
          @click="handleLogout"
        >
          Cerrar sesión
        </v-btn>
      </template>

      <template v-else>
        <v-btn
          text
          color="white"
          :to="{ name: 'login' }"
        >
          Iniciar Sesión
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container class="mt-5 pa-0 fill-height" fluid>
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

<style scoped>

.v-toolbar-title {
  letter-spacing: 1px;
}

.v-btn {
  text-transform: none;
}
</style>
