/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

/* 引入静态变量资源、异步请求库 */
import * as common from '../CommonConst'
import axios from 'axios'

/**
 * 状态数据库对象
 * @define {{
 * menuList: array 目录数据列表
 * }}
 */
const state = {
    menuList: [],
	menuListShow: []
};

/**
 * 状态数据库设值方法
 * @returns {{
 * menuList: ((p1:*)=>Array) 目录数据设值函数
 * }}
 */
const getters = {
    menuList: state => state.menuList,
    menuListShow: state => state.menuListShow
};

/**
 *
 * @function {{
 * getMenuList: (({commit}:{commit: *})) 获取目录数据方法
 * }}
 */
const actions = {
    getMenuList({commit}) {

    	/* 使用get方法获取调用接口获取数据 */
		axios.get(common.MENU_LIST_URL)
			.then(resData => {

				/* 得到数据后，根据返回数据状态提交数据到数据扭转库 */
				const data = resData.data;
				if (data && data.meta && data.meta.code === 1) {
					commit(common.MENU_LIST, {resData: data.data});
				} else {
					/* 数据有误，直接返回空数据 */
					commit(common.MENU_LIST, {resData: []});
				}
			})
			.catch(e => {
				/* 如果错误返回空数组 */
				commit(common.MENU_LIST, {resData: []});
			});
	},
	setMenuList({commit}, {menuData}) {
    	commit(common.MENU_LIST_SHOW, {menuData});
	}
};

const mutations = {
	[common.MENU_LIST](state, {resData}) {

		/* 扭转数据状态 */
		state.menuList = resData;
	},
	[common.MENU_LIST_SHOW](state, {menuData}) {

		/* 扭转数据状态 */
		state.menuListShow = menuData;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};