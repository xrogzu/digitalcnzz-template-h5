<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {}
  },
  computed: {},
  created() {},
  components: {},
  methods: {}
}
</script>
<style lang="scss">
.app-container {
  height: 100%;
  width: 100%;
  .layout-content {
    height: 100%;
    width: 100%;
  }
}
</style>
