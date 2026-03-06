<script setup lang="ts">
interface SchemeColors {
  base: string;
  surface: string;
  text: string;
  subtle: string;
  muted: string;
  cyanide: string;
  amber: string;
  petal: string;
  leaf: string;
  lilac: string;
  coral: string;
}

defineProps<{
  name: string;
  colors: SchemeColors;
}>();

const lines = [
  { pills: ["cyanide:lg", "leaf:sm", "lilac:md", "muted:sm"] },
  { pills: ["petal:sm", "amber:lg", "cyanide:md", "muted:sm"] },
  { gap: true },
  { pills: ["leaf:md", "petal:lg", "lilac:sm"] },
  { pills: ["leaf:indent lg", "coral:md", "muted:sm"] },
  { pills: ["amber:indent sm", "cyanide:lg", "petal:md", "muted:sm"] },
  { gap: true },
  { pills: ["leaf:md", "lilac:lg", "muted:sm"] },
  { pills: ["cyanide:indent md", "coral:lg", "amber:sm"] },
] as const;
</script>

<template>
  <div
    class="scheme-card"
    :style="{ backgroundColor: colors.base, color: colors.text }"
  >
    <div
      class="scheme-card__header"
      :style="{ backgroundColor: colors.surface }"
    >
      <span
        class="scheme-card__dot"
        :style="{ backgroundColor: colors.coral }"
      />
      <span
        class="scheme-card__dot"
        :style="{ backgroundColor: colors.amber }"
      />
      <span
        class="scheme-card__dot"
        :style="{ backgroundColor: colors.leaf }"
      />
      <span class="scheme-card__name" :style="{ color: colors.subtle }">
        {{ name }}
      </span>
    </div>

    <div class="scheme-card__body">
      <template v-for="(line, idx) in lines" :key="idx">
        <div v-if="'gap' in line" class="scheme-card__line gap" />
        <div v-else class="scheme-card__line">
          <span
            v-for="(pill, pIdx) in line.pills"
            :key="pIdx"
            :class="['pill', pill.split(':')[1]]"
            :style="{
              backgroundColor: colors[pill.split(':')[0] as keyof SchemeColors],
            }"
          />
        </div>
      </template>
    </div>

    <div
      class="scheme-card__footer"
      :style="{ backgroundColor: colors.surface }"
    >
      <span>⌥</span>
      <span class="scheme-card__fname">main</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scheme-card {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 11px;

  &__header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 11px;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__name {
    margin-left: auto;
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  &__body {
    flex: 1;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    overflow: hidden;
  }

  &__line {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: nowrap;

    &.gap {
      height: 6px;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    font-size: 11px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  &__fname {
    font-style: italic;
  }
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.5;
  min-height: 15px;

  &.sm {
    min-width: 36px;
  }

  &.md {
    min-width: 52px;
  }

  &.lg {
    min-width: 80px;
  }

  &.xl {
    min-width: 96px;
  }

  &.indent {
    margin-left: 14px;
  }
}
</style>
