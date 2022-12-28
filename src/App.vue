<script setup lang="ts">
const { toggle } = useFullscreen()

useEventListener(document, 'keydown', (e) => {
  e.code === 'Enter' && toggle()
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>

<style lang="scss">
body {
  font-size: 16px;
  color: var(--text-color-regular);
  background-color: var(--background-color-regular);
  transition: var(--theme-color-transition);
}

#nprogress .bar {
  background-color: var(--text-color-active) !important;

  .peg {
    /* pxtoviewport-disable-next-line */
    box-shadow: 0 0 10px var(--text-color-active), 0 0 5px var(--text-color-active) !important;
  }
}

@include Mixins.screen-less-than(1344px) {
  body {
    /* pxtoviewport-disable-next-line */
    font-size: 14px;
  }
}
</style>
