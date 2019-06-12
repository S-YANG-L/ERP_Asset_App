/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('warehouseCtrl', ['$scope', '$state', 'warehouseService', '$ionicHistory', '$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, warehouseService, $ionicHistory, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
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
    $scope.selectwarehouse = function (selectwarehouse1) {
      DataService.setData("selectwarehouse", selectwarehouse1);
      $ionicHistory.goBack();
    }
    //获取仓库列表
    $scope.getData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        corpCode: UserService.getUser().corpCode_
      }
      warehouseService.getDate(params)
        .success(function (response) {
          $scope.wareHouse=response.page;//部门

        }).error(function (response) {
        // 回调失败,隐藏进度条

        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('warehouseService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getDate = function (params) {//获取部门列表
    return $http.post(UrlService.getUrlData_check('WAREHOUSE'),params);
  }
}]);

