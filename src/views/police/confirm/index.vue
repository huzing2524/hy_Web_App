<template lang="pug">
  .confirm.fbox
    .text_box
      .title 问题描述
      cube-textarea(v-model="problem" placeholder="填写问题描述")
    .text_box
      .title 处理方案
      cube-textarea(v-model="plan_description" placeholder="填写处理方案")
    .confirm_time
      .item
        span 确认人
        p {{confirm_person}}
      .item
        span 确认时间
        p {{getFullDate(this.time / 1000)}}
    .confirm_save(@click="saveClick") 保存
</template>

<script>
  import { getFullDate } from '_common/util'
  import { policeConfirm } from '_api/police_manage'
  export default {
    data() {
      return {
        getFullDate,
        id: '',
        time: null,
        confirm_time: null,
        problem: '',
        plan_description: '',
        confirm_person: '',
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id
        this.time = this.$route.query.time
        this.confirm_time = Math.floor(this.time / 1000)
        this.confirm_person = window.localStorage.getItem('UserName') || ''
      },
      saveClick(){
        if(!this.problem){
          this.$toast('请填写问题描述')
          return
        }
        if(!this.plan_description){
          this.$toast('请填写处理方案')
          return
        }
        policeConfirm({
          problem: this.problem,
          plan_description: this.plan_description,
          confirm_person: this.confirm_person,
          confirm_time: this.confirm_time,
        }, 'post', this.id).then((res) => {
          if (res.code === 200) {
            this.$toast('保存成功')
            this.$router.go(-1)
          } else {
            this.$toast(res.msg)
          }
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
    },
  }
</script>

<style scoped lang="stylus">
  .confirm
    display flex
    flex-direction column
    padding 20px 10px 0px
    .text_box
      margin-bottom 14px
      .title
        fsc 14px #333333
        margin-bottom 8px
    .confirm_time
      padding 12px
      border-radius 4px
      background #fff
      .item
        display flex
        flex-direction row
        margin-bottom 12px
        &:last-child
          margin-bottom 0
        span
          width 104px
          fsc 14px #666666
        p
          fsc 14px #333333
    .confirm_save
      display flex
      align-items center
      justify-content center
      fsc 16px #FFFFFF
      background #19CCAE
      margin-top 20px
      padding 13px 0
      border-radius 6px
</style>
<style lang="stylus">
  .cube-textarea
    border-radius 4px
  .cube-textarea-wrapper
    height 100px
</style>
