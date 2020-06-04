
const routes = [
  // {
  //   path: '*',
  //   redirect: '/domain'
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/domain',
    name: 'domain',
    component: () => import('@/views/tables/domain')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/tables/user')
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('@/views/tables/role')
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/tables/menu')
  },
  {
    path: '/role_menuMid',
    name: 'role_menuMid',
    component: () => import('@/views/tables/role_menuMid')
  }
]

export default routes