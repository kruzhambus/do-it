<template>
  <button class="button"
          :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  props: ['disabled']
}
</script>

<style lang="scss" scoped>
  .button {
    color: white;
    background: linear-gradient(180deg, #2788F6 0%, #0960E0 100%), #095FE0;;
    font-family: 'Rubik', sans-serif;
    font-weight: 700;
    line-height: 19px;
    padding: 12px 30px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: all .3s;
    width: 100%;
    &:disabled {
      background: gray;
      cursor: default;
    }
    &:disabled:hover {
      background-color: gray;
    }
    &:hover {
      background: lighten( #2787F6, .5);
    }
    &:focus {
      outline: none;
      background: lighten( #2787F6, .5);
    }
  }
  .secondary {
    background: #1A222D;
    &:hover {
      background: lighten(#1A222D, 5);
    }
    &:focus {
      outline: none;
      background: lighten(#1A222D, 5);
    }
  }
</style>