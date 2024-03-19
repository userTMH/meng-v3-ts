<script lang="ts" setup>
import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'
import { computed, defineAsyncComponent } from 'vue'
import { useLayoutConfigStore } from '@/stores/layoutConflg'

const MenuItem = defineAsyncComponent(() => import('./menuItem.vue'))

const store = useLayoutConfigStore()

const isCollapse = computed(() => {
  return store.isCollapse
})

defineProps<{
  menuList: MenuItemType[]
}>()
</script>

<template>
  <el-menu
    :default-active="$route.path"
    :router="true"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    text-color="#fff"
    :collapse="isCollapse"
  >
    <MenuItem :data="menuList"></MenuItem>
  </el-menu>
</template>

<style lang="scss" scoped></style>
