/**
 * creater:xulan
 * create time:2018-7-20
 * describe：用户操作服务。用于用户信息的存储。调用等。
 **/

Asset.factory('DataService', [function () {
    var data = {};

    return {
        /**
         * 获取数据
         */
        getData: function (key) {
            // 如果没有初始化，则尝试从本地缓存中读取
            return data[key];
        },
        /**
         * 更新数据
         */
        setData: function (key,obj) {
            data[key] = obj;
        },
        /**s
         * 用户退出清理存储
         */
        clearData: function (key) {
           data[key]=null;
        }
    }
}
])
;
