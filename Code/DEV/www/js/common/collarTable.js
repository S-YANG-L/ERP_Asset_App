/*
* Created by chenzhuo on 2018-11-14.
* */
Asset.controller('collarTableCtrl', ['$scope', '$state', 'DataService', 'collarTableService','$ionicHistory','$stateParams', '$location', 'PopupService', '$rootScope', 'UserService', '$localstorage', '$ionicLoading',
  function ($scope, $state, DataService, collarTableService, $ionicHistory,$stateParams, $location, PopupService, $rootScope, UserService, $localstorage, $ionicLoading) {
    $scope.$on('$ionicView.loaded', function () {
      $scope.blank = true;
      $scope.assetCodes=$stateParams.assetCodes;
      $scope.getAssetList();

    });
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    //返回
    $scope.goDetail = function (e) {
      DataService.clearData("chose");
      DataService.setData("chose", e);
      $ionicHistory.goBack();
    };
    //筛选
    $scope.getFilter =function(){
      $state.go("assetScreen")
    }
    //获取领用子表列表
    $scope.getAssetList = function () {
      if (DataService.getData('allFilter') == undefined || DataService.getData('allFilter') == null) {
        var params = {
          __sid: $localstorage.getObject('sid'),
          pageSize: 10000,
          user:UserService.getUser().refObj.empCode,
          pageNo: 1,
          assetCodes:$scope.assetCodes
        }
      } else {
        var params = {
          __sid: $localstorage.getObject('sid'),
          pageSize: 100,
          pageNo: 1,
          user:UserService.getUser().refObj.empCode,
          principalName: DataService.getData('allFilter').principalName,
          assetStd: DataService.getData('allFilter').assetStd,
          companyName: DataService.getData('allFilter').companyName,
          assetName: DataService.getData('allFilter').assetName,
        }
      }
      console.log("参数",params)
      collarTableService.getData(params)

        .success(function (response) {
          if (response.result == "login") {
            $state.go("login");
          }
          if (response.list.length == 0) {
            $scope.blank = false;
          } else {
            $scope.blank = true;
          }
          console.log(response)
          $scope.assetCardList = response.list;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        PopupService.showToast("网络错误.");
      });
    }
  }])

Asset.service('collarTableService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_RETURNINFODTL_LIST'), params);
  };
}]);
