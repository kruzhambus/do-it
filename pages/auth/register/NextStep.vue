<template>
  <div class="register">
    <div class="container">
      <div class="register__logo"><img src="/logo.png" alt=""></div>
      <h2 class="register__title title-fz32">Sign up 2/2</h2>
      <form class="register__form" @submit.prevent="submit">
        <div class="register__form-items">
          <div class="register__form-item">
            <p class="register__form-text">Username</p>
            <UI-input type="text"
                      placeholder="Username"
                      :fail="$v.username.$error"
                      errorMessage="Username must be at least 3 characters"
                      @updateField="updateUsername"/>

          </div>
          <div class="register__form-item">
            <p class="register__form-text">Country</p>
            <UI-dropdown title="Choose a country"
                         @updateSelect="updateSelect"
                         :items="countries"/>
            <p class="register__fail-message" v-if="$v.country.$error">Field is required</p>
          </div>
          <div class="register__form-item">
            <p class="register__form-text">Date of birth</p>
            <UI-date @updateDate="updateDate"/>
            <p class="register__fail-message" v-if="$v.dateOfBirth.$error">Field is required</p>
          </div>
          <div class="register__form-item">
            <UI-cheackbox class="register__form-checkbox" @updateCheckbox="updateCheckbox">
              <span class="register__form-checkbox-text">I’m have at least 13 years of age
                and agree to the <nuxt-link class="link" to="/" style="color: #0A68F5; text-decoration: none">terms of service</nuxt-link>.
              </span>
            </UI-cheackbox>
            <p class="register__fail-message" v-if="checkboxError">
              You must agree to the user agreement
            </p>
          </div>
          <div class="register__form-item">
            <UI-button>
              Create an account
            </UI-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators"
import { getNames } from "country-list"

export default {
  layout: 'Auth',
  mounted() {
    this.countries = getNames()
  },
  data() {
    return {
      username: '',
      country: '',
      countries: '',
      dateOfBirth: '',
      age: 0,
      dateRegistration: '',
      uid: '',
      checkbox: false,
      emailVerified: '',
      checkboxError: false,
    }
  },
  validations: {
    username: { required, minLength: minLength(3) },
    country: { required },
    dateOfBirth: { required, minLength: minLength(8), maxLength: maxLength(10) },
  },
  methods: {
    async submit() {
      this.$v.username.$touch()
      this.$v.country.$touch()
      this.$v.dateOfBirth.$touch()
      this.checkboxError = !this.checkbox;
      if(this.$v.username.$dirty && !this.$v.username.required) {
        this.usernameErrorMsg = 'Required field'
      }
      if(!this.$v.username.$error && !this.$v.country.$error && !this.$v.dateOfBirth.$error && !this.checkboxError) {
        try {
          await this.$fire.auth.createUserWithEmailAndPassword(this.$route.query.email, this.$route.query.password)
            .then((user) => {
              this.uid = user.user.uid
              this.emailVerified = user.user.emailVerified
            })
          const usersRef = await this.$fire.database.ref(`users/${(+new Date()-(+new Date()%100)) / 100}`)
          await usersRef.set({
            id: (+new Date()-(+new Date()%100)) / 100,
            uid: this.uid,
            email: this.$route.query.email,
            password: this.$route.query.password,
            name: '',
            username: this.username,
            country: this.country,
            isAdmin: false,
            hp: 0,
            age: Number(new Date().toLocaleDateString().slice(-4))- Number(this.dateOfBirth.slice(-4)),
            emailVerified: this.emailVerified,
            dateOfBirth: this.dateOfBirth,
            dateRegistration: new Date().toLocaleString(),
            img: 'https://play-lh.googleusercontent.com/2P-tY-v50Iu8DHr4kuD12zc3vWjVQSnJZhKwj9N2SQPj3XgYU1VmJjNpGf4z5yjSVN4e=w512',
            lvl: 0,
            gameProfile: {
              battlenet: '',
              riot: '',
              steam: ''
            },
            eur: 0,
            dtc: 0,
            subscribe: 'free',
            rank: 'user'
          })
        } catch (e) {
            console.log(e);
          this.$toast.error(e)
        }
        this.$router.push({
          path: '/auth/register/verify-email',
          query: {
            uid: this.uid
          }
        })
        this.$toast.success('Success')
      }
    },
    updateUsername(field) {
      this.username = field
    },
    updateSelect(select) {
      this.country = select
    },
    updateDate(date) {
      this.dateOfBirth = date
    },
    updateCheckbox(check) {
      if(check) {
        this.checkboxError = false
      }
      this.checkbox = check
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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
    &-checkbox {
      display: flex;
      align-items: center;
    }
    &-checkbox-text {
      color: #627CA3;
      font-size: 14px;
    }
  }
  &__fail-message {
    font-size: 12px;
    color: #B83333;
  }
}
.container {
  padding: 0 15px;
}
@media (max-width: 500px) {
  .register {
    max-width: 300px;
  }
}
</style>