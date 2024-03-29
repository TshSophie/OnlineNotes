import Compile from "./Compile.js";
import observe from './observe.js';
import Watcher from './Watcher.js';

export default class Vue {
    constructor(options) {
        // 把参数options对象存为$options
        this.$options = options || {};
        // 数据
        this._data = options.data || undefined;
        observe(this._data);
        // 默认数据要变为响应式的，这里就是生命周期
        this._initData();
        // 调用默认的watch
        this._initWatch();
        // 模板编译
        new Compile(options.el, this);
        this.$options.created && this.$options.created()
    }

    _initData() {
        var self = this;
        Object.keys(this._data).forEach(key => {
            Object.defineProperty(self, key, {
                get: () => {
                    return self._data[key];
                },
                set: (newVal) => {
                    this.$options.update && this.$options.update()
                    self._data[key] = newVal;
                }
            });
        });
    }

    _initWatch() {
        var self = this;
        var watch = this.$options.watch;
        Object.keys(watch).forEach(key => {
            new Watcher(self, key, watch[key]);
        });
    }
};