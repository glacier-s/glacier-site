<script setup lang="ts">
import { palette } from "@/module/palette";
</script>

<template>
  <div class="palette">
    <header>
      <section class="header-left">
        <h4>Palette</h4>
        <p>{{ palette.description }}</p>
      </section>
      <section class="header-right">
        <router-link :to="{ name: 'Collections' }" class="group">
          Collections
        </router-link>
        <router-link :to="{ name: 'Potions' }" class="group">
          Potions
        </router-link>
      </section>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
header {
  @include flex-between;
  margin: $spacing-3xl $spacing-4xl;

  .header-left {
    @include flex-column;

    h4 {
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      color: var(--color-text);
      margin: 0;
    }

    p {
      font-size: $font-size-sm;
      font-style: italic;
      color: var(--color-subtle);
      margin: 0;
    }
  }

  .header-right {
    @include flex-center;
    gap: $spacing-xs;
    background-color: var(--color-surface);
    border-radius: $radius-lg;

    .group {
      padding: $spacing-sm $spacing-md;
      border: none;
      border-radius: $radius-lg;
      background: transparent;
      color: var(--color-text);
      font-size: $font-size-sm;
      font-family: $font-family-base;
      cursor: pointer;
      transition: all $transition-fast;
      text-decoration: none;

      &:hover {
        color: var(--color-text);
      }

      &.router-link-active {
        background-color: var(--color-overlay);
        box-shadow: 2px 0 0 0 var(--color-overlay);
        color: var(--color-text);
      }
    }
  }
}
</style>
