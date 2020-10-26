<template>
  <div class="app">
    {{ this.$store.state }}
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {},
  created() {
    this.$store.dispatch('app/setUserInfo')
  },
  methods: {}
}
</script>
<style lang="scss">
.app {
  height: 100%;
  width: 100%;
}
</style>
