module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vueblog/'
    : '/',
  assetsDir: '',
  productionSourceMap: false,
  filenameHashing: true
}
