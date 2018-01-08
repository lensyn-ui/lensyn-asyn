/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

<template>
    <div class="application-container">

        <!-- 顶部导航菜单 ---start--- -->
        <navigator v-if="isLogin" :class="[{'navigator-collapse': navigatorCollapse, 'navigator-small': menuCollapse && navigatorCollapse}]" @clickFunc="navigatorFunc" :navigatorObj="navigatorObj"></navigator>
        <!-- 顶部导航菜单 ---end--- -->

        <!-- 侧边栏菜单 ---start--- -->
        <menutpl v-if="isLogin" :class="[{'menu-collapse': menuCollapse}]" @clickFunc="menuCollapseFunc" :menuObj="menuListData"></menutpl>
        <!-- 侧边栏菜单 ---end--- -->

        <!-- 主体路由样式 ---start--- -->
        <div class="router-container" :class="[{'full-screen': !isLogin, 'menu-collapse': menuCollapse, 'navigator-collapse': navigatorCollapse}]">
            <router-view></router-view>
        </div>
        <!-- 主体路由样式 ---end--- -->

    </div>
</template>

<script>
    import menutpl from "./common/Menu.vue";
    import navigator from "./common/Navigator.vue";
    import {mapGetters} from 'vuex';
    export default {
        computed: mapGetters({
            "menuList": "menuList"
        }),
        components: {
            menutpl, navigator
        },
        /**
         * 所有参数变量说明
         * @returns {{
         * isLogin: boolean 是否登录 默认为未登录,
         * menuCollapse: boolean menu区域收缩属性 默认为展开,
         * navigatorCollapse: boolean navigator区域收缩属性 默认为展开,
         * menuListData: {menuList: Array menu菜单列表数据, collapse: boolean menu收缩属性 默认未展开, userName: string 用户名},
         * navigatorObj: {collapse: boolean navigator是否展开 默认为不展开, menu: boolean menu是否展开 默认不展开, brandName: string brand标题, userName: string 用户名}
         * }}
         */
        data() {
            return {
                isLogin: false,
                menuCollapse: false,
                navigatorCollapse: false,
                menuListData: {menuList: [], collapse: false, userName: ""},
                navigatorObj: {collapse: false, menu: false, brandName: "售电管理平台", userName: ""}
            }
        },
        watch: {
            "$route.path": function (val) {
                let me = this;
                me.$nextTick(() => {
                    me.isLogin = val.substr(1) !== 'login';
                    if(me.isLogin) me.getMenuList();
                });
            },
            "menuList": function (val) {
                let me = this;
                me.$nextTick(() => {
                    let path = me.$route.path;
                    me.menuListData.menuList = me.assembleMenu(val, "link", path);
                });
            }
        },
        methods: {
            navigatorFunc(args) {
                let me = this;
                let type = args.type;
                switch (type) {
                    case "collapse":
                        me.navigatorObj.collapse = me.navigatorCollapse = !me.navigatorCollapse;
                        break;
                    case "search":
                        me.$Message.info(`Search event...${args.val}`);
                        break;
                    case "logout":
                        me.$Message.info(`Logout ...`);
                        window.location.hash = '#/login';
                        break;
                    case "modify":
                        me.$Message.info(`Revise the information of ${me.navigatorObj.userName}`);
                        break;
                    default:
                        break;
                }
            },
            menuCollapseFunc(args) {
                let me = this;
                let type = args.type;
                switch (type) {
                    case "toggle":
                        me.navigatorObj.menu = me.menuListData.collapse = me.menuCollapse = !me.menuCollapse;
                        break;
                    case "menu":
                        me.menuListData.menuList = me.assembleMenu(me.menuListData.menuList, "id", args.id);
                        break;
                    case "menuItem":
                        me.menuListData.menuList = me.assembleMenu(me.menuListData.menuList, "id", args.id);
                        break;
                    default:
                        break;
                }
            },
            assembleMenu(val, key, reg) {
                let temp = [];
                val.map(item => {
                    let flag = false;
                    let child = item.children;
                    if(item[key] === reg) {
                        flag = true;
                    }
                    child.map((obj, i) => {
                        if(flag && i === 0) {
                            obj.checked = true;
                        } else {
                            obj.checked = (obj[key] === reg);
                            if(obj.checked) {
                                flag = true;
                            }
                        }
                    });
                    item.checked = flag;
                    temp.push(item);
                });
                this.$store.dispatch('setMenuList', {menuData: temp});
                return temp;
            },
            getMenuList() {
                let me = this;
                me.$store.dispatch("getMenuList");
                me.navigatorObj.userName = me.menuListData.userName = sessionStorage.getItem("userName") ? sessionStorage.getItem("userName").split("&")[0] : "";
            }
        },
        created() {
            let path = this.$route.path.substr(1);
            this.isLogin = path !== 'login' && path !== "";
            if(this.isLogin) this.getMenuList();
        }
    }
</script>