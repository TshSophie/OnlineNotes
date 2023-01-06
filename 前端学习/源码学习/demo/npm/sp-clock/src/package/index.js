import spClock from './spClock/index.vue'

const comArr = [spClock];

// 注册组件
const install = (Vue) => {
    comArr.forEach(item => {
        Vue.component(item.name, item)  // item.name就是引入组件中的name属性，所以每个组件都需要name
    })
};

export default install