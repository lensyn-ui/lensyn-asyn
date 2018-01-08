/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

import Vue from 'vue';

/* vuex 数据状态管理器 */
import Vuex from 'vuex';

/* 通用组件 Vuex对象 */
import common from './modules/common';

/* 售电总览 Vuex对象 */
import overview from './modules/overview';

/* 客户管理 Vuex对象 */
import customer from './modules/customer';

/* Vue加载状态管理器实例 */
Vue.use(Vuex);

/* 实例化Vuex状态管理器对象 */
export default new Vuex.Store({
    modules: {
        common, overview, customer
    },
    strict: false
});