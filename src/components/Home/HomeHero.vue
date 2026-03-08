<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

const themes = ["zero", "mist", "peak"] as const;
type Theme = (typeof themes)[number];

const currentTheme = ref<Theme>("zero");
const showThemeMenu = ref(false);

const buttonRef = useTemplateRef<HTMLButtonElement>("buttonRef");
const menuRef = useTemplateRef<HTMLDivElement>("menuRef");

const applyTheme = (theme: Theme) => {
  currentTheme.value = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("glacier-theme", theme);
};

const setTheme = (theme: Theme) => {
  applyTheme(theme);
  showThemeMenu.value = false;
};

const toggleThemeMenu = () => {
  showThemeMenu.value = !showThemeMenu.value;
};

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node | null;

  if (
    showThemeMenu.value &&
    buttonRef.value &&
    menuRef.value &&
    target &&
    !buttonRef.value.contains(target) &&
    !menuRef.value.contains(target)
  ) {
    showThemeMenu.value = false;
  }
};

onMounted(() => {
  const saved = localStorage.getItem("glacier-theme");

  if (saved && themes.includes(saved as Theme)) {
    applyTheme(saved as Theme);
  } else {
    applyTheme("zero");
  }

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="home-hero">
    <div class="home-hero__theme">
      <button
        ref="buttonRef"
        class="home-hero__theme-btn"
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
        Themes
      </button>

      <Transition name="theme-fade">
        <div v-if="showThemeMenu" ref="menuRef" class="home-hero__theme-menu">
          <button
            v-for="theme in themes"
            :key="theme"
            class="home-hero__theme-option"
            :class="{ active: currentTheme === theme }"
            @click="setTheme(theme)"
          >
            <span
              class="home-hero__theme-preview"
              :class="`home-hero__theme-preview--${theme}`"
            />
            <span>{{ theme }}</span>
          </button>
        </div>
      </Transition>
    </div>

    <h1>Where Midnight Ink Meets the Stars.</h1>

    <p>
      Experience the silence of the Arctic Abyss. A palette born from
      crystalline mana to soothe your eyes and sharpen your focus.
    </p>

    <div class="home-hero__actions">
      <router-link to="/ports" class="home-hero__btn home-hero__btn--primary">
        Ports
      </router-link>

      <router-link
        to="/palette"
        class="home-hero__btn home-hero__btn--secondary"
      >
        Palette
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;
  max-width: 800px;

  h1 {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: var(--color-text);
    margin-bottom: $spacing-md;
    line-height: $line-height-tight;
  }

  p {
    max-width: 560px;
    font-size: $font-size-lg;
    color: var(--color-subtle);
    margin-bottom: $spacing-2xl;
    line-height: $line-height-base;
  }

  &__theme {
    position: relative;
    margin-bottom: $spacing-xl;
  }

  &__theme-btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm $spacing-lg;
    border: 1px solid var(--color-highlight-high);
    border-radius: $radius-pill;
    background: transparent;
    color: var(--color-text);
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition:
      background-color $transition-fast,
      border-color $transition-fast;

    &:hover {
      background-color: var(--color-overlay);
      border-color: var(--color-subtle);
    }
  }

  &__theme-menu {
    position: absolute;
    top: calc(100% + #{$spacing-sm});
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 4px;
    min-width: 160px;
    border-radius: $radius-lg;
    background-color: var(--color-surface);
    border: 1px solid var(--color-highlight-med);
    box-shadow: $shadow-lg;
    z-index: $z-dropdown;
  }

  &__theme-option {
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

  &__theme-preview {
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

  &__actions {
    display: flex;
    gap: $spacing-lg;
  }

  &__btn {
    padding: $spacing-md $spacing-2xl;
    border-radius: $radius-pill;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    text-decoration: none;
    transition:
      background-color $transition-base,
      border-color $transition-base,
      transform $transition-fast;

    &:hover {
      transform: translateY(-1px);
    }

    &--primary {
      background-color: var(--color-cyanide);
      color: var(--color-base);

      &:hover {
        opacity: 0.9;
      }
    }

    &--secondary {
      background-color: var(--color-highlight-med);
      color: var(--color-text);
      border: 1px solid var(--color-highlight-high);

      &:hover {
        background-color: var(--color-highlight-high);
      }
    }
  }
}

.theme-fade-enter-active,
.theme-fade-leave-active {
  transition:
    opacity $transition-fast,
    transform $transition-fast;
}

.theme-fade-enter-from,
.theme-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}
</style>
