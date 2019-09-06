import { ArrangeHttpMethod } from '_common/util'

// 获取系统信息
export function getUserMessage() {
  return ArrangeHttpMethod('get')('/account')
}
