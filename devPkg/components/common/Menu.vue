/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

<template>
    <div class="menu-container">
        <div class="menu-user">
            <div class="icon"></div>
            <span class="txt" :class="[{'active': nameCollapse}]" @click="nameClick">{{userName}}</span>
        </div>
        <div class="menu-body">
            <ul class="container" ref="containerNode">
                <li class="block" v-for="(item, i) in menuList" v-bind:key="'MENU'+i">
                    <router-link :to="item.link" class="txt" :class="[item.icon, {'expand': item.checked}]" :now-id="item.id" @click="collapseMenuFunc" now-type="menu">{{item.name}}</router-link>
                    <ul class="children" :class="[{'active': item.checked}]">
                        <li class="item" v-for="(child, k) in item.children" v-bind:key="'MENUChild'+k">
                            <router-link :to="child.link" class="txt" :class="[{'active': child.checked}]" :now-id="child.id" @click="collapseMenuFunc" now-type="menuItem">{{child.name}}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <span class="collapse-btn" @click="collapseMenuFunc" now-type="toggle"></span>
    </div>
</template>
<script>
    export default{
        props: [ "menuObj" ],
        data() {
            return {
                nameCollapse: false
            }
        },
        computed: {
            menuList() {
                return this.menuObj.menuList;
            },
            collapse() {
                return this.menuObj.collapse;
            },
            userName() {
                return this.menuObj.userName;
            }
        },
        watch: {
            "menuList": function() {
                let me = this;
                me.$nextTick(() => me.resetHeight());
            }
        },
        methods: {
            resetHeight() {
                let me = this;
                let nodes = me.$refs.containerNode.querySelectorAll("ul.children");

                for(let i = 0;i < nodes.length;i ++) {
                    let it = nodes[i];
                    let active = it.className.includes("active");
                    it.setAttribute('style', `height: ${active ? it.scrollHeight : 0}px;`);
                }
            },
            nameClick() {
                this.nameCollapse = !this.nameCollapse;
            },
            collapseMenuFunc(evt) {
                let type = evt.target.getAttribute("now-type");
                let id = evt.target.getAttribute("now-id");
                this.$emit("clickFunc", {type: type, id: id});
            }
        }
    }
</script>
