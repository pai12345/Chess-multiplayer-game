const resolve = require('path').resolve
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js', '.jsx', '.vue', '.json'],
      alias: {
        '@components': resolve('./src/components'),
        '@/': resolve('./src')
      }
    }
  },
  devServer: {
    hot: true
  }
}
