<script setup lang="ts">
import { useGlobalStore } from '@/stores'

const globalStore = useGlobalStore()
const { theme } = storeToRefs(globalStore)
const { toggleTheme } = globalStore
</script>

<template>
  <header class="layout-header">
    <nav>
      <RouterLink to="/home">Home</RouterLink>
      <span> | </span>
      <RouterLink to="/clock">Clock</RouterLink>
      <span> | </span>
      <IconMsLightModeOutline
        class="icon pointer"
        v-show="theme === 'light'"
        @click="toggleTheme()"
      />
      <IconMsDarkModeOutline
        class="icon pointer"
        v-show="theme === 'dark'"
        @click="toggleTheme()"
      />
    </nav>
  </header>
</template>

<style scoped lang="scss">
.layout-header {
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5em;

    a {
      color: var(--text-color-regular);
      transition: var(--theme-color-transition);

      &.router-link-exact-active {
        color: var(--text-color-active);
      }
    }

    span {
      margin: 0 0.4em;
    }

    .icon {
      width: 2em;
      height: 2em;
      padding: 0.2em;
      border-radius: 50%;

      &:hover {
        background-color: var(--background-color-hover);
      }
    }
  }
}
</style>
