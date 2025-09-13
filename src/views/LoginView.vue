<template>
  <v-container class="d-flex justify-center mt-10">
    <v-card width="400">
      <v-card-title class="justify-center">
        Iniciar Sesión
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="usuario"
          label="Usuario"
        />
        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-2"
          dark
          block
          @click="login"
        >
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
    >
      {{ mensaje }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const usuario = ref('');
const password = ref('');
const snackbar = ref(false);
const mensaje = ref('');
//TODO
function login() {
  if (usuario.value.trim !== "" && password.value.trim !== "") {
    console.log("Cliente registrado:", usuario.value);
    mensaje.value = 'Bienvenido ' + usuario.value + '!';
  } else {
    mensaje.value = 'Por favor, complete todos los campos.';
  }
  snackbar.value = true;
}
</script>
