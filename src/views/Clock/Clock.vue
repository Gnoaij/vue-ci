<script setup lang="ts">
import { useRafFn } from '@vueuse/core'

import FlipClock from './components/FlipClock.vue'
import FlashClock from './components/FlashClock.vue'

const time = reactive({
  year: '',
  month: '',
  date: '',
  hours: '',
  minutes: '',
  seconds: ''
})

const padZero = (target: number, n = 2) => target.toString().padStart(n, '0')

const { pause, resume } = useRafFn(() => {
  const date = new Date()
  time.year = padZero(date.getFullYear(), 4)
  time.month = padZero(date.getMonth() + 1)
  time.date = padZero(date.getDate())
  time.hours = padZero(date.getHours())
  time.minutes = padZero(date.getMinutes())
  time.seconds = padZero(date.getSeconds())
})

const Flip = markRaw(FlipClock)
const Flash = markRaw(FlashClock)

const clock = ref(Flip)

const toggleClock = () => (clock.value = clock.value === Flip ? Flash : Flip)

onMounted(() => {
  resume()
})

onUnmounted(() => {
  pause()
})

onActivated(() => {
  resume()
})

onDeactivated(() => {
  pause()
})
</script>

<template>
  <div class="clock">
    <div class="switch">
      <IconMsSwitchRightRounded class="icon pointer" v-show="clock === Flip" @click="toggleClock" />
      <IconMsSwitchLeftRounded class="icon pointer" v-show="clock === Flash" @click="toggleClock" />
    </div>
    <div class="container">
      <Transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <component :is="clock" v-bind="time" />
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.clock {
  .switch {
    position: fixed;
    right: 15px;
    bottom: 15px;

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

  .container {
    --animate-duration: 0.3s;

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transform: scale(0.8);
  }
}
</style>
