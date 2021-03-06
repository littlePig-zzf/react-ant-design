// 对应的侧边栏
const main = '/main/';
export const getNavData = [
  {
    name: '首页',
    path: `${main}index`,
    icon: 'home'
  },
  {
    name: '表格',
    path: `${main}table`,
    icon: 'video-camera'
  },
  {
    name: '表单列表',
    path: `${main}formIndex`,
    icon: 'file-text',
    children: [
      {
        name: '使用ant组件',
        path: `${main}formIndex/form`
      },
      {
        name: '不使用组件',
        path: `${main}formIndex/rowForm`
      }
    ]
  },
  {
    name: '骨架屏',
    path: `${main}manageIndex`,
    icon: 'file-text',
    children: [
      {
        name: '展示',
        path: `${main}manageIndex/skeleton`
      },
      {
        name: '权限',
        path: `${main}manageIndex/permit`
      }
    ]
  },
  {
    name: 'html编辑器',
    path: `${main}editorIndex`,
    icon: 'edit'
  },
  {
    name: '自定义主题色',
    path: `${main}themeColor`,
    icon: 'appstore-o'
  },
  {
    name: '画板',
    path: `${main}canvas`,
    icon: 'ant-design'
  },
  {
    name: '动画',
    path: `${main}animation`,
    icon: 'share-alt'
  },
  {
    name: '日程表',
    path: `${main}agenda`,
    icon: 'calendar'
  },
  {
    name: '任务表',
    path: `${main}transform`,
    icon: 'calendar'
  }
];
