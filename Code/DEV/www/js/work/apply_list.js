/**
 * Created by ZM on 2016/5/10.
 */
Asset.controller('applyListController', ['$scope', '$state', 'applyListService', 'PopupService', '$rootScope', '$localstorage', '$ionicHistory','DataService','$ionicLoading','$ionicScrollDelegate',
  function ($scope, $state, applyListService, PopupService, $rootScope, $localstorage, $ionicHistory,DataService,$ionicLoading,$ionicScrollDelegate) {
    //页面加载
    $scope.$on('$ionicView.enter', function () {
      // 定义查询内容
      $scope.searchContent = '';
      $scope.getApplyList(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = true;
    });
    //返回页面
    $scope.goBack= function () {
      // $ionicHistory.goBack();
      $state.go('tab.app');
    }
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.getApplyList(1);
    }
    // 上拉加载
    $scope.doLoadMore = function () {
      if ($scope.currentPageNo == 0)
        return;
      else {
        $scope.getApplyList($scope.currentPageNo + 1);
      }
    };
    $scope.modelData={
      searchContent:'',
      billTypeCode:''
    }
    //获取申请列表
    $scope.getApplyList = function (pageNo) {
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;
      var params = {
        sid: $localstorage.getObject('sid'),
        pageSize: 10,
        pageNo: pageNo,
        applicantName: $scope.modelData.searchContent,
        billtypeCode:$scope.modelData.billTypeCode!=undefined ? $scope.modelData.billTypeCode:''
      }
      applyListService.getApplyList(params)
        .success(function (response) {
          DataService.clearData("selectApply");//清除缓存
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
          if($scope.doneList.length==0){
            $scope.hasMore = false;
            $scope.billList='';
            DataService.clearData("selectApply");//清除缓存
          }
          // $scope.billList='';
          // DataService.clearData("selectApply");//清除缓存
          $ionicScrollDelegate.resize();
          $scope.isLoading = false;
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');

        }).error(function (response) {
          $ionicScrollDelegate.resize();
          // 回调失败,隐藏进度条
          $scope.isLoading = false;
          $scope.hasMore = false;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log(response);
          PopupService.showToast("网络错误.");
        });
    }
    $scope.goApprovalDetail = function (syscode, billtypeCode, item) {
      DataService.clearData("CurrBillInfo");//清除缓存
      DataService.setData("CurrBillInfo", item);//将当前操作的单据存入数据缓存。
      console.log("asdasdasd",DataService.getData("CurrBillInfo"));
      switch (billtypeCode) {
        case 'ZCDB':
          $state.go('allocatDone',{code:1});
          break;
        case 'LZ':
          PopupService.showToast("暂不支持此种单据");
          break;
        case 'XZ':
          PopupService.showToast("暂不支持此种单据");
          break;
        case 'ZCLY':
          $state.go('assetUsedDone',{code:1});
          break;
        case 'WZCK':
          $state.go('outBoundDone',{code:1});
          break;
        case 'ZCTK':
          $state.go('retiring',{code:1});
          break;
        default:
          PopupService.showToast("敬请期待");
          break;
      }
    }
  }]);


Asset.service('applyListService', ['$http', 'UrlService', function ($http, UrlService) {
  //获取我的申请列表
  this.getApplyList = function (params) {
    if (params["applicantName"] == undefined)
      return $http.post(UrlService.getUrlData_check('MYAPPLY_LIST') + "?__sid=" + params["sid"] + "&pageNo=" + params["pageNo"] + "&pageSize=" + params["pageSize"], {noLoading: true});
    else{
      return $http.post(UrlService.getUrlData_check('MYAPPLY_LIST') + "?__sid=" + params["sid"] + "&pageNo=" + params["pageNo"] + "&pageSize=" + params["pageSize"] + "&applicantName=" + params["applicantName"]+ "&billtypeCode=" + params["billtypeCode"], {noLoading: true});
    }
  }
}]);

