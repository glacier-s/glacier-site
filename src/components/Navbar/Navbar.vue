<script setup lang="ts">
import NavLogo from "./NavLogo.vue";
import NavItems from "./NavItems.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import type { NavItem } from "./NavItems.vue";

const items: NavItem[] = [
  { label: "Ports", href: "/ports" },
  { label: "Palette", href: "/palette" },
];
</script>

<template>
  <nav class="navbar-wrapper">
    <div class="navbar">
      <div class="navbar-start">
        <NavLogo />
      </div>
      <div class="navbar-end">
        <NavItems :items="items" />
        <ThemeSwitcher />
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar-wrapper {
  position: relative;
  top: $spacing-md;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding: 0 $spacing-sm;
  z-index: 10;

  @include respond-to(sm) {
    padding: 0 $spacing-lg;
  }

  @include respond-to(lg) {
    padding: 0 $spacing-xl;
  }
}

.navbar {
  @include flex-between;
  width: 100%;
  padding: $spacing-sm $spacing-md;
  margin: 0;
  border-radius: $radius-xl;
  pointer-events: auto;

  @include respond-to(md) {
    margin: 0 $spacing-lg;
  }

  @include respond-to(xl) {
    margin: 0 $spacing-2xl;
  }
}

.navbar-start {
  @include flex-center;
}

.navbar-end {
  @include flex-center;
  gap: $spacing-sm;

  @include respond-to(sm) {
    gap: $spacing-md;
  }
}
</style>
