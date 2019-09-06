<template lang="pug">
  footer
    nav
      router-link.tab_item(to="/home")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconjiankong")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconjiankong2")
        p 监控管理
      router-link.tab_item(to="/police")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconbaojin")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconbaojin3")
        p 报警管理
      router-link.tab_item(to="/analysis")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconshuju")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconshuju2")
        p 数据分析
      router-link.tab_item(to="/me")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconme_black")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconme_green")
        p 我的
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    computed: {},
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  footer
    wh 100% 48px
    bg #FFFFFF
    box-shadow 0px -2px 6px 0px rgba(153,166,176,0.2)
    nav
      display flex
      height 100%
      .tab_item
        flex 1
        height 100%
        fct()
        flex-direction column
        fsc 10px #666666
        .icon
          wh 20px 20px
          margin-bottom 4px
          &.icon:nth-of-type(1)
            display block
          &:nth-of-type(2)
            display none
        &.active
          color #19CCAE
          .icon:nth-of-type(1)
            display none
          .icon:nth-of-type(2)
            display block
</style>
