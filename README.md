# vue-elementUI-template

> vuejs 项目开发实用模版

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 功能
  
* 集成vuex、vue-router、less、axios

* 集成element-ui，element-ui组件按需加载

* 划分项目文件夹, 无需纠结怎么放置组件、页面、store等等文件

* webpack配置路径别名
```
  ...
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      "service": resolve('src/service'),
      "components": resolve('src/components'),
      "pages": resolve('src/pages'),
      "config": resolve('src/config'),
      "router": resolve('src/router'),
      "service": resolve('src/service'),
      "util": resolve('src/util'),
      "store": resolve('src/store')
    }
  },    
  ...
```

* 使用```vuex-persistedstate```持久化store到浏览器sessionStorage(或者lcoalStorage)

* 配置eslint， 使用standard模版，再次基础上强制必须使用分号结尾, 箭头函数的参数必须使用括号包裹, 详细参见```.eslintrc.js```


## Update Log

> 2018-2-9

* 升级elementUI到 2.X 版本

* 去掉主题自定义功能，实际开发中，该功能使用的几率不大，更多的是直接使用样式覆盖，更加方便快捷，加快开发速度

* 去掉单元测试，以及e2e测试相关模块，实际项目开发中使用较少，因为项目周期短，没有多余的时间用于做代码测试，更多的是黑盒测试,b并且安装依赖的速度会提升（国情，你懂的），但是自己的开源项目尽量可以加上测试相关代码
