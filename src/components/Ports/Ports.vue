<script setup lang="ts">
import { ref, computed } from 'vue';
import { ports } from '@/module/ports';
import { icons } from '@/module/icons';
import PortsHeader from './PortsHeader.vue';
import PortsSidebar from './PortsSidebar.vue';
import PortCard from './PortCard.vue';

type CategoryKey = keyof typeof ports.categories;

const searchQuery = ref('');
const activeCategory = ref<CategoryKey | 'all'>('all');

const categoryKeys = Object.keys(ports.categories) as CategoryKey[];

const allPorts = computed(() => {
    const result: { name: string; icon: keyof typeof icons; repo: string; category: CategoryKey }[] = [];
    for (const key of categoryKeys) {
        for (const port of ports.categories[key]) {
            result.push({ ...port, icon: port.icon as keyof typeof icons, category: key });
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
</script>

<template>
    <div class="ports-page">
        <PortsHeader :total="allPorts.length" />

        <section>
            <PortsSidebar :category-keys="categoryKeys" :active-category="activeCategory"
                @update:search="searchQuery = $event"
                @update:category="activeCategory = $event as CategoryKey | 'all'" />

            <main class="port-grid-wrapper">
                <div class="port-grid">
                    <PortCard v-for="(port, index) in filteredPorts" :key="index" :name="port.name"
                        :category="port.category" :icon="port.icon" :repo="port.repo" />
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

section {
    display: flex;
    align-items: stretch;
    margin: $spacing-2xl 0;
    gap: $spacing-lg;
    flex: 1;
    min-height: 0;
}

.port-grid-wrapper {
    flex: 1;
    @include custom-scrollbar;
}

.port-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: $spacing-md;
}

.empty-state {
    text-align: center;
    color: var(--color-muted);
    font-size: $font-size-sm;
    margin-top: $spacing-2xl;
}
</style>