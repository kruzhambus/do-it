<template>
  <div class="auth-layout">
    <img class="auth-layout__back" src="/ui/back.svg" alt="" @click="$router.go(-1)">
    <nuxt-link to="/"><img class="auth-layout__exit" src="/ui/exit.svg" alt=""></nuxt-link>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Auth'
  },
}
</script>

<style lang="scss" scoped>
  .auth-layout {
    position: relative;
    &__back,
    &__exit {
      position: absolute;
      cursor: pointer;
      top: 16px;
      max-width: 32px;
      max-height: 32px;
    }
    &__back {
      left: 16px;
    }
    &__exit {
      right: 16px;
    }
  }
</style>