## Gulp常用API

### **1.task()**

task方法用来定义任务

**提醒**: 这个API不再是推荐的模式了 -，而是推进采用export的方式，参考： [export your tasks](https://www.gulpjs.com.cn/docs/getting-started/creating-tasks)。

将命名函数注册为任务：

```js
const { task } = require('gulp');

function build(cb) {
  // body omitted
  cb();
}

task(build);
```

将匿名函数注册为任务：

```js
const { task } = require('gulp');

task('build', function(cb) {
  // body omitted
  cb();
});
```



### **2.src()**

src()方法是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流(Vinyl files)，这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息。

```js
src(globs, [options])
```

globs参数是文件匹配模式(类似正则表达式)，用来匹配文件路径(包括文件名)，当然这里也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数可以为一个数组。



### **3.dest()**

dest()方法是用来写文件的，主要配合src()使用，可以将src()获取的文件写入到指定的文件目录下。

```js
gulp.dest(path[,options])
```

如：

```js
// 通过src()方法从log文件下获取到该文件夹下面的所有js文件，然后重新写入到dist文件夹下的index中
gulp.task("Copy",function(done){
	gulp.src('log/**/*.js').pipe(gulp.dest('dist/index.js'))
	done()
})
```



### **4.watch()**

gulp.watch()用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩、[ES6](https://so.csdn.net/so/search?q=ES6&spm=1001.2101.3001.7020)代码转换等等

```js
watch(globs, [options], [task])
```

- glob 为要监视的文件匹配模式，规则和用法与gulp.src()方法中的glob相同。
- tasks 为文件变化后要执行的任务

```js
// watch会一直监听log文件下所有的js文件，当某一个js文件发生变化之后，会立马执行任务一和任务二，当我们改变log下面的任意一个js文件之后，watch会立马做对应的反应，执行对应任务。
gulp.watch('log/*.js', gulp.series('one','two',function(cb){
    cb()
}));
```



## Gulp常用插件

### **自动加载插件(gulp-load-plugins)**

可以一次性包括package.json 里面的所有的 gulp 依赖包，无需在 gulpfile.js 使用require 关键字一个一个的把依赖包导入进去。可以实现按需引入，节省项目空间，利于优化。

```shell
 npm install --save-dev gulp-load-plugins
```

给定一个`package.json` 文件，该文件具有以下依赖关系：

```json
{
    "dependencies": {
        "gulp-jshint": "*",
        "gulp-concat": "*"
    }
}
```

之前你在Gulpfile.js中使用插件的方式：

```javascript
const gulp = require('gulp');
const gulpJshint = require('gulp-jshint');
const gulpConcat = require('gulp-concat');
```

现在到您的Gulpfile.js：

```javascript
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const gulpJshint = plugins.jshint; // 其实可以不用定义变量，直接在需要使用这个插件的地方 plugins.jshint() 就可以了
const gulpConcat = plugins.concat;  //其实可以不用定义变量，直接在需要使用这个插件的地方 plugins.concat() 就可以了
```

有了这个插件您不必在gulfile.js中手动引入每个gulp插件了。

### **重命名（ gulp-rename）**

```shell
npm install --save-dev gulp-rename
```

用于给文件重新命名的，比如对js文件压缩后，改后缀名为`.min.js`

```js
var gulp = require('gulp'),
rename = require('gulp-rename'),
gulp.task('rename', function () {
  	gulp.src('log/test.js')
    .pipe(rename('test.min.js')) //会将test.js重命名为test.min.js
    .pipe(gulp.dest('js'))})
```



### **js文件压缩（gulp-uglify）**

```shell
npm install --save-dev gulp-uglify
```

对js文件进行压缩

```js
var gulp = require('gulp'),
uglify = require("gulp-uglify");
		gulp.task('uglify', function () {gulp.src('log/index.js')
    .pipe(uglify())  //压缩
    .pipe(gulp.dest('js'))})

```



### **css文件压缩（gulp-minify-css）**

```shell
npm install --save-dev gulp-minify-css
```

对css文件进行压缩

```js
var gulp = require('gulp'),
minifyCss = require("gulp-minify-css");
gulp.task('minify-css', function () {
    gulp.src('css/*.css') // 要压缩的css文件
    .pipe(minifyCss()) //压缩css
    .pipe(gulp.dest('dist/css'));
});
```



### **html文件压缩（gulp-minify-html）**

```shell
npm install --save-dev gulp-minify-html
```

对html文件进行压缩

```js
var gulp = require('gulp'),
    minifyHtml = require("gulp-minify-html");
gulp.task('minify-html', function () {
    gulp.src('html/*.html') // 要压缩的html文件
    .pipe(minifyHtml()) //压缩
    .pipe(gulp.dest('dist/html'));
});
```



### **less的编译（gulp-less）**

```shell
npm install --save-dev gulp-less
```

将less文件编译为css文件

```js
var gulp = require('gulp'),
    less = require("gulp-less");
gulp.task('compile-less', function () {
    gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});
```



### **图片压缩（gulp-imagemin）**

```shell
npm install --save-dev gulp-imagemin
```

对图片文件进行压缩

```js
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件
gulp.task('default', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist'));
});
```



### **ES6 转换成 ES5 （gulp-babel babel-core）**

安装babel& ES6 转换成 ES5 插件

```shell
npm install --save-dev gulp-babel babel-core
npm install --save-dev babel-preset-es2015
```

将ES6代码转换为ES5代码

```js
var gulp = require('gulp'),
babel = require('gulp-babel');
gulp.task('es6',  () => {
  return gulp.src('app/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
```

### 自动化开发服务器（gulp-webserver）

```shell
npm install --save-dev gulp-webserver
```

配置开发服务器

```js
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
```



## 使用示例

### 项目目录

```
project
    |____src
    			|____css
    			|____less
    			|____images
    			|____js
    			|____index.html
    |____gulpfile.js
    |____package.json
```

### gulpfile.js 配置文件

```js
//  导入 gulp 第三方模块
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')();
// 导入 gulp-cssmin 第三方模块, 用于压缩 css 文件
const cssmin = plugins.cssmin; // 其实可以不用定义变量，直接在需要使用这个插件的地方 plugins.cssmin() 就可以了
// 导入 gulp-autoprefixer 第三方, 用于自动添加前缀
const autoprefixer =  plugins.autoprefixer
// 导入 gulp-less 第三方, 用于把 less 代码转换成 css 代码
const less = plugins.less
// 导入 gulp-uglify 第三方, 用于把 js 代码压缩
const uglify = plugins.uglify
// 导入 gulp-babel 第三方, 用于把 es6 转换成 es5
const babel = plugins.babel
// 导入 gulp-htmlmin 第三方, 用于压缩 html 文件
const htmlmin = plugins.htmlmin
// 导入 gulp-clean 第三方, 用于删除文件夹
const clean = plugins.clean
// 导入 gulp-webserver 第三方, 用于在开发阶段启动服务器
const webserver = plugins.webserver
 
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
 
```