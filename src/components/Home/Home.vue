<script setup lang="ts">
import HomeHero from "./HomeHero.vue";
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
let animationId: number;

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const createStars = (width: number, height: number, count: number): Star[] => {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    });
  }
  return stars;
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();

  let stars = createStars(canvas.width, canvas.height, 300);

  const draw = (time: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
      const flicker =
        Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * flicker})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
    animationId = requestAnimationFrame(draw);
  };

  animationId = requestAnimationFrame(draw);

  const onResize = () => {
    resize();
    stars = createStars(canvas.width, canvas.height, 300);
  };
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
});
</script>

<template>
  <div class="home">
    <canvas ref="canvasRef" class="home__stars" />
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

  &__stars {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}
</style>
