import ToastComponent from './Toast'

const Toast = {}

Toast.install = (Vue) => {
  // 第一步：使用基础 Vue 构造器，创建一个“子类”
  const ToastConstructor = Vue.extend(ToastComponent)
  // 第二步：创造一个组件实例
  const instance = new ToastConstructor()
  // 第三步：挂载实例。挂载的目标就是把模板渲染成最终的DOM。
  instance.$mount()
  // 第四步：在body添加组件
  document.body.appendChild(instance.$el)

  // 第五步：添加实例方法，以供全局调用
  Vue.prototype.$toast = (txt, type = 'txt', mask = false, time = 1000) => {
    if (!txt) {
      return
    }
    instance.txt = txt
    instance.type = type
    instance.mask = mask
    instance.time = time
    instance.show = true
    setTimeout(() => {
      instance.show = false
    }, time)
  }
}

export default Toast
