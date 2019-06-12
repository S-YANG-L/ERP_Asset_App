/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('classifyCtrl', ['$scope', '$state', 'classifyService', '$ionicHistory', '$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, classifyService, $ionicHistory, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      // 定义查询内容
      $scope.searchContent = '';
      $scope.getData();

    });
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.selectclassify = function (e) {
      DataService.setData("classifyCode", e.dictCode);
      DataService.setData("classifyName", e.name);
      $ionicHistory.goBack();
    }
    console.log()
    //获取数据字典
    $scope.getData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
      }
      classifyService.getDate(params)
        .success(function (response) {
          console.log("asd", response.data)
          $scope.classifyList=response.data;//分类
        }).error(function (response) {
        // 回调失败,隐藏进度条
        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('classifyService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getDate = function (params) {//获取部门列表
    return $http.post(UrlService.getUrlData_check('ARTICLES_OUTBOUND'),params);
  }
}]);

