<template>
  <div class="login">
    <div class="container">
      <div class="login__logo"><img src="/logo.png" alt=""></div>
      <h2 class="login__title title-fz32">Login</h2>
      <form class="login__form" @submit.prevent="submit">
        <div class="login__form-items">
          <div class="login__form-item">
            <p class="login__form-text">Email</p>
            <UI-input type="text"
                      placeholder="email@gmail.com"
                      :fail="$v.email.$error"
                      :errorMessage="emailErrorMsg"
                      @updateField="updateEmail"/>
          </div>
          <div class="login__form-item">
            <p class="login__form-text">Password</p>
            <UI-input type="password"
                      placeholder="Password"
                      :fail="$v.password.$error"
                      :errorMessage="passwordErrorMsg"
                      @updateField="updatePassword"/>
          </div>
          <div class="login__form-item">
            <UI-button :disabled="false">Login</UI-button>
          </div>
        </div>
      </form>
      <div class="login__with">
        <div class="login__with-text">or login with</div>
        <div class="login__with-items">
          <img class="login__with-item" src="/auth-with/facebook.png" alt="">
          <img class="login__with-item" src="/auth-with/battle-net.png" alt="">
          <img class="login__with-item" src="/auth-with/google.png" alt="">
          <img class="login__with-item" src="/auth-with/steam.png" alt="">
        </div>
      </div>
      <div class="login__forgot">
        <nuxt-link class="link" to="/auth/forgot-password">Forgot password?</nuxt-link>
      </div>
      <div class="login__sign-up">
        <span>Don't have an account?</span>
        <nuxt-link class="link" to="/auth/register">Sign up!</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators"
export default {
  layout: 'Auth',
  data() {
    return {
      email: '',
      password: '',
      emailErrorMsg: 'Invalid email',
      passwordErrorMsg: 'Password must be at least 6 characters'
    }
  },
  validations: {
    email: { email, required },
    password: { minLength: minLength(6), required },
  },
  methods: {
      updateEmail(field) {
      this.email = field
    },
    updatePassword(field) {
      this.password = field
    },
    async submit() {
      this.$v.email.$touch()
      this.$v.password.$touch()
      if(this.$v.email.$dirty && !this.$v.email.required) {
        this.emailErrorMsg = 'Required field'
      } else if(this.$v.email.$dirty && !this.$v.email.email) {
        this.emailErrorMsg = 'Invalid email'
      }
      if(this.$v.password.$dirty && !this.$v.password.required) {
        this.passwordErrorMsg = 'Required field'
      } else if(this.$v.password.$dirty && !this.$v.password.minLength) {
        this.passwordErrorMsg = 'Password must be at least 6 characters'
      }
      if(!this.$v.email.$invalid && !this.$v.password.$invalid) {
        try {
          await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)
            .then((user) => {
              if (user) {
                  if (user.emailVerified === false) {
                    this.$fire.auth.signOut()
                  } else {
                    this.$router.push('/')
                    this.$toast.success('You are logged in!');
                  }
                } else {
                  this.$router.push('/LogIn')
                }
            })
            
        } catch (e) {
          if(e.toString().includes('(auth/user-not-found)')) {
            this.$toast.error('User not found');
          } else if(e.toString().includes('(auth/wrong-password)')) {
            this.$toast.error('Wrong password');
          }
        }
      }
    }  
  }
}
</script>

<style lang="scss" scoped>

* {
    font-family: 'Rubik';
    font-style: normal;
    color: #F5F5F5;
  }
  .link {
      color: #0A68F5;
      text-decoration: none;
  }
.login {
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
      max-width: 470px;
    text-align: left;
    margin: 30px 0;
    &-item + &-item {
      margin-top: 16px;
      max-width: 470px;
    }
    &-text {
      margin-bottom: 3px;
      font-size: 14px;
    }
  }
  &__with {
    &-text {
      color: #627CA3;
      margin-bottom: 16px;
    }
    &-items {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    }
    &-item {
      border: 1px solid #16263D;
      padding: 8px;
      cursor: pointer;
      max-width: 48px;
      max-height: 48px;
      & + & {
        margin-left: 8px;
      }
      &:last-child {
        padding: 12px;
      }
    }
  }
  &__forgot {
    margin-bottom: 12px;
  }
}
.container {
  padding: 0 15px;
}
@media (max-width: 500px) {
  .login {
    max-width: 300px;
  }
}
</style>