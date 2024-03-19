<template>
  <div>
    <el-card shadow="hover">
      <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useCharts } from '@/hooks/useCharts'

// 接受父组件传递的参数
let props = withDefaults(
  defineProps<{
    title?: string
    subtext?: string
    theme?: string
    bgColor?: string
    width?: string
    height?: string
    data: any
  }>(),
  {
    width: '100%',
    height: '380px',
    data: () => []
  }
)

const years = props.data.last30Days

let option = {
  title: {
    text: '近30天销售趋势'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['订单数', '销售额', '退款额', '充值额']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      margin: 30,
      fontSize: 16
    },
    boundaryGap: false,
    data: years
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      margin: 30,
      fontSize: 16,
      formatter: '{value}'
    },
    interval: 1000,
    min: 0,
    max: 5000
  },
  series: [
    {
      name: '订单数',
      data: props.data.orderNumList,
      type: 'line',
      emphasis: {
        focus: 'series'
      }
    },
    {
      name: '销售额',
      data: props.data.rechargeMoneyList,
      type: 'line',
      emphasis: {
        focus: 'series'
      }
    },
    {
      name: '退款额',
      data: props.data.returnMoneyList,
      type: 'line',
      emphasis: {
        focus: 'series'
      }
    },
    {
      name: '充值额',
      data: props.data.saleMoneyList,
      type: 'line',
      emphasis: {
        focus: 'series'
      }
    }
  ]
}

const { chartRef } = useCharts({
  option,
  props
})
</script>
<style lang="scss" scoped></style>
