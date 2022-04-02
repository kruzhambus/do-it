<template>
    <div>
        <admin-top 
        label="tournament"
        @edit="editChange"
        />
        <div class="tournaments">
            <div class="tournaments__items">
                <div class="tournaments__item" style="border-bottom: 2px solid #20252B; padding: 0;">
                  <div class="tournaments__item-title" style="min-width: 230px;" >
                      <span>Tournament's name</span>
                      <div class="div__ico">
                          <img src="/ui/sort.svg" alt="">
                      </div>
                  </div>
                  <div class="tournaments__item-title" >
                      <span>Entry price</span>
                      <div class="div__ico">
                          <img src="/ui/sort.svg" alt="">
                      </div>
                  </div>
                  <div class="tournaments__item-title"><span>Pool price</span>
                    <div class="div__ico">
                          <img src="/ui/sort.svg" alt="">
                      </div>
                  </div>
                  <div class="tournaments__item-title" ><span>Signed</span>
                    <div class="div__ico">
                          <img src="/ui/sort.svg" alt="">
                      </div>
                  </div>
                  <div class="tournaments__item-title"  ><span>Start In</span>
                    <div class="div__ico">
                          <img src="/ui/sort.svg" alt="">
                      </div>
                  </div>
                </div>
                <div class="tournaments__item" >
                  <div class="tournaments__item-info">The best of the best tournament  </div>
                  <div class="tournaments__item-info">$ 1500 </div>
                  <div class="tournaments__item-info">$ 20000 </div>
                  <div class="tournaments__item-info"> 1/20 </div>
                  <div class="tournaments__item-info">10 minutes
                      <nuxt-link class="edit" v-if="edit" :to="`/admin/edit/tournament/`">edit</nuxt-link>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "empty",
    data () {
        return {
            edit: false,
            sort: ''
        }
    },
    methods: {
        editChange (v) {
            this.edit = v
        }
    }
}
</script>

<style lang="scss" scoped>

.div__ico  {
    display:flex; align-items:center; margin-left: 8px; margin-top: 3px;
}
.edit {
    position: relative;
left:30%;
    font-family: 'Rubik';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 100%;
/* identical to box height, or 12px */

text-align: right;

color: #CCCDCD;
}
.tournaments {
  &__items {
    border: 2px solid #20252B;
  }
  &__item {
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
        padding: 22px 30px;
      color: #67707A;
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