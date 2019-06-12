/**
 * Created by chenzhuo on 2018/11/15.
 */
Asset.controller('useBoundCtrl', ['$ionicLoading','$scope', '$state', 'useBoundService','$ionicHistory','$rootScope','DataService','UrlService','PopupService','$localstorage','$stateParams','$ionicPopup',
  function ($ionicLoading,$scope, $state, useBoundService,$ionicHistory,$rootScope,DataService,UrlService,PopupService,$localstorage,$stateParams,$ionicPopup) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      getData();
    });
    //返回
    $scope.goBack=function(){
      $ionicHistory.goBack();
    };
    //撤回
    $scope.goDone=function(){
      $state.go('borrowDown',{syscode:$scope.syscode})
    }
    //同意选取人员
    $scope.goSelectApproval=function(){
      $state.go('selectApproval');
    }
    //转发
    $scope.goForward=function(){
      PopupService.showToast("敬请期待");
    }
    var getData =function() {
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      console.log("DataService.getData(\"CurrBillInfo\")",billInfo);
      console.log("billInfo",billInfo);
      // 设置参数
      var param = {
        sid: $localstorage.getObject('sid'),
        id:billInfo.bizKey,
        sysCode:billInfo.bizKey
      };
      var notParam = {
        __sid: $localstorage.getObject('sid'),
        id:billInfo.bizKey,
        bizKey:billInfo.bizKey,
      };
      // 调用接口
      useBoundService.progressBar(param)
        .success(function (response) {
          console.log("领用单",response);
          if (response.code == 200) {
            $scope.useBound = response.list;
            $scope.flowLogs = response.flList;
          } else if(response.code == 201){
            PopupService.showToast(response.message);
          } else if(response.code == 203){
            PopupService.showToast(response.message);
            $state.go('login');
            return;
          } else {
            $scope.hasMore = false;
            PopupService.showToast(response.message);
          }
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        $scope.isLoading = false;
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
      // 调用接口
      useBoundService.notProgressBar(notParam)
        .success(function (response) {
          console.log('未完成工作流');
          console.log(response);
          if (response.code == 200) {
            $scope.notFlowLogs = response.data;
          } else if(response.code == 201){
            PopupService.showToast(response.message);
          } else if(response.code == 203){;
            PopupService.showToast(response.message);
            $state.go('login');
            return;
          } else {
            $scope.hasMore = false;
            PopupService.showToast(response.message);
          }
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        $scope.isLoading = false;
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    };
    //拒绝显示
    $scope.showAlert = function (params) {
      console.log("流程信息");
      console.log(params.approvalMemo)
      if (params.approvalMemo != undefined&&params.approvalStatus=='3') {
        var alertPopup = $ionicPopup.alert({
          title: '拒绝信息',
          template: params.approvalMemo,
          okText: '确定'
        });
        alertPopup.then(function (res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      }
    }
    /*
     * refuseBill 拒绝单据,填写审核不同意的意见
     * @param
     * @return 没有返回值
     */
    // $scope.refuseBill = function(){
    //   $state.go('refuse');
    // }
    //审批同意
    $scope.goApproval = function () {
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      DataService.clearData("useRefundApprove");
      DataService.setData("useRefundApprove",$scope.useBound);
      console.log(222,DataService.getData("useRefundApprove"))
      DataService.setData("CurrBillInfoApprove",billInfo);
      $state.go('useRefundApply');
    }

    //审核单据
    $scope.approvalBill = function () {
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      // 设置参数
      var param = {
        sid: $localstorage.getObject('sid'),
        flowBusinessId: billInfo.id,
        sysCode: billInfo.bizKey,
      };
      // 调用接口
      useBoundService.approvalBill(param)
        .success(function (response) {
          console.log('审批退库单');
          console.log(response);
          if (response.code == 200) {
            PopupService.showToast("审批成功!");
            $state.go('remind.todo_list');//跳转至待我审批
          } else if (response.code == 201) {
            PopupService.showToast(response.message);
          } else if (response.code == 203) {
            PopupService.showToast(response.message);
            $state.go('login');
            return;
          } else {
            PopupService.showToast(response.message);
          }
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('useBoundService', ['$http', 'UrlService',function ($http, UrlService) {
  this.progressBar = function (params) {//得到已审批流程log日志，单条业务数据
    return $http.post(UrlService.getUrlData_check('SYS_ASSETRETURN')+"?__sid="+params['sid']+"&id="+params["sysCode"]+"&bizKey="+params["sysCode"]);
    //  return $http.get('data/getPeople.json');
  };
  this.approvalBill = function (params) {//退库申请审批同意
    return $http.post(UrlService.getUrlData_check('AGREE_FEE') + "?__sid=" + params['sid'] + "&id=" + params["sysCode"] + "&flowBusinessId=" + params["flowBusinessId"]);
  };
  this.notProgressBar = function (params) {//未完成工作流
    return $http.post(UrlService.getUrlData_check('NOT_FINISH_BIZKEY'),params);
  };
  this.getNextFlowBusiness = function(params) {//判断是否是最后一步
    return $http.post(UrlService.getUrlData_check('GET_NEXT_FLOWBUSINESS')+"?__sid="+params['sid']+"&step="+params["step"]+"&bizKey="+params["bizKey"]);
  }
}]);

