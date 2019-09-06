<template lang="pug">
  .analysis.fbox
    .analysis_header
      .analysis_item(v-if="tabIndex === 0" @click="analysisClick(1)")
        span 数据看板
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#icontab")
      .analysis_item(v-if="tabIndex === 1" @click="analysisClick(0)")
        span 实时数据
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#icontab")
      .analysis_item(@click="screenClick")
        span 筛选
        .icon.small(v-if="maskShow")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconarrow_on")
        .icon.small(v-else)
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconarrow_under")
    .analysis_content(v-if="tabIndex === 0")
      .content
        .img_item(v-if="photoUrl")
          img(:src="photoUrl")
        ChartItem(v-for="(item, idx) in chartList" :chartData="item" :key="idx")
    .real_content(v-if="screen && tabIndex === 1 && realtimeData.length")
      .real_items(v-for="(item,index) in realtimeData" :key="index" @click="toDetailClick(item)")
        span {{item.value}}
        p {{item.name}}
    .empty(v-if="!screen") 请先选择筛选条件
    Empty(v-if="(screen && tabIndex === 0 && chartList.length<=0) || (screen && tabIndex === 1 && realtimeData.length<=0)")
    .mask(v-if="maskShow" @click="closeClick")
    .realDialog(v-if="realDialog")
      .real_item
        .left 地区
        .right
          cube-input(placeholder="全部" v-model="searchItem.city_name" disabled)
          .icon(@click="showCityPicker")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconArrow_select")
      .real_item
        .left 客户名称
        .right
          cube-input(placeholder="全部" v-model="searchItem.customer_name" disabled)
          .icon(@click="showCustomerPicker")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconArrow_select")
      .real_item
        .left 所属站点
        .right
          cube-input(placeholder="全部" v-model="searchItem.site_name" disabled)
          .icon(@click="showSitePicker")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconArrow_select")
      .real_options
        .option_item(@click="realReset") 重置
        .option_item(@click="saveClick") 保存
</template>

