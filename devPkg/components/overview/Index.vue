/*********************************************************************
 * Created by deming-su on 2018/1/2
 *********************************************************************/

<template>
    <div class="page-container">
        <div>
            <div>
                <span v-for="(item, i) in breadList" v-bind:key="'ID'+i">{{item.name}}</span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<style>

</style>
<script>
    import {mapGetters} from 'vuex'
    export default{
        computed: {
            ...mapGetters({
                           "menuList": "menuListShow"
                       }),
            breadList() {
                let me = this;
                let temp = [];
                me.menuList.map(it => {
                    if(it.checked) {
                        temp.push({name: it.name});
                        it.children.map(obj => {
                            if(obj.checked) temp.push({name: obj.name});
                        });
                    }
                });
                return temp;
            }
        },
        data() {
            return {

            }
        },
        methods: {},
        created() {
            let me = this;
        }
    }
</script>
