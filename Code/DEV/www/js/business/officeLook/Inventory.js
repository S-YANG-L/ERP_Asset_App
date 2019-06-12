/*
* Created by chenzhuo on 2018-10-25.
* */
Asset.controller('InventoryCtrl', ['$scope', '$state', 'DataService', '$ionicHistory', 'InventoryService', '$location', 'PopupService', '$rootScope', 'UserService', '$localstorage', '$ionicLoading',
  function ($scope, $state, DataService, $ionicHistory, InventoryService, $location, PopupService, $rootScope, UserService, $localstorage, $ionicLoading) {
    $scope.$on('$ionicView.enter', function () {
      $scope.blank = true;
      $scope.getAssetList();
    });
    //跳转到盘点界面
    $scope.goDetail = function (item) {
      DataService.clearData("assetData");
      DataService.setData("assetData", item);
      $state.go("stockTaking");
    }
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.currentPageNo = 0;
      $scope.getAssetList();
    }
    //返回
    $scope.goBack = function () {
      $state.go('app.home.home1');
    };
    //获取盘点列表
    $scope.getAssetList = function () {
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;
      console.log(DataService.getData('allFilter'))
      if (DataService.getData('allFilter') == undefined || DataService.getData('allFilter') == null) {
        var params = {
          __sid: $localstorage.getObject('sid'),
          userCode: UserService.getUser().refObj.empCode,
        }
      } else {
        var params = {
          __sid: $localstorage.getObject('sid'),
          userCode: UserService.getUser().refObj.empCode,
          principalName: DataService.getData('allFilter').principalName,
          assetStd: DataService.getData('allFilter').assetStd,
          companyName: DataService.getData('allFilter').companyName,
          assetName: DataService.getData('allFilter').assetName,
        }
      }
      InventoryService.getData(params)
        .success(function (response) {
          if (response.result == "login") {
            $state.go("login");
          }
          $scope.assetCardList = response.data;
          console.log("response.data")
          if ($scope.assetCardList.length == 0) {
            $scope.blank = false;
            $scope.isLoading = false;
            $scope.hasMore = false;
            return;
          } else {
            $scope.blank = true;
          }
          $scope.isLoading = false;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (response) {
        // 回调失败,隐藏进度条1
        $scope.isLoading = false;
        $scope.hasMore = false;
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
  }])

Asset.service('InventoryService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_PROJECT_STAGE'), params);
  };
}]);
