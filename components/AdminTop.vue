<template>
    <div class="navbar">
        <div class="navbar__items">
            <img class="navbar__items-img" src="/logo.png" alt="" width="44" height="44">
            <img class="navbar__items-img" src="/logo.png" alt="" width="44" height="44">
            <img class="navbar__items-img" src="/logo.png" alt="" width="44" height="44">
            <img class="navbar__items-img" src="/logo.png" alt="" width="44" height="44">
            <img class="navbar__items-img" src="/logo.png" alt="" width="44" height="44">
            <img class="navbar__items-img" src="/logo.png" alt="" width="44" height="44">
        </div>
        <div class="navbar__items">
            <div class="navbar__items__search">
                <input class="navbar__items__search-input" placeholder="Search by name, prize, signed, etc."/>
            </div>
        </div>
        <div class="navbar__items">
            <div class="navbar__items-btn" style="margin-right: 16px" v-if="edit"  @click="cancel">
                Cancel
            </div>
            <div class="navbar__items-btn" style="margin-right: 16px" v-else @click="edit = !edit">
                Edit mode
            </div>
            <div class="navbar__items-btn" v-if="edit" @click="save">
                Save changes
            </div>
            <div class="navbar__items-btn" v-else @click="$router.push(`/admin/edit/${label}/${newId}`)">
                +  Add {{ label }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "empty",
    props: ['label', 'editor'],
    emits: ['edit', 'save', 'cancel'],
    data () {
        return {
            edit: this.editor,
            sort: '',
            newId: +new Date()
        }
    },
    methods: {
        cancel () {
            this.edit = false
            this.$emit('cancel')
        }, 
        save () {
            this.$emit('save')
        } 
    },
    watch: {
        edit () {
            this.$emit('edit', this.edit)
        }
    }
}
</script>

<style lang="scss" scoped>

.tournaments {
  &__items {
    border: 2px solid #20252B;
  }
  &__item {
    padding: 22px 30px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    text-align: center;
    min-height: 48px;
    &-title {
      color: #E6E6E6;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 22px 30px;

      span {
        font-family: 'Rubik';
        font-weight: 500;
        line-height: 100%;
        font-size: 19px;
      }
      &:hover {
        background-color: rgba(#67707A, .3);
      }
    }
    &-info {
      color: #67707A;
      margin-bottom: 15px;
      font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
    }
  }
}
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    &__items {
        display: flex;
        align-items: center;

        &-btn {
            cursor: pointer;
            background: #1A222D;
            padding: 16px 44px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            /* identical to box height */

            text-align: center;

            /* white_96 */

            color: #F5F5F5;
            transition: all 0.5s ease-out;
        }

        &-btn:hover {
            background: linear-gradient(180deg, #2788F6 0%, #0960E0 100%);
        }

        &-img {
            border: 2px solid #20252B;
            margin-right: 8px;
            cursor: pointer;
        }
        &-img:last-child {
            margin-right: 0;
        }
        &-img:hover {
            background: #D8DFEB;
        }
        &__search {
            position: relative;
            &-input {
              background-color: transparent;
              border: none;
              border-bottom: 2px solid #20252B;
              width: 244px;
              color: #fff;
              padding-bottom: 2px;
              padding-right: 20px;
              &::placeholder {
                color: #434951;
              }
              &:focus {
                outline: none;
                border-color: #6f6f6f;
              }
            }
            &::after {
              content: '';
              background-image: url(static/ui/search.svg);
              width: 18px;
              height: 18px;
              position: absolute;
              right: 0;
            }
        }
    }
}
</style>