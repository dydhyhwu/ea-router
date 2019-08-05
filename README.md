# ea-router

`ea-router`意为：easy auto router。

基于`vue-router`的`Router`，实现根据文件夹自动生成路由。



## 如何使用

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import AutoRouter from "ea-router";

Vue.use(Router)
let generator = new AutoRouter(require.context('./views', true, /\.vue$/))

export default new Router({
  routes: generator.generate()
})

```



构造函数中传入目录下的所有文件即可，此处通过`require.context`达到获取`views`目录下所有`.vue`文件。



## 自动化的约定

既然是自动化， 那么当然是需要遵循一定的约定：

- 目录下每个`.vue`文件即是一个路由对象，即对应一个 url
- 目录下的`Layout.vue`会自动被注册为当前目录下的跟路由
- 多级目录结构下，每个目录必须携带`Layout.vue`，以便逐层渲染下来



## 后续功能

- 开放部门API以便实现更灵活的定制化需求