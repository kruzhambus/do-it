import { mount } from '@vue/test-utils'
import NuxtLogo from '@/components/NuxtLogo.vue'

describe('NuxtLogo', () => {
  test('is a Vue tests for vue :)', () => {
    const wrapper = mount(NuxtLogo)
    expect(wrapper.vm).toBeTruthy()
  })
})
