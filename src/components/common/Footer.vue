<script setup lang="ts">
const currentYear: number = new Date().getFullYear();
</script>

<template>
  <footer>
    <p>Copyright &copy; {{ currentYear }} Glacier</p>
    <a class="icon" href="https://github.com/kuzanf3b/glacier.git">
      <img src="@/assets/svg/github.svg" alt="github">
    </a>
  </footer>
</template>

<style scoped lang="scss">

footer {
  @include flex-between;
  height: 5vh;
  margin: $spacing-md $spacing-4xl;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;

  p {
    color: var(--color-subtle);
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
  }
}

.icon {
  @include flex-center;

  img {
    width: 24px;
    margin-right: $sidebar-width;
  }
}
</style>
