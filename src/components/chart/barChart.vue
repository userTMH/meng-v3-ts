<template>
  <div>
    <el-card shadow="hover">
      <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useCharts } from '@/hooks/useCharts'

let props = withDefaults(
  defineProps<{
    title?: string
    subtext?: string
    theme?: string
    bgColor?: string
    width?: string
    height?: string
    data: any[]
    xAxisData: any[]
  }>(),
  {
    width: '100%',
    height: '380px'
  }
)

const option = {
  title: {
    subtext: '单位:元',
    text: '会员消费Top10'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: props.xAxisData,
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: props.data
    }
  ]
}

const { chartRef } = useCharts({
  props,
  option
})
</script>
<style lang="scss" scoped></style>
