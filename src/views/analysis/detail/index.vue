<template lang="pug">
  .detail.fbox
    .data_info
      .title
        .name 水箱状态
        .screen(@click="screenClick")
          span 筛选
          .icon(v-if="maskShow")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconarrow_on")
          .icon(v-else)
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconarrow_under")
      p 所属站点：{{site_name ? site_name : '-'}}
      p 所属设备：{{device_name ? device_name : '-'}}
      p 数据名称：{{name ? name : '-'}}
    .data_table
      .header
        .item 序号
        .item 时间
        .item 值
      .content(v-if="listItem.length")
        .items(v-for="(item,index) in listItem" :key="index")
          span {{index+1}}
          span {{item.time}}
          span {{item.value}}
      Empty(v-if="screen && listItem.length<=0")
      .empty(v-if="!screen") 请先选择筛选条件
    .mask(v-if="maskShow" @click="closeClick")
    .realDialog(v-if="realDialog")
      .real_item
        .left 开始时间
        .right
          cube-input(placeholder="开始时间" v-model="searchItem.start_time" disabled)
          .icon(@click="showStartTimePicker")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconArrow_select")
      .real_item
        .left 结束时间
        .right
          cube-input(placeholder="结束时间" v-model="searchItem.end_time" disabled)
          .icon(@click="showEndTimePicker")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconArrow_select")
      .real_options
        .option_item(@click="realReset") 重置
        .option_item(@click="saveClick") 保存

</template>

<script>
  import { getDateChange } from '_common/util'
  import Empty from '_components/empty'
  import { analysisRealtimeItems } from '_api/data_manage'

  export default {
    components: {
      Empty,
    },
    data() {
      return {
        getDateChange,
        device_name: '',
        maskShow: false,
        realDialog: false,
        screen: false,
        device_id: this.$route.query.device_id,
        name: this.$route.query.name,
        site_name: this.$route.query.site_name,
        listItem: [],
        searchItem: {
          start_time: null,
          end_time: null,
        },
      }
    },
    mounted() {

    },
    methods: {
      getDataList() {
        let params = {
          device_id: this.device_id,
          start_time: this.searchItem.start_time,
          end_time: this.searchItem.end_time,
        }
        analysisRealtimeItems(params, 'get', this.name).then((res) => {
          if (res.code === 200) {
            this.listItem = res.data.list
            this.device_name = this.listItem[0].device_name
          } else {
            this.$toast(res.msg)
          }
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      screenClick() {
        this.listItem = []
        this.searchItem = {
          start_time: null,
          end_time: null,
        },
          this.maskShow = true
        this.realDialog = true
      },
      closeClick() {
        this.maskShow = false
        this.realDialog = false
      },
      realReset() {
        this.screen = false
        this.searchItem = {
          start_time: null,
          end_time: null,
        },
          this.maskShow = false
        this.realDialog = false
      },
      saveClick() {
        this.screen = true
        this.getDataList()
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
        this.searchItem.start_time = getDateChange(data.getTime() / 1000)
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
        this.searchItem.end_time = getDateChange(data.getTime() / 1000)
      },
      endTimeCancel() {

      },
    },
  }
</script>

<style scoped lang="stylus">
  .detail
    display flex
    flex-direction column
    padding 10px
    overflow hidden
    .data_info
      display flex
      flex-direction column
      padding 14px 12px 10px
      border-radius 4px
      background #fff
      .title
        display flex
        flex-direction row
        justify-content space-between
        margin-bottom 12px
        .name
          fsc 14px #333333
        .screen
          display flex
          flex-direction row
          align-items center
          span
            display flex
            fsc 14px #333333
            margin-right 6px
          .icon
            display flex
            wh 10px 6px
      p
        fsc 12px #666666
        margin-bottom 4px
    .data_table
      display flex
      flex 1
      flex-direction column
      margin-top 10px
      .header
        display flex
        flex-direction row
        padding 14px 0
        background #E8ECF1
        border-radius 4px 4px 0px 0px
        .item
          display flex
          flex 1
          justify-content center
          align-items center
          fsc 14px #333333
          &:nth-of-type(2)
            flex 2
      .content
        display flex
        flex 1
        flex-direction column
        background #fff
        overflow-y scroll
        .items
          display flex
          flex-direction row
          padding 14px 0
          border-bottom 1px solid #EEEEEE
          span
            display flex
            flex 1
            justify-content center
            align-items center
            fsc 14px #333333
            &:nth-of-type(2)
              flex 2
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
