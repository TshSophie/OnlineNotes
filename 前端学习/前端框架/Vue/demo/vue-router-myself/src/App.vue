<template>
  <div>
    <!-- 添加路由 -->
    <!-- 会被渲染为 <a href="#/home"></a> -->
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/list">list</router-link>
      </li>
      <li>
        <router-link to="/news">news</router-link>
      </li>
    </ul>
    <!-- 展示路由的内容 -->
    <router-view></router-view>
  </div>
</template>
<style scoped>
li{
  display: inline-block;
  margin: 10px;
}
</style>