<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

const themes = ["zero", "mist", "peak"] as const;
const currentTheme = ref<string>("zero");
const showThemeMenu = ref(false);

const setTheme = (theme: string) => {
  currentTheme.value = theme;
  document.documentElement.setAttribute("data-theme", theme);
  showThemeMenu.value = false;
  localStorage.setItem("glacier-theme", theme);
};

const toggleThemeMenu = () => {
  showThemeMenu.value = !showThemeMenu.value;
};

const themeButtonRef = useTemplateRef<HTMLButtonElement>("themeButtonRef");
const themeMenuRef = useTemplateRef<HTMLDivElement>("themeMenuRef");

const handleClickOutside = (e: MouseEvent) => {
  if (
    showThemeMenu.value &&
    themeButtonRef.value &&
    themeMenuRef.value &&
    !themeButtonRef.value.contains(e.target as Node) &&
    !themeMenuRef.value.contains(e.target as Node)
  ) {
    showThemeMenu.value = false;
  }
};

onMounted(() => {
  const saved = localStorage.getItem("glacier-theme");
  if (saved && themes.includes(saved as (typeof themes)[number])) {
    setTheme(saved);
  }
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="theme-switcher">
    <button
      ref="themeButtonRef"
      class="theme-button"
      aria-label="Change color scheme"
      @click="toggleThemeMenu"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="1" y="1" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="6" y="1" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="11" y="1" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="1" y="6" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="6" y="6" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="11" y="6" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="1" y="11" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="6" y="11" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="11" y="11" width="4" height="4" rx="1" fill="currentColor" />
      </svg>
    </button>

    <Transition name="theme-fade">
      <div v-if="showThemeMenu" ref="themeMenuRef" class="theme-menu">
        <button
          v-for="theme in themes"
          :key="theme"
          class="theme-option"
          :class="{ active: currentTheme === theme }"
          @click="setTheme(theme)"
        >
          <span class="theme-preview" :class="`theme-preview--${theme}`" />
          <span class="theme-name">{{ theme }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.theme-switcher {
  position: relative;
}

.theme-button {
  @include flex-center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: $radius-pill;
  background-color: transparent;
  cursor: pointer;
  transition: background-color $transition-fast;

  &:hover {
    background-color: var(--color-overlay);
  }
}

.theme-dot {
  width: 16px;
  height: 16px;
  border-radius: $radius-pill;
  background: linear-gradient(
    135deg,
    var(--color-cyanide),
    var(--color-petal),
    var(--color-lilac)
  );
}

.theme-menu {
  position: absolute;
  top: calc(100% + #{$spacing-sm});
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
  min-width: 140px;
  border-radius: $radius-lg;
  background-color: var(--color-surface);
  box-shadow: $shadow-lg;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  border: none;
  border-radius: $radius-md;
  background: transparent;
  color: var(--color-text);
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  text-transform: capitalize;
  cursor: pointer;
  transition: background-color $transition-fast;

  &:hover {
    background-color: var(--color-overlay);
  }

  &.active {
    background-color: var(--color-highlight-med);
  }
}

.theme-preview {
  width: 16px;
  height: 16px;
  border-radius: $radius-pill;
  border: 2px solid var(--color-muted);

  &--zero {
    background-color: #13131c;
  }

  &--mist {
    background-color: #1a1b26;
  }

  &--peak {
    background-color: #ffffff;
  }
}

.theme-name {
  line-height: 1;
}

/* Transition */
.theme-fade-enter-active,
.theme-fade-leave-active {
  transition:
    opacity $transition-fast,
    transform $transition-fast;
}

.theme-fade-enter-from,
.theme-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
