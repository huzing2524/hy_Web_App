import Vue from 'vue'
import App from './App'
import router from './router'
import './registerServiceWorker'
import 'amfe-flexible'
import 'vue-g2'
// cube-ui
import './cube-ui'

Vue.directive('doc-title', function(el, binding) {
  let title = binding.value
  if (title === undefined || window.document.title === title) {
    return
  }
  document.title = title
})

//chart
import VeLine from 'v-charts/lib/line.common'

Vue.component(VeLine.name, VeLine)

//Clipboard
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
import { Select } from 'cube-ui'
Vue.use(Select)
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode)

// 数据处理
import _ from 'lodash'

Vue.prototype._ = _

// Toast 全局$toast
import Toast from './components/toast/index'

Vue.use(Toast)

// 图表库
import VCharts from 'v-charts'

Vue.use(VCharts)

// 全局过滤器
import filters from './filters'

Object.keys(filters).forEach((filterName) => {
  Vue.filter(filterName, filters[filterName])
})

// i18n
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  data() {
    return {
      locale: this.$i18n.messages[this.$i18n.locale],
    }
  },
  render: (h) => h(App),
}).$mount('#app')
