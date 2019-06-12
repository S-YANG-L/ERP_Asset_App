/**
 * creater:xulan
 * create time:2018-7-20
 * describe：用户操作服务。用于用户信息的存储。调用等。
 **/

Asset.factory('UserService', ['$rootScope', '$localstorage',
  function ($rootScope, $localstorage) {
  var user;
  var USER_CACHE_KEY = 'USER_CACHE_KEY';
  return {
    /**
     * 获取用户对象
     */
    getUser: function () {
      // 如果没有初始化，则尝试从本地缓存中读取
      user = {};
      var temp = $localstorage.getObject(USER_CACHE_KEY);
      if (temp) {
        return temp;
      } else {
        return user;
      }
    },
    /**
     * 更新用户
     */
    setUser: function (userObj) {
      $localstorage.setObject(USER_CACHE_KEY, userObj);
    },
    /**
     * 用户退出清理存储
     */
    clearUser: function () {
      $localstorage.setObject(USER_CACHE_KEY, null);
    },
    /**
     * 判断用户是否登录
     */
    isUserLogin: function () {
      return (!!this.getUser().token);

    }
  }
}
])
;
