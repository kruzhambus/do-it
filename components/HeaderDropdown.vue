<template>
  <div>
    <div class="dropdown">
      <div class="dropdown__content">
        <div class="dropdown__lvl">
          LVL <span>{{ this.getUser.lvl }}</span> <span class="dropdown__lvl-row"><div class="progres" :style="'width:'+ this.getUser.hp+'%'"></div></span>
        </div>
        <ul class="dropdown__list">
          <li @click="this.$router.push('/')" class="dropdown__link">
            User panel
          </li>
          <li @click="this.$router.push('/')" class="dropdown__link">
            My team
          </li>
          <li
            @click="this.$router.push('/')"
            class="dropdown__link"
          >
            Withdraw
          </li>
          <li
            @click="this.$router.push('/')"
            class="dropdown__link"
          >
            Deposit
          </li>
          <li @click="this.$router.push('/')" class="dropdown__link">
            Premium
          </li>
          <li @click="this.$router.push('/')" class="dropdown__link">
            Statistics
          </li>
        </ul>
        <div class="dropdown__footer">
          <ul>
            <li>
              Statistics

            </li>
            <li @click="this.$router.push('/')">
              Settings
            </li>
            <li @click="logOut()">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'HeaderDropdown',
  computed: { ...mapGetters(['getUser']) },
  methods: {
    async logOut() {
      await this.$fire.auth.signOut()
    }
  },
};
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
}

.progres {
  border: 1px solid #F5F5F5;
}
.dropdown {
      position: absolute;
      z-index: 20;
      left: 0;
      top: 50px;
      padding-bottom: 60px;
      width: 225px;

      &__lvl {
        display: flex;
        align-items: center;
        font-size: 10px;
        font-weight: 400;
        border-bottom: solid 2px #0f1215;
        padding: 10px 15px;
        background-color: #161a1f;
        span {
          margin: 0px 5px;
        }
      }
      &__list {
        padding: 10px 15px;
        background-color: #161a1f;
      }
      &__link {
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 400;
        color: #f5f5f5;
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        cursor: pointer;
        img {
          transform: rotate(90deg);
        }
      }
      &__footer {
        border-top: solid 2px #0f1215;
        padding: 10px 15px;
        background-color: #161a1f;
        img {
          transform: rotate(90deg);
        }
        ul {
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          li {
            display: flex;
            justify-content: space-between;
            color: #969ba3;
            font-size: 12px;
            cursor: pointer;
          }
        }
      }
      &__lvl-row {
        display: block;
        width: 160px;
        height: 2px;
        background-color: black;
        margin-left: 10px;
      }
}    
</style>