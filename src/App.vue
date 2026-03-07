<script setup lang="ts">
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar/Navbar.vue'
import Footer from './components/common/Footer.vue'

const route = useRoute();
</script>

<template>
  <Navbar v-if="!route.meta.hideNavbar" />
  <router-view />
  <Footer v-if="!route.meta.hideFooter" />
</template>
