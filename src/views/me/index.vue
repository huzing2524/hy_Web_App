<template lang="pug">
  .me.fbox
    .head
      .head_top
        .left
          .name_and_icon
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconsupplie_green")
            span {{bean.name}}
          .boss_name {{bean.customer_name}}
        .right
          img(v-if="bean.logo.length" :src="bean.logo")
          .icon_default(v-else)
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconLOGO_px")
      .head_bottom
        .item
          span 账号
          span(class="content") {{bean.account}}
        .item
          span 手机号
          span(class="content") {{bean.phone}}
    button(@click="troggleDialog()") 退出登录
    Dialog(v-if="isShowDialog"  @closeDialog="troggleDialog"  @clickSure="onConfirm" title="退出登录" content="确定退出登录?" sure="退出")
</template>

<script>
import {getUserMessage} from '_api/me'
import Dialog from '_components/dialog'

export default {
  components: {
    Dialog
  },
  data( ){
    return {
      bean: {
        name:'佚名',
        customer_name:'佚名',
        account: '佚名',
        phone: '未知',
        logo: ''
      },
      isShowDialog: false,
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getUserMessage({},'get').then((res) => {
        console.log(res)
        if(res.code === 200){
          this.bean = res.data
        }else {
          this.$toast(res.msg)
        }
      }).catch(() => {
        this.$toast('获取数据失败')
      })
    },
    // 点击Dialog确定按钮
    onConfirm() {
      localStorage.clear()
      this.$router.replace(`/login_signup?isLogin=1`)
    },
    troggleDialog() {
      this.isShowDialog = !this.isShowDialog
    }
  },
}
</script>

<style scoped lang="stylus">
  .me
    display flex
    flex-direction column
    overflow-x hidden
    overflow-y scroll
    padding 10px
    .head
      background:rgba(255,255,255,1);
      border-radius:4px;
      margin 10px 0px
      padding 14px
      .head_top
        display flex
        flex-direction row
        margin-bottom 4px
        justify-content space-between
        .left
          display flex
          flex-direction column
          flex 3
          height  30px
          .name_and_icon
            display flex
            flex-direction row
            margin-bottom 20px
            align-items center
            justify-content flex-start
            height 20px
            .icon
              width 20px
              height 20px
              line-height 20px
              margin-right 6px
            span
              flex 1
              height 14px
              font-size:14px;
              font-family:PingFangSC;
              font-weight:400;
              color:rgba(51,51,51,1);
              text-align left
              line-height:20px;
          .boss_name
            height 20px
            font-size:14px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:20px;
        .right
          flex 1
          display flex
          flex-direction row-reverse
          img
            wh(56px,56px)
          .icon_default
            wh(56px, 56px)
      .head_bottom
        display flex
        flex-direction column
        .item
          margin-top  4px
          display flex
          flex-direction row
          span
            height:17px;
            font-size:12px;
            font-family:PingFangSC;
            font-weight:400;
            color #666666
            line-height:17px;
            width 48px
            &.content
              width 48px
              flex 1
    button
      background:rgba(25,204,174,1);
      height 48px
      border-radius:6px;
      margin 10px 0px
      color white
      border 0
</style>
