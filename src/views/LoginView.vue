<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card elevation="6" class="pa-6 rounded-2xl">
          <v-card-title class="justify-center">Ingresar</v-card-title>

          <v-card-text>
            <form @submit.prevent="onSubmit" novalidate>
              <v-text-field
                v-model="email"
                label="Email"
                :error-messages="emailErrors"
                :rules="[]"
                required
                autocomplete="username"
                aria-label="email"
                aria-required="true"
              />
              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                :error-messages="passwordErrors"
                required
                autocomplete="current-password"
                aria-label="contraseña"
                aria-required="true"
              />

              <div class="mt-4 d-flex justify-space-between align-center">
                <v-btn
                  :disabled="!formValido || loading"
                  type="submit"
                  class="ma-0"
                >
                  <span v-if="!loading">Ingresar</span>
                  <span v-else>
                    <v-progress-circular indeterminate size="18" width="2" />
                    &nbsp;Ingresando...
                  </span>
                </v-btn>

                <div v-if="errorMessage" class="text-error" role="alert" aria-live="assertive">
                  {{ errorMessage }}
                </div>
              </div>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { login, isAuthenticated, authState } from '../composables/useAuth';

const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = computed(() => authState.loading);

// validaciones simples
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailErrors = computed(() => {
  if (!email.value) return ['Email es requerido'];
  if (!emailRegex.test(email.value)) return ['Formato de email inválido'];
  return [];
});

const passwordErrors = computed(() => {
  if (!password.value) return ['Contraseña es requerida'];
  if (password.value.length < 6) return ['La contraseña debe tener al menos 6 caracteres'];
  return [];
});

const formValido = computed(() => emailErrors.value.length === 0 && passwordErrors.value.length === 0);

// si ya está autenticado evitamos ingresar a login
if (isAuthenticated()) {
  router.replace({ path: '/' });
}

async function onSubmit() {
  errorMessage.value = '';
  if (!formValido.value) return;

  const res = await login({ email: email.value.trim(), password: password.value });
  if (!res.ok) {
    errorMessage.value = res.message;
    return;
  }

  // redirigir al home o a la ruta a la que intentó acceder (si la guard la guardó en query)
  const redirect = router.currentRoute.value?.query?.redirect || '/productos';
  router.replace(redirect);
}
</script>

<style scoped>
.rounded-2xl {
  border-radius: 1rem; /* 2xl approx */
}
.text-error {
  color: #b00020;
}
</style>
