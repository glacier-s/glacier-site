<script setup lang="ts">
export type NavItem = {
  label: string;
  href: string;
};

interface Props {
  items: NavItem[];
}

defineProps<Props>();
</script>

<template>
  <ul class="nav-links">
    <li v-for="item in items" :key="item.href">
      <RouterLink :to="item.href" class="nav-link">
        {{ item.label }}
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.nav-links {
  @include flex-center;
  gap: $spacing-md;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-link {
  color: var(--color-subtle);
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  text-decoration: none;
  transition: color $transition-fast;

  &:hover,
  &.router-link-active {
    color: var(--color-text);
  }
}
</style>
