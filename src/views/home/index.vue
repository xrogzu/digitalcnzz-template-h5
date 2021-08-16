<!-- home -->
<template>
  <div class="index-container">
    {{ this.$store.state }}
    <van-button type="primary" block @click="forScan">多端扫码测试</van-button>
  </div>
</template>

<script>
import { wxScan } from '@/utils/wxsdk'
import { zfbScan } from '@/utils/zfbsdk'
export default {
  data() {
    return {}
  },

  computed: {},

  mounted() {},

  methods: {
    forScan() {
      if (this.$isWx) {
        // 微信
        wxScan('barcode', code => {
          alert(code)
        })
      } else if (this.$isZhb) {
        // 郑好办
        window.AlipayJSBridge.call('scanQRCode', result => {
          alert(JSON.stringify(result))
        })
      } else if (this.$isZfb) {
        // 支付宝
        zfbScan('qr', code => {
          alert(code)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  height: 100%;
  width: 100%;
}
</style>
