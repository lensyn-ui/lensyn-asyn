/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

/* 引入静态变量资源、异步请求库 */
import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    marketData: []
};

const getters = {
    marketData: state => state.marketData
};

/**
 *
 * @function {{
 * getMenuList: (({commit}:{commit: *})) 获取目录数据方法
 * }}
 */
const actions = {
    getMarketData({commit}) {

        /* 使用get方法获取调用接口获取数据 */
        axios.get(common.MARKET_DYNAMICS_URL)
            .then(resData => {

                /* 得到数据后，根据返回数据状态提交数据到数据扭转库 */
                const data = resData.data;
                if (data && data.meta && data.meta.code === 1) {
                    let a = ['201608','201609','201610','201611','201612','201701','201702','201703','201704','201705','201706','201707'];
                    let temp = [];
                    for(let i = 0;i < a.length;i ++) {
                        let b = (Math.random()*1000).toFixed(2);
                        temp.push({
                            timestamp: a[i].substr(0, 4) + '-' + a[i].substr(4),
                            declare: b,
                            turnover: (b - Math.random()*100).toFixed(2),
                            averagePrice: (Math.random()*1234).toFixed(3)
                        });
                    }
                    data.data.bidding = temp;
                    commit(common.MARKET_DYNAMICS, {resData: data.data});
                } else {
                    /* 数据有误，直接返回空数据 */
                    commit(common.MARKET_DYNAMICS, {resData: {}});
                }
            })
            .catch(e => {
                /* 如果错误返回空数组 */
                commit(common.MARKET_DYNAMICS, {resData: {}});
            });
    }
};

const mutations = {
    [common.MARKET_DYNAMICS](state, {resData}) {

        /* 扭转数据状态 */
        state.marketData = resData;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};