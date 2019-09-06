<template lang="pug">
  .chart_item
    .title {{chartData.name}}
    .column_box
      Column(v-if="chartBoxData.chart_type === '0'")
      Lines(v-if="chartBoxData.chart_type === '1'")
      ColumnB(v-if="chartBoxData.chart_type === '2'")
      Pie(v-if="chartBoxData.chart_type === '3'")
</template>

<script>
  import Column from '_components/chart/column'
  import ColumnB from '_components/chart/column_b'
  import Pie from '_components/chart/pie'
  import Lines from '_components/chart/line'
  import Bus from '@/bus'

  import { ChartData } from '_api/monitor'

  export default {
    components: {
      Column,
      ColumnB,
      Pie,
      Lines,
    },
    data() {
      return {
        chartBoxData: {},
      }
    },
    props: {
      chartData: Object,
    },
    watch: {
      chartData: {
        handler(nv) {
          this.chartBoxData = nv
          this.getChartData(nv.id)
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      getChartData(id) {
        ChartData({}, 'get', id)
          .then((res) => {
            if (res.code === 200) {
              if (this.chartBoxData.chart_type === '0') {
                Bus.$emit('column', {
                  width: 300,
                  height: 260,
                  chartData: res.data,
                })
              } else if (this.chartBoxData.chart_type === '1') {
                Bus.$emit('line', {
                  width: 300,
                  height: 260,
                  chartData: res.data,
                })
              } else if (this.chartBoxData.chart_type === '2') {
                Bus.$emit('column_b', {
                  width: 300,
                  height: 260,
                  chartData: res.data,
                })
              } else if (this.chartBoxData.chart_type === '3') {
                Bus.$emit('pie', {
                  width: 300,
                  height: 260,
                  chartData: res.data,
                })
              }
            } else {
              this.$toast(res.msg)
            }
          })
          .catch(() => {
            this.loading = false
          })
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .chart_item
    wh 355px 300px
    margin 10px auto 0
    border-radius 4px
    padding 12px
    position relative
    display flex
    flex-direction column
    align-items center
    bgf()

    .column_box
      wh 300px 260px

    >.title
      fsc 16px #333

    >.info
      fsc 12px #999999

    >.add_icon
      wh 60px 60px
      margin-top 60px
</style>
