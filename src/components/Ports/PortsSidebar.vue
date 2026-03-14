<script setup lang="ts">
defineProps<{
    categoryKeys: string[];
    activeCategory: string;
}>();

const emit = defineEmits<{
    'update:search': [value: string];
    'update:category': [value: string];
}>();
</script>

<template>
    <aside class="sidebar">
        <div class="search-wrapper">
            <span class="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </span>
            <input type="text" placeholder="Search port..." class="search-box"
                @input="emit('update:search', ($event.target as HTMLInputElement).value)" />
        </div>

        <div class="filter-section">
            <div class="tag-group">
                <button class="tag" :class="{ active: activeCategory === 'all' }"
                    @click="emit('update:category', 'all')">
                    All
                </button>
                <button v-for="key in categoryKeys" :key="key" class="tag" :class="{ active: activeCategory === key }"
                    @click="emit('update:category', key)">
                    {{ key.charAt(0).toUpperCase() + key.slice(1) }}
                </button>
            </div>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
.sidebar {
    display: flex;
    flex-direction: row; // horizontal on mobile (search + filters side by side)
    flex-wrap: wrap;
    gap: $spacing-sm;
    width: 100%;
    flex-shrink: 0;

    @include respond-to(md) {
        @include flex-column;
        gap: $spacing-lg;
        width: 220px;
        padding-right: $spacing-xs;
        @include custom-scrollbar;
    }

    @include respond-to(xl) {
        width: 260px;
    }
}

.search-wrapper {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    background-color: var(--color-surface);
    border: 1px solid var(--color-highlight-med);
    border-radius: $radius-lg;
    padding: $spacing-sm $spacing-md;
    transition: border-color $transition-fast;
    flex: 1; // grow in row (mobile)
    min-width: 160px;

    @include respond-to(md) {
        flex: none; // don't stretch vertically in column (desktop)
        min-width: unset;
    }

    &:focus-within {
        border-color: var(--color-lilac);
    }

    .search-icon {
        color: var(--color-subtle);
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .search-box {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: var(--color-text);
        font-size: $font-size-sm;

        &::placeholder {
            color: var(--color-muted);
        }
    }
}

.filter-section {
    @include flex-column;
    gap: $spacing-sm;
    flex: 1; // grow in row (mobile)
    min-width: 160px;

    @include respond-to(md) {
        flex: none; // don't stretch vertically in column (desktop)
        min-width: unset;
    }
}

.tag-group {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
}

.tag {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    padding: 3px $spacing-sm;
    background-color: var(--color-surface);
    border: 1px solid var(--color-highlight-med);
    border-radius: $radius-pill;
    color: var(--color-subtle);
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: background-color $transition-fast, border-color $transition-fast, color $transition-fast;

    &:hover {
        background-color: var(--color-overlay);
        color: var(--color-text);
    }

    &.active {
        background-color: var(--color-amber);
        border-color: var(--color-amber);
        color: var(--color-base);
        font-weight: $font-weight-semibold;
    }
}
</style>
