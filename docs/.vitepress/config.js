module.exports = {
  // 网站标题
  title: '爱在几米之瑶',
  // 网站描述
  description: 'laury的主页',
  // 打包目录
  dest: './dist',
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  // 使用插件
  plugins: [
    '@vuepress/active-header-links',   // 页面滚动时自动激活侧边栏链接的插件
    '@vuepress/back-to-top',          // 返回顶部插件
    '@vuepress/medium-zoom',          // 图片预览插件
    '@vuepress/nprogress',        //页面顶部进度条
  ],
  // 主题配置
  themeConfig: {
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    // lastUpdated: 'Last Updated', // string | boolean
    // 启动页面丝滑滚动
    smoothScroll: true,
    // 导航栏配置
    nav: [
      { text: 'bilibili', link: 'https://space.bilibili.com/516457861' },
      { text: '掘金', link: 'https://juejin.cn/user/3140634382179374' },
      { text: 'Github', link: 'https://github.com/laurygeng' }
    ],
    sidebar: {
      '/': getSidebar()
    }
  }
}
function getSidebar () {
  return [
    {
      text: 'HTML',
      children: [
        { text: '基础', link: '/HTML/' },
      ],
    },
    {
      text: 'CSS',
      children: [
        { text: '基础', link: '/Css/index' },
        { text: '布局', link: '/Css/layout' },
        { text: '定位', link: '/Css/position' },
        { text: '居中', link: '/Css/center' },
        { text: 'BFC', link: '/Css/bfc' },
        { text: '盒模型', link: '/Css/box' }
      ]
    },
    {
      sidebarDepth: 3,
      text: 'Javascript',
      children: [
        {
          text: '基础',
          children: [
            { text: '数据类型', link: '/Javascript/type' },
            { text: '原型和原型链', link: '/Javascript/prototype' },
            { text: '继承', link: '/Javascript/inherit' },
            { text: '作用域和作用域链', link: '/Javascript/scope' },
            // { text: '闭包', link: '/Javascript/closure' },
            // { text: 'This', link: '/Javascript/this' },
            { text: '手写代码-基础', link: '/Javascript/code1' },
            { text: 'ES6', link: '/Javascript/es6' }
          ]
        },
        {
          text: '进阶',
          children: [
            { text: '异步编程', link: '/Javascript/async' },
            { text: '正则表达式', link: '/Javascript/regular' },
            { text: '前端性能优化', link: '/Javascript/performance' },
            { text: '设计模式', link: '/Javascript/design' },
            { text: '微前端', link: '/Javascript/micro' },
            { text: '手写代码-应用', link: '/Javascript/code2' },
          ]
        }
      ]
    },
    {
      text: 'Vue',
      children: [
        { text: 'Vue3的新特性', link: '/Vue/new' },
        { text: 'Vue diff', link: '/Vue/diff' },
        { text: '计算属性和监听器', link: '/Vue/computed' },
        { text: 'NextTick', link: '/Vue/nextTick' },
        { text: 'Vue生命周期', link: '/Vue/lifecycle' },
        { text: '复用模式', link: '/Vue/reuse' },
        { text: 'Vue的设计理念响应式的理解', link: '/Vue/reactive' },
        { text: 'Vue-Router路由守卫', link: '/Vue/router' },
        { text: 'Vue的性能优化', link: '/Vue/performance' },
        { text: '组件间的通信', link: '/Vue/comunicate' },
        { text: 'Vuex', link: '/Vue/vuex' }
      ]
    },
    {
      text: 'React',
      children: [
        { text: '优势&对比Vue框架', link: '/React/compare' },
        { text: '单向数据流双向绑定', link: '/React/dataflow' },
        { text: 'React生命周期', link: '/React/lifecycle' },
        { text: '复用模式', link: '/React/reuse' },
        { text: 'Hooks', link: '/React/hooks' },
        { text: 'SetState是同步还是异步', link: '/React/setstate' },
        { text: 'Virtual DOM', link: '/React/virtualdom' },
        { text: 'React Diff', link: '/React/diff' },
        { text: 'React性能优化', link: '/React/performance' },
        { text: 'React源码解析', link: '/React/sourcecode' },
        { text: 'Redux', link: '/React/redux' },
        { text: 'Mobx', link: '/React/mobx' },
        { text: 'Dva', link: '/React/dva' }
      ]
    },
    {
      text: '工程化',
      children: [
        { text: 'webpack', link: '/Project/webpack' },
        { text: '项目构建', link: '/Project/cli' },
        { text: 'nginx', link: '/Project/nginx' },
        { text: '持续集成', link: '/Project/cicd' },
        { text: '版本控制', link: '/Project/git' },
        { text: '单元测试', link: '/Project/unitTest' },
        { text: '错误监控', link: '/Project/errorMonitor' },
        { text: 'ESMoule&CommonJs', link: '/Module/' },

      ]
    },
    // {
    //   text: '模块化',
    //   children: [
    //     { text: 'ESMoule&CommonJs', link: '/Module/' },
    //   ]
    // },
    {
      text: '网络',
      children: [
        { text: '基础', link: '/NetWork/' },
      ]
    },
    {
      text: '浏览器',
      children: [
        { text: '进程与线程', link: '/Browser/process' },
        { text: '缓存', link: '/Browser/cache' },
        { text: '渲染原理', link: '/Browser/render' },
        { text: '本地存储', link: '/Browser/localstore' },
        { text: '同源策略', link: '/Browser/sameorigin' },
        { text: '事件机制', link: '/Browser/eventloop' },
        { text: '垃圾回收', link: '/Browser/garbage' }
      ]
    },
    {
      text: '安全',
      children: [
        { text: '前端安全问题', link: '/Security/' }
        // { text: 'XSS', link: '/Security/xss' },
        // { text: 'CSRF', link: '/Security/csrf' },
        // { text: 'SQL注入', link: '/Security/sql' },
        // { text: 'DNS劫持', link: '/Security/dns' },
        // { text: 'HTTP劫持', link: '/Security/http' },
        // { text: 'DDOS', link: '/Security/ddos' },
        // { text: 'Samesite Cookie', link: '/Security/samesite' },
        // { text: '中间人攻击', link: '/Security/attack' }
      ]
    },
    {
      text: '算法',
      children: [
        { text: '排序', link: '/Algorithm/sort' },
        { text: '查找', link: '/Algorithm/search' },
        { text: '树', link: '/Algorithm/tree' },
        { text: '链表', link: '/Algorithm/link' },
        { text: '堆', link: '/Algorithm/heap' },
        { text: '栈', link: '/Algorithm/stack' },
      ]
    },
  ]
}