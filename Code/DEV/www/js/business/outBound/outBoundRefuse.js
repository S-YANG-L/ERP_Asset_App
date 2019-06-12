/**
 * Created by Administrator on 2016/11/2.
 */
Asset.controller('outBoundRefuseCtrl', ['$ionicLoading','$scope', '$state', 'outBoundRefuseService', '$ionicHistory', '$rootScope', 'UrlService', 'PopupService', '$localstorage', '$stateParams','DataService',
  function ($ionicLoading,$scope, $state, outBoundRefuseService, $ionicHistory, $rootScope, UrlService, PopupService, $localstorage, $stateParams,DataService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
    });
    $scope.modelData={
      refuseReason:''
    };//拒绝原因
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    //审批拒绝
    $scope.refuseBill = function () {
      $ionicLoading.show();
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      var params = {
        flowBusinessId : billInfo.id,
        approvalMemo1 : $scope.modelData.refuseReason,//拒绝原因
        id:billInfo.bizKey,
        sysCode:billInfo.bizKey,
        billSortCode:billInfo.billtypeCode,//单据类型
        sid: $localstorage.getObject('sid')
      }
      console.log('入参');
      console.log(params);
      outBoundRefuseService.refuseBill(params)
        .success(function (response) {

          console.log('审批拒绝返回值');
          console.log(response);
          // 回调成功,处理返回值
          if(response.code=="200")
          {
            $ionicLoading.hide();
            PopupService.showToast("单据已拒绝审批!");
            $state.go('app.home.home1');//跳转至待我审批
          }
          else{
            $ionicLoading.hide();
            PopupService.showToast(response.messagePC);
          }

        }).error(function (response) {
          $ionicLoading.hide();
          // 回调失败,隐藏进度条
          console.log(response);
          PopupService.showToast("网络错误.");
        });

    }
  }]);
Asset.service('outBoundRefuseService', ['$http', 'UrlService', function ($http, UrlService) {
  this.refuseBill = function (params) {
    switch (params["billSortCode"]) {
      case "WZCK"://报销单
        return $http.post(UrlService.getUrlData_check('REFUSE_OUTBOUND') + "?__sid=" + params["sid"]+"&flowBusinessId="+params["flowBusinessId"]+"&approvalMemo1="+params["approvalMemo1"]+"&id="+params["id"]+"&sysCode="+params["sysCode"]);
        break;
    }
  }
}]);

