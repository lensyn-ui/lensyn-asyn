/*********************************************************************
 * Created by deming-su on 2017/12/30
 *********************************************************************/

<template>
    <div>
        <h2>This is market dynamics page.</h2>
    </div>
</template>
<style>

</style>
<script>
    import {mapGetters} from 'vuex';
    export default{
        computed: {
            ...mapGetters({ "marketData": "marketData" }),
            biddingData() {
                return this.marketData.bidding;
            }
        },
        data() {
            return {

            }
        },
        watch: {
            biddingData(val) {
                let me = this;
                me.$nextTick(() => {
                    console.log(val);
                });
            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>
