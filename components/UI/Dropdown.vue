<template>
  <div class="select" :class="{ active: active }">
    <button class="select__title" type="button" @click="setActive">{{ select || title }}</button>
    <ul class="select__list">
      <li class="select__list-item"
          v-for="item in items"
          :key="item"
          @click="updateSelect"
          :data-value="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: ['title', 'items', 'index'],
  data() {
    return {
      select: '',
      active: false
    }
  },
  methods: {
    setActive() {
      this.active = !this.active
    },
    updateSelect(event) {
      const value = event.srcElement.dataset.value
      this.select = value
      if(this.index !== undefined) {
        this.setActive()
        return this.$emit('updateSelect', value, this.index)
      }
      this.$emit('updateSelect', value)
      this.setActive()
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  list-style: none;
}
li {
  list-style: none;
}
  .select {
    position: relative;
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
        width: 15px;
        height: 9px;
        background-image: url(static/ui/dropdown-arrow.svg);
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: auto;
      }
    }
    &__list {
      display: none;
      position: absolute;
      top: 45px;
      background-color: #0F1215;
      border: 1px solid #1472FF;
      max-height: 232px;
      width: 100%;
      overflow: auto;
      overflow-x: hidden;
      z-index: 2;
      &-item {
        padding: 11px 15px;
        cursor: pointer;
        &:hover {
          background-color: #1472FF;
          color: #E6E6E6;
        }
      }
    }
  }
  .select.active {
    .select__title {
      background-color: #16263D;
      border-color: #1472FF;
      color: #E6E6E6;
      &::after {
        transform: translateY(-50%) rotate(180deg);
      }
    }
    .select__list {
      display: block;
    }
  }
  .select.secondary {
    .select__title {
      color: #CCCDCD;
      border: 2px solid #20252B;
    }
  }
  .select.active.secondary {
    .select__title {
      background-color: transparent;
      border-color: #20252B;
      color: #E6E6E6;
    }
  }
</style>