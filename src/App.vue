<template>
  <div id="app">
    {{ this.$store.state }}
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapActions(['setUserInfo'])
  },
  created() {
    this.$store.dispatch('app/setUserInfo')
  },
  methods: {}
}
</script>
<style lang="scss"></style>
