<template>
  <div>
    <el-card shadow="hover">
      <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { nextTick, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// 接受父组件传递的参数
let props = withDefaults(
  defineProps<{
    title?: string
    subtext?: string
    theme?: string
    bgColor?: string
    width?: string
    height?: string
    data: any[]
  }>(),
  {
    width: '100%',
    height: '380px',
    data: () => []
  }
)

watch(
  () => [props.data, props.theme],
  () => {
    nextTick(() => {
      init()
    })
  },
  {
    deep: true
  }
)

const echartsResizeFun = () => {
  chart.value && chart.value.resize()
}
onMounted(() => {
  init()
  window.addEventListener('resize', echartsResizeFun)
})
onActivated(() => {
  echartsResizeFun()
})

const nvll = ref(['', null, undefined])
const chartRef = ref<HTMLElement | null | undefined>()
const chart = ref<any>()

const init = () => {
  if (!nvll.value.includes(chart.value)) chart.value.dispose()
  chart.value = echarts.init(chartRef.value, props.theme)
  const option = {
    backgroundColor: props.bgColor,
    title: {
      text: props.title,
      subtext: props.subtext,
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '单位:元',
        type: 'pie',
        radius: '60%',
        data: props.data,
        emphasis: {
          itemStyle: {
            // 图形阴影模糊的大小
            shadowBlur: 10,
            // 阴影水平方向偏移量
            shadowOffsetX: 0,
            // 阴影的颜色
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  option && chart.value.setOption(option)
}
onBeforeUnmount(() => {
  window.removeEventListener('resize', echartsResizeFun)
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})
</script>
<style lang="scss" scoped></style>
