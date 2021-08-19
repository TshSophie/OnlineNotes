;(function (params) {
    var Waterfall = function (opt) {
        if(typeof opt.el == 'string'){
            this.el = document.getElementsByClassName(opt.el)[0];
        }else{
            this.el = opt.el;            
        }
        // 选出已下载的图片来

        this.oItems = this.el.getElementsByTagName('div');
        this.columns = opt.columns;
        this.gap = opt.gap;
        this.itemWidth = (this.el.offsetWidth - (this.columns - 1) * this.gap) / this.columns;
        this.heightArr = [];
        this.init();
    }
    Waterfall.prototype.init = function () {
        this.render()
    }
    Waterfall.prototype.render  =function () {
        var item = null, minIdx = -1;
        for (let i = 0; i < this.oItems.length; i++) {
            item = this.oItems[i];
            item.style.width = this.itemWidth + 'px';
            if(i < this.columns){
                item.style.top = '0px';
                item.style.left = i * (this.itemWidth + this.gap) + 'px';
                this.heightArr.push(item.offsetHeight);
            } else {
                // 找出本行最低高度的项
                var minIdx = getMinidx(this.heightArr);
                item.style.left = this.oItems[minIdx].offsetLeft + 'px';
                item.style.top = this.heightArr[minIdx] + this.gap + 'px';

                // 更新该列的高度
                this.heightArr[minIdx] += item.offsetHeight + this.gap;
            }
        }
        function getMinidx(arr) {
            return arr.indexOf(Math.min.apply(null, arr));
        }
    }

    let num = 0;
    let n = 0;
    let images = []
    let _clientHeight = 0
    let _scrollTop = 0
    let el = null
    let isLoadImg = false
    var LazyLoading = function(opt) {
        el = document.getElementsByClassName(opt.el)[0];
        images = el.getElementsByTagName('img');
        this.columns = opt.columns;
        this.gap = opt.gap;
        num = images.length;
        n = 0;
        isLoadImg = false;
        // 可见区域高度
        _clientHeight = document.documentElement.clientHeight;
        // 滚动条距离顶部高度
        _scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        init();
    }

    let init = function () {
        new Waterfall ({
            el: 'J_waterfall',
            columns: this.columns || 2,
            gap: this.gap || 10,
        })
        lazyload();
        // 使用节流函数实现性能更好的懒加载
        window.addEventListener('scroll', throttle(lazyload, 1000, isLoadImg))
        // 使用防抖函数优化不断触发的窗口变换
        window.addEventListener('resize', debounce(computedClientHeight, 1000))
    }

    // 监听窗口重新计算可见区域
    let computedClientHeight = function() {
        // 可见区域高度
        _clientHeight = document.documentElement.clientHeight
        console.log('_clientHeight, ', _clientHeight);
    }

    let lazyload = function(){
        console.log("lazyload...");
        console.log('n, num', n, num);
        // 如果图片全都加载完毕了，就不再检测滚动条事件了
        isLoadImg = n >= num
        _scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        for (let i = n; i < num; i++) {
            // 图片距离顶部的高度小于可视区高度+滚动条卷去的高度时，即图片出现在了可视区域时
            if (images[i].parentNode.offsetTop < _clientHeight + _scrollTop) {
                // 真实图片还未加载
                if (images[i].getAttribute('src') == 'img/loading.gif') {
                    images[i].src = images[i].getAttribute('data-src')
                    var that = this;
                    // 图片加载完毕触发瀑布流布局
                    images[i].onload = function(e) {
                        new Waterfall ({
                            el: 'J_waterfall',
                            columns: that.columns || 2,
                            gap: that.gap || 10,
                        })
                    }
                }
                // 累计已加载图片数量
                n = i + 1
            }        
        }
    }

     // 节流函数 
     function throttle(func, wait, flag) {
        let timerOut
        return function() {
          if (flag) {
            return
          }
          if (!timerOut) {
            timerOut = setTimeout(() => {
              func()
              timerOut = null
            }, wait);
          }
        }
      }
  
      // 防抖函数
      function debounce(callback, delay){
        let timer;
        // 闭包存储timer值
        return function(arg){
          clearTimeout(timer);
          timer = setTimeout(function(){
            callback(arg)
          }, delay)
        }
      }

    // 挂载到全局
    window.Waterfall = Waterfall;
    window.LazyLoading = LazyLoading;
})();