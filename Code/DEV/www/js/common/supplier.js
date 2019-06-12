/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('supplierCtrl', ['$scope', '$state', 'supplierService', '$ionicHistory', '$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, supplierService, $ionicHistory, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
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
    $scope.selectDepartment = function (supplier) {
      DataService.setData("supplierList", supplier);
      $ionicHistory.goBack();
    }
    //获取供应商
    $scope.getData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
      }
      supplierService.getDate(params)
        .success(function (response) {
          console.log(response.page.list)
          $scope.supplierList=response.page.list;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('supplierService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getDate = function (params) {//获取供应商列表
    return $http.post(UrlService.getUrlData_check('SUPPLIER'),params);
  }
}]);

