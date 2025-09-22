import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { restoreSession } from './composables/useAuth';

const vuetify = createVuetify({
  components,
  directives,
})

async function initApp() {
  // Restaurar sesión del localStorage antes de levantar la app
  restoreSession();

  const app = createApp(App);
  app.use(router);
  app.use(vuetify);
  app.mount("#app");
}

initApp();
