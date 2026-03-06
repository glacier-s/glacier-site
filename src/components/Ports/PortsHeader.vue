<script setup lang="ts">
defineProps<{
    total: number;
}>();
</script>

<template>
    <header class="ports-header">
        <h4>Ports</h4>
        <p>Glacier provides <b>{{ total }}</b> ports.</p>
    </header>
</template>

<style lang="scss" scoped>
.ports-header {
    flex-shrink: 0;

    h4 {
        font-size: $font-size-xl;
        font-weight: $font-weight-bold;
        color: var(--color-text);
        margin: 0 0 $spacing-xs 0;
    }

    p {
        font-style: italic;
        font-size: $font-size-sm;
        color: var(--color-subtle);
        margin: 0;
    }
}
</style>
