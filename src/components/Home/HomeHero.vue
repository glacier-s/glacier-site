<template>
  <div class="home-hero">
    <h1>Warmer Ice</h1>
    <p>
      A mystical colorscheme frozen in time. Journey through an eternal winter
      of crystalline magic and midnight ink.
    </p>
    <router-link to="/ports" class="btn">Discover →</router-link>

    <div class="home-hero__nav">
      <router-link to="/ports" class="nav-card">
        <span class="nav-card__icon">⌘</span>
        <div class="nav-card__content">
          <span class="nav-card__title">Ports</span>
          <span class="nav-card__desc">Browse integrations</span>
        </div>
        <span class="nav-card__arrow">→</span>
      </router-link>
      <router-link to="/pallete" class="nav-card">
        <span class="nav-card__icon">◈</span>
        <div class="nav-card__content">
          <span class="nav-card__title">Pallete</span>
          <span class="nav-card__desc">Explore the colors</span>
        </div>
        <span class="nav-card__arrow">→</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-hero {
  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 1;

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

  &__nav {
    display: flex;
    gap: $spacing-md;
    margin-top: $spacing-2xl;
  }
}

.nav-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  background-color: var(--color-surface);
  border: 1px solid var(--color-highlight-med);
  border-radius: $radius-lg;
  text-decoration: none;
  transition: background-color $transition-base, border-color $transition-base;
  min-width: 200px;

  &:hover {
    background-color: var(--color-overlay);
    border-color: var(--color-highlight-high);
  }

  &__icon {
    font-size: $font-size-xl;
    color: var(--color-lilac);
    flex-shrink: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-3xs;
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: var(--color-text);
  }

  &__desc {
    font-size: $font-size-xs;
    color: var(--color-muted);
  }

  &__arrow {
    margin-left: auto;
    font-size: $font-size-base;
    color: var(--color-muted);
    transition: color $transition-base;
  }

  &:hover &__arrow {
    color: var(--color-text);
  }
}
</style>
