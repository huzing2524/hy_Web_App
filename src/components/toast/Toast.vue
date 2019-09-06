<template lang="pug">
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        txt: '',
        type: '',
        time: '',
        mask: false,
        toast: ''
      }
    },
    mounted() {
    },
    watch: {
      show(val) {
        if (val === true) {
          this.toast = this.$createToast({
            txt: this.txt,
            type: this.type,
            time: this.time,
            mask: this.mask
          })
          this.toast.show()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
