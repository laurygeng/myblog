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
        nav:[
            {text: 'bilibili', link: 'https://space.bilibili.com/516457861' },
            {text: '掘金', link: 'https://juejin.cn/user/3140634382179374'},
            {text: 'Github', link: 'https://github.com/laurygeng'}
        ],
        sidebar:{
            '/':getSidebar()
        }
    }
}
function getSidebar() {
    return [
        {
            text:'HTML',
            children: [
                { text: '基础', link: '/HTML/' },
                { text: '进阶', link: '/HTML/advanced' },
            ],
            sidebarDepth:3
        },
        {
            text:'CSS',
            children:[
                { text: '基础', link: '/CSS/' },
                { text: '进阶', link: '/CSS/advanced' },
            ]
        },
        {
          text:'Javascript',
          children:[
            { text: '基础', link: '/Javascript/' },
            { text: '进阶', link: '/Javascript/advanced' },
          ]
        },
        {
          text:'Vue',
          children:[
            { text: '基础', link: '/Vue/' },
            { text: '进阶', link: '/Vue/advanced' },
          ]
        },
        {
          text:'浏览器',
          children:[
            { text: '基础', link: '/Vue/' },
            { text: '进阶', link: '/Vue/advanced' },
          ]
        },
        {
          text:'网络',
          children:[
            { text: '基础', link: '/Network/' },
            { text: '进阶', link: '/Network/advanced' },
          ]
        },
        {
          text:'安全',
          children:[
            { text: '基础', link: '/Security/' },
            { text: '进阶', link: '/Security/advanced' },
          ]
        },
        {
          text:'面经',
          children:[
            { text: '基础', link: '/Experience/' },
            { text: '进阶', link: '/Experience/advanced' },
          ]
        },
    ]
}