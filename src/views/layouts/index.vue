<template lang="pug">
  .layouts_container.fbox
    Header
    router-view
    Footer
</template>

<script>
  import Footer from '_components/footer/'
  import Header from '_components/header/'
  export default {
    components: {
      Footer,
      Header
    },
  }
</script>

<style lang="stylus" scoped></style>
