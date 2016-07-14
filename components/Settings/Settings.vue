<template>
    <!-- page start -->
    <div class="mod-page">
        <!-- section start -->
        <section class="mod-content option">
            <div class="holder-group bc-main com-border-bottom">
                <div class="holder-text">消息通知</div>
                <div class="holder-switch" v-on:click="clickSwitch">
                    <input type="checkbox" v-bind:checked="getSwitchState"/>
                    <span></span>
                </div>
            </div>
            <p class="text-group">关闭后将不能收到招聘消息通知</p>
            <ul class="menu mod-list bc-main com-border-bottom com-space">
                <li class="mod-list-item com-border-bottom">
                    <a href="javascript:;" v-on:click="clickResetPwd" class="mod-list-info com-arrow-right">修改密码</a>
                </li>
            </ul>
            <ul class="menu mod-list bc-main com-border-bottom com-space">
                <li class="mod-list-item com-border-bottom">
                    <a href="javascript:;" v-on:click="clickLogoutBtn" class="mod-list-info center">退出登录</a>
                </li>
            </ul>
        </section>
        <!-- section end -->
    </div>
</template>

<script>
    /**
     *  引入工具类库 或 模块API
     */

    /**
     *  引入Action
     */
    import { toggleSwitchData } from './SettingsAction'
    /**
     *  引入Getter
     */
    import { getSwitchState } from './SettingsGetters'

    export default {
        /**
         *  组件内部数据
         */
        data (){
            return {

            }
        },
        /**
         *  挂载 getters 和 actions
         */
        vuex: {
            getters: {
                getSwitchState
            },
            actions: {
                toggleSwitchData
            }
        },
        /**
         *  方法
         */
        methods: {
            clickSwitch (){
                this.toggleSwitchData();
            },
            clickResetPwd (){
                AlipayJSBridge.call('alert', {
                     title: '提示',
                     message: '点击了修改密码',
                     button: '确定'
                });
            },
            clickLogoutBtn (){
                AlipayJSBridge.call('alert', {
                     title: '提示',
                     message: '点击了退出登录',
                     button: '确定'
                });
            }
        },
        /**
         *  钩子
         */
        created (){
            
        }
        
    }

    
</script>


