<script setup lang="ts">
import HomeHero from "./HomeHero.vue";
import PixelSnow from "./PixelSnow.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const snowColor = ref("#E0E0ED");
const showSnow = ref(true);

const getCSSVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const updateColor = () => {
  snowColor.value = getCSSVar("--color-text") || "#E0E0ED";
};

let mql: MediaQueryList | null = null;
const handleMql = (e: MediaQueryListEvent | MediaQueryList) => {
  showSnow.value = e.matches;
};

onMounted(() => {
  updateColor();
  const observer = new MutationObserver(() => updateColor());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // Disable WebGL PixelSnow on screens narrower than 768px for mobile performance
  mql = window.matchMedia("(min-width: 768px)");
  handleMql(mql);
  mql.addEventListener("change", handleMql);
});

onBeforeUnmount(() => {
  mql?.removeEventListener("change", handleMql);
});
</script>

<template>
  <div class="home">
    <PixelSnow v-if="showSnow" :color="snowColor" :flakeSize="0.01" :minFlakeSize="1.25" :pixelResolution="500"
      :speed="1.25" :density="0.4" :direction="125" :brightness="0.8" :variant="'snowflake'" class="home__snow" />
    <HomeHero />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  padding: $spacing-md;

  &__snow {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}
</style>
