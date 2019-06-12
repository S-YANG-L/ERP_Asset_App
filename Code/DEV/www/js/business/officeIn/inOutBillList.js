/**
 * Created by SuYangLong on 2018/10/31.
 */
Asset.controller('inOutBillListCtrl', ['$scope', '$state','UserService', '$localstorage', '$sce', 'PopupService', '$stateParams', 'inOutBillListService', '$ionicHistory', 'UrlService','$ionicScrollDelegate', 'DataService', '$filter',
  function ($scope, $state,UserService,$localstorage, $sce, PopupService, $stateParams, inOutBillListService, $ionicHistory, UrlService,$ionicScrollDelegate, DataService, $filter) {
    $scope.blank = true;
    $scope.$on('$ionicView.enter', function () {
      $scope.getData(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = true
    });
    //返回
    $scope.goBack = function () {
      DataService.clearData("assetData");
      DataService.clearData("allFilter");
      $state.go('app.home.home1');
    };
    //查看详情
    $scope.goDetail = function (item) {
      $state.go("inOutBillDetail");
      DataService.clearData("assetData");
      DataService.setData("assetData", item)
    }
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.currentPageNo = 0;
      $scope.getData(1);
    }
    $scope.modelData =
      {
        searchContent: ''
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
    //获取资产列表
    $scope.getData = function (pageNo) {
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;
      if (DataService.getData('allFilter') == undefined || DataService.getData('allFilter') == null) {
        var params = {
          __sid: $localstorage.getObject('sid'),
          memo: '标准入库',
          pageSize: 10,
          pageNo: pageNo
        }
      } else {
        var params = {
          __sid: $localstorage.getObject('sid'),
          memo: '标准入库',
          billCode: DataService.getData("allFilter").billCode,//单号
          psnName: DataService.getData("allFilter").billCode.psnName,//经办人
          orderDate: DataService.getData("allFilter").orderDate,//入库日期
        }
      }
      inOutBillListService.getData(params)
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
        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('inOutBillListService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('INOUTBILL_LIST'), params);
  }
}]);
