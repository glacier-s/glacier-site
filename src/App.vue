<script setup lang="ts">
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar/Navbar.vue";
import Footer from "./components/common/Footer.vue";

const route = useRoute();
</script>

<template>
  <div class="app-layout">
    <Navbar v-if="!route.meta.hideNavbar" />
    <router-view class="app-content" />
    <Footer v-if="!route.meta.hideFooter" />
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-content {
  flex: 1;
}
</style>
