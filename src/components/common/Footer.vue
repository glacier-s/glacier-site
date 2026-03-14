<script setup lang="ts">
import Github from '@/assets/svg/github.svg';

const currentYear: number = new Date().getFullYear();
</script>

<template>
  <footer>
    <p>Copyright &copy; {{ currentYear }} Glacier</p>
    <a class="icon" href="https://github.com/kuzanf3b/glacier.git">
      <img :src="Github" alt="github" />
    </a>
  </footer>
</template>

<style scoped lang="scss">
footer {
  @include flex-between;
  height: 10vh;
  margin: $spacing-md $spacing-4xl;

  p {
    color: var(--color-subtle);
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
  }

  .icon {
    @include flex-center;

    img {
      width: 24px;
    }
  }
}
</style>
