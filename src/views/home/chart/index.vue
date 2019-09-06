<template lang="pug">
  .home.fbox
    .title
      .title_item
        span 仪表模式
        .icon(@click="tabonclick")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#icontab")
      .title_item
        span 筛选
        .icon.small(@click="search = 1")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconarrow_under")
    .content
      .img_item(v-if="photoUrl")
        img(:src="photoUrl")
      ChartItem(v-for="(item, idx) in chartList" :chartData="item" :key="idx")

    .search_else(v-if="search===1" @click="search = 0")
    .search(v-if="search===1")
      .search_item
        .left 地区
        .right
          cube-input(placeholder="全部" v-model="searchItem.city_name" disabled)
          .icon(@click="showCityPicker")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconarrow_right")
      .search_item
        .left 客户名称
        .right
          cube-input(placeholder="全部" v-model="searchItem.customer_name" disabled)
          .icon(@click="showCustomerPicker")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconarrow_right")
      .search_item
        .left 站点
        .right
          cube-input(placeholder="全部" v-model="searchItem.site_name" disabled)
          .icon(@click="showSitePicker")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconarrow_right")
      .item2
        p.but(@click="reset_select") 重置
        p.but2(@click="submit") 保存
</template>

<script>
  import ChartItem from '_components/chart'
  import { MainChart } from '_api/monitor'
  import { regionCustomer, customerSite } from '_api/client_manage'

  export default {
    components: {
      ChartItem,
    },
    data() {
      return {
        search: 0,
        searchItem: {
          customer_name: '',
          site_name: '',
          state_name: '',
          city_name: '',
        },
        chartList: [],
        customerList: [],
        siteList: [],
        photoUrl: '',
        city: [
          { value: '北京市', text: '北京市' },
          { value: '天津市', text: '天津市' },
          { value: '上海市', text: '上海市' },
          { value: '重庆市', text: '重庆市' },
          { value: '香港特别行政区', text: '香港特别行政区' },
          { value: '澳门特别行政区', text: '澳门特别行政区' },
          { value: '河北省', text: '河北省' },
          { value: '山西省', text: '山西省' },
          { value: '内蒙古自治区', text: '内蒙古自治区' },
          { value: '辽宁省', text: '辽宁省' },
          { value: '吉林省', text: '吉林省' },
          { value: '黑龙江省', text: '黑龙江省' },
          { value: '江苏省', text: '江苏省' },
          { value: '浙江省', text: '浙江省' },
          { value: '安徽省', text: '安徽省' },
          { value: '福建省', text: '福建省' },
          { value: '江西省', text: '江西省' },
          { value: '山东省', text: '山东省' },
          { value: '河南省', text: '河南省' },
          { value: '湖北省', text: '湖北省' },
          { value: '湖南省', text: '湖南省' },
          { value: '广东省', text: '广东省' },
          { value: '广西壮族自治区', text: '广西壮族自治区' },
          { value: '海南省', text: '海南省' },
          { value: '四川省', text: '四川省' },
          { value: '贵州省', text: '贵州省' },
          { value: '云南省', text: '云南省' },
          { value: '西藏自治区', text: '西藏自治区' },
          { value: '陕西省', text: '陕西省' },
          { value: '甘肃省', text: '甘肃省' },
          { value: '青海省', text: '青海省' },
          { value: '宁夏回族自治区', text: '宁夏回族自治区' },
          { value: '新疆维吾尔自治区', text: '新疆维吾尔自治区' },
          { value: '台湾省', text: '台湾省' },
        ],
      }
    },
    mounted() {
      this.getRegionCustomer()
    },
    methods: {
      tabonclick() {
        this.$router.replace('/home')
      },
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
      submit() {
        this.getChartMain()
        this.search = 0
      },
      reset_select() {
        this.searchItem = {}
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
              this.customerList = []
              for (let i = 0; i < res.data.length; i++) {
                this.customerList.push({
                  value: res.data[i].customer_id,
                  text: res.data[i].name_cn,
                })
              }
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(() => {
            this.loading = false
            this.$message.error('获取数据失败')
          })
      },
      cityCancel() {
      },
      showCustomerPicker() {
        if (!this.pickerCustomer) {
          this.pickerCustomer = this.$createPicker({
            title: '选择客户',
            data: [this.customerList],
            onSelect: this.customerSelect,
            onCancel: this.customerCancel,
          })
        }
        this.pickerCustomer.show()
      },
      customerSelect(selectedVal, selectedIndex, selectedText) {
        this.pickerSite = undefined
        this.searchItem.site_name = undefined
        this.searchItem.site_id = undefined
        this.siteList = []

        this.searchItem.customer_id = selectedVal[0]
        this.searchItem.customer_name = selectedText[0]
        if (this.searchItem.customer_id) {
          customerSite({}, 'get', this.searchItem.customer_id).then((res) => {
            if (res.code === 200) {
              this.loading = false
              res.data.list.forEach((item) => {
                this.siteList.push({
                  text: item.site_name,
                  value: '' + item.id,
                })
              })
            } else {
              this.$toast(res.msg)
            }
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
      },
      siteCancel() {
      },
      showStatePicker() {
        if (!this.pickerState) {
          this.pickerState = this.$createPicker({
            title: '选择状态',
            data: [[{ text: '在线', value: '1' }, { text: '离线', value: '0' }]],
            onSelect: this.stateSelect,
            onCancel: this.stateCancel,
          })
        }
        this.pickerState.show()
      },
      stateSelect(selectedVal, selectedIndex, selectedText) {
        this.searchItem.state_id = selectedVal[0]
        this.searchItem.state_name = selectedText[0]
      },
      stateCancel() {
      },
      getRegionCustomer() {
        regionCustomer({}, 'get').then((res) => {
          if (res.code === 200) {
            for (let i = 0; i < res.data.length; i++) {
              this.customerList.push({
                value: res.data[i].customer_id,
                text: res.data[i].name_cn,
              })
            }
          }
        })
      },
    },
  }
</script>

<style scoped lang="stylus">
  .home
    .title
      display flex
      flex-direction row
      justify-content space-between
      background #ffffff
      height 48px
      padding 14px 12px
      margin-top 10px
      border-radius 4px
      margin-left 10px
      margin-right 10px

      .title_item
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
    .search_else
      position absolute
      wh 100% 90%
      flex 1
      z-index 3
      background rgba(0, 0, 0, 0.2)

    .search
      position absolute
      // wh 100% 210px
      width 100%
      z-index 3
      flex-direction column
      background #ffffff
      bottom 0

      .search_item
        width 100%
        height 45px
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        padding 12px 10px

        .left
          display flex
          fsc 14px #333333

        .right
          display flex
          flex 1
          justify-content flex-end
          align-items center
          fsc 14px #333333

          .cube-input
            display flex
            border 0

          .icon
            display flex
            wh 5px 10px
            margin-left 6px

      .item2
        display flex
        height 49px
        align-items center
        justify-content space-between
        border-top 1px solid #EEEEEE

        .but
          height 100%
          width 50%
          text-align center
          fsc 14px #000
          padding 17px

        .but2
          height 100%
          width 50%
          text-align center
          background #19CCAE
          fsc 14px #fff
          padding 17px

      .line2
        wh 100% 100%
        height 1px
        bg #EEEEEE
</style>

<style lang="stylus">
  .cube-input:after
    border 0

  .cube-input-field
    padding 0
    text-align right
</style>
