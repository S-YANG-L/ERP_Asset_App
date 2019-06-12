/**
 * Created by chenzhuo on 2018/11/9.
 */
Asset.controller('refundController', ['$scope', '$state', '$sce', '$stateParams', 'refundService', '$ionicHistory', 'UrlService', 'UserService', 'DataService', '$filter', '$localstorage','$ionicScrollDelegate', 'PopupService',
  function ($scope, $state, $sce, $stateParams, refundService, $ionicHistory, UrlService, UserService, DataService, $filter, $localstorage,$ionicScrollDelegate, PopupService) {
    $scope.blank = true;
    $scope.$on('$ionicView.loaded', function () {
      $scope.getData(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = true
    });
    $scope.goBack = function () {
      DataService.clearData("assetData");
      $state.go("app.home.home1");

    }
    //查看详情
    $scope.goDetail = function (item) {
      DataService.clearData("assetData");
      DataService.setData("assetData", item);
      $state.go("refundDetail");
    }
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.currentPageNo = 0;
      $scope.getData(1);
    }
    // 上拉加载
    $scope.doLoadMore = function () {
      if ($scope.currentPageNo != undefined || $scope.currentPageNo != null) {
        if ($scope.currentPageNo == 0)
          return;
        else {
          $scope.getData($scope.currentPageNo + 1);
        }
      }
    };
//跳转退库
    $scope.goRefund = function () {
      $state.go('app.assetRefund');
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
          retireCode: UserService.getUser().refObj.empCode,
          pageNo: pageNo
        }
      } else {
        var params = {
          __sid: $localstorage.getObject('sid'),
          retireCode: UserService.getUser().refObj.empCode,
          pageSize: 10,
          pageNo: 1,
        }
      }
      refundService.getData(params)
        .success(function (response) {
          if (response.result == "login") {
            $state.go("login");
          }
          if (pageNo == 1) {
            $scope.assetCardList = [];
          }
          $scope.assetCardList=$scope.assetCardList.concat(response.page.list);
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
        // 回调失败,隐藏进度条
        $scope.isLoading = false;
        $scope.hasMore = false;
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
//排序
    $scope.districts = [
      {code: '01', name: '退库日期正序'},
      {code: '02', name: '退库日期倒序'},
    ]

//筛选
    $scope.getFilter = function () {
      $state.go("receiveFilter");//过滤
    };
  }]);


Asset.service('refundService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('RECEIVE_LIST_RETIRING'), params);
  }
}]);
