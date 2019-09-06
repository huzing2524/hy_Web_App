<template lang="pug">
    .home.fbox
        .title
            .title_item
                span 地图模式
                .icon(@click="tabonclick")
                    svg.ali_icon(aria-hidden="true")
                        use(xlink:href="#icontab")
            .title_item
                span 筛选
                .icon.small(@click="searchon")
                    svg.ali_icon(aria-hidden="true")
                        use(xlink:href="#iconarrow_under")
        .more(v-if="more === 1")
            .icon.small(@click="showmore")
                svg.ali_icon(aria-hidden="true")
                    use(xlink:href="#iconicon_more_xia")
        .morecontent(v-if="more===0")
            .item
                .icon
                    svg.ali_icon(aria-hidden="true")
                        use(xlink:href="#iconhezi_pt_black1")
                .info
                    span {{total}}台
                    p 盒子总数
                .icon
                    svg.ali_icon(aria-hidden="true")
                        use(xlink:href="#iconhezi")
                .info
                    span {{running}}台
                    p 运行中的盒子数
            .item
                .icon
                    svg.ali_icon(aria-hidden="true")
                        use(xlink:href="#iconhezi2")
                .info
                    span {{warning}}台
                    p 当前报警盒子数
                .icon
                    svg.ali_icon(aria-hidden="true")
                        use(xlink:href="#iconbaojin2")
                .info
                    span {{warn_msgs}}条
                    p 当前报警条目


        .removemore(v-if="more === 0")
            .icon.small(@click="removemore")
                svg.ali_icon(aria-hidden="true")
                    use(xlink:href="#iconicon_more_shang")
        .map
            baidu-map.bm_view(ak="Q9SFeX3HFspDgjbj0lycKWXMpD4R6Iyb" :center="center" :zoom="6" :double-click-zoom="false" :scrollWheelZoom="true")
                bm-marker(v-for="(d, index) in devices" :position="{lng: d.lng, lat: d.lat}" :icon="{url: d.icon, size: {width: 42, height: 42}}"
                @click="infoWindowOpen(index)" )
                    bm-label(:content="d.devices" :zIndex="999" :labelStyle="{zIndex:99, background:'none',color:'#fff',border:'none', fontSize:'14px'}"
                    :offset="{width: 16, height: 12}")
                    bm-info-window.bm_window(:show="d.show" @close="infoWindowClose(index)" :offset="{width: 10, height: -20}")
                        p 企业: {{d.customer_name}}
                        p 站点：{{d.site_name}}
                        p 站点位置：{{d.address}}
                        p 盒子数量：{{d.devices}}台
                        p 报警盒子：{{d.wanning}}台
                        p 报警条目：{{d.warn_msgs}}条


        .search_else(v-if="search===1" @click="cancel_search")
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
            .search_item
                .left 设备状态
                .right
                    cube-input(placeholder="全部" v-model="searchItem.state_name" disabled)
                    .icon(@click="showStatePicker")
                        svg.ali_icon(aria-hidden="true")
                            use(xlink:href="#iconarrow_right")
            .item2
                p.but(@click="reset_select") 重置
                p.but2(@click="submit") 保存


