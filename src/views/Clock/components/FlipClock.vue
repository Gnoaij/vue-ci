<script setup lang="ts">
defineProps<{
  year: string
  month: string
  date: string
  hours: string
  minutes: string
  seconds: string
}>()
</script>

<template>
  <div class="flip-clock">
    <div class="row">
      <FlipText :text="year" />
      <span class="sep">-</span>
      <FlipText :text="month" />
      <span class="sep">-</span>
      <FlipText :text="date" />
    </div>
    <div class="row">
      <FlipText :text="hours" />
      <span class="sep">:</span>
      <FlipText :text="minutes" />
      <span class="sep">:</span>
      <FlipText :text="seconds" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.flip-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;

  .row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0;

    .flip-text {
      --flip-text-color: var(--text-color-regular);

      :deep(.half .card),
      :deep(.half .card .text) {
        transition: var(--theme-color-transition);
      }
    }

    .sep {
      margin: 0 30px;
      font-size: 150px;
      font-weight: bold;
    }
  }
}

@include Themes.set-theme-css('dark') {
  .flip-text {
    --flip-text-background-color: #262626 !important;
  }
}
</style>
