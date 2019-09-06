<template lang="pug">
  .empty
    .icon
      svg.ali_icon(aria-hidden="true")
        use(xlink:href="#iconempty_pt")
    p 暂无数据
</template>

<script>
export default {
data( ){
    return {}
  },
  mounted() {

  },
  methods: {

  },
}
</script>

<style scoped lang="stylus">
  .empty
    display flex
    flex-direction column
    flex 1
    justify-content center
    align-items center
    .icon
      wh 120px 132px
      margin-bottom 18px
    p
      fsc 14px #999999
</style>
