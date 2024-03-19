<script lang="ts" setup>
import { useLayoutConfigStore } from '@/stores/layoutConflg'
import { computed, onMounted, ref } from 'vue'
import {
  onBeforeRouteUpdate,
  type RouteLocationNormalized,
  type RouteRecordNormalized,
  useRoute
} from 'vue-router'

const store = useLayoutConfigStore()

const collapse = () => {
  store.isCollapse = !store.isCollapse
}

const isCollapse = computed(() => {
  return store.isCollapse
})

const route = useRoute()

const breadcrumbList = ref<RouteRecordNormalized[]>([])

const getBreadcrumb = (to: RouteLocationNormalized) => {
  const matched = to.matched.filter((item: RouteRecordNormalized) => {
    if (item.meta && item.meta.title && item.meta.isBreadcrumb !== false) {
      return item
    }
  })

  breadcrumbList.value = matched
}

onBeforeRouteUpdate((to: RouteLocationNormalized) => {
  getBreadcrumb(to)
})

onMounted(() => {
  getBreadcrumb(route)
})
</script>

<template>
  <div class="layout-header-breadcrumb">
    <svg-icon
      :name="isCollapse ? 'ele-Expand' : 'ele-Fold'"
      class="layout-header-expand-icon"
      @click="collapse"
    ></svg-icon>
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <template v-for="(item, index) in breadcrumbList" :key="index">
          <el-breadcrumb-item v-if="index === breadcrumbList.length - 1">
            <span class="flex-center">
              <svg-icon
                v-if="item.meta.icon"
                :name="item.meta.icon"
                :size="14"
                class="mr5"
              ></svg-icon>
              {{ item.meta.title }}
            </span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-from {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
