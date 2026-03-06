<script setup lang="ts">
import { icons } from '@/module/icons';

defineProps<{
    name: string;
    category: string;
    icon: keyof typeof icons;
    repo: string;
}>();
</script>

<template>
    <a :href="repo" target="_blank" rel="noopener" class="port-card">
        <div class="port-card__info">
            <span class="port-card__name">{{ name }}</span>
            <span class="port-card__category">{{ category }}</span>
        </div>
        <div class="port-card__icon">
            <img :src="icons[icon]" :alt="name" />
        </div>
    </a>
</template>

<style lang="scss" scoped>
.port-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-sm;
    padding: $spacing-md;
    background-color: var(--color-surface);
    border: 1px solid var(--color-highlight-med);
    border-radius: $radius-lg;
    text-decoration: none;
    transition: background-color $transition-fast, border-color $transition-fast, transform $transition-fast;

    &:hover {
        background-color: var(--color-overlay);
        border-color: var(--color-highlight-high);
        transform: translateY(-2px);
    }

    &__info {
        @include flex-column;
        gap: 2px;
        min-width: 0;
    }

    &__name {
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        color: var(--color-text);
        @include text-truncate;
    }

    &__category {
        font-size: $font-size-xs;
        color: var(--color-muted);
        text-transform: capitalize;
        @include text-truncate;
    }

    &__icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>
