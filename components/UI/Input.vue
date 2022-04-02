<template>
  <div class="input__wrapper"
       :class="{ success: success, fail: fail }">
    <input class="input fail"
           :type="type"
           min="0"
           :placeholder="placeholder"
           v-model="input"
           @input="updateField"/>
    <div v-if="fail" class="input__error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  props: ['type', 'placeholder', 'success', 'fail', 'errorMessage', 'field', 'index'],
  mounted() {
    setTimeout(() => {
      if(this.field) {
        this.input = this.field
      }
    }, 200)
  },
  data() {
    return {
      input: '',
    }
  },
  methods: {
    updateField() {
      if(this.index !== undefined) {
        return this.$emit('updateField', this.input, this.index)
      }
      this.$emit('updateField', this.input)
    }
  }
}
</script>

<style lang="scss" scoped>
  .input {
    outline: none;
    background-color: transparent;
    border: 1px solid #16263D;
    border-radius: 2px;
    padding: 12px 16px;
    color: #E6E6E6;
    transition: all .3s;
    width: 100%;
    height: 100%;
    &__error {
      font-size: 12px;
      color: #B83333;
    }
    &:focus {
      border-color: #627CA3;
      background-color: #121F33;
    }
    &:active {
      border-color: #185EC7;
      background-color: #16263D;
    }
    &:disabled {
      border: none;
      color: #98A4B5;
      background-color: #121F33;
    }
    &::placeholder {
      color: #627CA3;
    }
  }
  .input__wrapper {
    position: relative;
    &.success {
      .input {
        border-color: #4CB725;
      }
      &::after {
        content: '';
        width: 20px;
        height: 20px;
        background-image: url(static/ui/success.svg);
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-65%);
      }
    }
    &.fail {
      .input {
        border-color: #B83333;
      }
      &::after {
        content: '';
        width: 20px;
        height: 20px;
        background-image: url(static/ui/fail.svg);
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-125%);
      }
    }
  }
  .input__wrapper.secondary {
    background: #0F1215;
    .input {
      border: 2px solid #20252B;
      &::placeholder {
        color: #CCCDCD;
      }
      &:focus {
        border-color: lighten(#20252B, 10%);
        background-color: lighten(#0F1215, 2%);
      }
    }
  }
</style>