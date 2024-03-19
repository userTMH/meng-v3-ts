// 营业数据统计的ts类型
export type StatisticsResType = {
  totalOrderNum: number
  totalSaleMoney: number
  totalReturnedMoney: number
  totalIncomeMoney: number
}

//分类销售统计数据Ts类型
export type CategoryResType = {
  name: string
  value: number
}

//获取会员消费top数据ts类型
export type TopResType = {
  count: any
  name: string
  consumeMoney: number
}
