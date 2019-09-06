<template lang="pug">
  .police.fbox
    .police_header
      .police_item(v-if="tabIndex === 0" @click="policeClick(1)")
        span 实时报警
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#icontab")
      .police_item(v-if="tabIndex === 1" @click="policeClick(0)")
        span 历史报警
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#icontab")
      .police_item(@click="screenClick")
        span 筛选
        .icon.small(v-if="maskShow")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconarrow_on")
        .icon.small(v-else)
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconarrow_under")
    Empty(v-if="(tabIndex === 0 && realList.length<=0) || (tabIndex === 1 && historyList.length<=0)")
    .police_content(v-if="tabIndex === 0 && realList.length")
      .items(v-for="(item,index) in realList" :key="index")
        .info
          .title
            span {{item.name}}
            p(v-if="item.status === '0'" @click="confirmClick(item)") 确认
          .code
            span 编码：{{item.id}}
            span 值：{{item.value}}
            span {{item.time}}
          .name
            .name_item
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconhezi1")
              span {{item.device_name}}
            .name_item
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconshebei")
              span {{item.customer_name}}({{item.site_name}})
          .user
            .left
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconkehu")
              span {{item.confirm_person}}
              p(v-if="item.confirm_time") ({{item.confirm_time}})
              p(v-else) -
            .right(v-if="!item.show" @click="showRealClick(item,index)")
              span 展开
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconarrow_under")
        .detail(v-if="item.show")
          .item_detail
            p 报警等级：高
            p 报警频次：1
          .item_detail
            p 初次报警时间：{{basic_info.time ? basic_info.time : '-'}}
            p 末次报警时间：{{basic_info.time ? basic_info.time : '-'}}
            p 报警时长(分钟)：0.46
          .item_detail
            p 问题描述：{{item.problem ? item.problem : '-'}}
          .item_detail
            p 解决方案：{{item.plan_description ? item.plan_description : '-'}}
          .pack_up(@click="upRealClick(index)")
            span 收起
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconarrow_on")
    .police_content(v-if="tabIndex === 1 && historyList.length")
      .items(v-for="(item,index) in historyList" :key="index")
        .mark(v-if="item.status === '2'")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconlabel")
        .info
          .title
            span {{item.name}}
          .code
            span 编码：{{item.id}}
            span 值：{{item.value}}
            span {{item.time}}
          .name
            .name_item
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconhezi1")
              span {{item.device_name ? item.device_name : '-'}}
            .name_item
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconshebei")
              span {{item.customer_name ? item.customer_name : '-'}}({{item.site_name}})
          .user
            .left
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconkehu")
              span {{item.confirm_person}}
              p(v-if="item.confirm_time") ({{item.confirm_time}})
              p(v-else) -
            .right(v-if="!item.show" @click="showClick(index)")
              span 展开
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconarrow_under")
        .detail(v-if="item.show")
          .item_detail
            p 内容：{{item.content ? item.content : '-'}}
          .item_detail
            p 问题描述：{{item.problem ? item.problem : '-'}}
          .item_detail
            p 解决方案：{{item.plan_description ? item.plan_description : '-'}}
          .pack_up(@click="upClick(index)")
            span 收起
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconarrow_on")
    .mask(v-if="maskShow" @click="closeClick")
    .realDialog(v-if="realDialog")
      .real_item(v-if="tabIndex===1")
        .left 开始时间
        .right
          cube-input(placeholder="开始时间" v-model="searchItem.startTtime" disabled)
          .icon(@click="showStartTimePicker")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconArrow_select")
      .real_item(v-if="tabIndex===1")
        .left 结束时间
        .right
          cube-input(placeholder="结束时间" v-model="searchItem.endTtime" disabled)
          .icon(@click="showEndTimePicker")
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
      .real_item
        .left 报警状态
        .right
          button(:class="policeStatus === 3 ? 'active' : ''" @click="statusClick(3)") 全部
          button(:class="policeStatus === 1 ? 'active' : ''" @click="statusClick(1)") 已确认
          button(:class="policeStatus === 0 ? 'active' : ''" @click="statusClick(0)") 触发
          button(v-if="tabIndex===1" :class="policeStatus === 2 ? 'active' : ''" @click="statusClick(2)") 恢复
      .real_item
        .left 报警设备
        .right
          cube-input(placeholder="填写设备名称" v-model="searchItem.device_name")
      .real_item
        .left 报警编码
        .right
          cube-input(placeholder="填写报警编码" v-model="searchItem.id")
      .real_options
        .option_item(@click="realReset") 重置
        .option_item(@click="saveClick") 保存

</template>

