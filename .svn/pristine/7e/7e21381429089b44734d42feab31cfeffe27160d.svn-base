/**
 * Created by Administrator on 2016/11/3.
 */
Asset.controller('allocatApproveCtrl', ['$ionicLoading', '$scope', '$state', 'allocatApproveService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams',
  function ($ionicLoading, $scope, $state, allocatApproveService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.allotOfficeCode=$stateParams.allotOfficeCode;
      console.log("asdasd",$scope.allotOfficeCode)
      $scope.getData();
    });
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    //获取下一步审批人列表
    $scope.getData = function () {
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      var params = {
        __sid: $localstorage.getObject('sid'),
        step: billInfo.step,
        flowId: billInfo.flowId,
        processId: billInfo.id,
        bizKey: billInfo.bizKey,
        allotOfficeCode:$stateParams.allotOfficeCode
      }
      console.log("asdasd",params)
      allocatApproveService.getData(params)
        .success(function (response) {
          console.log('审批人列表');
          console.log(response);
          $scope.approvalList = response.list;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    }
    //选中审批人跳转申请页面
    $scope.approvalBill = function (selectApply) {
      DataService.clearData("selectApply");//清除缓存
      DataService.setData("selectApply", selectApply);//将当前操作的数据存入数据缓存。
      $ionicHistory.goBack();
    }
  }]);
Asset.service('allocatApproveService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_NEXTAPPROVAL_ALLOCAT'),params);
  }

}]);

