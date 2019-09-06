import { ArrangeHttpMethod } from '_common/util'

// 获取首页数据
export function MainChart(params, methods) {
  return ArrangeHttpMethod(methods)('monitor/main/chart', params)
}

// 获取图表数据
export function ChartData(params, methods, path) {
  return ArrangeHttpMethod(methods)('/monitor/chart/data/' + path, params)
}

// 获取表格数据条目
export function ChartDeviceItems(params, methods) {
  return ArrangeHttpMethod(methods)('/monitor/chart/device_items/', params)
}

// 主页地图数据
export function GetDevicesData(params, methods) {
  return ArrangeHttpMethod(methods)('/monitor/main/map/', params)
}
