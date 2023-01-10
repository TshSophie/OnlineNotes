//  导入 gulp 第三方模块
const gulp = require('gulp')
// 导入 gulp-cssmin 第三方模块, 用于压缩 css 文件
const cssmin = require('gulp-cssmin')
// 导入 gulp-autoprefixer 第三方, 用于自动添加前缀
const autoprefixer = require('gulp-autoprefixer')
// 导入 gulp-less 第三方, 用于把 less 代码转换成 css 代码
const less = require('gulp-less')
// 导入 gulp-uglify 第三方, 用于把 js 代码压缩
const uglify = require('gulp-uglify')
// 导入 gulp-babel 第三方, 用于把 es6 转换成 es5
const babel = require('gulp-babel')
// 导入 gulp-htmlmin 第三方, 用于压缩 html 文件
const htmlmin = require('gulp-htmlmin')
// 导入 gulp-clean 第三方, 用于删除文件夹
const clean = require('gulp-clean');
// 导入 gulp-webserver 第三方, 用于在开发阶段启动服务器
const webserver = require('gulp-webserver')
 
// 配置一个 打包 css 的任务
const cssHandler = () => {
  // 在配置任务的时候, 把 流 return 出去
  return gulp
    .src('./src/css/*.css')               // 找到原始文件
    .pipe(autoprefixer())                 // 自动添加前缀
    .pipe(cssmin())                       // 进行 css 代码的压缩
    .pipe(gulp.dest('./dist/css/'))       // 放在指定目录内
}

// 配置一个 打包 less 文件的任务
const lessHandler = () => {
  return gulp
    .src('./src/less/*.less')         // 找到需要编译的 less 文件
    .pipe(less())                     // 进行 less 转换成 css 的操作
    .pipe(autoprefixer())             // 给 css 代码自动添加前缀
    .pipe(cssmin())                   // 对 css 代码进行压缩处理
    .pipe(gulp.dest('./dist/css/'))  // 放在指定目录下
}
 
 
// 配置一个打包 js 文件的任务
const jsHandler = () => {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel({ presets: [ '@babel/preset-env' ] })) // 把 ES6 转换成 ES5
    .pipe(uglify()) // 压缩 js 文件
    .pipe(gulp.dest('./dist/js/'))
}

// 配置一个打包 html 文件的任务
const htmlHandler = () => {
  return gulp
    .src('./src/*.html')
    .pipe(htmlmin({ // 进行压缩
      collapseWhitespace: true, // 把所有空格去掉
      collapseBooleanAttributes: true, // 简写所有布尔属性
      removeAttributeQuotes: true, // 移除属性中的双引号
      removeEmptyAttributes: true, // 移除空属性
      removeComments: true, // 移除注释内容
      removeScriptTypeAttributes: true, // 移除 script 标签默认的 type 属性
      removeStyleLinkTypeAttributes: true, // 移除 link 和 style 标签的默认 type 属性
      minifyCSS: true, // 压缩内嵌式 css 代码
      minifyJS: true, // 压缩内嵌式 js 代码
    }))
    .pipe(gulp.dest('./dist/'))
}

// 配置一个转移 img 文件的任务
const imgHandler = () => {
  return gulp
    .src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images/'))
}

// 配置一个删除任务
const cleanHandler = () => {
  return gulp.src('./dist', {read: false})
        .pipe(clean());
}

// 配置一个启动服务器的任务
const serverHandler = () => {
  return gulp
    .src('./dist') // 找到你要开启的文件夹, 打包后生成的文件夹
    .pipe(webserver({ // 配置启动服务器
      host: 'localhost', // 域名
      port: '9888', // 端口号
      open: './index.html', // 默认打开哪一个 html 文件, 你网站默认的首页
      livereload: true, // 自动刷新页面, 当你的代码发生任何修改以后, 会自动刷新页面
      // 开始进行代理配置
      proxies: [
        {
          // 代理标识符
          source: '/dt',
          // 跨域的请求地址
          target: 'http://www.example.com/path'
        }
      ]
    }))
}
 
// 配置一个监控任务
const watchHandler = () => {
  gulp.watch('./src/js/*.js', jsHandler)
  gulp.watch('./src/css/*.css', cssHandler)
  gulp.watch('./src/less/*.less', lessHandler)
  gulp.watch('./src/*.html', htmlHandler)
  gulp.watch('./src/images/*.html', imgHandler)
}

// 配置一个总任务
const defaultHandler = gulp.series(
  cleanHandler,
  gulp.parallel(
    cssHandler,
    lessHandler, 
    jsHandler, 
    htmlHandler, 
    imgHandler),
    serverHandler,
    watchHandler
)

// end 导出你配置的任务
module.exports = {
  lessHandler,
  jsHandler,
  htmlHandler,
  imgHandler,
  default: defaultHandler,
  cleanHandler
}
 