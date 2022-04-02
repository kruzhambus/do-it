<template>
  <div class="verify-email">
    <div class="container">
      <div class="verify-email__logo"><img src="/logo.png" alt=""></div>
      <h2 class="verify-email__title">You registered on <nuxt-link class="link" to="/" style="text-decoration:none; color: #0A68F5">doit.gg</nuxt-link> to continue verify your email</h2>
      <form class="verify-email__form" @submit.prevent="submit">
        <UI-button class="verify-email__button">Verify email</UI-button>
      </form>
      <p class="verify-email__text">
        This is an automated email. <br />
        If you recieved it in error, no action is required
      </p>
    </div>
  </div>
</template>

<script>
import { getAuth, sendEmailVerification } from "firebase/auth";

export default {
  layout: 'Auth',
  data() {
    return {
      id: ''
    }
  },
  methods: {
    async submit() {
      const auth = getAuth()
      sendEmailVerification(auth.currentUser)
      const usersRef = this.$fire.database.ref('users')
      try {
        const snapshot = await usersRef.once('value')
        const users = snapshot.val()
        Object.keys(users).forEach((user) => {
          if(users[user].uid = this.$route.query.uid) {
            this.id = users[user].id
          }
        })
        const userEmailVerifyRef = this.$fire.database.ref(`users/${this.id}/emailVerified`)
        await userEmailVerifyRef.set(true)
        this.$router.push('/')
        this.$toast.success('Success')
      } catch (e) {
          console.log(e);
        this.$toast.error(e)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.verify-email {
  text-align: center;
  padding-top: 260px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  &__logo {
    margin: 0 auto 44px;
    width: 88px;
  }
  &__title {
    font-size: 22px;
    margin-bottom: 30px;
  }
  &__text {
    color: #2B405E;
    font-size: 14px;
    margin-top: 100px;
  }
}
.container {
  padding: 0 15px;
}
@media (max-width: 500px) {
  .verify-email {
    max-width: 300px;
  }
}
</style>