import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutConfigStore = defineStore(
  'layoutConfig',
  () => {
    const isCollapse = ref<boolean>(false)
    const isDark = ref<boolean>(false)
    return {
      isCollapse,
      isDark
    }
  },
  {
    persist: true
  }
)
