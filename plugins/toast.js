import Vue from 'vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
  position: POSITION.TOP_RIGHT,
  transition: 'Vue-Toastification__fade',
  maxToasts: 3,
  newestOnTop: true,
  timeout: 3500
}

Vue.use(Toast, options)