</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
  import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import BmLabel from 'vue-baidu-map/components/overlays/Label.vue'
  import { GetDevicesData } from '_api/monitor'
  import { regionCustomer, customerSite } from '_api/client_manage'

  export default {
    components: {
      BaiduMap,
      BmOverlay,
      BmMarker,
      BmInfoWindow,
      BmLabel,
    },
    data() {
      return {
        center: '武汉',
        devices: [],
        searchItem: { customer_name: '', site_name: '', state_name: '', city_name: '' },
        customerList: [],
        siteList: [],
        more: 1,
        total: 0,
        running: 0,
        warning: 0,
        warn_msgs: 0,
        search: 0,
        options: [],
        svalue: '',
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
      this.getData()
    },
    beforeDestroy() {

    },
    methods: {
      submit() {
        this.getData()
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
                  'value': res.data[i].customer_id,
                  'text': res.data[i].name_cn,
                })
              }
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
                this.siteList.push({ text: item.site_name, value: '' + item.id })
              })
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
            data: [[{ 'text': '在线', 'value': '1' }, { 'text': '离线', 'value': '0' }]],
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
      tabonclick() {
        this.$router.replace('/home/chart')
      },
      showmore() {
        this.more = 0
      },
      removemore() {
        this.more = 1
      },
      searchon() {
        this.search = 1
      },
      cancel_search() {
        this.search = 0
      },
      infoWindowClose(index) {
        this.$set(this.devices, index, Object.assign(this.devices[index], { 'show': false }))
      },
      infoWindowOpen(index) {
        this.$set(this.devices, index, Object.assign(this.devices[index], { 'show': true }))
      },
      getData() {
        GetDevicesData(
          {
            customer_id: this.searchItem.customer_id,
            site_id: this.searchItem.site_id,
            state: this.searchItem.state_id,
          },
          'get',
        )
          .then((res) => {
            if (res.code === 200) {
              this.devices = res.data.devices
              this.total = res.data.total
              this.running = res.data.running
              this.warning = res.data.warning
              this.warn_msgs = res.data.warn_msgs
              for (let i = 0; i < this.devices.length; i++) {
                if (this.devices[i].wanning > 0) {
                  this.devices[i].icon = 'https://dsd-images.oss-cn-shenzhen.aliyuncs.com/hy/red_coordinate.png'
                } else {
                  this.devices[i].icon = 'https://dsd-images.oss-cn-shenzhen.aliyuncs.com/hy/green_coordinate.png'
                }
                this.devices[i].show = false
              }
            } else {
              this.$toast(res.msg)
            }
          })
          .catch(() => {
            this.loading = false
            this.$toast('获取数据失败')
          })
        regionCustomer({}, 'get')
          .then((res) => {
            if (res.code === 200) {
              for (let i = 0; i < res.data.length; i++) {
                this.customerList.push({
                  'value': res.data[i].customer_id,
                  'text': res.data[i].name_cn,
                })
              }
            } else {
              this.$toast(res.msg)
            }
          })
          .catch(() => {
            this.loading = false
            this.$toast('获取数据失败')
          })
      },
    },

  }
</script>

<style lang="stylus" scoped>
    .home
        .map
            wh 100% 100%
            z-index 1
            .bm_view
                width 100%
                height 100%
                .bm_window
                    fsc 14px #333333
                    margin-right 6px
                    p
                        padding 5px 10px
        .title
            z-index 2
            display flex
            flex-direction row
            justify-content space-between
            background #ffffff
            height 48px
            padding 14px 12px
            border-radius 4px
            margin-left 10px
            margin-right 10px
            margin-top 10px

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
        .line
            z-index 2
            height 1px
            margin 0 30px
            bg #B6BDC2
        .more
            z-index 2
            display flex
            flex-direction row
            justify-content space-between
            background #ffffff
            height 22px
            padding 0px 12px
            margin-left 10px
            margin-right 10px
            .icon
                margin-left 160px
                display flex
                wh 14px 14px
        .morecontent
            z-index 2
            display flex
            justify-content space-between
            background #ffffff
            height 116px
            padding 0px 12px
            margin-left 10px
            margin-right 10px
            flex-direction column
            border-top 1px solid #EEEEEE
            .item
                display flex
                height 58px
                align-items center
                padding 10px 20px
                .icon
                    display flex
                    wh 26px 26px
                .info
                    flex-direction column
                    display flex
                    margin-left 10px
                    width 50%
                    span
                        fsc 14px #333333
                    p
                        margin-top 5px
                        fsc 10px #666666

        .removemore
            z-index 2
            display flex
            flex-direction row
            justify-content space-between
            background #ffffff
            height 22px
            padding 0px 12px
            margin-left 10px
            margin-right 10px
            .icon
                margin-left 160px
                display flex
                wh 14px 14px
        .search_else
            position absolute
            wh 100% 90%
            z-index 3
            background: rgba(0, 0, 0, 0.2);
        .search
            position absolute
            wh 100% 230px
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
                    background: #19CCAE
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

    .anchorBL {
        display: none;
    }
</style>
