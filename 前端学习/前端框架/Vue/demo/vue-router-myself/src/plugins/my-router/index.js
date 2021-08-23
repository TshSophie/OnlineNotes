// 保存一个全局变量 Vue
let _Vue = null

export default class MyVueRouter {
  // 实现install 注册 MyVueRouter vue提供install可供我们开发新的插件及全局注册组件等
  // 把Vue传进去
  static install(Vue) {
    // 定义一个标识判断是否注册了 MyVueRouter ,注册了就不用下一步了
    if (MyVueRouter.install.installed) return
    // 没有就进行下面的，把标识改变true
    MyVueRouter.install.installed = true
    // 把全局变量 _Vue 保存
    _Vue = Vue
    // 为了获取Vue中的this执行这里使用 混入
    _Vue.mixin({
      // 在Vue实例创建好的时候进行操做
      beforeCreate() {
        // 判断是否是实例创建还是组件创建 ,可以判断是否挂载 了router
        if (this.$options.router) {
          // 把router注册到 _Vue上
          _Vue.prototype.$router = this.$options.router
          // 注册完router后进行初始化
          this.$options.router.init()
        }
      },
    })
    // 判断是否挂载
  }
  // 实现构造方法
  constructor(optoins) {
    // 这个保存的是  routes
    this.optoins = optoins
    // routerMap 保存路由和 组件之间的关系
    this.routerMap = {}
    // 用来记录数据 这里面的数据都是 响应式
    this.data = _Vue.observable({
      // 当前路由的地址
      current: '/',
    })
  }
  // 解析路由规则
  createRouterMap() {
    // 把之前构造函数的中的传入的 routes 规则进行遍历
    this.optoins.routes.forEach((item) => {
      // routes中的每一项都是一个对象 { path: '/XXX', component: XXX}
      // 把路由 和 组件的对应关系添加到 routerMap中
      this.routerMap[item.path] = item.component
    })
  }
  // 实现组件
  initComponents(Vue) {
    // 实现 router-link组件
    Vue.component('router-link', {
      props: {
        // router-link上面的to属性将访问的地址
        to: String,
      },
      // 由于运行版的Vue不能渲染template所以这里重新写个render 这里h 也是个函数
      // template: `<a :href="to"><slot></slot></a>`,
      render(h) {
        // 第一个参数是标签
        return h(
          'a',
          // 第二个参数是对象是 tag 里面的属性
          {
            // 设置属性
            attrs: {
              href: this.to,
            },
            // 绑定事件
            on: {
              // 重新复写点击事件,不写的话会点击会向服务器发送请求刷新页面
              click: this.myClick,
            },
          },
          // 这个是标签里面的内容 这里渲染是 默认插槽
          // 比如<router-link to="/">首页</router-link>
          // 插槽就是给首页两个字留位置,当前这只是个例子
          [this.$slots.default]
        )
      },
      methods: {
        //router-link的点击事件
        myClick(e) {
          // 因为我这里是模拟是 history的路由所以用pushState ，hash路由可以这里用 push
          // 使用history修改浏览器上面的地址
          // pushState 第一个参数是传递的参数,第二个是标题，第三个是链接
          history.pushState({}, '', this.to)
          // 渲染相应的组件
          // 渲染的页面也需要改变 data中的current是响应式的 router-view是根据current来渲染的
          this.$router.data.current = this.to
          // 阻止默认跳转事件
          e.preventDefault()
        },
      },
    })
    // 实现 router-view组件
    Vue.component('router-view', {
      render(h) {
        // 获取的当前路径所对应的组件
        // 因为当前this是Vue,this.$router才是MyVueRouter
        const component = this.$router.routerMap[this.$router.data.current]
        // 转化为虚拟Dom
        return h(component)
      },
    })
  }
  // 初始化事件
  initEvent() {
    // 监听浏览器地址的改变
    window.addEventListener('popstate', () => {
      console.log("地址栏改变了");
      // 改变VueRouter的当前的地址 重新渲染组件
      this.data.current = window.location.pathname
    })
    window.addEventListener('hashchange', ()=>{
      console.log("hashchange 地址栏改变了");
    })
  }

  // 初始化
  init() {
    // 解析路由规则
    this.createRouterMap()
    // 初始化组件
    this.initComponents(_Vue)
    // 初始化事件
    this.initEvent()
  }
}
