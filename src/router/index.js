import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/ProductsView.vue";
import ProductoDetalleView from "../views/ProductoDetalleView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/productos", name: "productos", component: ProductsView },
  { path: "/productos/:id", name: "detalle-producto", component: ProductoDetalleView, props: true },
  { path: "/login", name: "login", component: LoginView },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }; // restaurar scroll al navegar
  },
});

export default router;
