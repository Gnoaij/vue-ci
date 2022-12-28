<script setup lang="ts"></script>

<template>
  <main class="layout-main">
    <RouterView v-slot="{ Component, route }">
      <Transition
        appear
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <KeepAlive>
          <component :is="Component" :key="route.name ?? route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped lang="scss">
.layout-main {
  --animate-duration: 0.3s;

  display: flex;
  justify-content: center;
}
</style>
