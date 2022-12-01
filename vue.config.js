const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false ,
  runtimeCompiler:true,
  devServer: {
    proxy: {
      '/info': {
        target: 'http://127.0.0.1:8088',//设置你调用的接口域名和端口号 
        changeOrigin: true, //跨域 
        pathRewrite: {
          '^/info': '/' //这里理解成用‘/api’代替target里面的地址，
        }
      },
    }
  },
  
})
