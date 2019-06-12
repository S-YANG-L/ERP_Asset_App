Asset.controller('allocatInCtrl', ['$scope', 'allocatInService', '$ionicScrollDelegate', '$state', 'homeService', '$location', 'PopupService', '$rootScope', 'UserService', 'DataService', '$localstorage', '$ionicLoading',
  function ($scope, allocatInService, $ionicScrollDelegate, $state, homeService, $location, PopupService, $rootScope, UserService, DataService, $localstorage, $ionicLoading) {//页面加载
    $scope.blank = true;
    $scope.$on('$ionicView.enter', function () {
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
    $scope.getData = function (pageNo) {
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;
      var params = {
        __sid: $localstorage.getObject('sid'),
        pageSize: 10,
        pageNo: pageNo
      }
      allocatInService.getData(params)
        .success(function (response) {
          if (response.result == "login") {
            $state.go("login");
          }
          if (pageNo == 1) {
            $scope.item1 = [];
          }
          $scope.item1 = $scope.item1.concat(response.page.list);
          if ($scope.item1.length == 0) {
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
          } else if ($scope.currentPageNo == response.page.totalPage - 1) {
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
        $scope.isLoading = false;
        $scope.hasMore = false;
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    }
    //返回
    $scope.goBack = function () {
      //清除缓存
      DataService.clearData("CurrBillInfo");//清除缓存
      $state.go('app.home.home1');
    };

    $scope.districts = [
      {code: '01', name: '调出日期正序'},
      {code: '02', name: '调出日期倒序'},
      {code: '03', name: '调入确认日期正序'},
      {code: '04', name: '调入确认日期倒序'},
    ]
    // 上拉加载
    $scope.doLoadMore = function () {
      if ($scope.currentPageNo == 0)
        return;
      else {
        $scope.getData($scope.currentPageNo+1);
      }
    };
    //进入详情
    $scope.goDetail = function (item) {
      DataService.clearData("CurrBillInfo");//清除缓存
      DataService.setData("CurrBillInfo", item);//将当前操作的单据存入数据缓存。
      $state.go('allocatForm');
    }
    //新增
    $scope.goAdd = function () {
      $state.go("addAllocat");
    };
    //筛选
    $scope.goScreen = function () {
      $state.go("allocatScreen")

    }
  }]);
Asset.service('allocatInService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_ALLOCAT'), params);
  };

}]);
