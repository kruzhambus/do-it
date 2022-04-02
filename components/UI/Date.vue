<template>
  <div class="datepicker" :class="{ active: active }">
    <div class="datepicker__items">
        <input type="text" v-model.lazy="day.number" placeholder="dd">
        <input type="text" v-model.lazy="mounth.number" placeholder="mm">
        <input type="text" v-model.lazy="years.number" placeholder="yyyy">
    </div>
    <div v-if="fail" class="input__error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  watch: {
    'day.number' (value) {
      if (Number(value) < 0 || Number(value) > 32) {
        if (!this.years.bool || !this.mounth.bool) {
          this.errorMessage += ' Input correct dd.'
        } else {
          this.errorMessage = ' Input correct dd.'
        }
        this.fail = true
        this.day.bool = false
      } else {
        this.fail = false
        this.day.bool = true
        this.date = this.day.number + '.' + this.mounth.number + '.' + this.years.number
      }
    },
    'mounth.number' (value) {
      if (Number(value) < 0 || Number(value) > 12) {
        if (!(this.years.bool || this.day.bool)) {
          this.errorMessage += ' Input correct mm.'
        } else {
          this.errorMessage = ' Input correct mm.'
        }
        this.fail = true
        this.mounth.bool = false
      } else {
        this.fail = this.false
        this.mounth.bool = true
        this.date = this.day.number + '.' + this.mounth.number + '.' + this.years.number
      }
    },
    'years.number' (value) {
      if (Number(value) < 0 || (Number(value) > new Date().getFullYear() - 13)) {
        if (!this.mounth.bool || !this.day.bool) {
          this.errorMessage += ' Not 13 yet.'
        } else {
          this.errorMessage = ' Not 13 yet.'
        }
        this.fail = true
        this.years.bool = false
      } else {
        this.fail = false
        this.years.bool = true
        this.date = this.day.number + '.' + this.mounth.number + '.' + this.years.number
      }
    },
    date (value) {
      this.$emit('updateDate', value)
    }
  },
  data () {
    return {
      day: {
        number: '',
        bool: false
      },
      mounth: {
        number: '',
        bool: false
      },
      years: {
        number: '',
        bool: false
      },
      date: '',
      active: false,
      errorMessage: '',
      fail: false
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
}    
  .datepicker {
    position: relative;
    &__items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        input {
            background-color: transparent;
            text-align: center;
            width: 100%;
            height: 40px;
            border: 1px solid #16263D;
            border-radius: 2px;
            margin-right: 12px;
        }
        input:last-child {
            margin-right: 0;
        }
        input::placeholder {
            color: #627CA3;
        }
        input:focus {
          border: 1px solid #627CA3;
          background-color: #121F33;
        }
        input:active {
          border: 1px solid #185EC7;
          background-color: #16263D;
        }
        input:disabled {
          border: none;
          color: #98A4B5;
          background-color: #121F33;
        }
    }
    &__title {
      position: relative;
      display: block;
      width: 100%;
      text-align: left;
      padding: 12px 30px 12px 16px;
      border: 1px solid #1C2F4D;
      border-radius: 2px;
      background-color: transparent;
      color: #627CA3;
      cursor: pointer;
      outline: none;
      &::after {
        content: '';
        width: 22px;
        height: 22px;
        background-image: url(static/ui/datepicker.svg);
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: auto;
      }
    }
    &__calendar {
      display: none;
      position: absolute;
      top: 44px;
      z-index: 1;
    }
  }
  .datepicker.secondary {
    .datepicker__title {
      color: #CCCDCD;
      border: 1px solid #20252B;
    }
  }
  .datepicker.active .datepicker__calendar {
    display: block;
  }
</style>
