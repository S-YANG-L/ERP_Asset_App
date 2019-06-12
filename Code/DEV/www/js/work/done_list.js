/**
 * Created by ZM on 2016/5/10.
 */
Asset.controller('DoneListController', ['$scope', '$rootScope', '$state', 'DoneListService', 'PopupService', '$localstorage', '$ionicHistory', '$ionicLoading', 'DataService','$ionicScrollDelegate',
  function ($scope, $rootScope, $state, DoneListService, PopupService, $localstorage, $ionicHistory, $ionicLoading, DataService,$ionicScrollDelegate) {
    //页面加载
    $scope.$on('$ionicView.enter', function () {
      // 定义查询内容
      $scope.searchContent = '';
      $scope.getDoneList(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = false;
    });
    //前往筛选页面
    $scope.goScreen=function(){
      $state.go('billScreen',{code:'2'});
    }
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.currentPageNo = 0;
      $scope.getDoneList(1);
    }
    // 上拉加载
    $scope.doLoadMore = function () {
      if ($scope.currentPageNo == 0)
        return;
      else {
        $scope.getDoneList($scope.currentPageNo + 1);
      }
    };

    //查询
    $scope.goSearchContent = function () {
      $scope.currentPageNo = 0;
      $scope.getDoneList(1);
    }
    $scope.modelData={
      searchContent:''
    }
    //获取已办列表
    $scope.getDoneList = function (pageNo) {
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;
      var params = {
        sid: $localstorage.getObject('sid'),
        pageSize: 10,
        pageNo: pageNo,
        applicantName: $scope.modelData.searchContent,
      }
      DoneListService.getDoneList(params)
        .success(function (response) {
          // 回调成功,处理返回值
          $rootScope.doneCount = response.count;//设置已办数量

          if (pageNo == 1) {
            $scope.doneList = [];
          }
          $scope.doneList = $scope.doneList.concat(response.list);
          //当分页数据小于等于Pagesize时
          if (response.totalPage == 1 && response.count <= response.pageSize) {
            $scope.hasMore = false;
          }
          else if ($scope.currentPageNo == response.totalPage-1) {
            $scope.hasMore = false;
          } else {
            // 设置当前页数
            $scope.currentPageNo = response.pageNo;
            $scope.hasMore = true;
          }
          if($scope.doneList.length==0  ){
            $scope.isCheck=true;
          }else{
            $scope.isCheck = false ;
          }
          $ionicScrollDelegate.resize();
          $scope.isLoading = false;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');

        }).error(function (response) {
          $ionicScrollDelegate.resize();
          // 回调失败,隐藏进度条
          $scope.isLoading = false;
          $scope.hasMore = false;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          PopupService.showToast("网络错误.");
        });
    }
    $scope.goApprovalDetail = function (syscode, billtypeCode, item) {
      DataService.clearData("CurrBillInfo");//清除缓存
      DataService.setData("CurrBillInfo", item);//将当前操作的单据存入数据缓存。
      switch (billtypeCode) {
        case 'ZF':
          $state.go("payPublicDone",{code:2});
          break;
        case 'BX':
          $state.go('feeDone',{code:2});
          break;
        case 'JK':
          $state.go('borrowDone',{code:2});
          break;
        case 'ZCLY':
          $state.go('assetUsedDone',{code:2});
          break
        case 'WZCK':
          $state.go('outBoundDone',{code:2});
          break;
        case 'ZCDB':
          $state.go('allocatDone',{code:2});
          break;
          case 'ZCTK':
          $state.go('retiring',{code:2});
          break;
        default:
          PopupService.showToast("敬请期待");
          break;
      }
    }
  }]);


Asset.service('DoneListService', ['$http', 'UrlService', function ($http, UrlService) {
  //获取我已审核列表
  this.getDoneList = function (params) {
    if (params["applicantName"] == undefined)
      return $http.post(UrlService.getUrlData_check('DONE_LIST') + "?__sid=" + params["sid"] ,params, {noLoading: true});
    else
      return $http.post(UrlService.getUrlData_check('DONE_LIST') + "?__sid=" + params["sid"] ,params, {noLoading: true});
  }
}]);

