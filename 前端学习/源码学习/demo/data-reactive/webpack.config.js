// 从https://www.webpackjs.com/官网照着配置
const path = require('path');

module.exports = {
    // 入口
    entry: './src4-数组的响应式处理/index.js',
    // 出口
    output: {
        // 虚拟打包路径，就是说文件夹不会真正生成，而是在8080端口虚拟生成
        publicPath: 'xuni',
        // 打包出来的文件名，不会真正的物理生成
        filename: 'bundle.js'
    },
    devServer: {
        // 端口号
        port: 8089,
        // 静态资源文件夹
        contentBase: 'www'
    },
    // 启用source-map方便调试, 构建后的代码映射到源码
    devtool: 'source-map',
};