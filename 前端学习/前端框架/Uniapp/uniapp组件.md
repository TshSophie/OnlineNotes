easycom组件规范
HBuilderX 2.5.5起支持

传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。easycom将其精简为一步。

只要组件安装在项目的components目录下或uni_modules目录下，并符合components/组件名称/组件名称.vue目录结构。就可以不用引用、注册，直接在页面中使用。

不管components目录下安装了多少组件，easycom打包后会自动剔除没有使用的组件，对组件库的使用尤为友好。