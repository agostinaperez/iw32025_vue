<template>
  <v-app class="home-app">
    <!-- Hero principal -->
    <v-container
      class="fill-height d-flex flex-column justify-center align-center text-center hero"
      fluid
    >
      <h1 class="display-2 font-weight-bold hero-title">
        Descubre tu estilo
      </h1>
      <p class="subtitle-1 mb-6 hero-subtitle">
        Moda única, diseñada para brillar en cada momento de tu vida.
      </p>
      <v-img
        src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&w=1200&q=80"
        alt="Moda femenina"
        max-width="800"
        class="rounded-xl shadow-lg"
      />
    </v-container>

    <!-- Sección productos destacados -->
    <v-container class="py-12 text-center" fluid>
      <h2 class="font-weight-bold mb-8 section-title">Productos Destacados</h2>
      <v-row>
        <v-col v-for="i in destacados" :key="i.id" cols="12" sm="6" md="4">
          <v-card class="rounded-xl shadow-lg hover-card">
            <v-img :src="i.img" height="250px" cover></v-img>
            <v-card-title>{{ i.nombre }}</v-card-title>
            <v-card-text>${{ i.precio }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Sección sobre nosotros -->
    <v-container class="py-12 about-section" fluid>
      <v-row class="align-center">
        <v-col cols="12" md="6">
          <v-img
            src="../src/assets/hannah-morgan-ycVFts5Ma4s-unsplash.jpg"
            alt="Local de ropa"
            class="rounded-xl shadow-lg"
          />
        </v-col>
        <v-col cols="12" md="6" class="text-center text-md-left">
          <h2 class="font-weight-bold section-title">Sobre Nosotros</h2>
          <p class="subtitle-1" style="color:#4a148c;">
            En <strong>Moda Shop</strong> creemos que la moda es más que ropa: 
            es una forma de expresión. Desde hace más de 5 años vestimos a 
            miles de personas que buscan estilo, comodidad y calidad.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Footer -->
    <v-footer class="pa-6 text-center" color="#880e4f" dark>
      <v-col>
        <p class="mb-0">&copy; 2025 Moda Shop - Todos los derechos reservados</p>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import remera from '../assets/cristofer-maximilian-AqLIkOzWDAk-unsplash.jpg';
import pantalon from '../assets/matthew-moloney-YeGao3uk8kI-unsplash.jpg';
import camisa from '../assets/santhosh-kumar-RqYTuWkTdEs-unsplash.jpg';

const destacados = [
  {
    id: 1,
    nombre: 'Remera Lisa',
    precio: 4500,
    img: remera
  },
  {
    id: 2,
    nombre: 'Camisa Casual',
    precio: 3200,
    img: camisa
  },
  {
    id: 3,
    nombre: 'Pantalón Denim',
    precio: 5100,
    img: pantalon
  }
];
</script>

<style scoped>
.home-app {
  min-height: 100vh;
  background-color: white;
}

.hero {
  background-color: #f8bbd0;
  padding: 60px 20px;
}

.hero-title {
  color: #880e4f;
}

.hero-subtitle {
  color: #4a148c;
}

.section-title {
  color: #880e4f;
}

.about-section {
  background-color: #f8bbd0;
}

.hover-card {
  transition: transform 0.3s ease;
}
.hover-card:hover {
  transform: translateY(-5px);
}
</style>
