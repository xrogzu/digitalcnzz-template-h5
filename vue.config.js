'use strict'
const path = require('path')
const defaultSettings = require('./src/config/index.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const AliOSSPlugin = require('webpack-alioss-plugin')

const resolve = dir => path.join(__dirname, dir)
const name = defaultSettings.title || 'vue mobile template'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: !IS_PROD,
  productionSourceMap: false,
  devServer: {
    port: 9020,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `
          @import "assets/scss/mixin.scss";
          @import "assets/scss/variables.scss";
          $cdn: "${defaultSettings.$cdn}";
          `
      }
    }
  },
  configureWebpack: config => {
    config.name = name
  },

  chainWebpack: config => {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // if (IS_PROD && process.env.WEBPACK_ALIOSS_PLUGIN_ACCESS_KEY_ID) {
    //   config.plugin('alioss').use(AliOSSPlugin, [
    //     {
    //       ossBaseDir: '/digitalcnzz/pretest/',
    //       project: 'digitalcnzz-xxxx-h5', // 发布前把xxxx换成当前项目的名称
    //       retry: 0,
    //       gzip: true,
    //       exclude: /.*\.$/,
    //       removeMode: false
    //     }
    //   ])
    // }
    // 别名 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    /**
     * 打包分析
     */
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    config
      .when(!IS_PROD, config => config.devtool('cheap-source-map'))

    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vantUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
