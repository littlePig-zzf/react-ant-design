// 对应的侧边栏
const home = '/home/'
export const getNavData = [
  {
    name: '首页',
    path: '/home',
    icon: 'home'
  },
  {
    name: '公司列表',
    path: home+'companyIndex',
    icon: 'video-camera'
  },
  {
    name: '表单列表',
    path: home+'formIndex',
    icon: 'file-text',
    children: [
      {
        name: '使用ant组件',
        path: home+'formIndex/Form'
      },
      {
        name: '不使用组件',
        path: home+'formIndex/RowForm'
      }
    ]
  },
  {
    name: 'html编辑器',
    path: home+'editorIndex',
    icon: 'edit'
  },
  {
    name: '自定义主题色',
    path: home+'themeColor',
    icon: 'appstore-o'
  },
  {
    name: '画板',
    path: home+'canvas',
    icon: 'ant-design'
  },
  {
    name: 'svg动画',
    path: home+'svg',
    icon: 'share-alt'
  }
]