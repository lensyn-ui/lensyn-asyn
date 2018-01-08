/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

"use strict";

/* 加载vue路由 */
import Router from "vue-router";

/* 各个功能模块 --start-- */

/* 登录页面 */
const Login = () => import("../components/login/Login.vue");

/* 售电总览*/
const Overview = () => import("../components/overview/Index.vue");

/* 市场动态 */
const MarketDynamics = () => import("../components/overview/MarketDynamics.vue");

/* 市场动态 */
const Management = () => import("../components/overview/Management.vue");

/* 市场动态 */
const DealOverview = () => import("../components/overview/DealOverview.vue");

/* 客户管理 */
const Customer = () => import("../components/customer/Index.vue");

/* 客户管理 */
const Electricity = () => import("../components/customer/ElectricityCustomer.vue");

/* 客户管理 */
const Potential = () => import("../components/customer/PotentialCustomer.vue");

/* 客户管理 */
const Power = () => import("../components/customer/PowerSupplier.vue");

/* 客户管理 */
const Channel = () => import("../components/customer/ChannelDealer.vue");


/* 各个功能模块 --end-- */

const [OVERVIEW, CUSTOMER] = [
    [
        { path: "", component: MarketDynamics },
        { path: "/marketDynamics", component: MarketDynamics },
        { path: "/management", component: Management },
        { path: "/dealAnalysis", component: DealOverview }
    ],
    [
        { path: "", component: Electricity },
        { path: "/electricity", component: Electricity },
        { path: "/potential", component: Potential },
        { path: "/power", component: Power },
        { path: "/channel", component: Channel }
    ]
];

/* 路由配置 */
const router = new Router({
    routes: [
        { path: "/", redirect: '/login' },
        { path: "/login", component: Login },
        {
            path: "/overview",
            component: Overview,
            children: OVERVIEW,
            meta: {
                requestLogin: true
            }
        },
        {
            path: "/customer",
            component: Customer,
            children: CUSTOMER
        }
    ]
});

/* 路由权限拦截 */
router.beforeEach((to, from, next) => {
    if (to.meta.requestLogin) {
        let loginName = sessionStorage.getItem("userName");
        if (loginName && loginName === "admin&admin") {
            next();
        } else if (to.path === '/login') {
            next();
        } else {
            next({
                path: "/login"
            })
        }
    } else {
        next();
    }
});

export { router, OVERVIEW };