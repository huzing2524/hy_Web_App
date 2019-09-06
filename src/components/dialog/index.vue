<!--
两种样式：
第一种，{标题，内容，确定，取消}；// isShowTitle，sShowCancel这两个值默认是true，可以不用传，但是剩下四个内容必须传。
第二种，{内容，确定}// 这种需要传递isShowTitle = false,isShowCancel = false,默认情况这两个值都是true，再传内容+确定即可。
调用：
import Dialog from '_components/dialog'
Dialog(v-if="isShowDialog" :isShowTitle="isShowTitle" :isShowCancel="isShowCancel" @closeDialog="closeDialog"  @clickSure="clickSure" :title="dialogMessage.title" :content="dialogMessage.content" :sure="dialogMessage.sure" :cancel="dialogMessage.cancel")
回调方法：
closeDialog(){}
clickSure{}
Demo参考：order/index.vue
-->

<template lang="pug">
    .dialog
        .title(v-show="isShowTitleChild") {{mTitle}}
        .content(:class="{active: !isShowTitleChild}") {{mContent}}
        .button
            .left(v-show="isShowCancelChild" @click="closeDialog")
                span {{mCancel}}
            .right(@click="clickSure()")
                span {{mSure}}
</template>
<script>
  export default {
    props:{
      isShowTitle: {
        required:false,
        default() {
          return true
        }
      },
      isShowCancel: {
        required:false,
        default() {
          return true
        }
      },
      title: {
        required: false,
        type: String,
        default() {
          return '标题'
        }
      },
      content: {
        required: false,
        type: String,
        default() {
          return '内容'
        }
      },
      cancel: {
        required: false,
        type: String,
        default() {
          return '取消'
        }
      },
      sure: {
        required: false,
        type: String,
        default() {
          return '确定'
        }
      },
    },
    name: "",
    data(){
      return {
        isShowTitleChild : this.isShowTitle,
        isShowCancelChild: this.isShowCancel,
        mTitle: this.title,
        mContent: this.content,
        mSure: this.sure,
        mCancel: this.sure
      }
    },
    methods:{
      closeDialog(){
        this.$emit('closeDialog',false)
      },
      // 确定按钮
      clickSure() {
        this.$emit('clickSure', this.mSure)
        this.$emit('closeDialog',false)
      }
    },
    watch: {
      isShowTitle: {
        handler(newValue) {
          this.isShowTitleChild = newValue
        },
        deep: true,
        immediate: true
      },
      isShowCancel: {
        handler(newValue) {
          this.isShowCancelChild = newValue
          // console.log("this.isShowCancelChild="+this.isShowCancelChild)
        },
        deep: true,
        immediate: true
      },
      title: {
        handler(newValue) {
          this.mTitle = newValue
        },
        deep: true,
        immediate: true
      },
      content: {
        handler(newValue) {
          this.mContent = newValue
        },
        deep: true,
        immediate: true
      },
      sure: {
        handler(newValue) {
          this.mSure = newValue
        },
        deep: true,
        immediate: true
      },
      cancel: {
        handler(newValue) {
          this.mCancel = newValue
        },
        deep: true,
        immediate: true
      },
    },
  }
</script>

<style scoped lang="stylus">
    .dialog
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%,-50%);
        width 80%
        min-height 20%
        background white
        border-radius 4px
        display flex
        flex-direction column
        .title
            width 100%
            text-align center
            height:22px;
            font-size:16px;
            font-weight bold
            color #333333
            line-height:22px;
            margin-top 12px
        .content
            width 100%
            text-align center
            height auto
            font-size:14px;
            font-weight:500;
            color #666666
            line-height:22px;
            margin-top 20px
            border-bottom  1px solid #EEEEEE
            padding-left 18px
            padding-right 18px
            padding-bottom  20px
            &.active
                color #333333
                margin-top 30px
                padding-bottom  30px
        .button
            display flex
            flex-direction row
            flex 1
            .left
                flex 1
                display flex
                flex-direction column
                justify-content center
                border-right  1px solid #EEEEEE
                span
                    width 100%
                    font-size:16px;
                    font-weight:400;
                    height 34px
                    line-height 34px
                    color #999999
                    text-align center
            .right
                flex 1
                display flex
                flex-direction column
                justify-content center
                span
                    width 100%
                    height 34px
                    line-height 34px
                    font-size:16px;
                    font-weight:400;
                    color #FF5656
                    text-align center
</style>
