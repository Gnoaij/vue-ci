<script setup lang="ts"></script>

<template>
  <div class="hello-world">
    <h1>Hello World!</h1>
    <img src="@/assets/img/logo.svg" alt="Vue logo" />
  </div>
</template>

<style scoped lang="scss">
.hello-world {
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    @include Mixins.text-overflow(2);
  }

  img {
    width: 128px;
    height: 128px;
    margin-top: 20px;
  }
}

@include Mixins.screen-less-than(1344px) {
  .hello-world img {
    /* pxtoviewport-disable-next-line */
    width: 112px;

    /* pxtoviewport-disable-next-line */
    height: 112px;

    /* pxtoviewport-disable-next-line */
    margin-top: 17.5px;
  }
}
</style>
