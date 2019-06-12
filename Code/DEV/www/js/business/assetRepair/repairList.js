Asset.controller('repairListController', ['$filter','$scope', '$state',  'PopupService', '$rootScope', '$localstorage', '$ionicHistory', '$ionicLoading', 'DataService', '$ionicScrollDelegate','UserService',
  function ($filter,$scope, $state,  PopupService, $rootScope, $localstorage, $ionicHistory, $ionicLoading, DataService, $ionicScrollDelegate,UserService) {
    $scope.modelData = {
      searchContent:''
    }
    //页面加载
    $scope.$on('$ionicView.enter', function () {
      DataService.clearData("custom");
      DataService.clearData("addCustomerContact");
      DataService.clearData("contact");
      // $scope.getData();
      // $scope.getData(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = true;
    });
    //下拉刷新
    $scope.doRefresh = function () {  b
      $scope.currentPageNo = 0;
      // $scope.getData(1);
    }

    // 上拉加载
    $scope.doLoadMore = function () {
      console.log($scope.currentPageNo)
      if ($scope.currentPageNo == 0)
        return;
      else {
        // $scope.getData($scope.currentPageNo + 1);
      }
    };
    //返回
    $scope.goBack = function () {
     $ionicHistory.goBack();
      // $state.go('repairList');
     };
    //新增
    $scope.goAdd = function () {
      $state.go("repair");
    };
    //前往筛选页面
    $scope.goScreen=function(){
      DataService.clearData('billScree');
      $state.go('billScreen');
    }
    //搜索
    $scope.search = function () {
      $scope.currentPageNo = 0;
      // $scope.getData(1);
    }
    //进入详情
    $scope.goDetails = function (item) {
     DataService.setData("custom",item);
     $state.go("customerView");
     };

    //数据库请求
    var getData = function (pageNo) {
      if ($scope.isLoading) {
        return;
      }
      // $scope.isLoading = true;
      // 设置参数
      var param = {
        btypeName: $scope.modelData.searchContent,
        loginCode:UserService.getUser().userCode,
        pageSize: 10,
        pageNo: pageNo,
        __sid: $localstorage.getObject('sid')
      };
      // 调用接口
      repairListController.getDataList(param)
        .success(function (response) {
          console.log('客户列表');
          console.log(response);
          if (response.code == 200) {
            if (pageNo == 1) {
              $scope.taskList = [];
            }
            var toggle=response.data.list;
            for(var i=0;i<toggle.length;i++){
              toggle[i].createDate=new Date(response.data.list[i].createDate);
            }
            $scope.taskList = $scope.taskList.concat(toggle);

            $scope.num = response.count;
            $ionicScrollDelegate.resize();
            //当分页数据小于等于Pagesize时
            if (response.data.totalPage == 1 && response.data.count <= response.data.pageSize) {
              $scope.hasMore = false;
            }
            else
            if ($scope.currentPageNo == response.data.totalPage - 1) {

              $scope.hasMore = false;
              console.log($scope.hasMore)
            } else {
              console.log($scope.currentPageNo)
              console.log(response.data.pageNo)
              // 设置当前页数
              $scope.currentPageNo = response.data.pageNo;
              $scope.hasMore = true;
            }
            $scope.isLoading = false;

            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else if (response.code == 201) {
            // 回调失败,隐藏进度条
            $scope.isLoading = false;
            $scope.hasMore = false;
            $ionicScrollDelegate.resize();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            PopupService.showToast(response.message);
          }
        }).error(function (response) {
          // 回调失败,隐藏进度条
          console.log(response);
          // 回调失败,隐藏进度条
          $scope.isLoading = false;
          $scope.hasMore = false;
          $ionicScrollDelegate.resize();
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          PopupService.showToast("网络错误.");
        });
    };
  }]);


Asset.service('repairListController', ['$http', 'UrlService', function ($http, UrlService) {
  this.getDataList = function (params) {
    return $http.post(UrlService.getUrlData('CRM_CUSTOMERS'), params,{noLoading: true});
  };


}]);
