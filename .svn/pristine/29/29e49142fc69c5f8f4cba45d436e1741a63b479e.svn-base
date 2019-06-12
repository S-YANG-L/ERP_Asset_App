/**
 * Created by ZM on 2016/5/10.
 */
Asset.controller('TodoListController', ['$scope', '$state','UserService', 'TodoListService', 'PopupService', '$rootScope', '$localstorage', '$ionicHistory','DataService','$ionicLoading','$ionicScrollDelegate',
  function ($scope, $state,UserService, TodoListService, PopupService, $rootScope, $localstorage, $ionicHistory,DataService,$ionicLoading,$ionicScrollDelegate) {
    //页面加载
    $scope.$on('$ionicView.enter', function () {
      // 定义查询内容
      $scope.searchContent = '';
      $scope.getTodoList(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = false;
    });

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.currentPageNo = 0;
      $scope.getTodoList(1);
    }
    // 上拉加载
    $scope.doLoadMore = function () {
      if ($scope.currentPageNo == 0)
        return;
      else {
        $scope.getTodoList($scope.currentPageNo + 1);
      }
    };

    //查询
    $scope.goSearchContent = function () {
      $scope.currentPageNo = 0;
      $scope.getTodoList(1);
    }
    //设置badge
    function SetBadge(badgecount) {
      window.plugins.jPushPlugin.setBadge(badgecount);//设置Badge
      window.plugins.jPushPlugin.setApplicationIconBadgeNumber(badgecount);
    }

    //获取待我审批列表
    $scope.getTodoList = function (pageNo) {
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;

      var params = {
        sid: $localstorage.getObject('sid'),
        pageSize:10,
        pageNo:pageNo,
        pageFlag:1,
       // billtypeCode:$scope.modelData.billtypeCode,//单据类型
        //applicantName: $scope.modelData.searchContent,
      }
      TodoListService.getTodoList(params)
        .success(function (response) {
          // 回调成功,处理返回值
          if (pageNo == 1) {
            $scope.todoList = [];
          }
          $scope.todoList=$scope.todoList.concat(response.list);

          //$scope.todoList=response.list;
          //当分页数据小于等于Pagesize时
          if (response.totalPage == 1 && response.count <= response.pageSize) {
            $scope.hasMore = false;
          } else
          if ($scope.currentPageNo == response.totalPage-1) {
            $scope.hasMore = false;
          } else {
            // 设置当前页数
            $scope.currentPageNo = response.pageNo;
            $scope.hasMore = true;
          }
          $rootScope.todoCount = response.count;//设置代办数量
          $ionicScrollDelegate.resize();
          if (window.cordova) {
            //APP气泡
            SetBadge(response.count);
          }
          if($scope.todoList.length==0  ){
            $scope.isCheck=true;
          }else{
            $scope.isCheck = false ;
          }
          $scope.isLoading = false;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          DataService.clearData('billScree');
        }).error(function (response) {
          // 回调失败,隐藏进度条
          $scope.isLoading = false;
          $scope.hasMore = false;
          $ionicScrollDelegate.resize();
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          // 回调失败,隐藏进度条
          PopupService.showToast("网络错误.");
        });
    }

    //goApprovalDetail 待办列表点击处理,通过传参跳转到不同的审批界面(syscode 单据单号,billtypeCode 单据类型,)
    $scope.goApprovalDetail = function (syscode, billtypeCode,item) {
      DataService.clearData("CurrBillInfo");//清除缓存
      DataService.setData("CurrBillInfo",item);//将当前操作的单据存入数据缓存。
      console.log("billtypeCode",billtypeCode,item)
      switch (billtypeCode) {
        case 'ZCLY'://资产领用
          $state.go("assetUsed");
          break;
        case 'WZCK'://办公用品领用
          $state.go("outBound");
          break;
        case 'ZCDB'://资产调拨
          $state.go("allocat");
          break;
        case 'ZCTK'://资产退库
          $state.go("useBound");
          break;
        default:
          PopupService.showToast("敬请期待");
          break;
      }
    }
  }]);


Asset.service('TodoListService', ['$http', 'UrlService', function ($http, UrlService) {
  //获取待我审批列表
  this.getTodoList = function (params) {//+"&pageNo=1&pageSize=10"
      return $http.post(UrlService.getUrlData_check('TODO_LIST') + "?__sid=" + params["sid"],params , {noLoading: true});
  }
}]);

