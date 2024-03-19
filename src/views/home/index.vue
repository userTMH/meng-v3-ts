<script lang="ts" name="Home" setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { getCategorySalesApi, getCategory, saleDataApi } from '@/api/home'
import type { CategoryResType } from '@/api/home/types'
import { useLayoutConfigStore } from '@/stores/layoutConflg'

const store = useLayoutConfigStore()

const StaticBlock = defineAsyncComponent(() => import('./components/staticBlock.vue'))
const pieChart = defineAsyncComponent(() => import('@/components/chart/pieChart.vue'))
const barChart = defineAsyncComponent(() => import('@/components/chart/barChart.vue'))
const gaugeChart = defineAsyncComponent(() => import('@/components/chart/gaugeChart.vue'))
const bumpChart = defineAsyncComponent(() => import('@/components/chart/bumpChart.vue'))

const categoryData = ref<CategoryResType[]>([])

const loadCategoryData = async () => {
  try {
    const { data } = await getCategorySalesApi()
    categoryData.value = data
  } catch (error) {
    console.log(error)
  }
}
loadCategoryData()
const theme = computed(() => (store.isDark ? 'dark' : ''))
const bgColor = computed(() => (store.isDark ? 'transparent' : ''))

const xAxisData = ref<string[]>([])

const ydata = ref<number[]>([])

const loadTopData = async () => {
  try {
    const res = await getCategory()
    xAxisData.value = res.data.map((item) => item.name)
    ydata.value = res.data.map((item) => item.consumeMoney)
  } catch (error) {
    console.log(error)
  }
}
loadTopData()

const listData = ref<any[]>([])
const saleData = async () => {
  try {
    const res = await saleDataApi()
    // console.log(res)
    listData.value = res.data
  } catch (error) {
    console.log(error)
  }
}
saleData()
</script>

<template>
  <div>
    <StaticBlock></StaticBlock>
    <el-row :gutter="24">
      <el-col :lg="9" :md="9" :sm="24" :xs="24" class="mb15">
        <pieChart
          v-if="categoryData.length > 0"
          :data="categoryData"
          :theme="theme"
          subtext="每种商品分类的近30天销售数据"
          title="分类销售统计"
        ></pieChart>
      </el-col>
      <el-col :lg="15" :md="15" :sm="24" :xs="24" class="mb15">
        <bumpChart :data="listData" :theme="theme"></bumpChart>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :lg="12" :md="12" :sm="24" :xs="24" class="mb15">
        <barChart
          v-if="ydata.length > 0 && xAxisData.length > 0"
          :data="ydata"
          :theme="theme"
          :xAxisData="xAxisData"
        ></barChart>
      </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xs="24" class="mb15">
        <gaugeChart :data="38" title="气温仪表盘℃"></gaugeChart>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss"></style>
