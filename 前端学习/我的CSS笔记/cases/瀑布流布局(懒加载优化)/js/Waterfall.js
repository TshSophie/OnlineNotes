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
    // 挂载到全局
    window.Waterfall = Waterfall;
})();