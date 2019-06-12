/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('wareHouseJumpCtrl', ['$scope', '$state', '$ionicHistory', '$ionicLoading', 'wareHouseJumpService', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, $ionicHistory, $ionicLoading, wareHouseJumpService, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.flCode=$stateParams.flCode;
      $scope.articlesCodes=$stateParams.articlesCodes;
      console.log("asdasd", $scope.flCode);
      $scope.getDate();
    });
    // 返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    //获取数据字典
    $scope.getDate = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        corpCode: UserService.getUser().corpCode_,
        sortCode:$scope.flCode,
        articlesCodes:$scope.articlesCodes
      };
      wareHouseJumpService.getData1(params)
        .success(function (response) {
          console.log(response.page.list);
          $scope.wareHouseList = response.page.list;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response.page);
        PopupService.showToast("网络错误.");
      });
    }
    $scope.wareHouse = function (wareHouseinfo) {
      DataService.clearData("wareHouseinfo");//清除缓存
      DataService.setData("wareHouseinfo", wareHouseinfo);
      $ionicHistory.goBack();
    }
  }
]);
Asset.service('wareHouseJumpService', ['$http', 'UrlService', function ($http, UrlService) {
  //获取办公用品列表
  this.getData1 = function (params) {
    return $http.post(UrlService.getUrlData_check('WAREITEMS_INFO'), params);
  }
}]);
