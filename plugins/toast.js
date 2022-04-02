import Vue from 'vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
  position: POSITION.TOP_RIGHT,
  transition: 'Vue-Toastification__fade',
  maxToasts: 2,
  newestOnTop: true,
  timeout: 2000
}

Vue.use(Toast, options)