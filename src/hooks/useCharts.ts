import { markRaw, nextTick, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

export interface ParamsType {
  props: any
  option: any
}

export const useCharts = (params: ParamsType) => {
  const { props, option } = params

  const chartRef = ref<HTMLElement | null | undefined>() // dom

  const nvll = ref(['', null, undefined])

  const chart = ref<any>() // echarts实例对象

  onMounted(() => {
    window.addEventListener('resize', echartsResizeFun)
  })

  onActivated(() => {
    chart.value && echartsResizeFun()
  })

  watch(
    () => [props.data, props.theme],
    () => {
      nextTick(() => {
        init()
      })
    },
    {
      deep: true,
      immediate: true
    }
  )

  // 初始化渲染图标
  const init = () => {
    if (!nvll.value.includes(chart.value)) chart.value.dispose()

    // 2. 进行初始化

    chart.value = markRaw(echarts.init(chartRef.value, props.theme))

    // 4. 使用刚指定的配置项和数据显示图表
    chart.value.setOption(option)
  }

  // 图标自适应
  const echartsResizeFun = () => {
    chart.value && chart.value.resize()
  }

  // 监听组件的销毁
  onBeforeUnmount(() => {
    window.removeEventListener('resize', echartsResizeFun)
    if (chart.value) {
      chart.value.dispose()
      chart.value = null
    }
  })

  return {
    chartRef,
    echartsResizeFun,
    chart,
    init
  }
}
