<script setup lang="ts">
import { ref } from "vue";
import { palette } from "@/module/palette";

type RoleKey = keyof typeof palette.roles;
type VariantKey = keyof typeof palette.colors;

const variantKeys: VariantKey[] = ["zero", "mist", "peak"];

const roleEntries = Object.entries(palette.roles).map(([key, role]) => {
  const swatches = variantKeys.map((vk) => {
    const colors = palette.colors[vk] as Record<string, string>;
    return { variant: vk, hex: colors[key] || "#000000" };
  });

  return {
    key: key as RoleKey,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    subtitle: role.subtitle,
    descriptionHtml: role.description.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>",
    ),
    tags: role.tags,
    swatches,
  };
});

const copiedKey = ref<string | null>(null);
let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

async function copyToClipboard(value: string, key: string) {
  try {
    await navigator.clipboard.writeText(value);
    copiedKey.value = key;
    if (copiedTimeout) clearTimeout(copiedTimeout);
    copiedTimeout = setTimeout(() => {
      copiedKey.value = null;
    }, 1500);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}
</script>

<template>
  <div class="collections">
    <div class="collections-grid">
      <div v-for="role in roleEntries" :key="role.key" class="collection-card">
        <div class="collection-card-header">
          <div class="collection-card-title">
            <h4>{{ role.name }}</h4>
            <p class="collection-subtitle">{{ role.subtitle }}</p>
          </div>
          <div class="swatch-group">
            <div v-for="sw in role.swatches" :key="sw.variant" class="swatch-wrapper">
              <span class="swatch-dot" :style="{ backgroundColor: sw.hex }"></span>
              <div class="swatch-tooltip" @click.stop="
                copyToClipboard(sw.hex, role.key + '-' + sw.variant)
                ">
                {{
                  copiedKey === role.key + "-" + sw.variant ? "Copied!" : sw.hex
                }}
              </div>
            </div>
          </div>
        </div>

        <p class="collection-description" v-html="role.descriptionHtml"></p>

        <div class="collection-tags">
          <span v-for="tag in role.tags" :key="tag" class="collection-tag" :class="'tag-' + role.key">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.collections {
  background-color: var(--color-base);
  padding: $spacing-lg $spacing-md;
  margin: $spacing-xl $spacing-md;

  @include respond-to(sm) {
    padding: $spacing-lg $spacing-xl;
    margin: $spacing-2xl $spacing-xl;
  }

  @include respond-to(lg) {
    margin: $spacing-3xl $spacing-2xl;
  }

  @include respond-to(xl) {
    margin: $spacing-3xl $spacing-3xl;
  }
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr); // 1 col on phones
  gap: $spacing-md;

  @include respond-to(sm) {
    grid-template-columns: repeat(2, 1fr); // 2 cols on sm
  }

  @include respond-to(lg) {
    grid-template-columns: repeat(3, 1fr); // 3 cols on lg+
  }
}

.collection-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-overlay);
  border-radius: $radius-lg;
  padding: $spacing-lg;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  transition: border-color $transition-fast;

  &:hover {
    border-color: var(--color-muted);
  }
}

.collection-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.collection-card-title {
  h4 {
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    color: var(--color-text);
    margin: 0;
  }
}

.collection-subtitle {
  font-size: $font-size-sm;
  font-style: italic;
  color: var(--color-subtle);
  margin: $spacing-xs 0 0 0;
}

.swatch-group {
  display: flex;
  gap: 2px;
  align-items: center;
  flex-shrink: 0;
}

.swatch-wrapper {
  position: relative;

  .swatch-dot {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: block;
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: transform $transition-fast;
  }

  &:hover .swatch-dot {
    transform: scale(1.3);
  }

  .swatch-tooltip {
    position: absolute;
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-overlay);
    color: var(--color-text);
    font-size: $font-size-xs;
    font-family: $font-family-mono;
    padding: $spacing-xs $spacing-sm;
    border-radius: $radius-md;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity $transition-fast;
    z-index: $z-dropdown;
    cursor: pointer;
  }

  &:hover .swatch-tooltip {
    opacity: 1;
    pointer-events: auto;
  }
}

.collection-description {
  font-size: $font-size-sm;
  color: var(--color-subtle);
  line-height: $line-height-base;
  margin-bottom: $spacing-lg;
  flex-grow: 1;

  :deep(strong) {
    color: var(--color-text);
    font-weight: $font-weight-semibold;
  }
}

.collection-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
  margin-top: auto;
}

.collection-tag {
  font-size: $font-size-xs;
  font-family: $font-family-mono;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-md;
  border: 1px solid var(--color-overlay);
  color: var(--color-subtle);
  background: transparent;
  transition: all $transition-fast;

  // Accent-colored tags
  &.tag-coral {
    color: var(--color-coral);
    border-color: var(--color-coral);
  }

  &.tag-amber {
    color: var(--color-amber);
    border-color: var(--color-amber);
  }

  &.tag-stream {
    color: var(--color-stream);
    border-color: var(--color-stream);
  }

  &.tag-leaf {
    color: var(--color-leaf);
    border-color: var(--color-leaf);
  }

  &.tag-cyanide {
    color: var(--color-cyanide);
    border-color: var(--color-cyanide);
  }

  &.tag-lilac {
    color: var(--color-lilac);
    border-color: var(--color-lilac);
  }
}
</style>
