const Util = {
	

	//判断当前系统是ios或andorid
    OS (){
        var os = navigator.userAgent.match(/iphone|ipad|ipod/i) ? "ios" : "android";
        return os;
    },

    // 合并 vue 对象，对象结构为 {state, mutations}
    assignVueObj (target, ...source){
    	source.forEach(function(obj, index, Array){
    		Object.assign(target.state, obj.state);
    		Object.assign(target.mutations, obj.mutations);
    	});

    	return target;
    },

    getApiPath (){
        return '/api/v2/client'
    },

    /**
     * 接口请求
     * @method ajax
     * @public
     * @param {JSON} ajaxParam 参数
     * @example
     *      Util.ajax({
     *          url: 'path',
     *          data: {},
     *          timeout: 0,
     *          success: function(data){},
     *          error: function(){},
     *          noNetwork: function(){}
     *      })
     * @since 3.0.0
     */
    ajax (ajaxParam){
        $.ajax({
            url : host + Util.getApiPath() + ajaxParam.url,
            timeout : ajaxParam.timeout || 0,
            data: ajaxParam.data,
            success: function(data){
                ajaxParam.success(data)
            },
            error : function(xhr, status){
                ajaxParam.error(xhr, status);
            } 
        });
    },

    //把json转化成a=1&b=2格式
    /**
     * 把json转化成a=1&b=2格式
     * @param {JSON} json对象
     * @return {String} 
     */
    json2url:function (json) {
        var arr=[];
        for(var name in json){
            arr.push(name+'='+json[name]);
        }
        return arr.join('&');
    },

    /**
     * 判断是否为一个空对象{}
     * @param {Object} js对象
     * @return {Boolean} true | false
     */
    isEmptyObject ( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    }
}

export default Util