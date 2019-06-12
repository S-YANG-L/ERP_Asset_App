/*
* Created by chenzhuo on 2018-10-11.
* */
Asset.controller('assetsCtrl', ['$scope', '$state', 'DataService', 'assetsService','$ionicHistory', '$location', 'PopupService', '$rootScope', 'UserService', '$localstorage','$ionicScrollDelegate', '$ionicLoading',
  function ($scope, $state, DataService, assetsService, $ionicHistory, $location, PopupService, $rootScope, UserService, $localstorage,$ionicScrollDelegate, $ionicLoading) {
    $scope.blank = true;
    $scope.$on('$ionicView.loaded', function () {
      $scope.getData(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = true
    });
    //返回
    $scope.goBack = function () {
      $state.go('app.home.home1');
    };
      //新增
    $scope.getAdd = function(){
      $state.go('addAssets')
    }
    //资产列表详情
    $scope.goDetail = function(item){
      console.log(item)
      DataService.clearData("assetData");
      DataService.setData("assetData", item);
      $state.go("assetDetails")
    }
    //资产筛选
    $scope.getFilter =function(){
      $state.go("assetScreen")
    }
    // 上拉加载
    $scope.doLoadMore = function () {
      if ($scope.currentPageNo == 0)
        return;
      else {
        $scope.getData($scope.currentPageNo+1);
      }
    };
    //查询
    $scope.goSearchContent = function () {
      $scope.currentPageNo = 0;
      $scope.getData(1);
    }
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.currentPageNo = 0;
      $scope.getData(1);
    }
    //获取资产列表
    $scope.getData = function (pageNo) {
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;
      if (DataService.getData('allFilter') == undefined || DataService.getData('allFilter') == null) {
        var params = {
          __sid: $localstorage.getObject('sid'),
          pageSize: 10,
          pageNo: pageNo
        }
      } else {
        var params = {
          __sid: $localstorage.getObject('sid'),
          pageSize: 10,
          pageNo: 1,
          pageNo: pageNo,
          principalName: DataService.getData('allFilter').principalName,
          assetStd: DataService.getData('allFilter').assetStd,
          companyName: DataService.getData('allFilter').companyName,
          assetName: DataService.getData('allFilter').assetName,
        }
      }
      assetsService.getData(params)
        .success(function (response) {
          if (response.result == "login") {
            $state.go("login");
          }
          if (pageNo == 1) {
            $scope.assetCardList = [];
          }
          $scope.assetCardList=$scope.assetCardList.concat(response.list);
          if ($scope.assetCardList.length == 0) {
            $scope.blank = false;
            $scope.isLoading = false;
            $scope.hasMore = false;
            return;
          } else {
            $scope.blank = true;
          }
          $ionicScrollDelegate.resize();
          //当分页数据小于等于Pagesize时
          if (response.totalPage == 1 && response.count <= response.pageSize) {
            $scope.hasMore = false;
          } else if ($scope.currentPageNo == response.totalPage-1) {
            $scope.hasMore = false;
          } else {
            // 设置当前页数
            $scope.currentPageNo = response.pageNo;
            $scope.hasMore = true;
          }
          $scope.isLoading = false;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (response) {
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

Asset.service('assetsService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('MESSAGE_LIST'), params);
  };
}]);
