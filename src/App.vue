<template lang="pug">
  #app.full_box
    router-view
</template>
<script>
  import Bus from '@/bus/'
  export default {
    data() {
      return {
        locale: this.$i18n.messages[this.$i18n.locale],
      }
    },
    mounted() {
      Bus.$on('UnAuthorized', () => {
        localStorage.removeItem('Authorization')
        if (this.$route.path !== '/user/login') {
          // this.$router.replace({path: '/user/login', query: this.$route.fullPath})
        }
      })
      Bus.$on('SystemError', (val = this.$root.locale.system_error) => {
        this.$toast(val)
      })
      Bus.$on('showLoading', (val) => {
        const toast = this.$createToast({
          txt: this.$root.locale.loading + '...',
          mask: true,
          time: 20000,
        })
        if (val === 1) {
          // toast.show()
        } else if (val === 0) {
          toast.hide()
        }
      })
    },
  }
</script>
<style lang="stylus">
  @import '//at.alicdn.com/t/font_1337629_hbgorcjkx8o.css'
  @require '~@/style/reset.styl'
  @require '~@/style/common.styl'
</style>
