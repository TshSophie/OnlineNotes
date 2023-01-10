//  引入包
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//  webpack所有的配置信息都应该写在module.exports中
module.exports = {
  // 入口文件
  entry: "./src/index.ts",

  // 打包文件所在目录
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 打包后的文件
    filename: 'bundle.js',

    // 告诉webpack不使用箭头函数
    environment: {
      arrowFunction: false,
    }
  },

  // webpack打包所要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定规则生效的文件
        test: /\.ts$/,
        // 要使用的loader,从后往前执行
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: 'babel-loader',
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "88",
                      "ie": "11"            
                    },
                    // 指定corejs的方式
                    "corejs": "3",
                    // 使用corejs的方式"usage"表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          // 简化版，无配置
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node-modules/
      }
    ]
  },

  mode:"development",

  // 配置插件
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // title: "自定义title",
      template: "./src/index.html", // 指定生成模板
    }),
  ],

  // 用来设置引用模块
  resolve: {
    extensions: ['.ts', '.js'],

  }
};