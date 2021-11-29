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
        { text: '基础', link: '/Html/' },
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
            { text: '作用域和作用域链', link: '/Javascript/scope' },
            { text: '闭包', link: '/Javascript/closure' },
            { text: 'This', link: '/Javascript/this' },
            { text: 'ES6', link: '/Javascript/es6' },
            { text: '继承', link: '/Javascript/inherit' },
            { text: '手写代码-基础', link: '/Javascript/code1' }
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
        { text: 'Vue3的新特性', link: '/Vue/' },
        { text: 'Vue diff', link: '/Vue/advanced' },
        { text: '组件化的理解', link: '/Javascript/type' },
        { text: '计算属性和监听器', link: '/Javascript/advanced' },
        { text: 'Vue生命周期', link: '/Javascript/' },
        { text: '复用模式', link: '/Javascript/advanced' },
        { text: 'Vue的设计理念响应式的理解', link: '/Javascript/' },
        { text: 'Vue-Router路由守卫', link: '/Javascript/advanced' },
        { text: 'Vue的性能优化', link: '/Javascript/advanced' },
        { text: 'NextTick', link: '/Javascript/' },
        { text: 'Vuex', link: '/Javascript/advanced' },
        { text: '组件间的通信', link: '/Javascript/code1' },
        { text: '组件复用及扩展', link: '/Javascript/type' },
      ]
    },
    {
      text: 'React',
      children: [
        { text: '优势&对比Vue框架', link: '/Javascript/type' },
        { text: '单向数据流双向绑定', link: '/Javascript/advanced' },
        { text: 'React生命周期', link: '/Javascript/' },
        { text: '复用模式', link: '/Javascript/advanced' },
        { text: 'Hooks', link: '/Javascript/' },
        { text: 'SetState是同步还是异步', link: '/Javascript/advanced' },
        { text: 'Virtual DOM', link: '/Javascript/advanced' },
        { text: 'React Diff', link: '/Javascript/' },
        { text: 'React性能优化', link: '/Javascript/advanced' },
        { text: 'React源码解析', link: '/Javascript/code1' },
        { text: 'Redux', link: '/Javascript/type' },
        { text: 'Mobx', link: '/Javascript/advanced' },
        { text: 'Dva', link: '/Javascript/' }
      ]
    },
    {
      text: '工程化',
      children: [
        { text: 'webpack', link: '/Javascript/type' },
        { text: '项目构建', link: '/Network/' },
        { text: 'nginx', link: '/Network/advanced' },
        { text: '持续集成', link: '/Network/' },
        { text: '版本控制', link: '/Network/advanced' },
      ]
    },
    {
      text: '模块化',
      children: [
        { text: 'ESMoule&CommonJs', link: '/Javascript/type' },
      ]
    },
    {
      text: '网络',
      children: [
        { text: '基础', link: '/Vue/' },
        { text: '进阶', link: '/Vue/advanced' },
      ]
    },
    {
      text: '浏览器',
      children: [
        { text: '进程与线程', link: '/Network/' },
        { text: '缓存', link: '/Network/advanced' },
        { text: '渲染原理', link: '/Network/' },
        { text: '本地存储', link: '/Network/advanced' },
        { text: '同源策略', link: '/Network/' },
        { text: '事件机制', link: '/Network/advanced' },
        { text: '垃圾回收', link: '/Network/advanced' }
      ]
    },
    {
      text: '安全',
      children: [
        { text: 'XSS', link: '/Security/' },
        { text: 'CSRF', link: '/Security/advanced' },
        { text: 'SQL注入', link: '/Network/' },
        { text: 'DNS劫持', link: '/Network/advanced' },
        { text: 'HTTP劫持', link: '/Network/' },
        { text: 'DDOS', link: '/Network/advanced' },
        { text: 'Samesite Cookie', link: '/Network/' },
        { text: '中间人攻击', link: '/Network/advanced' },
        { text: '前端安全问题', link: '/Network/advanced' }
      ]
    },
    {
      text: '算法',
      children: [
        { text: '排序', link: '/Security/' },
        { text: '查找', link: '/Security/advanced' },
        { text: '树', link: '/Security/' },
        { text: '链表', link: '/Security/advanced' },
        { text: '堆', link: '/Network/' },
        { text: '栈', link: '/Network/advanced' },
      ]
    },
  ]
}