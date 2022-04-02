<template>
  <div class="forgot-password">
    <div class="container">
      <div class="forgot-password__logo"><img src="/logo.png" alt=""></div>
      <h2 class="forgot-password__title title-fz32">Forgot password</h2>
      <form class="forgot-password__form" @submit.prevent="submit">
        <div class="forgot-password__form-items">
          <div class="forgot-password__form-item">
            <p class="forgot-password__form-text">Email</p>
            <UI-input type="text"
                      placeholder="email@gmail.com"
                      :fail="$v.email.$error"
                      :errorMessage="emailErrorMsg"
                      @updateField="updateEmail"/>
          </div>
          <div class="forgot-password__form-item">
            <UI-button>Reset password</UI-button>
          </div>
        </div>
      </form>
      <nuxt-link class="link" to="/auth/login" style="text-decoration: none; color: #0A68F5;">Back to login</nuxt-link>
    </div>
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators"
export default {
  layout: 'Auth',
  data() {
    return {
      email: '',
      emailErrorMsg: 'Invalid email',
    }
  },
  validations: {
    email: { email, required },
  },
  methods: {
    submit() {
      this.$v.email.$touch()
      if(this.$v.email.$dirty && !this.$v.email.required) {
        this.emailErrorMsg = 'Required field'
      } else if(this.$v.email.$dirty && !this.$v.email.email) {
        this.emailErrorMsg = 'Invalid email'
      }
      if(!this.$v.email.$invalid) {
        try {
          this.$fire.auth.sendPasswordResetEmail(this.email)
        } catch (e) {
          this.$toasted.error(e);
        }
        this.$router.push('/auth/login')
      }
    },
    updateEmail(field) {
      this.email = field
    },
  }
}
</script>

<style lang="scss" scoped>
.forgot-password {
  text-align: center;
  padding-top: 160px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  &__logo {
    margin: 0 auto 44px;
    width: 88px;
  }
  &__form {
    text-align: left;
    margin: 30px 0;
    &-item + &-item {
      margin-top: 16px;
    }
    &-text {
      margin-bottom: 3px;
      font-size: 14px;
    }
  }
}
.container {
  padding: 0 15px;
}
@media (max-width: 500px) {
  .forgot-password {
    max-width: 300px;
  }
}
</style>