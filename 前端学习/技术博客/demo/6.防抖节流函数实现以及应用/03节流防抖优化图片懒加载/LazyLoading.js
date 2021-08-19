;(function () {
    var LazyLoading = function(opt) {
        this.placeholder = opt.placeholder;
        this.createHook = opt.createHook;
        this.loadedHook = opt.loadedHook;
        this.el = document.getElementsByClassName(opt.el)[0];
        this.images = this.el.getElementsByTagName('img');
        this.total = this.images.length;
        this.loadedNum = 0;
        this.isLoadImg = false;
        // 可见区域高度
        this._clientHeight = document.documentElement.clientHeight;
        // 滚动条距离顶部高度
        this._scrollTop = document.documentElement.scrollTop || document.body.scrollTop;          
        this.init();
    }
    
    LazyLoading.prototype.init = function () {
      // 初始化钩子
      this.createHook();
      // 启动懒加载
      this.lazyload();
      // 使用节流函数实现性能更好的懒加载
      window.addEventListener('scroll', throttle(this.lazyload, this,  1000, this.isLoadImg))
      // 使用防抖函数优化不断触发的窗口变换
      window.addEventListener('resize', debounce(this.computedClientHeight,this, 1000))
    }

    LazyLoading.prototype.computedClientHeight = function() {
      // 可见区域高度
      this_clientHeight = document.documentElement.clientHeight
    }

    LazyLoading.prototype.lazyload = function(){
        console.log("lazyload...");
        console.log('n, num', this.loadedNum, this.total);
        // 如果图片全都加载完毕了，就不再检测滚动条事件了
        this.isLoadImg = this.loadedNum >= this.total
        this._scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        for (let i = this.loadedNum; i < this.total; i++) {
            // 图片距离顶部的高度小于可视区高度+滚动条卷去的高度时，即图片出现在了可视区域时
            let images = this.images;
            console.log(images[i].offsetTop, this._clientHeight , this._scrollTop);
            if (images[i].offsetTop < this._clientHeight + this._scrollTop) {
                // 真实图片还未加载
                if (images[i].getAttribute('src') == this.placeholder) {
                    images[i].src = images[i].getAttribute('data-src')
                    var that = this;
                    // 图片加载完毕回调
                    images[i].onload = function(e) {
                      that.loadedHook();
                    }
                }
                // 累计已加载图片数量
                n = i + 1
            }        
        }
    }

   // 节流函数 
   function throttle(func, obj, wait, flag) {
      let timerOut
      return function() {
        if (flag) {
          return
        }
        if (!timerOut) {
          timerOut = setTimeout(() => {
            // func()
            func.call(obj)
            timerOut = null
          }, wait);
        }
      }
    }

    // 防抖函数
    function debounce(callback, obj, delay){
      let timer;
      // 闭包存储timer值
      return function(arg){
        clearTimeout(timer);
        timer = setTimeout(function(){
          // callback(arg)
          callback.call(obj, arg)
        }, delay)
      }
    }
    window.LazyLoading = LazyLoading;
  })();
