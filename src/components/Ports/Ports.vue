<script setup lang="ts">
import { ref, computed } from 'vue';
import { ports } from '@/module/ports';
import { icons } from '@/module/icons';

type CategoryKey = keyof typeof ports.categories;

const searchQuery = ref('');
const activeCategory = ref<CategoryKey | 'all'>('all');

const categoryKeys = Object.keys(ports.categories) as CategoryKey[];

const allPorts = computed(() => {
    const result: { name: string; icon: CategoryKey; repo: string; category: CategoryKey }[] = [];
    for (const key of categoryKeys) {
        for (const port of ports.categories[key]) {
            result.push({ ...port, icon: port.icon as CategoryKey, category: key });
        }
    }
    return result;
});

const filteredPorts = computed(() => {
    return allPorts.value.filter(port => {
        const matchesSearch = port.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = activeCategory.value === 'all' || port.category === activeCategory.value;
        return matchesSearch && matchesCategory;
    });
});

const totalPorts = computed(() => {
    return allPorts.value.length;
})
</script>

<template>
    <div class="ports-page">
        <header class="head">
            <h4>Ports</h4>
            <p>Glacier provides <b>{{ totalPorts }}</b> ports.</p>
        </header>
        <section>
            <aside class="sidebar">
                <div class="search-wrapper">
                    <span class="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                    <input v-model="searchQuery" type="text" placeholder="Search port..." class="search-box" />
                </div>

                <div class="filter-section">
                    <div class="tag-group">
                        <button class="tag" :class="{ active: activeCategory === 'all' }"
                            @click="activeCategory = 'all'">
                            All
                        </button>
                        <button v-for="key in categoryKeys" :key="key" class="tag"
                            :class="{ active: activeCategory === key }" @click="activeCategory = key">
                            {{ key.charAt(0).toUpperCase() + key.slice(1) }}
                        </button>
                    </div>
                </div>
            </aside>

            <!-- Port Grid -->
            <main class="port-grid-wrapper">
                <div class="port-grid">
                    <a v-for="(port, index) in filteredPorts" :key="index" :href="port.repo" target="_blank"
                        rel="noopener" class="port-card">
                        <div class="port-card__info">
                            <span class="port-card__name">{{ port.name }}</span>
                            <span class="port-card__category">{{ port.category }}</span>
                        </div>
                        <div class="port-card__icon">
                            <img :src="icons[port.icon]" :alt="port.name" />
                        </div>
                    </a>
                </div>
                <p v-if="filteredPorts.length === 0" class="empty-state">No ports found.</p>
            </main>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.ports-page {
    @include flex-column;
    gap: $spacing-lg;
    height: 100%;
    margin: $spacing-3xl $spacing-4xl;
    overflow: hidden;
}

.head {
    h4 {
        font-size: $font-size-xl;
        font-weight: $font-weight-bold;
        color: var(--color-text);
    }

    p {
        font-style: italic;
        font-size: $font-size-sm;
        color: var(--color-subtle);
    }
}

section {
    display: flex;
    align-items: stretch;
    margin: $spacing-2xl 0;
    gap: $spacing-lg;
    flex: 1;
    min-height: 0;
}

.sidebar {
    @include flex-column;
    gap: $spacing-lg;
    width: 260px;
    flex-shrink: 0;
    overflow-y: auto;
    padding-right: $spacing-xs;
    @include custom-scrollbar;
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
    }
}

.filter-section {
    @include flex-column;
    gap: $spacing-sm;
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

// ─── Port Grid ──────────────────────────────────────────────
.port-grid-wrapper {
    flex: 1;
}

.port-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: $spacing-md;
}

.port-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-md;
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

.empty-state {
    text-align: center;
    color: var(--color-muted);
    font-size: $font-size-sm;
    margin-top: $spacing-2xl;
}
</style>