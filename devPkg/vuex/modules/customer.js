/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

/* 引入静态变量资源、异步请求库 */
import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    electricityData: []
};

const getters = {
    electricityData: state => state.electricityData
};

/**
 *
 * @function {{
 * getMenuList: (({commit}:{commit: *})) 获取目录数据方法
 * }}
 */
const actions = {
    getElectricityData({commit}) {

        /* 使用get方法获取调用接口获取数据 */
        axios.get(common.CUSTOMER_ELECTRICITY_URL)
            .then(resData => {

                /* 得到数据后，根据返回数据状态提交数据到数据扭转库 */
                const data = resData.data;
                if (data && data.meta && data.meta.code === 1) {
                    commit(common.CUSTOMER_ELECTRICITY, {resData: data.data});
                } else {
                    /* 数据有误，直接返回空数据 */
                    commit(common.CUSTOMER_ELECTRICITY, {resData: {}});
                }
            })
            .catch(e => {
                /* 如果错误返回空数组 */
                commit(common.CUSTOMER_ELECTRICITY, {resData: {}});
            });
    }
};

const mutations = {
    [common.CUSTOMER_ELECTRICITY](state, {resData}) {

        /* 扭转数据状态 */
        state.electricityData = resData;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};