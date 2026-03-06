<script setup lang="ts">
import HomeHero from "./HomeHero.vue";
import CardSwap from "./CardSwap.vue";
import SchemeCard from "./SchemeCard.vue";
import { pallete } from "@/module/pallete";

const handleCardClick = (index: number) => {
  console.log(`Card ${index} clicked`);
};

const schemes = [
  { name: "Zero", key: "zero" as const },
  { name: "Mist", key: "mist" as const },
  { name: "Peak", key: "peak" as const },
] as const;
</script>

<template>
  <div class="home">
    <HomeHero />

    <div class="home__card">
      <CardSwap
        :card-distance="60"
        :vertical-distance="70"
        :delay="5000"
        :skew-amount="6"
        easing="elastic"
        :pause-on-hover="true"
        :width="460"
        :height="320"
        @card-click="handleCardClick"
      >
        <template
          v-for="(scheme, i) in schemes"
          :key="scheme.key"
          #[`card-${i}`]
        >
          <SchemeCard
            :name="scheme.name"
            :colors="pallete.colors[scheme.key]"
          />
        </template>
      </CardSwap>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  margin: 0 $spacing-4xl;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80vh;
  overflow: visible;
  position: relative;

  &__card {
    position: relative;
    flex-shrink: 0;
    width: 640px;
    height: 500px;
  }
}
</style>
