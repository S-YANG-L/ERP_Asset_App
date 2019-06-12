/**
 * Created by chenzhuo on 2018/11/6.
 */
Asset.controller('addressCtrl', ['$scope', '$state', 'addressService', '$ionicHistory', '$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, addressService, $ionicHistory, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
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
    $scope.address = function (e) {
      DataService.setData("address", e);
      $ionicHistory.goBack();
    }
    //获取数据字典
    $scope.getData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
      }
      addressService.getDate(params)
        .success(function (response) {
          $scope.btypeInfoList=response.page.list;//地点
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(222,response);
        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('addressService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getDate = function (params) {//获取存放地点
    return $http.post(UrlService.getUrlData_check('ASSET_ADDRESS'),params);
  }
}]);

