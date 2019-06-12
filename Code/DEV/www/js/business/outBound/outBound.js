/**
 * Created by Administrator on 2016/11/2.
 */
Asset.controller('outBoundCtrl', ['$ionicLoading','$scope', '$state', 'outBoundService','$ionicHistory','$rootScope','DataService','UrlService','PopupService','$localstorage','$stateParams','$ionicPopup',
  function ($ionicLoading,$scope, $state, outBoundService,$ionicHistory,$rootScope,DataService,UrlService,PopupService,$localstorage,$stateParams,$ionicPopup) {
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
      console.log("billInfo",billInfo);
      // 设置参数
      var param = {
        sid: $localstorage.getObject('sid'),
        sysCode:billInfo.bizKey
      };
      var notParam = {
        __sid: $localstorage.getObject('sid'),
        bizKey:billInfo.bizKey,
      };
      // 调用接口
      outBoundService.progressBar(param)
        .success(function (response) {
          console.log("领用单",response);
          if (response.code == 200) {
            $scope.outBoundApply = response.list;
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
      outBoundService.notProgressBar(notParam)
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
    $scope.refuseBill = function(){
      $state.go('refuse');
    }
    //审批同意
    $scope.goApproval = function () {
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      DataService.clearData("outBoundApprove");
      DataService.setData("outBoundApprove",$scope.outBoundApply);
      DataService.setData("CurrBillInfoApprove",billInfo);
      $state.go('outBoundApply');
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
      outBoundService.approvalBill(param)
        .success(function (response) {
          console.log('审批领用单');
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
Asset.service('outBoundService', ['$http', 'UrlService',function ($http, UrlService) {
  this.progressBar = function (params) {
    return $http.post(UrlService.getUrlData_check('SYS_OUTBOUNDAPPLY')+"?__sid="+params['sid']+"&id="+params["sysCode"]+"&bizKey="+params["sysCode"]);
    //  return $http.get('data/getPeople.json');
  };
  this.approvalBill = function (params) {
    return $http.post(UrlService.getUrlData_check('AGREE_OUTBOUND') + "?__sid=" + params['sid'] + "&id=" + params["sysCode"] + "&flowBusinessId=" + params["flowBusinessId"]);
  };
  this.notProgressBar = function (params) {
    return $http.post(UrlService.getUrlData_check('NOT_FINISH_BIZKEY'),params);
  };
  this.getNextFlowBusiness = function(params)
  {
    return $http.post(UrlService.getUrlData_check('GET_NEXT_FLOWBUSINESS')+"?__sid="+params['sid']+"&step="+params["step"]+"&bizKey="+params["bizKey"]);
  }
}]);