<script>
  import ChartItem from '_components/chart'
  import { regionCustomer, customerSite } from '_api/client_manage'
  import { analysisRealtime } from '_api/data_manage'
  import { MainChart } from '_api/monitor'
  import Empty from '_components/empty'

  export default {
    components: {
      Empty,
      ChartItem,
    },
    data() {
      return {
        tabIndex: 0,
        realDialog: false,
        maskShow: false,
        screen: false,
        customerList: [],
        siteList: [],
        realtimeData: [],
        photoUrl: '',
        chartList: [],
        searchItem: {
          city_name: '',
          customer_name: '',
          customer_id: '',
          site_name: '',
          site_id: '',
        },
        city: [{ 'value': '北京市', 'text': '北京市' },
          { 'value': '天津市', 'text': '天津市' },
          { 'value': '上海市', 'text': '上海市' },
          { 'value': '重庆市', 'text': '重庆市' },
          { 'value': '香港特别行政区', 'text': '香港特别行政区' },
          { 'value': '澳门特别行政区', 'text': '澳门特别行政区' },
          { 'value': '河北省', 'text': '河北省' },
          { 'value': '山西省', 'text': '山西省' },
          { 'value': '内蒙古自治区', 'text': '内蒙古自治区' },
          { 'value': '辽宁省', 'text': '辽宁省' },
          { 'value': '吉林省', 'text': '吉林省' },
          { 'value': '黑龙江省', 'text': '黑龙江省' },
          { 'value': '江苏省', 'text': '江苏省' },
          { 'value': '浙江省', 'text': '浙江省' },
          { 'value': '安徽省', 'text': '安徽省' },
          { 'value': '福建省', 'text': '福建省' },
          { 'value': '江西省', 'text': '江西省' },
          { 'value': '山东省', 'text': '山东省' },
          { 'value': '河南省', 'text': '河南省' },
          { 'value': '湖北省', 'text': '湖北省' },
          { 'value': '湖南省', 'text': '湖南省' },
          { 'value': '广东省', 'text': '广东省' },
          { 'value': '广西壮族自治区', 'text': '广西壮族自治区' },
          { 'value': '海南省', 'text': '海南省' },
          { 'value': '四川省', 'text': '四川省' },
          { 'value': '贵州省', 'text': '贵州省' },
          { 'value': '云南省', 'text': '云南省' },
          { 'value': '西藏自治区', 'text': '西藏自治区' },
          { 'value': '陕西省', 'text': '陕西省' },
          { 'value': '甘肃省', 'text': '甘肃省' },
          { 'value': '青海省', 'text': '青海省' },
          { 'value': '宁夏回族自治区', 'text': '宁夏回族自治区' },
          { 'value': '新疆维吾尔自治区', 'text': '新疆维吾尔自治区' },
          { 'value': '台湾省', 'text': '台湾省' }],
      }
    },
    mounted() {

    },
    methods: {
      getChartMain() {
        MainChart(
          {
            customer_id: this.searchItem.customer_id,
            site_id: this.searchItem.site_id,
          },
          'get',
        ).then((res) => {
          if (res.code === 200) {
            this.chartList = res.data.charts
            this.photoUrl = res.data.img
          }
        })
      },
      getRealtimeData() {
        let params = {
          customer_id: this.searchItem.customer_id,
          site_id: this.searchItem.site_id,
        }
        analysisRealtime(params, 'get').then((res) => {
          if (res.code === 200) {
            this.realtimeData = res.data
          } else {
            this.$toast(res.msg)
          }
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      analysisClick(index) {
        this.pickerCustomer = undefined
        this.pickerSite = undefined
        this.tabIndex = index
        this.screen = false
        if (this.tabIndex === 0) {
          this.photoUrl = ''
          this.chartList = []
        }
        if (this.tabIndex === 1) {
          this.realtimeData = []
        }
      },
      screenClick() {
        this.pickerCity = undefined
        this.pickerCustomer = undefined
        this.pickerSite = undefined
        this.photoUrl = ''
        this.chartList = []
        this.realtimeData = []
        this.searchItem = {
          customer_name: '',
          customer_id: '',
          site_name: '',
          site_id: '',
        },
        this.maskShow = true
        this.realDialog = true
      },
      closeClick() {
        this.maskShow = false
        this.realDialog = false
      },
      realReset() {
        this.searchItem = {
          customer_name: '',
          customer_id: '',
          site_name: '',
          site_id: '',
        },
          this.maskShow = false
        this.realDialog = false
        if (this.tabIndex === 0) {
          this.photoUrl = ''
          this.chartList = []
        }
        if (this.tabIndex === 1) {
          this.realtimeData = []
        }
      },
      saveClick() {
        this.screen = true
        if (this.tabIndex === 0) {
          this.getChartMain()
        }
        if (this.tabIndex === 1) {
          this.getRealtimeData()
        }
        this.maskShow = false
        this.realDialog = false
      },
      showCityPicker() {
        if (!this.pickerCity) {
          this.pickerCity = this.$createPicker({
            title: '选择地区',
            data: [this.city],
            onSelect: this.citySelect,
            onCancel: this.cityCancel,
          })
        }
        this.pickerCity.show()
      },
      citySelect(selectedVal, selectedIndex, selectedText) {
        this.searchItem = {}
        this.pickerCustomer = undefined
        this.pickerSite = undefined
        this.searchItem.city_name = selectedText[0]
        this.searchItem.city_id = selectedVal[0]

        regionCustomer({ province: this.searchItem.city_id }, 'get')
          .then((res) => {
            if (res.code === 200) {
              this.customerList = res.data
            } else {
              this.$toast(res.msg)
            }
          })
          .catch(() => {
            this.loading = false
            this.$toast('获取数据失败')
          })
      },
      cityCancel() {

      },
      showCustomerPicker() {
        if (!this.pickerCustomer) {
          this.pickerCustomer = this.$createPicker({
            title: '选择客户',
            alias: {
              value: 'customer_id',
              text: 'name_cn'
            },
            data: [this.customerList],
            onSelect: this.customerSelect,
            onCancel: this.customerCancel,
          })
        }
        this.pickerCustomer.show()
      },
      customerSelect(selectedVal, selectedIndex, selectedText) {
        this.searchItem.customer_id = ''
        this.siteList = []
        this.searchItem.customer_id = selectedVal[0]
        this.searchItem.customer_name = selectedText[0]
        if (this.searchItem.customer_id) {
          customerSite({}, 'get', this.searchItem.customer_id).then((res) => {
            if (res.code === 200) {
              this.siteList = res.data.list
            } else {
              this.$toast(res.msg)
            }
          }).catch(() => {
            this.loading = false
            this.$toast('获取数据失败')
          })
        }
      },
      customerCancel() {

      },
      showSitePicker() {
        if (!this.searchItem.customer_id) {
          this.$toast('请先选择客户')
          return
        }
        if (!this.pickerSite) {
          this.pickerSite = this.$createPicker({
            title: '选择站点',
            alias: {
              value: 'id',
              text: 'site_name'
            },
            data: [this.siteList],
            onSelect: this.siteSelect,
            onCancel: this.siteCancel,
          })
        }
        this.pickerSite.show()
      },
      siteSelect(selectedVal, selectedIndex, selectedText) {
        this.searchItem.site_id = selectedVal[0]
        this.searchItem.site_name = selectedText[0]
        this.siteList = []
      },
      siteCancel() {

      },
      toDetailClick(item) {
        this.$router.push(`/analysis/detail?device_id=${item.device_id}&name=${item.name}&site_name=${this.searchItem.site_name}`)
      },
    },
  }
</script>

<style scoped lang="stylus">
  .analysis
    display flex
    flex-direction column
    overflow-x hidden
    overflow-y scroll
    padding 10px
    .analysis_header
      display flex
      flex-direction row
      justify-content space-between
      background #ffffff
      padding 14px 12px
      margin-bottom 10px
      border-radius 4px
      .analysis_item
        display flex
        flex-direction row
        align-items center
        span
          display flex
          fsc 14px #333333
          margin-right 6px
        .icon
          display flex
          wh 12px 12px
        .small
          wh 10px 6px
    .analysis_content
      display flex
      flex-direction column
      .content
        padding-bottom 10px
        .img_item
          width 355px
          margin 10px auto 0
          border-radius 4px
          padding 12px
          position relative
          display flex
          flex-direction column
          align-items center
          bgf()
      .items
        height 300px
        background #ffffff
        border-radius 4px
        margin-bottom 10px
        position relative
    .real_content
      display flex
      flex-wrap wrap
      .real_items
        display flex
        flex-direction column
        align-items center
        justify-content center
        width 49%
        height 80px
        background #fff
        margin-right 2%
        margin-bottom 8px
        border-radius 4px
        &:nth-of-type(2n)
          margin-right 0
        span
          fsc 18px #333333
          margin-bottom 6px
        p
          fsc 12px #666666
    .empty
      display flex
      flex 1
      justify-content center
      align-items center
      fsc 16px #999999
    .mask
      width 100%
      height 100%
      position fixed
      left 0
      top 0
      background rgba(0, 0, 0, 0.3)
      z-index 1
    .realDialog
      width 100%
      position fixed
      left 0
      bottom 0
      display flex
      flex-direction column
      background #fff
      z-index 10
      .real_item
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        border-bottom 1px solid #EEEEEE
        padding 12px 10px
        .left
          display flex
          fsc 14px #666666
        .right
          display flex
          flex 1
          justify-content flex-end
          align-items center
          .cube-input
            flex 1
          .icon
            display flex
            wh 5px 10px
            margin-left 6px
          button
            wh 54px 26px
            line-height 26px
            text-align center
            fsc 12px #333333
            background #fff
            border 1px solid #999999
            border-radius 2px
            margin-left 10px
            &.active
              color #fff
              background #19CCAE
              border-color #19CCAE
      .real_options
        height 50px
        display flex
        flex-direction row
        .option_item
          display flex
          flex 1
          justify-content center
          align-items center
          fsc 14px #333333
          &:last-child
            color #fff
            background #19CCAE

</style>
<style lang="stylus">
  .cube-input:after
    border 0

  .cube-input_active:after
    border 0

  .cube-input-field
    padding 0
    text-align right
</style>
