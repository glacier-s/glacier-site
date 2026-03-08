<script setup lang="ts">
import { ref, computed } from "vue";
import { palette } from "@/module/palette";

type VariantKey = keyof typeof palette.colors;

const activeVariant = ref<VariantKey>("zero");

const variants: { key: VariantKey; label: string }[] = [
  { key: "zero", label: "Zero" },
  { key: "mist", label: "Mist" },
  { key: "peak", label: "Peak" },
];

const colorEntries = computed(() => {
  const colors = palette.colors[activeVariant.value];

  if (!colors) return [];

  return Object.entries(colors).map(([key, value]) => {
    const hex = value;
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase());
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = hexToHsl(hex);
    return {
      key,
      label,
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${h}deg, ${s}%, ${l}%)`,
    };
  });
});

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function hexToHsl(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      case bn:
        h = ((rn - gn) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function toProperCase(str: string) {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}

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
  <div class="potions">
    <div class="potions-header">
      <h3>{{ palette.name }} {{ toProperCase(activeVariant) }}</h3>
      <div class="variant-tabs">
        <button
          v-for="v in variants"
          :key="v.key"
          :class="['variant-tab', { active: activeVariant === v.key }]"
          @click="activeVariant = v.key"
        >
          {{ v.label }}
        </button>
      </div>
    </div>

    <table class="collection-table">
      <thead>
        <tr>
          <th class="col-role">Role</th>
          <th class="col-hex">Hex</th>
          <th class="col-rgb">RGB</th>
          <th class="col-hsl">HSL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="color in colorEntries" :key="color.key">
          <td class="col-role">
            <span
              class="color-swatch"
              :style="{ backgroundColor: color.hex }"
            ></span>
            <span class="color-name">{{ color.label }}</span>
          </td>
          <td class="col-hex">
            <p
              class="copyable"
              @click="copyToClipboard(color.hex, color.key + '-hex')"
            >
              {{ copiedKey === color.key + "-hex" ? "Copied!" : color.hex }}
            </p>
          </td>
          <td class="col-rgb">
            <p
              class="copyable"
              @click="copyToClipboard(color.rgb, color.key + '-rgb')"
            >
              {{ copiedKey === color.key + "-rgb" ? "Copied!" : color.rgb }}
            </p>
          </td>
          <td class="col-hsl">
            <p
              class="copyable"
              @click="copyToClipboard(color.hsl, color.key + '-hsl')"
            >
              {{ copiedKey === color.key + "-hsl" ? "Copied!" : color.hsl }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.potions {
  border: 1px solid var(--color-overlay);
  border-radius: $radius-lg;
  background-color: var(--color-base);
  padding: $spacing-lg $spacing-xl;
  margin: $spacing-3xl $spacing-4xl;
}

.potions-header {
  @include flex-between;
  margin-bottom: $spacing-lg;

  h3 {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: var(--color-text);
    margin: 0;
  }
}

.variant-tabs {
  display: flex;
  gap: $spacing-xs;
  background-color: var(--color-surface);
  border-radius: $radius-lg;

  .variant-tab {
    padding: $spacing-xs $spacing-md;
    border: none;
    border-radius: $radius-lg;
    background: transparent;
    color: var(--color-subtle);
    font-size: $font-size-sm;
    font-family: $font-family-base;
    cursor: pointer;
    transition: all $transition-fast;

    &:hover {
      color: var(--color-text);
    }

    &.active {
      background-color: var(--color-overlay);
      box-shadow: 2px 0 0 0 var(--color-overlay);
      color: var(--color-text);
    }
  }
}

.collection-table {
  width: 100%;
  border-collapse: collapse;
  font-family: $font-family-mono;
  font-size: $font-size-sm;

  thead {
    th {
      padding: $spacing-sm $spacing-md;
      text-align: left;
      color: var(--color-subtle);
      font-weight: $font-weight-semibold;
      font-family: $font-family-base;
      font-size: $font-size-xs;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-bottom: 1px solid var(--color-overlay);

      &.col-rgb,
      &.col-hsl {
        text-align: right;
      }

      &.col-hex {
        text-align: center;
      }
    }
  }

  tbody {
    tr {
      transition: background-color $transition-fast;

      &:hover {
        background-color: var(--color-surface);
      }

      td {
        padding: $spacing-sm $spacing-md;
        color: var(--color-text);

        &.col-role {
          display: flex;
          align-items: center;
          gap: $spacing-md;
        }

        &.col-hex {
          text-align: center;
        }

        &.col-rgb,
        &.col-hsl {
          text-align: right;
        }

        .copyable {
          cursor: pointer;
          padding: $spacing-2xs $spacing-sm;
          border-radius: $radius-md;
          transition: all $transition-fast;
          margin: 0;
          display: inline-block;

          &:hover {
            box-shadow: 0 0 0 2px var(--color-petal);
          }

          &:active {
            background-color: var(--color-petal);
            transform: scale(1);
          }
        }
      }
    }
  }
}

.color-swatch {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.color-name {
  font-family: $font-family-base;
  font-weight: $font-weight-medium;
  color: var(--color-text);
}
</style>