<script>
  import { parseDate, getFullDate } from '_common/util'
  import { regionCustomer, customerSite } from '_api/client_manage'
  import { policeReal, policeHistory, policeDetail } from '_api/police_manage'
  import Empty from '_components/empty'

  export default {
    components: {
      Empty,
    },
    data() {
      return {
        getFullDate,
        tabIndex: 0,
        policeStatus: 3,
        maskShow: false,
        realDialog: false,
        customerList: [],
        siteList: [],
        realList: [],
        historyList: [],
        basic_info: {},
        alarm_solution: {},
        searchItem: {
          start_time: null,
          startTtime: null,
          end_time: null,
          endTtime: null,
          customer_name: '',
          customer_id: '',
          site_name: '',
          site_id: '',
          status: '',
          device_name: '',
          id: '',
        },
      }
    },
    mounted() {
      this.initData()
      this.getPoliceReal()
    },
    methods: {
      // ----------------  客户列表 初始化列表  ---------------- //
      initData() {
        regionCustomer({}, 'get').then((res) => {
          if (res.code === 200) {
            this.customerList = res.data
          } else {
            this.$toast(res.msg)
          }
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      // ----------------  实时报警  ---------------- //
      getPoliceReal() {
        let params = {
          customer_id: this.searchItem.customer_id,
          site_id: this.searchItem.site_id,
          status: this.searchItem.status,
          device_name: this.searchItem.device_name,
          id: this.searchItem.id,
        }
        policeReal(params, 'get').then((res) => {
          if (res.code === 200) {
            this.realList = res.data.list
            this.realList.forEach((item, index) => {
              this.$set(this.realList, index, Object.assign(item, { show: false }))
            })
          } else {
            this.$toast(res.msg)
          }
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },

      // ----------------  历史报警  ---------------- //
      getPoliceHistory() {
        let params = {
          start_time: this.searchItem.start_time,
          end_time: this.searchItem.start_time,
          customer_id: this.searchItem.customer_id,
          site_id: this.searchItem.site_id,
          status: this.searchItem.status,
          device_name: this.searchItem.device_name,
          id: this.searchItem.id,
        }
        policeHistory(params, 'get').then((res) => {
          if (res.code === 200) {
            this.historyList = res.data.list
            this.historyList.forEach((item, index) => {
              this.$set(this.historyList, index, Object.assign(item, { show: false }))
            })
          } else {
            this.$toast(res.msg)
          }
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      policeClick(index) {
        this.searchItem = {
          start_time: null,
          startTtime: null,
          end_time: null,
          endTtime: null,
          customer_name: '',
          customer_id: '',
          site_name: '',
          site_id: '',
          status: '',
          device_name: '',
          id: '',
        }
        this.tabIndex = index
        if (this.tabIndex === 0) {
          this.getPoliceReal()
        }
        if (this.tabIndex === 1) {
          this.getPoliceHistory()
        }
      },
      screenClick() {
        this.policeStatus = 3
        this.searchItem = {
          start_time: null,
          startTtime: null,
          end_time: null,
          endTtime: null,
          customer_name: '',
          customer_id: '',
          site_name: '',
          site_id: '',
          status: '',
          device_name: '',
          id: '',
        }
        if (this.tabIndex === 0) {
          this.maskShow = true
          this.realDialog = true
        }
        if (this.tabIndex === 1) {
          this.maskShow = true
          this.realDialog = true
        }
      },
      statusClick(index) {
        this.policeStatus = index
        if (index === 3) {
          this.searchItem.status = ''
        } else {
          this.searchItem.status = index
        }
      },
      closeClick() {
        this.maskShow = false
        this.realDialog = false
      },
      realReset() {
        this.searchItem = {
          start_time: null,
          startTtime: null,
          end_time: null,
          endTtime: null,
          customer_name: '',
          customer_id: '',
          site_name: '',
          site_id: '',
          status: '',
          device_name: '',
          id: '',
        }
        this.maskShow = false
        this.realDialog = false
        if (this.tabIndex === 0) {
          this.getPoliceReal()
        }
        if (this.tabIndex === 1) {
          this.getPoliceHistory()
        }
      },
      saveClick() {
        this.customerList = []
        this.siteList = []
        if (this.tabIndex === 0) {
          this.getPoliceReal()
        }
        if (this.tabIndex === 1) {
          this.getPoliceHistory()
        }
        this.maskShow = false
        this.realDialog = false
      },
      showStartTimePicker() {
        if (!this.startTimePicker) {
          this.startTimePicker = this.$createDatePicker({
            title: '开始时间',
            min: new Date(2008, 7, 8, 8, 0, 0),
            max: new Date(2020, 9, 20, 20, 59, 59),
            value: new Date(),
            columnCount: 6,
            onSelect: this.startTimeSelect,
            onCancel: this.startTimeCancel,
          })
        }
        this.startTimePicker.show()
      },
      startTimeSelect(data) {
        this.searchItem.start_time = parseDate(data)
        this.searchItem.startTtime = getFullDate(data.getTime() / 1000)
      },
      startTimeCancel() {

      },
      showEndTimePicker() {
        if (!this.endTimePicker) {
          this.endTimePicker = this.$createDatePicker({
            title: '结束时间',
            min: new Date(2008, 7, 8, 8, 0, 0),
            max: new Date(2020, 9, 20, 20, 59, 59),
            value: new Date(),
            columnCount: 6,
            onSelect: this.endTimeSelect,
            onCancel: this.endTimeCancel,
          })
        }
        this.endTimePicker.show()
      },
      endTimeSelect(data) {
        this.searchItem.end_time = parseDate(data)
        this.searchItem.endTtime = getFullDate(data.getTime() / 1000)
      },
      endTimeCancel() {

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
        this.pickerSite = undefined
        this.searchItem.site_name = undefined
        this.siteList = []
        this.searchItem.customer_id = selectedVal[0]
        this.searchItem.customer_name = selectedText[0]
        if (this.searchItem.customer_id) {
          customerSite({}, 'get', this.searchItem.customer_id).then((res) => {
            if (res.code === 200) {
              this.loading = false
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
        if (!this.pickerSite && this.siteList.length) {
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
      },
      siteCancel() {

      },
      confirmClick(item) {
        let time = (new Date()).getTime()
        this.$router.push(`/police/confirm?id=${item.id}&time=${time}`)
      },
      showRealClick(item, index) {
        policeDetail({}, 'get', item.id).then((res) => {
          if (res.code === 200) {
            this.basic_info = res.data.basic_info
            this.alarm_solution = res.data.alarm_solution
            this.realList.forEach((item, indexs) => {
              if (index === indexs) {
                this.$set(this.realList, indexs, Object.assign(item, { confirm_person: this.alarm_solution.confirm_person }))
                this.$set(this.realList, indexs, Object.assign(item, { confirm_time: this.alarm_solution.confirm_time }))
                this.$set(this.realList, indexs, Object.assign(item, { problem: this.alarm_solution.problem }))
                this.$set(this.realList, indexs, Object.assign(item, { plan_description: this.alarm_solution.plan_description }))
              }
            })
          } else {
            this.$toast(res.msg)
          }
        }).catch(() => {
          this.$toast('获取数据失败')
        })
        this.realList.forEach((item, indexs) => {
          if (index === indexs) {
            this.$set(this.realList, indexs, Object.assign(item, { show: true }))
          }
        })
      },
      upRealClick(index) {
        this.realList.forEach((item, indexs) => {
          if (index === indexs) {
            this.$set(this.realList, indexs, Object.assign(item, { show: false }))
          }
        })
      },
      showClick(index) {
        this.historyList.forEach((item, indexs) => {
          if (index === indexs) {
            this.$set(this.historyList, indexs, Object.assign(item, { show: true }))
          }
        })
      },
      upClick(index) {
        this.historyList.forEach((item, indexs) => {
          if (index === indexs) {
            this.$set(this.historyList, indexs, Object.assign(item, { show: false }))
          }
        })
      },
    },
  }
</script>

<style scoped lang="stylus">
  .police
    display flex
    flex-direction column
    overflow-x hidden
    overflow-y scroll
    padding 10px
    .police_header
      display flex
      flex-direction row
      justify-content space-between
      background #ffffff
      padding 14px 12px
      margin-bottom 10px
      border-radius 4px
      .police_item
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
    .police_content
      display flex
      flex-direction column
      .items
        padding 12px 12px 14px
        background #ffffff
        border-radius 4px
        margin-bottom 10px
        position relative
        .mark
          position absolute
          top 0
          right 0
          wh 40px 40px
        .info
          display flex
          flex-direction column
          .title
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            margin-bottom 8px
            span
              display flex
              fsc 16px #333333
            p
              display flex
              wh 60px 26px
              justify-content center
              align-items center
              fsc 12px #FFFFFF
              background #19CCAE
              border-radius 2px
          .code
            display flex
            flex-direction row
            margin-bottom 14px
            span
              display flex
              padding 4px 8px
              margin-right 8px
              fsc 10px #666666
              background rgba(25, 204, 174, 0.06)
              border-radius 2px
          .name
            display flex
            flex-direction row
            margin-bottom 12px
            .name_item
              display flex
              flex-direction row
              align-items center
              margin-right 32px
              .icon
                display flex
                wh 18px 16px
                margin-right 2px
              span
                fsc 14px #333333
          .user
            display flex
            flex-direction row
            justify-content space-between
            .left
              display flex
              flex-direction row
              align-items center
              .icon
                display flex
                wh 14px 16px
                margin-right 8px
              span
                display flex
                fsc 14px #333333
              p
                display flex
                fsc 14px #333333
            .right
              display flex
              flex-direction row
              align-items center
              span
                display flex
                fsc 14px #19CCAE
                margin-right 6px
              .icon
                display flex
                wh 10px 6px

        .detail
          display flex
          flex-direction column
          margin-top 14px
          padding-top 14px
          border-top 1px solid #EEEEEE
          .item_detail
            margin-bottom 20px
            p
              fsc 14px #666666
              margin-bottom 8px
              &:last-child
                margin-bottom 0
          .pack_up
            display flex
            flex-direction row
            justify-content flex-end
            align-items center
            span
              display flex
              fsc 14px #19CCAE
              margin-right 6px
            .icon
              display flex
              wh 10px 6px
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
