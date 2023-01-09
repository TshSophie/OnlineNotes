// 1. 导入 gulp 第三方模块
const gulp = require('gulp')
// 1-2. 导入 gulp-cssmin 第三方模块, 用于压缩 css 文件
const cssmin = require('gulp-cssmin')
// 1-2-2. 导入 gulp-autoprefixer 第三方, 用于自动添加前缀
const autoprefixer = require('gulp-autoprefixer')
// 1-3. 导入 gulp-less 第三方, 用于把 less 代码转换成 css 代码
const less = require('gulp-less')
// 1-4. 导入 gulp-uglify 第三方, 用于把 js 代码压缩
const uglify = require('gulp-uglify')
// 1-4-2. 导入 gulp-babel 第三方, 用于把 es6 转换成 es5
const babel = require('gulp-babel')
// 1-5. 导入 gulp-htmlmin 第三方, 用于压缩 html 文件
const htmlmin = require('gulp-htmlmin')
// 1-12. 导入 del 第三方, 用于删除文件夹
const del = require('del')
// 1-13. 导入 gulp-webserver 第三方, 用于在开发阶段启动服务器
const webserver = require('gulp-webserver')
 
// 2. 配置一个 打包 css 的任务
const cssHandler = () => {
  // 在配置任务的时候, 把 流 return 出去
  return gulp
    .src('./src/css/*.css')               // 找到原始文件
    .pipe(autoprefixer())                 // 自动添加前缀
    .pipe(cssmin())                       // 进行 css 代码的压缩
    .pipe(gulp.dest('./dist/css/'))       // 放在指定目录内
}
//2.1 配置一个 打包plugin文件里css的任务
const css2Handler = () => {
  return gulp
    .src('./src/plugin/*.css')               // 找到原始文件
    .pipe(autoprefixer())                 // 自动添加前缀
    .pipe(cssmin())                       // 进行 css 代码的压缩
    .pipe(gulp.dest('./dist/plugin/'))       // 放在指定目录内
}

// 3. 配置一个 打包 less 文件的任务
const lessHandler = () => {
  return gulp
    .src('./src/less/*.less')         // 找到需要编译的 less 文件
    .pipe(less())                     // 进行 less 转换成 css 的操作
    .pipe(autoprefixer())             // 给 css 代码自动添加前缀
    .pipe(cssmin())                   // 对 css 代码进行压缩处理
    .pipe(gulp.dest('./dist/css/'))  // 放在指定目录下
}
 
 
 
// 4. 配置一个打包 js 文件的任务
const jsHandler = () => {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel({ presets: [ '@babel/preset-env' ] })) // 把 ES6 转换成 ES5
    .pipe(uglify()) // 压缩 js 文件
    .pipe(gulp.dest('./dist/js/'))
}

// 2.2 配置一个 打包plugin文件里js的任务
const jsPluginHandler = () => {
    return gulp
    .src('./src/plugin/*.js')
    .pipe(babel({ presets: [ '@babel/preset-env' ] })) // 把 ES6 转换成 ES5
    .pipe(uglify()) // 压缩 js 文件
    .pipe(gulp.dest('./dist/plugin/'))
  }
    
// 5. 配置一个打包 html 文件的任务
const htmlHandler = () => {
  return gulp
    .src('./src/views/*.html')
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
    .pipe(gulp.dest('./dist/views/'))
}
 
// 6. 配置一个转移 img 文件的任务
const imgHandler = () => {
  return gulp
    .src('./src/img/**/*')
    .pipe(gulp.dest('./dist/img/'))
}
 
// 7. 配置一个转移 video 文件的任务
const videoHandler = () => {
  return gulp
    .src('./src/videos/**.*')
    .pipe(gulp.dest('./dist/videos/'))
}
 
// 8. 配置一个转移 audio 文件的任务
const audioHandler = () => {
  return gulp
    .src('./src/audios/**.*')
    .pipe(gulp.dest('./dist/audios/'))
}
 
// 9. 配置一个转移 fonts 文件的任务
const fontHandler = () => {
  return gulp
    .src('./src/fonts/**.*')
    .pipe(gulp.dest('./dist/fonts/'))
}
 
// 10. 配置一个转移 data 文件的任务
const dataHandler = () => {
  return gulp
    .src('./src/data/**.*')
    .pipe(gulp.dest('./dist/data/'))
}
 
// 12. 配置一个删除任务
const delHandler = () => {
  return del(['./dist/'])
}
 
// 13. 配置一个启动服务器的任务
const serverHandler = () => {
  return gulp
    .src('./dist') // 找到你要开启的文件夹, 打包后生成的文件夹
    .pipe(webserver({ // 配置启动服务器
      host: 'localhost', // 域名
      port: '9888', // 端口号
      open: './views/index.html', // 默认打开哪一个 html 文件, 你网站默认的首页
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
 
// 14. 配置一个监控任务
const watchHandler = () => {
  gulp.watch('./src/js/*.js', jsHandler)
  // gulp.watch('./src/css/*.css', css2Handler)
  gulp.watch('./src/less/*.less', lessHandler)
  gulp.watch('./src/views/*.html', htmlHandler)
  gulp.watch('./src/img/*.html', imgHandler)
}
 
// 11. 配置一个总任务
const defaultHandler = gulp.series(
  delHandler,
  gulp.parallel(css2Handler,jsPluginHandler,lessHandler, jsHandler, htmlHandler, imgHandler),
  serverHandler,
  watchHandler
)
 
// end 导出你配置的任务
module.exports = {
  lessHandler,
  css2Handler,
  jsPluginHandler,
  jsHandler,
  htmlHandler,
  imgHandler,
  default: defaultHandler,
  delHandler
}
 
 
// // 假如我想做一个 打包 css 文件的配置
// // gulp@3.x 的语法
// gulp.tesk('cssHandler', function () {
//   // 在这里面书写打包 css 文件的工作流程
//   gulp
//     .src('./src/css/*.css')
//     .pipe('把css文件进行压缩转码')
//     .pipe(gulp.dest('./dist/css/'))
// })