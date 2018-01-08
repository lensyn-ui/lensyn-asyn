/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

<template>
    <div class="navigator-container">
        <div class="brand" :class="[{'collapse': btnShow}]">
            <span class="txt">{{brandName}}</span>
        </div>
        <div class="collapse-btn" :class="[{'collapse': collapse}]" v-show="!btnShow" @click="collapseEvt" now-type="collapse"></div>
        <div class="bar">

        </div>
    </div>
</template>
<script>
    export default{
        props: [ "navigatorObj" ],
        data() {
            return {
                searchVal: "",
                name: "张三"
            }
        },
        computed: {
            brandName() {
                return this.navigatorObj.brandName;
            },
            collapse() {
                return this.navigatorObj.collapse;
            },
            menu() {
                return this.navigatorObj.menu;
            },
            btnShow() {
                return this.navigatorObj.collapse && this.navigatorObj.menu;
            },
            userName() {
                return this.navigatorObj.userName;
            }
        },
        methods: {
            collapseEvt(evt) {
                let me = this;
                let type = evt.target.getAttribute("now-type");
                if(!type) type = evt.target.parentNode.getAttribute("now-type");
                me.$emit("clickFunc", {type: type, val: type === "search" ? me.searchVal : ""});
            }
        }
    }
</script>
