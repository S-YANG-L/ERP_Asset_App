/*
* Created by chenzhuo on 2018-11-7.
* */
Asset.controller('publicAssetsCtrl', ['$scope', '$state', 'DataService', 'publicAssetsService','$ionicHistory', '$stateParams','$location', 'PopupService', '$rootScope', 'UserService', '$localstorage', '$ionicLoading',
  function ($scope, $state, DataService, publicAssetsService, $ionicHistory,$stateParams, $location, PopupService, $rootScope, UserService, $localstorage, $ionicLoading) {
    $scope.$on('$ionicView.loaded', function () {
      $scope.blank = true;
      //接受参数
      $scope.code=$stateParams.code;
      $scope.sortCode=$stateParams.sortCode;
      $scope.assetCodes=$stateParams.assetCodes;
      console.log("code",$scope.code);
      console.log("sortCode",$scope.sortCode);
      console.log("sortCode",$scope.assetCodes);
      $scope.getAssetList();
    });
    //返回
    $scope.goBack = function () {
      DataService.clearData("chose");
      $ionicHistory.goBack();
    };
    //返回
    $scope.goDetail = function (e) {
      console.log(2,e)
      DataService.clearData("chose");
      DataService.setData("chose", e);
      $ionicHistory.goBack();
    };
    //资产筛选
    $scope.getFilter =function(){
      $state.go("assetScreen")
    }
    //获取资产列表
    $scope.getAssetList = function () {
      var assetStatuss=[]
      if($scope.code==1){
        assetStatuss=["0"]
      }else{
        assetStatuss=["0","1"]
      }
      if (DataService.getData('allFilter') == undefined || DataService.getData('allFilter') == null) {
        var params = {
          __sid: $localstorage.getObject('sid'),
          assetStatuss:assetStatuss,
          sortCode:$scope.sortCode,
          assetCodes:$scope.assetCodes
        }
      } else {
        var params = {
          __sid: $localstorage.getObject('sid'),
          pageSize: 100,
          pageNo: 1,
          principalName: DataService.getData('allFilter').principalName,
          assetStd: DataService.getData('allFilter').assetStd,
          companyName: DataService.getData('allFilter').companyName,
          assetName: DataService.getData('allFilter').assetName,
        }
      }
      console.log("参数",params)
      publicAssetsService.getData(params)
        .success(function (response) {
          console.log(21,response)
          if (response.result == "login") {
            $state.go("app.home.home1");
          }
          if (response.list.length == 0) {
            $scope.blank = false;
          } else {
            $scope.blank = true;
          }
          $scope.assetCardList = response.list;
          console.log(22,$scope.assetCardList )

        }).error(function (response) {
        // 回调失败,隐藏进度条
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        PopupService.showToast("网络错误.");
      });
    }
  }])

Asset.service('publicAssetsService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('MESSAGE_LIST'), params);
  };
}]);
