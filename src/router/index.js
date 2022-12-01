import { createRouter, createWebHashHistory } from "vue-router";
import { Avatar, Document, Unlock, PictureRounded, HomeFilled } from '@element-plus/icons-vue'
const routes = [
    {
        path: '/',
        name: 'home',
        // meta:{
        //     title:'主页'
        // },
        component: () => import('@/components/Home/HomeView.vue'),
        children: [
            {
                path: '/homeview',
                name: 'homeview',
                label: '首页',
                meta: {
                    isShow: true,
                    title: '首页',
                    icon: HomeFilled
                },
                component: () => import('@/components/homeview/homeview.vue'),
            },
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                meta: {
                    path: '/user',
                    title: '用户列表',
                    isShow: true,
                    icon: Avatar,
                },
                component: () => import('@/components/User/UserView.vue'),
            },
            {
                path: '/role',
                name: 'role',
                label: '权限管理',
                meta: {
                    isShow: true,
                    title: '权限管理',
                    icon: Unlock
                },
                component: () => import('@/components/Role/RoleView.vue'),
            },
            {
                path: '/info',
                name: 'info',
                label: '信息展示',
                meta: {
                    isShow: true,
                    title: '信息展示',
                    icon: Document
                },
                component: () => import('@/components/info/InfoView.vue'),
            },
            // {
            //     path: '/echart',
            //     name: 'echart',
            //     meta: {
            //         isShow: true,
            //         title: 'Echarts图表',
            //         icon: PictureRounded
            //     },
            //     component: () => import('@/components/Echarts/INDEX/index.vue'),
            //     children: [
            //         {
            //             path: '/Echartlist1',
            //             name: 'list1',
            //             label: '折线图&柱状图',
            //             meta: {
            //                 isShow: true,
            //                 title: '折线图&柱状图',
            //             },
            //             component: () => import('@/components/Echarts/INDEX/index2.vue'),
            //         },
            //         {
            //             path: '/Echartlist2',
            //             name: 'list2',
            //             label: '饼状图&散点图',
            //             meta: {
            //                 isShow: true,
            //                 title: '饼状图&散点图',
            //             },
            //             component: () => import('@/components/Echarts/INDEX/index3.vue'),
            //         },
            //         {
            //             path: '/Echartlist3',
            //             name: 'list3',
            //             label: '地图&K线图',
            //             meta: {
            //                 isShow: true,
            //                 title: '地图&K线图',
            //             },
            //             component: () => import('@/components/Echarts/INDEX/index4.vue'),
            //         },
            //         {
            //             path: '/Echartlist4',
            //             name: 'list4',
            //             label: '盒须图&热力图',
            //             meta: {
            //                 isShow: true,
            //                 title: '盒须图&热力图',
            //             },
            //             component: () => import('@/components/Echarts/INDEX/index5.vue'),
            //         },
            //         {
            //             path: '/Echartlist5',
            //             name: 'list5',
            //             label: '关系图&树状图',
            //             meta: {
            //                 isShow: true,
            //                 title: '关系图&树状图',
            //             },
            //             component: () => import('@/components/Echarts/INDEX/index6.vue'),
            //         },
            //         {
            //             path: '/Echartlist6',
            //             name: 'list6',
            //             label: '雷达图&旭日图',
            //             meta: {
            //                 isShow: true,
            //                 title: '雷达图&旭日图',
            //             },
            //             component: () => import('@/components/Echarts/INDEX/index7.vue'),
            //         },
            //     ]
            // },

        ]
    },
    {
        path: '/errorinfo',
        name: 'errorinfo',
        component: () => import('@/components/Error/Errorinfo.vue'),
        meta: {
            isShow: false,
            title: '错误',
        },
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            isShow: false,
            title: '登录',
        },
        component: () => import('@/components/Login/LoginView.vue')
    },
    {
        path: '/:path(.*)',
        component: () => import('@/components/Error/Errorinfo.vue')
    },
    // {
    //     path: '/:pathMatch(.*)',
    //     redirect: '/errorinfo',
    // },
    {
        path: '/',
        redirect: '/home'
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,

});
// router.beforeEach((to, from, next) => {
//     // 获取当前token值判断是否为登录状态
//     const token = localStorage.getItem('token')
//     if (!token && to.path !== '/login') {
//         next('/login')
//     } else {
//         next()
//     }
// })


export default router;

