<script setup lang="ts">
import HomeHero from "./HomeHero.vue";
import PixelSnow from "./PixelSnow.vue";
import { ref, onMounted } from "vue";

const snowColor = ref("#E0E0ED");

const getCSSVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const updateColor = () => {
  snowColor.value = getCSSVar("--color-text") || "#E0E0ED";
};

onMounted(() => {
  updateColor();
  const observer = new MutationObserver(() => updateColor());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
});
</script>

<template>
  <div class="home">
    <PixelSnow
      :color="snowColor"
      :flakeSize="0.01"
      :minFlakeSize="1.25"
      :pixelResolution="500"
      :speed="1.9"
      :density="0.4"
      :direction="125"
      :brightness="0.8"
      :variant="'snowflake'"
      class="home__snow"
    />
    <HomeHero />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  position: relative;

  &__snow {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}
</style>
