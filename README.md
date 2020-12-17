# ea-router

`ea-router`意为：easy auto router。

基于`vue-router`的`Router`，实现根据文件夹自动生成路由。

This library parse directory as Route Object, and generate configs to any router-library what you want(if you can help me write that Adapter).

## Install

```bash
npm i -S ea-router
```

## Usage

There are several decorators and 3 api

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



### <a id="RouteName"></a> `@RouteName(name: string)` decorator

```javascript

import { Vue, Component } from 'vue-property-decorator';
import { RouteName } from 'ea-router';

@RouteName('YourComponentRouteName')
@Component
export default class YourComponent extends Vue {
}

```

is equivalent to

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

**Note that:** the path is auto generate by the directory construct.

### <a id="Alias"></a> `@Alias(alias: string)` decorator

```javascript

import { Vue, Component } from 'vue-property-decorator';
import { Alias } from 'ea-router';

@Alias('YourComponentAlias')
@Component
export default class YourComponent extends Vue {
}

```

is equivalent to

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

```javascript

import { Vue, Component } from 'vue-property-decorator';
import { Context } from 'ea-router';

@Context('id', 'type')
@Component
export default class YourComponent extends Vue {
}

```

is equivalent to

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

** Note that: ** if you both use `@Alias` and `@Context`, the `@Context` will auto append on `@Alias`, like this:


```javascript

import { Vue, Component } from 'vue-property-decorator';
import { Context, Alias } from 'ea-router';

@Alias('YourComponentAlias')
@Context('id', 'type')
@Component
export default class YourComponent extends Vue {
}

```

is equivalent to

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

```javascript

import { Vue, Component } from 'vue-property-decorator';
import { EnableProps } from 'ea-router';

@EnableProps()
@Component
export default class YourComponent extends Vue {
}

```

is equivalent to

```javascript
const router = new VueRouter({
  routes: [
    { 
        path: 'path/to/component/on/directory/:id/:type',
        props: true,
        component: YourComponent,
    }
  ]
})
```

** Note that: ** we suggest use this decorator with `@Context`



### <a id="Meta"></a> `@Meta(meta: object)` decorator

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

is equivalent to

```javascript
const router = new VueRouter({
  routes: [
    { 
        path: 'path/to/component/on/directory/:id/:type',
        component: YourComponent,
        meta: {
                  title: 'Component Title',
                  requireAuthorize: true
              },
    }
  ]
})
```


```javascript
import Vue from 'vue'
import Router from 'vue-router'
import RouteGenerator from "ea-router";

Vue.use(Router)
let generator = new RouteGenerator(require.context('./views', true, /\.vue$/))

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

- 开放部分API以便实现更灵活的定制化需求


## License

MIT License