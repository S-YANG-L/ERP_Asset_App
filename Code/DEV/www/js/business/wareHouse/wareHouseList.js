/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('wareHouseListCtrl', ['$scope', '$state', '$ionicHistory', '$ionicLoading','$ionicScrollDelegate', 'wareHouseListService', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, $ionicHistory, $ionicLoading,$ionicScrollDelegate, wareHouseListService, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.blank = true;
    $scope.$on('$ionicView.enter', function () {
      // 定义查询内容
      $scope.getData(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = true
    });
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.currentPageNo = 0;
      $scope.getData(1);
    }

    $scope.getFilter = function () {
      $state.go("app.inOutBill");//过滤
    };
    // 上拉加载
    $scope.doLoadMore = function () {
      if ($scope.currentPageNo == 0)
        return;
      else {
        $scope.getData($scope.currentPageNo+1);
      }
    };
    //返回
    $scope.goBack = function () {
      DataService.clearData("wareHouseinfo");//清除缓存
      $state.go('app.home.home1');
    };
    //获取数据字典
    $scope.getData = function (pageNo) {
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;
      var params = {
        __sid: $localstorage.getObject('sid'),
        corpCode: UserService.getUser().corpCode_,
        pageSize: 10,
        pageNo: pageNo
      };

      wareHouseListService.getData1(params)
        .success(function (response) {
          if (response.result == "login") {
            $state.go("login");
          }
          if (pageNo == 1) {
            $scope.wareHouseList = [];
          }
          $scope.wareHouseList=$scope.wareHouseList.concat(response.page.list);
          if ($scope.wareHouseList.length == 0) {
            $scope.blank = false;
            $scope.isLoading = false;
            $scope.hasMore = false;
            return;
          } else {
            $scope.blank = true;
          }
          $ionicScrollDelegate.resize();
          //当分页数据小于等于Pagesize时
          if (response.page.totalPage == 1 && response.page.count <= response.page.pageSize) {
            $scope.hasMore = false;
          } else if ($scope.currentPageNo == response.page.totalPage-1) {
            $scope.hasMore = false;
          } else {
            // 设置当前页数
            $scope.currentPageNo = response.page.pageNo;
            $scope.hasMore = true;
          }
          $scope.isLoading = false;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (response) {
        PopupService.showToast("网络错误.");
      });
    }
  }
]);
Asset.service('wareHouseListService', ['$http', 'UrlService', function ($http, UrlService) {
  //获取办公用品列表
  this.getData1 = function (params) {
    return $http.post(UrlService.getUrlData_check('WAREITEMS_INFO'), params);
  }
}]);
