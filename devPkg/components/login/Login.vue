/*********************************************************************
 * Created by deming-su on 2017/10/24                                *
 *********************************************************************/

<template>
    <div class="page-container">
        <div class="login-component">
            <span class="title">User Login</span>
            <!--用户名输入框-->
            <div class="item">
                <span class="txt">UM</span>
                <input placeholder="user name" v-model="loginName"/>
            </div>
            <!--密码输入框-->
            <div class="item">
                <span class="txt">UM</span>
                <input placeholder="user name" v-model="loginPassword" type="password"/>
            </div>
            <span class="button" @click="loginEvt">Login</span>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data() {
            return {
                loginName: "admin",
                loginPassword: "admin"
            }
        },
        methods: {
            loginEvt() {
                /* 登录信息保存 */
                if(this.loginName === 'admin' && this.loginPassword === 'admin') {
                    sessionStorage.setItem("userName", this.loginName + "&" + this.loginPassword);
                    window.location.href = window.location.origin + window.location.pathname + '?_' + Date.now() + "#/overview";
                }
            }
        },
        created() {
            let me = this;
        }
    }
</script>
