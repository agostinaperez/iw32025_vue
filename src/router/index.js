import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import ProductoDetalleView from "../views/ProductoDetalleView.vue";
import LoginView from "../views/LoginView.vue";
import { isAuthenticated } from '../composables/useAuth';

const routes = [
  { path: "/", name: "home", component: HomeView, meta: { requiresAuth: false } },
  { path: "/productos", name: "productos", component: ProductsView, meta: { requiresAuth: false } },
  { path: "/productos/:id", name: "producto-detalle", component: ProductoDetalleView, props: true, meta: { requiresAuth: true } },
  { path: "/login", name: "login", component: LoginView },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }; // restaurar scroll al navegar
  },
});

//el guard
router.beforeEach((to, from, next) => {
  const needsAuth = to.matched.some(r => r.meta?.requiresAuth);
  const authed = isAuthenticated();

  if (needsAuth && !authed) {
    // Guardo la ruta q quiero para después de login
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }

  // si ya estoy logueado y quiero ir a login, me voy al home
  if (to.name === 'login' && authed) {
    return next({ name: 'home' });
  }

  return next();
});

export default router;
