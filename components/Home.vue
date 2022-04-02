<template>
  <div>
    <div class="main">
      <h1>DOIT <span>BETA</span></h1>
      <p>Prepare for your esports career and get ready for awesome tournaments with big prize pools and many fun!
Register Now!</p>
      <div class="button-block" v-if="!$fire.auth.currentUser">
          <nuxt-link to="/auth/Login">
            <button class="button">Login</button>
          </nuxt-link>
          <nuxt-link to="/auth/register">
            <button class="button">Sing up</button>
          </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "IndexPage"
}
</script>

<style scoped>
* {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    font-size: 20px;
    color: #F5F5F5;
  }
.button-block {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 29px;
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
.main {
  background-image: url('static/1.Key_visual.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  min-height: 800px;
}
  h1, span {
    padding-top: 152px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    font-size: 125px;
    line-height: 100%;
    /* identical to box height, or 125px */

    text-align: center;
    margin-bottom: 0;
    margin-top: 0;
  }
  p {
    max-width: 463px;
    margin: auto;
    margin-top: 17px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    text-align: center;

    /* white_80 */

    color: #CCCCCC;
  }
  .bg-img {
    display: block;
    margin: auto;
  }
  @media screen and (max-width: 1250px) {
        .main {
            background-size: 80%;
        }
  }
  @media screen  and (max-width: 1100px) {
    h1,span {
      font-size: 70px;
    }
    p {
      font-size: 14px;
    }
    .main {
      background-position-y: 30%;
    }
}
@media screen and (max-width: 850px) {
  .main {
      background-size: unset;
      background-image: url('static/visual.png');
  }
  span {
    display: none;
  }
  h1 {
    font-weight: 700;
    font-size: 84px;
    line-height: 100%;
  }
  .button-block {
    display: none;
  }
}
</style>
