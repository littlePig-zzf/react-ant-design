// 对应的侧边栏
export const getNavData = [
  {
    name: '公司列表',
    path: '/MainIndex/companyIndex',
    icon: 'video-camera'
  },
  {
    name: '管理设置',
    icon: 'user',
    path: 'Manage',
    children: [
      {
        name: '用户列表',
        path: '/MainIndex/Manage/UserIndex'
      },
      {
        name: '权限列表',
        path: '/MainIndex/Manage/PermitIndex'
      },
      {
        name: '角色列表',
        path: '/MainIndex/Manage/RoleIndex'
      }
    ]
  },
  {
    name: '门店列表',
    path: '/MainIndex/storeIndex',
    icon: 'upload'
  },
  {
    name: '表单列表',
    path: '/MainIndex/formIndex',
    icon: 'upload',
    children: [
      {
        name: '使用ant组件',
        path: '/MainIndex/formIndex/Form'
      },
      {
        name: '不使用组件',
        path: '/MainIndex/formIndex/RowForm'
      }
    ]
  }
]