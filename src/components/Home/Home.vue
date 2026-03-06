<script setup lang="ts">
import CardSwap from "./CardSwap.vue";
import { pallete } from "@/module/pallete";

const handleCardClick = (index: number) => {
  console.log(`Card ${index} clicked`);
};

const schemes = [
  { name: "Zero", key: "zero" as const },
  { name: "Mist", key: "mist" as const },
  { name: "Peak", key: "peak" as const },
] as const;
</script>

<template>
  <div class="home">
    <div class="home__text">
      <h1>Warmer Ice</h1>
      <p>
        A mystical colorscheme frozen in time. Journey through an eternal winter
        of crystalline magic and midnight ink.
      </p>
      <router-link to="/ports" class="btn">Discover →</router-link>
    </div>

    <div class="home__card">
      <CardSwap
        :card-distance="60"
        :vertical-distance="70"
        :delay="5000"
        :skew-amount="6"
        easing="elastic"
        :pause-on-hover="true"
        :width="460"
        :height="320"
        @card-click="handleCardClick"
      >
        <template
          v-for="(scheme, i) in schemes"
          :key="scheme.key"
          #[`card-${i}`]
        >
          <div
            class="scheme-card"
            :style="{
              backgroundColor: pallete.colors[scheme.key].base,
              color: pallete.colors[scheme.key].text,
            }"
          >
            <!-- Header bar -->
            <div
              class="scheme-card__header"
              :style="{ backgroundColor: pallete.colors[scheme.key].surface }"
            >
              <span
                class="scheme-card__dot"
                :style="{ backgroundColor: pallete.colors[scheme.key].coral }"
              ></span>
              <span
                class="scheme-card__dot"
                :style="{ backgroundColor: pallete.colors[scheme.key].amber }"
              ></span>
              <span
                class="scheme-card__dot"
                :style="{ backgroundColor: pallete.colors[scheme.key].leaf }"
              ></span>
              <span
                class="scheme-card__name"
                :style="{ color: pallete.colors[scheme.key].subtle }"
                >{{ scheme.name }}</span
              >
            </div>

            <!-- Code lines preview -->
            <div class="scheme-card__body">
              <!-- Line 1 - keyword + function + params -->
              <div class="scheme-card__line">
                <span
                  class="pill"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].cyanide + '33',
                    color: pallete.colors[scheme.key].cyanide,
                  }"
                  >import</span
                >
                <span
                  class="pill sm"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].text + '22',
                    color: pallete.colors[scheme.key].text,
                  }"
                  >{ ref</span
                >
                <span
                  class="pill"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].cyanide + '33',
                    color: pallete.colors[scheme.key].cyanide,
                  }"
                  >computed</span
                >
                <span
                  class="pill lg"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].amber + '33',
                    color: pallete.colors[scheme.key].amber,
                  }"
                  >from 'vue'</span
                >
              </div>
              <!-- Line 2 -->
              <div class="scheme-card__line">
                <span
                  class="pill"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].cyanide + '33',
                    color: pallete.colors[scheme.key].cyanide,
                  }"
                  >import</span
                >
                <span
                  class="pill sm"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].text + '22',
                    color: pallete.colors[scheme.key].text,
                  }"
                  >Api</span
                >
                <span
                  class="pill"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].cyanide + '33',
                    color: pallete.colors[scheme.key].cyanide,
                  }"
                  >from</span
                >
                <span
                  class="pill xl"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].amber + '33',
                    color: pallete.colors[scheme.key].amber,
                  }"
                  >'./api.ts'</span
                >
              </div>

              <!-- Blank gap -->
              <div class="scheme-card__line gap"></div>

              <!-- Line 3 - const declaration -->
              <div class="scheme-card__line">
                <span
                  class="pill"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].leaf + '33',
                    color: pallete.colors[scheme.key].leaf,
                  }"
                  >const</span
                >
                <span
                  class="pill md"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].petal + '33',
                    color: pallete.colors[scheme.key].petal,
                  }"
                  >color</span
                >
                <span
                  class="pill sm"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].lilac + '33',
                    color: pallete.colors[scheme.key].lilac,
                  }"
                  >ref</span
                >
                <span
                  class="pill sm"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].muted + '44',
                    color: pallete.colors[scheme.key].muted,
                  }"
                  >''</span
                >
              </div>
              <!-- Line 4 - object -->
              <div class="scheme-card__line">
                <span
                  class="pill indent"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].leaf + '33',
                    color: pallete.colors[scheme.key].leaf,
                  }"
                  >coral</span
                >
                <span
                  class="pill lg"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].coral + '33',
                    color: pallete.colors[scheme.key].coral,
                  }"
                  >{{ pallete.colors[scheme.key].coral }}</span
                >
                <span
                  class="pill md"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].lilac + '33',
                    color: pallete.colors[scheme.key].lilac,
                  }"
                  >petal</span
                >
                <span
                  class="pill"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].muted + '44',
                    color: pallete.colors[scheme.key].muted,
                  }"
                  >...</span
                >
              </div>
              <!-- Line 5 -->
              <div class="scheme-card__line">
                <span
                  class="pill indent"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].leaf + '33',
                    color: pallete.colors[scheme.key].leaf,
                  }"
                  >amber</span
                >
                <span
                  class="pill lg"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].amber + '33',
                    color: pallete.colors[scheme.key].amber,
                  }"
                  >{{ pallete.colors[scheme.key].amber }}</span
                >
                <span
                  class="pill md"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].cyanide + '33',
                    color: pallete.colors[scheme.key].cyanide,
                  }"
                  >leaf</span
                >
                <span
                  class="pill sm"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].muted + '44',
                    color: pallete.colors[scheme.key].muted,
                  }"
                  >false</span
                >
              </div>
              <!-- Line 6 -->
              <div class="scheme-card__line">
                <span
                  class="pill indent"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].leaf + '33',
                    color: pallete.colors[scheme.key].leaf,
                  }"
                  >lilac</span
                >
                <span
                  class="pill lg"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].lilac + '33',
                    color: pallete.colors[scheme.key].lilac,
                  }"
                  >{{ pallete.colors[scheme.key].lilac }}</span
                >
                <span
                  class="pill md"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].petal + '33',
                    color: pallete.colors[scheme.key].petal,
                  }"
                  >cyanide</span
                >
                <span
                  class="pill sm"
                  :style="{
                    backgroundColor: pallete.colors[scheme.key].muted + '44',
                    color: pallete.colors[scheme.key].muted,
                  }"
                  >null</span
                >
              </div>
            </div>

            <!-- Footer label -->
            <div
              class="scheme-card__footer"
              :style="{
                backgroundColor: pallete.colors[scheme.key].surface,
                color: pallete.colors[scheme.key].muted,
              }"
            >
              <span>⌥</span>
              <span class="scheme-card__fname">main</span>
            </div>
          </div>
        </template>
      </CardSwap>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  margin: 0 $spacing-4xl;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80vh;
  overflow: visible;
  position: relative;

  &__text {
    display: flex;
    flex-direction: column;
    align-items: start;
    z-index: 1;
  }

  &__card {
    position: relative;
    flex-shrink: 0;
    width: 640px;
    height: 500px;
  }

  h1 {
    width: 400px;
    font-size: $font-size-4xl;
    color: var(--color-text);
    margin-bottom: $spacing-md;
  }

  p {
    width: 500px;
    font-size: $font-size-lg;
    color: var(--color-subtle);
    margin-bottom: $spacing-xl;
  }

  .btn {
    font-weight: $font-weight-semibold;
    color: var(--color-text);
    text-decoration: none;
    padding: $spacing-md $spacing-xl;
    background-color: var(--color-surface);
    border-radius: $radius-pill;
    transition: background-color $transition-base;

    &:hover {
      background-color: var(--color-overlay);
    }
  }
}

// Scheme card internals
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

// Token pills
.pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.5;

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
