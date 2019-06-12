/*
* Created by chenzhuo on 2018-11-2.
* */
Asset.controller('assetDetailsCtrl', ['$scope', '$state', 'DataService', 'assetDetailsService', '$ionicHistory', '$location', 'PopupService', '$rootScope', 'UserService', '$localstorage', '$ionicLoading',
  function ($scope, $state, DataService, assetDetailsService, $ionicHistory, $location, PopupService, $rootScope, UserService, $localstorage, $ionicLoading) {
    $scope.$on('$ionicView.enter', function () {
      $scope.assetDataList = DataService.getData("assetData");
      // $scope.blank = true;
      $scope.getAssetList();
    });
    //返回
    $scope.goBack = function () {
      $state.go("assets")
    };
    //获取资产详情
    $scope.getAssetList = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        assetCode: DataService.getData("assetData").assetCode,
      }
      assetDetailsService.getData(params)
        .success(function (response) {
          console.log(response)
          if (response.result == "login") {
            $state.go("login");
          }
          if (response.list.length == 0) {
            $scope.blank = false;
          } else {
            $scope.blank = true;
          }
          console.log('资产详情');
          $scope.item = response.list[0];
          console.log($scope.item)
        }).error(function (response) {
        // 回调失败,隐藏进度条
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
  }])

Asset.service('assetDetailsService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('MESSAGE_LIST'), params);
  };
}]);
