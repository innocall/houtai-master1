import en from '../i18n/lang/en'
import Vue from 'vue'
import Router from 'vue-router'
import CommerViews from '@/views/commerViews'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'

// 不是必须加载的组件使用懒加载
const Icon = () => import('@/views/icon/index')

// const Siji = () => import('@/views/duoji/siji')
// const Wuji = () => import('@/views/duoji/wuji')
const Transfer = () => import('@/views/transfer/transfer')
// const DataTable = () => import('@/views/table/dataTables')
// const FilterTable = () => import('@/views/table/filterTable')

// const Markdown = () => import('@/views/editor/markdownView')
// const WangeditorView = () => import('@/views/editor/wangeditorView')
const NotFound = () => import('@/page404')
const AddArticle = () => import('@/views/article/addArticle')

// const pagePermissions = () => import('@/views/permissions/pagePermissions')
// const btnPermissions = () => import('@/views/permissions/btnPermissions')
const DragTable = () => import('@/views/table/dragTabe')
const pagePermissions = () => import('@/views/permissions/pagePermissions')
const NavClassify = () => import('@/views/syssetting/navClassify')
const healthyDetails = () => import('@/views/healthy/healthyDetails2')

Vue.use(Router)
let routeNmae = en.routeNmae
let defaultRouter = [
  { path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  // {
  //   path: '/healthyDetails',
  //   iconCls: 'fa fa-life-ring', // 图标样式class
  //   name: routeNmae.details,
  //   hidden: true,
  //   children: []
  // },
  {
    path: '/',
    iconCls: 'fa fa-exchange', // 图标样式class
    name: routeNmae.healtth,
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/healthyDetails',
        iconCls: 'fa fa-sign-in', // 图标样式class
        name: routeNmae.details,
        component: healthyDetails,
        // hidden: true,
        children: [
        ]
      }
    ]
  },
  {
    path: '/index',
    iconCls: 'fa fa-home', // 图标样式class
    name: routeNmae.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard', // 图标样式class
        name: '主页',
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  },
]

let addRouter = [
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: routeNmae.article,
    component: Layout,
    children: [
      {
        path: '/addArticle',
        name: routeNmae.publishArticle,
        component: AddArticle,
        children: []
      }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-cogs', // 图标样式class
    name: routeNmae.icon,
    component: Layout,
    children: [
      {
        path: '/icon',
        name: routeNmae.builtInIcon,
        component: Icon,
        children: []
      }
    ]
  },
  // {
  //   path: '/index',
  //   iconCls: 'fa fa-paw', // 图标样式class
  //   name: routeNmae.healtth,
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/healthyDetails',
  //       iconCls: 'fa fa-life-ring', // 图标样式class
  //       name: routeNmae.details,
  //       // hidden: true,
  //       children: []
  //     }
  //   ]
  // },
  {
    path: '/',
    iconCls: 'fa fa-medkit', // 图标样式class
    name: routeNmae.healtth,
    component: Layout,
    children: [
      {
        path: '/Transfer',
       
        name: routeNmae.healtthDetails,
        component: Transfer,
        // hidden: true,
        children: [
        ]
      }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-desktop', // 图标样式class
    name: routeNmae.table,
    component: Layout,
    children: [
      // {
      //   path: '',
      //   name: routeNmae.dragSort,
      //   component: DragTable,
      //   children: []
      // }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-map-marker', // 图标样式class
    name: routeNmae.permissions,
    component: Layout,
    children: [
      // {
      //   path: '/pagePermissions',
      //   name: routeNmae.pageControl,
      //   component: pagePermissions,
      //   children: []
      // }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-cog', // 图标样式class
    name: routeNmae.editor,
    component: Layout,
    meta: {role: ['superAdmin']},
    children: [
      // {
      //   path: '/navClassifies',
      //   name: routeNmae.markdown,
      //   component: NavClassify,
      //   children: []
      // }
    ]
  },
  { path: '*',
    redirect: '/404',
    hidden: true,
    children: []
  },


]
export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
