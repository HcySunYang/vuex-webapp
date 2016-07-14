/**
 *  引入框架
 */
import Vue from 'vue'
import Vuex from 'vuex'

/**
 *  引入工具类库 或 模块API
 */
import Util from 'tool/widget/Util'
/**
 *  引入组件的接口文件(Interface)
 */
import SettingsInterface from 'components/Settings/SettingsInterface'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug
var target = {
    state: {},
    mutations: {}
}

/**
 *  组合各组件接口
 */
const finalOption = Util.assignVueObj(
	target,
	SettingsInterface
);

export default new Vuex.Store(finalOption)
