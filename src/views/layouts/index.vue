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
import { mapActions } from 'vuex'
export default {
  name: 'AppLayout',
  data() {
    return {}
  },
  computed: {
    ...mapActions(['setUserInfo'])
  },
  created() {
    this.$store.dispatch('app/setUserInfo')
  },
  components: {},
  methods: {}
}
</script>
