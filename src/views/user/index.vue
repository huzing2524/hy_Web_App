<template lang="pug">
  .user.fbox
    Header(:isShowLeft="false")
    router-view
</template>

<script>
  import Header from '_components/header/'
  export default {
    components: {
      Header,
    },
    mounted() {

    },
  }
</script>

<style lang="stylus" scoped></style>
