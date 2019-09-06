/**
 * Created by scott on 2019-05-01
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath:  process.env.NODE_ENV === 'production'
    ? '/wallet/'
    : '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_api', resolve('src/api'))
      .set('_assets', resolve('src/assets'))
      .set('_components', resolve('src/components'))
      .set('_views', resolve('src/views'))
      .set('_common', resolve('src/common'))
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  lintOnSave: true,
  devServer: {
    open: false, //配置自动启动浏览器
    host: '0.0.0.0',
    port: 8080,
    https: false,
    // proxy: {
      // '/api': {
      //   target: 'https://dsdfund.co',
      //   ws: true,
      //   changeOrigin: true,
      // }
    // }
    proxy: 'http://10.10.10.32:8080'
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/style/theme',
          './src/style/mixin',
          './src/style/_var',
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
