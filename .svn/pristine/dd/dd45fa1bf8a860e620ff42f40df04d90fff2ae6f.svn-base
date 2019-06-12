/********************************
 creater:xulan
 create time:2018-7-20
 describe：工具
 ********************************/
/*校验*/
Asset.factory('CheckUtil', ['$ionicPopup', function ($ionicPopup) {
  return {
    //弹出警告对话框（进行提示）
    f_alert_test: function (alertInfo) {
      var alertPopup = $ionicPopup.alert({
        title: '提示',
        template: alertInfo
      });
    },
    //弹出警告对话框（根据对象来进行提示）
    f_alert: function (obj, alertInfo) {
      var alertPopup = $ionicPopup.alert({
        title: '提示',
        template: obj + alertInfo
      });
    },
    //判断是否为 汉字
    f_check_chinese: function (obj) {
      return /^[\u4e00-\u9fa5]+$/.test(obj);
    },
    //判断是否为数字、字母或者是其组合（字母大小写均可）
    f_check_numberletter: function (obj) {
      return /^[A-Za-z0-9]+$/.test(obj);
    },
    //判断包含字母和数字的组合（字母大小写均可）
    f_check_numberWidthLetter: function (obj) {
      return /^(?![0-9]+$)(?![a-zA-Z]+$)/.test(obj);
    },
    //判断是否为 实数
    f_check_float: function (obj) {
      return /^(\+|-)?\d+($|\.\d+$)/.test(obj);
    },
    //判断是否为 空
    f_check_empty: function (obj) {
      return obj == null || obj == "";
    },
    //判断是否为 1-10之间  的数字
    f_check_numberlimit: function (obj) {
      return /^(\d(\.\d{1,2})?|10)$/.test(obj);
    },
    //检查 手机号码 是否正确
    f_check_mobile: function (obj) {
      return /^1[3|4|5|7|8][0-9]\d{8}$/.test(obj);
    },
    //判断是否为 0-9之间 的数字
    f_check_number: function (obj) {
      return /^[0-9]+$/.test(obj);
    },
    //检查输入的 身份证号 是否正确
    f_check_idno: function (obj) {
      return /^[0-9]{17}[0-9A-Za-z]{1}$|^[0-9]{14}[0-9A-Za-z]{1}$/.test(obj);
    },
    //检查输入的 电子邮箱 是否正确
    f_check_email: function (obj) {
      return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(obj);
    },
    //检测输入的 正整数 是否正确
    f_check_integer: function (obj) {
      return /^[0-9]*[1-9][0-9]*$/.test(obj);
    },
    //检测输入的 正整数及零 是否正确
    f_check_integer_0: function (obj) {
      return /^([1-9]\d*|[0]{1,1})$/.test(obj);
    },

    //检测输入的 非负数 是否正确
    f_check_Noninteger_0: function (obj) {
      return /^\d+(\.{0,1}\d+){0,1}$/ .test(obj);
    },

}
}]);
/*搜索历史记录
 *
 * */
Asset.factory('HistoryUtil', ['$rootScope', '$localstorage', function ($rootScope, $localstorage) {
  var JSH_HISTORY_MAX_LENGTH = 10;

  //历史缓存
  var historyCache = {};
  var checkExist = function (key) {
    //首先在内存缓存中查找
    if (!historyCache[key]) {
      //内存缓存中没有结果，在存储中查找
      var temp = $localstorage.getArray(key);
      if (temp) {
        //如果找到了，就存入缓存
        historyCache[key] = temp;
      }
    }
  };
  //删除重复数组
  var deleteValue = function (key, value) {
    console.log(historyCache[key].length);
    for (var i = 0; i < historyCache[key].length; i++) {
      if (angular.equals(value, historyCache[key][i])) {
        historyCache[key].splice(i, 1);
      }
    }
  };

  $rootScope.$on('CLEAR_CACHE', function () {
    // 清除缓存
    historyCache = {};
  });

  return {
    appendHistory: function (key, value) {
      checkExist(key);
      deleteValue(key, value);
      historyCache[key].unshift(value);
      while (angular.isArray(historyCache[key]) && historyCache[key].length > JSH_HISTORY_MAX_LENGTH) {
        historyCache[key].pop();
      }
      $localstorage.setArray(key, historyCache[key])
    },
    getHistory: function (key) {
      checkExist(key);
      return historyCache[key];
    },
    clearHistory: function (key) {
      historyCache = {};
      $localstorage.setArray(key, []);
    }
  }
}]);

//http请求工具
Asset.factory('httpUtil',["$http","$q",function($http, $q){
  var createEncodedUrl = function(data,url){
    if (data ==null) return url;
    var _paraStr="";
    if (typeof(data) == "string"){
      _paraStr=data;
    }
    else{
      for(var _key in data){
        if (_paraStr.length > 0) _paraStr += "&";
        _paraStr= _paraStr + encodeURI(_key)+"=" + encodeURI(data[_key]);
      }
    }
    return (url+"?"+_paraStr);
  }
  var http_jsonp = function(url,param){
    var encoded_url = createEncodedUrl(param, url) ;

    var deferred=$q.defer(); //定义deferred
    var promise=deferred.promise;//定义promise

    $http.jsonp(encoded_url)
      .success(function(data, stateCode){
        deferred.resolve({
          status : true,
          data : data,
          stateCode : stateCode
        });
      })
      .error(function(err,stateCode){
        deferred.resolve({
          status : false,
          data : err,
          stateCode : stateCode
        });
      })
    return promise;
  }

  var http_post = function(url, param){
    var deferred=$q.defer();
    var promise=deferred.promise;

    $http.post(url, param)
      .success(function(data, stateCode){
        deferred.resolve({
          status : true,
          data : data,
          stateCode : stateCode
        });
      })
      .error(function(err,stateCode){
        deferred.resolve({
          status : false,
          data : err,
          stateCode : stateCode
        });
      })
    return promise;
  }

  return {
    createEncodedUrl: createEncodedUrl,
    http_jsonp : http_jsonp,
    http_post : http_post
  };
}]);
