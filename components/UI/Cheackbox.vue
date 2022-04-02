<template>
  <label class="checkbox__wrapper">
    <input class="checkbox"
           type="checkbox"
           v-model="checkbox"
           @change="updateActive">
    <span class="checkbox-style"></span>
    <slot />
  </label>
</template>

<script>
export default {
  props: ['text', 'active'],
  mounted() {
    setTimeout(() => {
      if(this.active) {
        this.checkbox = this.active
      }
    }, 200)
  },
  data() {
    return {
      checkbox: false,
    }
  },
  methods: {
    updateActive() {
      setTimeout(() => this.$emit('updateCheckbox', this.checkbox), 10)
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkbox {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
  .checkbox__wrapper {
    padding-left: 32px;
    position: relative;
    cursor: pointer;
  }
  .checkbox-style {
    width: 18px;
    height: 18px;
    border: 1px solid #1C2F4D;
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  // CHECKED

  .checkbox {
    &:checked {
      + .checkbox-style {
        border-color: #185EC7;
        &::before {
          content: '';
          width: 15px;
          height: 12px;
          background-image: url("data:image/svg+xml,%3Csvg width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 8L4 11L14 1' stroke='%23185EC7'/%3E%3C/svg%3E");
          position: absolute;
          top: -1px;
          right: -2px;
          z-index: 2;
        }
        &::after {
          content: '';
          height: 10px;
          width: 5px;
          background-color: #0F1215;
          position: absolute;
          top: -1px;
          right: -1px;
          z-index: 1;
        }
      }
    }

    // DISABLED

    &:disabled {
      + .checkbox-style {
        border-color: #1D2129;
        cursor: default;
      }
      &:checked + .checkbox-style::before {
        background-image: url("data:image/svg+xml,%3Csvg width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 8L4 11L14 1' stroke='%231C2F4D'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
      }
    }

    // FOCUS

    &:focus {
      + .checkbox-style {
        border-color: #294470;
      }
      &:disabled {
        + .checkbox-style {
          border-color: #1D2129;
          cursor: default;
        }
        &:checked + .checkbox-style {
          border-color: #1D2129;
          &::before {
            background-image: url("data:image/svg+xml,%3Csvg width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 8L4 11L14 1' stroke='%231C2F4D'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
          }
        }
      }
      &:checked + .checkbox-style {
        border-color: #1472FF;
        &::before {
          background-image: url("data:image/svg+xml,%3Csvg width='15' height='12' viewBox='0 0 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 8L4 11L14 1' stroke='%231472FF'/%3E%3C/svg%3E");
        }
      }
    }
  }
</style>