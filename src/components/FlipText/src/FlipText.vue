<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string | number
  }>(),
  {
    text: ''
  }
)

const before = ref(props.text)
const active = ref(props.text)
const invert = ref(true)

const class1 = computed(() => (invert.value ? 'before' : 'active'))
const class2 = computed(() => (!invert.value ? 'before' : 'active'))

const text1 = computed(() => (invert.value ? before.value : active.value))
const text2 = computed(() => (!invert.value ? before.value : active.value))

const flip = (newText?: string | number, oldText?: string | number) => {
  ;[before.value, active.value, invert.value] = [
    oldText ?? active.value,
    newText ?? (oldText === undefined ? before.value : active.value),
    !invert.value
  ]
}

watch(() => props.text, flip)

defineExpose({
  flip
})
</script>

<template>
  <div class="flip-text">
    <div class="half top">
      <div class="card" :class="class1">
        <span class="text">{{ text1 }}</span>
      </div>
      <div class="card" :class="class2">
        <span class="text">{{ text2 }}</span>
      </div>
    </div>
    <div class="half bottom">
      <div class="card" :class="class1">
        <span class="text">{{ text1 }}</span>
      </div>
      <div class="card" :class="class2">
        <span class="text">{{ text2 }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flip-text {
  --flip-text-gap: 2px;
  --flip-text-height: 202px;
  --flip-text-padding: 20px;
  --flip-text-font-size: 150px;
  --flip-text-font-weight: bold;
  --flip-text-color: #565656;
  --flip-text-shadow-color: #111111;
  --flip-text-background-color: #e0e0e0;
  --flip-text-border-radius: 10px;
  --flip-text-animation-duration: 0.8s;
  --flip-text-perspective: 800px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: var(--flip-text-height);

  .half {
    display: flex;
    flex-direction: column;
    perspective: var(--flip-text-perspective);

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      height: calc((var(--flip-text-height) - var(--flip-text-gap)) / 2);
      overflow: hidden;
      background-color: var(--flip-text-background-color);

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        opacity: 0;
      }

      .text {
        height: calc((var(--flip-text-height) - var(--flip-text-gap)));
        padding: 0 var(--flip-text-padding);
        font-size: var(--flip-text-font-size);
        font-weight: var(--flip-text-font-weight);
        line-height: calc((var(--flip-text-height) - var(--flip-text-gap)));
        color: var(--flip-text-color);
        text-align: center;
        user-select: none;
      }
    }
  }

  .top {
    .card {
      justify-content: flex-start;
      border-radius: var(--flip-text-border-radius) var(--flip-text-border-radius) 0 0;
      transform-origin: bottom;

      &::after {
        background-image: linear-gradient(
          to top,
          var(--flip-text-shadow-color) 0,
          transparent 100%
        );
      }
    }

    .before {
      z-index: 0;
      animation: animation-top-before-flip calc(var(--flip-text-animation-duration) / 2) linear;
    }

    .active {
      z-index: 1;

      &::after {
        animation: animation-top-active-shadow calc(var(--flip-text-animation-duration) / 2) linear;
      }
    }
  }

  .bottom {
    .card {
      justify-content: flex-end;
      border-radius: 0 0 var(--flip-text-border-radius) var(--flip-text-border-radius);
      transform-origin: top;

      &::after {
        background-image: linear-gradient(
          to bottom,
          var(--flip-text-shadow-color) 0,
          transparent 100%
        );
      }
    }

    .before {
      z-index: 1;

      &::after {
        animation: animation-bottom-before-shadow calc(var(--flip-text-animation-duration) / 2)
          calc(var(--flip-text-animation-duration) / 2) linear;
      }
    }

    .active {
      z-index: 0;
      animation: animation-bottom-active-flip calc(var(--flip-text-animation-duration) / 2)
        calc(var(--flip-text-animation-duration) / 2) linear forwards;
    }
  }

  .half .card:nth-child(2) {
    margin-top: calc((var(--flip-text-height) - var(--flip-text-gap)) / -2);
  }
}

@keyframes animation-top-before-flip {
  from {
    z-index: 2;
    transform: rotateX(0deg);
  }

  to {
    z-index: 2;
    transform: rotateX(-90deg);
  }
}

@keyframes animation-bottom-active-flip {
  from {
    z-index: 2;
    transform: rotateX(90deg);
  }

  to {
    z-index: 2;
    transform: rotateX(0deg);
  }
}

@keyframes animation-top-active-shadow {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes animation-bottom-before-shadow {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
