<template lang="pug">
  .main.fbox
    .content
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconLOGO")
        p 汉宇污水处理大数据平台
      .input_box
        span 手机号
        input(placeholder="填写手机号" v-model="phone" type="text" maxlength="11"  oninput="value = value.replace(/[^\\d]/g,'')")
      .qr_code(v-if="!isLogin")
        span 验证码
        input(v-model="code" placeholder="填写验证码" type="text" maxlength="8"  oninput="value = value.replace(/[^\\d]/g,'').slice(0,10)" )
        button(@click="toSendSms") {{waitQrCodeTip}}
      .input_box
        span 密码
        input(:placeholder="isLogin? '填写密码':'填写新密码：字母+数字8-16位'" v-model="password" clearable type="password" minlength="8" maxlength="16")
      button(class="login_reset" @click="toOtherBt(1)" ) {{isLogin?'登录':'重置密码'}}
      .to_other(:underline="false" @click="toOtherBt(2)") {{isLogin?'忘记密码 ＞':'登录 ＞'}}


</template>

<script>
  import { login, sendCode, resetPwd } from '_api/login_signup'
  import { Base64 } from 'js-base64'
  import { SetDefaultHeader } from '_common/http'
  import Bus from '@/bus/'

  export default {
    data() {
      return {
        isLogin: true,
        phone: '',
        password: '',
        code: '',
        waitQrCodeTip: '获取验证码',
        waitTime: 60,
        canClick: true //添加canClick
      }
    },
    mounted() {
      if (parseInt(this.$route.query.isLogin)) {
        this.isLogin = true
      }
    },
    methods: {
      toLogin() {
        if (!this.phone) {
          this.$toast('请输入手机号')
          return
        }
        if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
          this.$toast('请输入正确的手机号')
          return
        }
        if (!this.password) {
          this.$toast('请输入密码')
          return
        }
        SetDefaultHeader(
          'Authorization',
          Base64.encode(`${this.phone}:${this.password}`),
        )
        login({}, 'get').then((response) => {
          if (parseInt(response.code) === 200) {
            this.$toast('登录成功')
            let authorization = 'Basic ' + response.data.jwt
            localStorage.setItem('Authorization', authorization)
            localStorage.setItem('Phone', this.phone)
            localStorage.setItem('UserName', response.data.name)
            SetDefaultHeader('Authorization', authorization)
            // if (this.$route.query.from) {
            //   this.$router.replace(this.$route.query.from)
            // } else {
              this.$router.replace('/home')
            // }
          } else {
            console.log(response)
            this.$toast(response.msg)
          }
        })
      },
      toReset() {
        if (!this.phone) {
          this.$toast('请输入手机号')
          return
        }
        if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
          this.$toast('请输入正确的手机号')
          return
        }
        if (!this.code) {
          this.$toast('请输入验证码')
          return
        }
        if (!this.password) {
          this.$toast('请输入密码')
          return
        }
        if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.password))) {
          this.$toast('请输入正确格式的密码')
          return
        }
        resetPwd(
          {
            phone: this.phone,
            code: this.code,
            pwd: this.password,
          },
          'post',
        ).then((res) => {
          if (res.code === 200) {
            this.$toast('修改成功')
            this.$router.replace(
              `/login_signup?isLogin=${this.isLogin ? '0' : '1'}&from=${
                this.$route.query.from ? this.$route.query.from : '/monitor/manage'
                }`,
            )
            this.isLogin = !this.isLogin
          } else {
            this.$toast(res.msg)
          }
        })
      },
      toSendSms() {
        if (!this.canClick){
          this.$toast('请'+ this.waitTime + 's后再试')
          return
        }
        if (!this.phone) {
          this.$toast('请输入手机号')
          this.$toast('')
          return
        }
        sendCode({
          phone: this.phone,
        }, 'get').then((res) => {
          if (res.code === 200) {
            this.$toast('发送成功')
            this.countDown()
          } else {
            this.$toast(res.msg)
          }
        })
      },
      countDown () {
        this.canClick = false
        this.waitQrCodeTip =  this.waitTime + 's可重发'
        let clock = window.setInterval(() => {
          this.waitTime--
          this.waitQrCodeTip = this.waitTime + 's可重发'
          if (this.waitTime < 1) {
            window.clearInterval(clock)
            this.waitQrCodeTip = '发送验证码'
            this.waitTime = 60
            this.canClick = true  //这里重新开启
          }
        },1000)
      },
      toOtherBt(idx) {
        if (idx === 1) {
          if (this.isLogin) {
            this.toLogin()
          } else {
            this.toReset()
          }
        } else {
          if (this.isLogin) {
            this.phone = ''
            this.code = ''
            this.password = ''
            Bus.$emit('publicHeader', '重置密码')
          } else {
            Bus.$emit('publicHeader', '登录')
          }
          this.$router.replace(
            `//user/login?isLogin=${this.isLogin ? '0' : '1'}&from=${
              this.$route.query.from ? this.$route.query.from : '/home'
              }`,
          )
          this.isLogin = !this.isLogin
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .main
    .content
      background white
      flex 3
      .title
        width 100%
        margin 20px 0px
        display flex
        flex-direction column
        align-items center
        .icon
          wh(64px, 64px)
          margin-bottom 12px
        p
          width auto
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          line-height: 22px;
          color #333333
          font-weight bold
      .input_box
        display flex
        flex-direction row
        margin 26px 30px
        border-bottom 1px solid #EEEEEE
        padding-bottom 10px
        &:last-child
          border-bottom 0
        span
          min-width: 48px
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-right 16px
        input
          flex 1
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          text-align left
      .qr_code
        height 30px
        margin 26px 30px
        border-bottom 1px solid #EEEEEE
        display flex
        flex-direction row
        flex 1
        span
          width 48px
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-right 16px
        input
          width 160px
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          text-align left
        button
          flex 1
          font-size 14px
          height: 30px;
          line-height: 30px;
          background: #19CCAE
          border-radius: 6px;
          text-align center
          justify-content center
          color white
          border 0
      .login_reset
        width: 315px;
        height: 48px;
        background: #19CCAE
        border-radius: 6px;
        margin 30px
        color white
        border 0
      .to_other
        flex 2
        fsc 16px #666666
        text-align center


</style>

