/**
 * Created by zhaohongbin on 2018/11/2.
 */
Asset.controller('assetUsedListCtrl', ['$scope', '$state', 'assetUsedListService', 'PopupService', '$rootScope','UserService','$localstorage', '$ionicHistory', 'DataService', '$ionicLoading', '$ionicScrollDelegate',
  function ($scope, $state, assetUsedListService, PopupService, $rootScope,UserService, $localstorage, $ionicHistory, DataService, $ionicLoading, $ionicScrollDelegate) {
    $scope.blank = true;
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.getData(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = true
    });
    $scope.BoundApply = function () {
      $state.go("assetUsedApply");
    };
    //返回
    $scope.goBack = function () {
      DataService.clearData("CurrBillInfo");//清除缓存
      $state.go("app.home.home1");
    };
    //进入详情
    $scope.goDetail = function (item) {
      console.log('传值');
      console.log(item);
      DataService.clearData("CurrBillInfo");//清除缓存
      DataService.setData("CurrBillInfo", item);//将当前操作的单据存入数据缓存。
      $state.go('assetUsedform');
    }
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
    $scope.addassetUsed = function () {
      $state.go('assetUsedApply');
    }
    //数据请求
    $scope.getData = function (pageNo) {
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;
      var params = {
        __sid: $localstorage.getObject('sid'),
        receiverCode: UserService.getUser().refObj.empCode,
        pageSize: 10,
        pageNo: pageNo
      }
      console.log('----------参数-------------');
      console.log(params);
      assetUsedListService.getDateassetUsed(params)
        .success(function (response) {
          console.log('获取领用单据列表');
          console.log(response);
          if (pageNo == 1) {
            $scope.todoList = [];
          }
          $scope.todoList=$scope.todoList.concat(response.page.list);
          if ($scope.todoList.length == 0) {
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
        $scope.isLoading = false;
        $scope.hasMore = false;
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('assetUsedListService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getDateassetUsed = function (params) {
    return $http.post(UrlService.getUrlData_check('USEDINFO_LIST_APP'),params);
  }
}]);
