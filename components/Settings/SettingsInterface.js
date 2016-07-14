import Vue from 'vue'

/**
 *  数据(状态)
 */
const state = {
    switchData : true
}

/**
 *  接口(mutations)
 */
const mutations = {
    TOGGLE_SWITCH_DATA (state) {
        state.switchData = !state.switchData;
        var toastStr = state.switchData ? '消息通知已开启' : '消息通知已关闭';
        AlipayJSBridge.call('toast', {
		     content: toastStr,
		     type: 'success',
		     duration: 2000
		});
    }
}

/**
 *  导出
 */
export default {
    state,
    mutations
}