<!-- home -->
<template>
  <div class="index-container">
    {{ this.$store.state }}
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {},

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.index-container {
  height: 100%;
  width: 100%;
}
</style>
