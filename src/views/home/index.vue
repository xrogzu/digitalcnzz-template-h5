<!-- home -->
<template>
  <div class="index-container">
    {{ this.$store.state }}
    <van-button type="primary" :style="{ marginBottom: '10px' }" block @click="forScan">扫码测试</van-button>
    <van-button type="primary" :style="{ marginBottom: '10px' }" block @click="forChooseImage">打开相册</van-button>
  </div>
</template>

<script>
import { wxScan, wxChooseImg } from '@/utils/wxsdk'
import { zfbScan, zfbChooseImg } from '@/utils/zfbsdk'
export default {
  data() {
    return {}
  },

  computed: {},

  mounted() {},

  methods: {
    forChooseImage() {
      if (this.$isWx) {
        // 微信
        wxChooseImg().then(res => {
          alert(JSON.stringify(res))
        })
      } else if (this.$isZhb) {
        // 郑好办
        window.AlipayJSBridge.call('selectImage', result => {
          alert(JSON.stringify(result))
        })
      } else if (this.$isZfb) {
        // 支付宝
        zfbChooseImg().then(res => {
          alert(JSON.stringify(res))
        })
      }
    },
    forScan() {
      if (this.$isWx) {
        // 微信
        wxScan('barcode').then(code => {
          alert(code)
        })
      } else if (this.$isZhb) {
        // 郑好办
        window.AlipayJSBridge.call('scanQRCode', result => {
          alert(JSON.stringify(result))
        })
      } else if (this.$isZfb) {
        // 支付宝
        zfbScan('qr').then(code => {
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
