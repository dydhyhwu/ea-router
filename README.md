# ea-router

`ea-router`意为：easy auto router。

目的是为了减少人工手动维护**路由表**的工作，在多人协作时避免大量冲突。解放开发者，专注于业务开发。

原理是基于**目录映射**自动生成路由解析结果并根据**适配器模式**加载对应的**适配器**将解析结果转换成相对应的路由对象,
从而实现自动映射路由的功能。

目前只实现了针对于 `vue-router 3.x` 的适配器，后续将会增加更多的适配器，也欢迎大家贡献代码。

** 建议搭配 `vue-property-decorator` 使用更香噢！ **

## Install

```bash
npm i -S ea-router
```

## rules

既然是自动化， 那么当然是需要遵循一定的约定：

- 目录下每个`.vue`文件即是一个路由对象，即对应一个 url
- 目录下的`Layout.vue`会自动被注册为当前目录下的跟路由
- 多级目录结构下，每个目录应该携带`Layout.vue`，以便逐层渲染下来(当然也可以使用api来设置默认的)


## Usage

目前有3个api以及5个装饰器

api:

- [`generate`](#generate)
- [`setDefaultLayout`](#setDefaultLayout)
- [`setNotFoundPage`](#setNotFoundPage)

decorators:

- [`@RouteName`](#RouteName)
- [`@Alias`](#Alias)
- [`@Context`](#Context)
- [`@EnableProps`](#EnableProps)
- [`@Meta`](#Meta)

### <a id="generate"></a> `generate` api

构造函数中传入通过`require.context`指定目录及过滤规则, 如下实例是指定`views`目录下所有`.vue`文件。

路由生成的api, 调用此方法将生成一个对应 **路由适配器** 生成的路由对象，目前默认内置的时基于`vue 2.x`的`vue-router`。

```javascript
// src/router/index.js

import Vue from 'vue'
import Router from 'vue-router'
import RouteGenerator from "ea-router";

Vue.use(Router)
let generator = new RouteGenerator(require.context('./views', true, /\.vue$/))

export default new Router({
  routes: generator.generate()
})

```

那么在 `main.js` 中，我们不用改动原有的代码即可直接使用：

```javascript
// src/main.js

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

```

### <a id="setDefaultLayout"></a> `setDefaultLayout` api

指定默认的`Layout.vue`，因为在大多数情况下，`Layout.vue`的内容可能都是下面这样：

```vue
<template>
    <router-view></router-view>
</template>
```

这种情况下，`Layout.vue`的目的仅仅是作为子路由的入口。那么我们可以直接利用`setDefaultLayout`来设置默认的`Layout`。
规则如下：
- 当当前目录中没有`Layout.vue`时，会尝试使用设置的默认`Layout`。
- 当没有`Layout.vue`并且没有设置默认`Layout`时，将会抛出异常。

实例：

```javascript
// src/router.js

import Vue from 'vue'
import Router from 'vue-router'
import RouteGenerator from "ea-router";
import DefaultLayout from './components/defaultLayout.vue';

Vue.use(Router)
let generator = new RouteGenerator(require.context('./views', true, /\.vue$/))
generator.setDefaultLayout(DefaultLayout);

export default new Router({
  routes: generator.generate()
})

```

```vue
<!-- /src/components/defaultLayout.vue -->
<template>
    <router-view></router-view>
</template>
```

### <a id="setNotFoundPage"></a> `setNotFoundPage` api

设置路由匹配失败时显示的页面。

实例：

```javascript
// src/router.js

import Vue from 'vue'
import Router from 'vue-router'
import RouteGenerator from "ea-router";
import NotFoundPage from './components/notFound.vue';

Vue.use(Router)
let generator = new RouteGenerator(require.context('./views', true, /\.vue$/))
generator.setNotFoundPage(NotFoundPage);

export default new Router({
  routes: generator.generate()
})

```

```vue
<!-- /src/components/notFound.vue -->
<template>
    <div>
        嘿，页面走丢啦！    
    </div>
</template>
```

### <a id="RouteName"></a> `@RouteName(name: string)` decorator

设置路由名称，在`vue-router`中对应了[**命名路由**](https://router.vuejs.org/zh/guide/essentials/named-routes.html)

```javascript

import { Vue, Component } from 'vue-property-decorator';
import { RouteName } from 'ea-router';

@RouteName('YourComponentRouteName')
@Component
export default class YourComponent extends Vue {
}

```

等价于

```javascript
const router = new VueRouter({
  routes: [
    { 
        path: 'path/to/component/on/directory', 
        name: 'YourComponentRouteName',
        component: YourComponent,
    }
  ]
})
```

**Note that:** path的生成规则是相对路径噢（根目录是构造函数中传入的目录，示例中也就是`src/views`）

### <a id="Alias"></a> `@Alias(alias: string)` decorator

设置路由别名，对应`vue-router`中的[**别名**](https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html#%E5%88%AB%E5%90%8D)

```javascript

import { Vue, Component } from 'vue-property-decorator';
import { Alias } from 'ea-router';

@Alias('YourComponentAlias')
@Component
export default class YourComponent extends Vue {
}

```

等价于

```javascript
const router = new VueRouter({
  routes: [
    { 
        path: 'path/to/component/on/directory', 
        alias: 'YourComponentAlias',
        component: YourComponent,
    }
  ]
})
```

### <a id="Context"></a> `@Context(params: string[])` decorator

设置路由上下文，对应了`vue-router`中的[**$routes.params**](https://router.vuejs.org/zh/api/?#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7)

会根据传入的顺序生成`path`。

```javascript

import { Vue, Component } from 'vue-property-decorator';
import { Context } from 'ea-router';

@Context('id', 'type')
@Component
export default class YourComponent extends Vue {
}

```

等价于

```javascript
const router = new VueRouter({
  routes: [
    { 
        path: 'path/to/component/on/directory/:id/:type',
        component: YourComponent,
    }
  ]
})
```

**Note that:** 如果同时使用 `@Alias` 和 `@Context`, 上下文的参数会自动添加在`alias`后面, 就像下面的例子:


```javascript

import { Vue, Component } from 'vue-property-decorator';
import { Context, Alias } from 'ea-router';

@Alias('YourComponentAlias')
@Context('id', 'type')
@Component
export default class YourComponent extends Vue {
}

```

等价于

```javascript
const router = new VueRouter({
  routes: [
    { 
        path: 'path/to/component/on/directory/:id/:type',
        alias:'YourComponentAlias/:id/:type',
        component: YourComponent,
    }
  ]
})
```

### <a id="EnableProps"></a> `@EnableProps()` decorator

开启路由参数的`Boolean`模式， 对应了`vue-router`中的[**路由传参-布尔模式**](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F)

```javascript

import { Vue, Component } from 'vue-property-decorator';
import { EnableProps } from 'ea-router';

@EnableProps()
@Component
export default class YourComponent extends Vue {
}

```

等价于

```javascript
const router = new VueRouter({
  routes: [
    { 
        path: 'path/to/component/on/directory',
        props: true,
        component: YourComponent,
    }
  ]
})
```

**Note that:** 一般搭配 `@Context` 使用。

### <a id="Meta"></a> `@Meta(meta: object)` decorator

设置路由元信息，对应`vue-router`中的[**路由元信息**](https://router.vuejs.org/zh/guide/advanced/meta.html)

```javascript

import { Vue, Component } from 'vue-property-decorator';
import { Meta } from 'ea-router';

@Meta({
    title: 'Component Title',
    requireAuthorize: true
})
@Component
export default class YourComponent extends Vue {
}

```

等价于

```javascript
const router = new VueRouter({
  routes: [
    { 
        path: 'path/to/component/on/directory',
        component: YourComponent,
        meta: {
                  title: 'Component Title',
                  requireAuthorize: true
              },
    }
  ]
})
```

## features

- [ x ] 自动将目录映射成路由表
- [ x ] 重构项目，改善灵活性
- [ x ] 路由装饰器，移除组件内硬编码
- [ x ] 可设置默认`Layout`
- [ x ] 可设置 `NotFound` 对应的路由页面
- [ x ] 抽离`目录` => `路由对象`映射逻辑，利用**适配器模式**，以便灵活支持不同的路由框架
- [ x ] 实现 `vue-router 3.x` 的适配器
- [  ] 实现 `vue-router-next` 的适配器
- [  ] 实现路由文件的自动生成（基于模板语法）
- [  ] 添加可设置所有选项配置的装饰器
- [  ] 开放加载自定义适配器
- [  ] typescript支持
- [  ] 回补单元测试

## about 

halo, 我是若羽，如果这个库能对你有所帮助那是最好的。
如果使用过程中有什么问题欢迎随意提出`issues`，或者直接邮箱联系。

欢迎大家贡献代码，不断完善它。

## License

MIT License