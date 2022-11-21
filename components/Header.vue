<template>
  <header class="header">
      <div class="navbar">
          <ul>
              <li>
                  <a href="/"><img src="/logo.png" alt="" srcset=""></a>
              </li>
              <li>
                  <a href="#">Play</a>
              </li>
              <li>
                  <a href="#">News</a>
              </li>
              <li>
                  <a href="#">Games</a>
              </li>
              <li>
                  <a href="#">Shop</a>
              </li>
              <li>
                  <a href="#">Sponsorship</a>
              </li>
          </ul>
            <div class="button-block" v-if="!$fire.auth.currentUser">
                <nuxt-link to="/auth/Login">
                    <button class="button btn-2">Login</button>
                </nuxt-link>
                <nuxt-link to="/auth/register"> 
                  <button class="button">Sing up</button>
                </nuxt-link>
            </div>
            <div
              @click="userMenu = !userMenu"
              v-else
              class="header__current-user"
            >
              <div class="header__current-user-main">
                <div class="header__icon-user">
                  <img :src="getUser.img" alt="" />
                </div>
                <div class="header__user-body">
                  <div class="header__user-name">{{ getUser.username }}</div>
                  <div class="header__user-many">
                    <div class="header__user-euro">
                      {{ getUser.eur }} <span>EUR</span>
                    </div>
                    <span>/</span>
                    <div class="header__user-dtc">{{ getUser.dtc }} <span>DTC</span></div>
                  </div>
                </div>
              </div>
              <div class="header__user-drop-down">
                <img src="/ui/down-arrow.png" alt="" :style="userMenu ? 'transform: rotate(180deg)': ''"/>
              </div>
              <transition name="menu">
                  <HeaderDropdown v-if="userMenu"></HeaderDropdown>
              </transition>
            </div>
      </div>
      <div class="navbar-res">
          <div class="res">
              <img src="/Vector.png" @click="navbar = true" alt="">
              <img src="/logo.png" alt="" width="56" height="48">
          </div>
      </div>
      <transition name="fade">
      <div class="res-nav" v-show="navbar">
          <div class="res-nav_items">
            <div class="res">
                <div style="height: 48px" @click="navbar = false">
                    <img src="/Vector2.png" alt="">
                </div>
              <img src="/logo.png" alt="" width="56" height="48">
            </div>
            <div class="res-items">
                <div>
                    <a href="#">Play</a>
                </div>
                <div>
                    <a href="#">News</a>
                </div>
                <div>
                    <a href="#">Games</a>
                </div>
                <div>
                    <a href="#">Shop</a>
                </div>
                <div>
                    <a href="#">Sponsorship</a>
                </div>
            </div>
            <div class="button-block res-btn" v-if="!$fire.auth.currentUser">
                <nuxt-link to="/auth/Login">
                    <button class="button">Login</button>
                </nuxt-link>
                <nuxt-link to="/auth/register">
                    <button class="button">Sing up</button>
                </nuxt-link>
            </div>
          </div>
      </div>
      </transition>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: mapGetters(["getUser"]),
    name: "Header",
    data() {
        return {
            navbar: false,
            userMenu: false
        };
    },
    async mounted() {
        if (this.$fire.auth.currentUser && this.getUser) {
            await this.$store.dispatch("userAction", this.$fire.auth.currentUser.uid);
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    font-size: 20px;
    color: #F5F5F5;
  }
.header {
        max-width: 1170px;
        margin: auto;
    }
    .button-block {
        display: flex;
        align-items: center;
    }
    .button {
        cursor: pointer;
        width: 105px;
        height: 44px;
        background: #1A222D;
        border-radius: 2px;
        padding: 0;
        border: 1px solid #1A222D;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        text-align: center;

        /* white_96 */

        color: #F5F5F5;
        transition: all 0.5s cubic-bezier(0, 0.42, 0.98, -0.06);
    }
    .button:hover {
        background: linear-gradient(180deg, #2788F6 0%, #0960E0 100%);
    }
    .navbar {
        margin-top: 32px;
        margin-bottom: 46px;
        height: 64px;
            display: flex;
        justify-content: space-between;
        align-items: center;
    }
    img {
        cursor: pointer;
    }
    .navbar-res {
        display: none;
    }

    .res {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .res-btn {
        flex-direction: column;
        margin-top: 72px;
    }

    .res-btn button {
        margin-top: 12px;
        width: 100%;
        min-width: 328px;
        max-width: 328px;
        height: 48px;
    }
    .res-nav {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 10;
        background-color: #0F1215;
    }

    .res-nav_items {
        margin: 16px 21px;
    }
    .res-items {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .res-items div {
        margin-top: 30px;
    }
    li {
        margin-right: 56px;
        list-style: none;
    }
    li:last-child {
        margin-right: 0;
    }
    ul {
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        justify-content: center;
    }
    a {
        text-decoration: none;
    }
    @media screen and (max-width: 1450px) {
        .header {
            margin-left: 120px;
        }

    }
    @media screen  and (max-width: 1100px) {
    .header {
        margin-left: 63px;
    }
    li {
        margin-right: 26px;
    }
}
    @media screen and (max-width: 850px) {
        .header {
            margin-left: 0;
        }
        .navbar {
            display: none;
        }
        .navbar-res {
            display: block;
            margin: 16px 21px;
        }
    }
.fade-enter-active, .fade-leave-active {
  transition: all .6s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.name-enter-active, .name-leave-active {
  transition: all .6s ease-in-out;
}
.name-enter, .name-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.header {
    &__current-user {
    position: relative;
    z-index: 10;
    display: flex;
    width: 225px;
    height: 50px;
    padding: 5px 10px;
  }
  &__current-user-main {
    display: flex;
  }
  &__icon-user {
    width: 40px;
    height: 40px;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
  }
  &__user-body {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__user-name {
    font-weight: 500;
    font-size: 14px;
  }
  &__user-many {
    color: #55aaff;
    font-size: 12px;
    display: flex;
    span {
      color: #55aaff;
      margin: 0px 5px;
    }
  }
  &__user-euro {
      font-size: 12px;
      color: #55aaff;
    span {
      color: #55aaff;
      font-size: 12px;
    }
  }
  &__user-dtc {
      font-size: 12px;
      color: #55aaff;
    span {
      font-size: 12px;
      color: #55aaff;
    }
  }
  &__user-drop-down {
    position: absolute;
    right: 15px;
    top: 40%;
    color: #2b353f;
    display: flex;
    align-items: center;
    width: 15px;
    height: 10px;
    transition: all 0.5s;
  }
}
</style>
