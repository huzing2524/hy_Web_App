<template lang="pug">
  header
    .left(v-if="$route.path.split('/').length>2 && isShowLeft" @click="$router.go(-1)")
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconArrow_white")
    p {{title || $route.meta.title}}
    .right(@click="toggleLang")
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconzhongyingwenqiehuan")
</template>

<script>
  import Bus from '@/bus/'
  export default {
    props: {
      isShowLeft: {
        required:false,
        default() {
          return true
        }
      },
    },
    components: {},
    data() {
      return {
        title: ''
      }
    },
    computed: {},
    mounted() {
      Bus.$on('publicHeader', val => {
        this.title = val
      })
    },
    methods: {
      toggleLang() {
        this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh' : 'en'
      }
    },
  }
</script>

<style lang="stylus" scoped>
  header
    wh 100% 44px
    fsc 16px #FFF
    background #3A3A3A
    fct()
    position relative
    .left
      wh 18px 18px
      position absolute
      left 15px
      .icon
        wh 100% 100%

    .right
      wh 25px 25px
      position absolute
      right 15px
      .icon
        wh 100% 100%

</style>
