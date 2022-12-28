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
  <div class="flash-clock">
    <span class="time">{{ `${year}-${month}-${date} ${hours}:${minutes}:${seconds}` }}</span>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';

$green: #10ccba;
$yellow: #ccbc2f;
$pink: #cc00b3;
$shadow: rgb(255 255 255 / 50%);

.flash-clock {
  .time {
    font-size: 125px;
    color: transparent;
    user-select: none;
    background-clip: text;
    animation: animation-flash-clock 3s linear infinite;
  }
}

@include Themes.set-theme-css('light') {
  .flash-clock .time {
    /* pxtoviewport-disable-next-line */
    text-shadow: 0 0 4px $shadow;
    background-image: linear-gradient(135deg, $green, $yellow, $pink);
  }
}

@include Themes.set-theme-css('dark') {
  .flash-clock .time {
    /* pxtoviewport-disable-next-line */
    text-shadow: 0 0 4px color.adjust($shadow, $alpha: 0.2);
    background-image: linear-gradient(
      135deg,
      color.adjust($green, $lightness: 20%),
      color.adjust($yellow, $lightness: 20%),
      color.adjust($pink, $lightness: 20%)
    );
  }
}

@keyframes animation-flash-clock {
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
