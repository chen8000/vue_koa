module.exports = {
  outputDir: '../server/views', // 编译后静态目录的位置
  publicPath: './', // 静态资源路径
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',  // 后端接口地址
        pathRewrite: {
          '^/api': '/api/'
        },
        changeOrigin: true,  // 允许跨域
        ws: true
      }
    }
  }
}