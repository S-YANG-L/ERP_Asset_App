/**
 * Created by Administrator on 2016/11/2.
 */
Asset.controller('outBoundDoneCtrl', ['$scope', '$state', 'outBoundDoneService','$ionicHistory','$rootScope','DataService','UrlService','PopupService','$localstorage','$stateParams','$ionicPopup',
  function ($scope, $state, outBoundDoneService,$ionicHistory,$rootScope,DataService,UrlService,PopupService,$localstorage,$stateParams,$ionicPopup) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      //接受参数
      $scope.code=$stateParams.code;
      console.log("code",$scope.code);
      getData();
    });
    //返回
    $scope.goBack=function(){
      $ionicHistory.goBack();
      DataService.clearData("CurrBillInfo")
    };

    //删除单据
    $scope.deleteForm=function(){
      var confirmPopup = $ionicPopup.confirm({
        title: '是否删除',
        okText: '确定',
        cancelText: '取消'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.delete()
        } else {
          // Don't close
        }
      });
    }
    //是否走撤回申请判断
    $scope.delete=function(){
      console.log('数据跳转测试');
      console.log($scope.outBoundApply.approvalStatus);
      if($scope.outBoundApply.approvalStatus=='0'){
        $scope.goDeleate();
      }else{
        var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
        var param = {
          sid: $localstorage.getObject('sid'),
          bizKey:billInfo.bizKey,
        };
        outBoundDoneService.revokeBillApply(param)
          .success(function (response) {
            console.log('领用单删除');
            console.log(response);
            if(response.code==200){
              $scope.goDeleate();
              PopupService.showToast('删除领用单成功！');
              $state.go('app.home.remind.todo_list');//跳转至待我审批
            } else if(response.code==201){
              PopupService.showToast('当前单据已审批不可删除！');
            }
          }).error(function (response) {
            // 回调失败,隐藏进度条
            console.log(response);
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            PopupService.showToast("网络错误.");
          });
      }
    }
    //删除单据
    $scope.goDeleate = function () {
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      console.log('数据缓存');
      console.log(billInfo);
      var params = {
        sid: $localstorage.getObject('sid'),
        bizKey:billInfo.bizKey,
        sysCode:billInfo.bizKey
      };
      outBoundDoneService.deleteForm(params)
        .success(function (response) {
          // 回调成功,处理返回值
          console.log('单据删除');
          console.log(response);
          if(response.code==200){
            PopupService.showToast("删除领用单成功！");
            $state.go('app.home.remind.todo_list');//跳转至待我审批
          }else if(response.code==201){
            PopupService.showToast("删除失败");
            $state.go('app.home.remind.todo_list');//跳转至待我审批
          }
        }).error(function (response) {
          // 回调失败,隐藏进度条
          console.log(response);
          PopupService.showToast("网络错误.");
        });
    }
    //重新提交
    $scope.againSubmit= function () {
      var confirmPopup = $ionicPopup.confirm({
        title: '是否重新提交',
        okText: '确定',
        cancelText: '取消'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.Submit()
        } else {
        }
      });
    }
    $scope.Submit=function(){
      console.log($scope.outBoundApply.approvalStatus);
      if($scope.outBoundApply.approvalStatus=='0'){
        DataService.clearData("outBoundCache");
        DataService.setData("outBoundCache",$scope.outBoundApply);
        $state.go('outBoundApply');
      }else{
        var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
        var param = {
          sid: $localstorage.getObject('sid'),
          bizKey:billInfo.bizKey,
        };
        outBoundDoneService.revokeBillApply(param)
          .success(function (response) {
            if (response.code == 200) {
              DataService.clearData("outBoundCache");
              $scope.outBoundApply.approvalStatus='0';
              DataService.setData("outBoundCache",$scope.outBoundApply);
              $state.go('outBoundApply');
            } else if (response.code == 201) {
              PopupService.showToast('当前单据已审批不可重新提交！');
            }
          }).error(function (response) {
            // 回调失败,隐藏进度条
            console.log(response);
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            PopupService.showToast("网络错误.");
          });
      }
    }
    var getData =function() {
      $scope.billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      // 设置参数
      var param = {
        sid: $localstorage.getObject('sid'),
        sysCode: $scope.billInfo.bizKey
      };
      var notParam = {
        __sid: $localstorage.getObject('sid'),
        bizKey:$scope.billInfo.bizKey,
      };
      // 调用接口
      outBoundDoneService.progressBar(param)
        .success(function (response) {
          console.log('办公用品领用单',response);
          if (response.code == 200) {
            $scope.outBoundApply = response.list;
            $scope.flowLogs = response.flList;
            console.log("flowLogs",$scope.flowLogs)
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
      // 调用接口
      outBoundDoneService.notProgressBar(notParam)
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
      console.log(params.approvalMemo);
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
    //重新审批
    $scope.againApprove = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: '是否重新审批',
        okText: '确定',
        cancelText: '取消'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.againApproveBorrow()
        } else {
          // Don't close
        }
      });
    }
    $scope.againApproveBorrow=function(){
      console.log('添加数据ID');
      console.log(DataService.getData("CurrBillInfo"));
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      var param = {
        sid: $localstorage.getObject('sid'),
        bizKey: billInfo.bizKey,
      };
      outBoundDoneService.revokeApprove(param)
        .success(function (response) {
          console.log('领用单重新审批');
          console.log(response);
          if (response.code == 200) {
            $state.go('app.home.remind.todo_list');
          } else if (response.code == 201) {
            PopupService.showToast(response.message);
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
Asset.service('outBoundDoneService', ['$http', 'UrlService',function ($http, UrlService) {
  this.progressBar = function (params) {
    return $http.post(UrlService.getUrlData_check('SYS_OUTBOUNDAPPLY')+"?__sid="+params['sid']+"&id="+params["sysCode"]+"&bizKey="+params["sysCode"]);
    //  return $http.get('data/getPeople.json');
  };
  this.notProgressBar = function (params) {
    return $http.post(UrlService.getUrlData_check('NOT_FINISH_BIZKEY'),params);
    //  return $http.get('data/getPeople.json');
  };
  this.revokeBillApply = function (params) {//撤销单据申请
    return $http.post(UrlService.getUrlData_check('REVOKE_OUTBOUND')+"?__sid="+params['sid']+"&bizKey="+params['bizKey']);
  };
  this.deleteForm = function (params) {//单据删除
    return $http.post(UrlService.getUrlData_check('DELETE_OUTBOUND')+"?__sid="+params['sid'],params);
  };
  this.revokeApprove = function (params) {//重新审批
    return $http.post(UrlService.getUrlData_check('AGIN_APPROVE_OUTBOUND') + "?__sid=" + params['sid'] + "&bizKey=" + params['bizKey']);
  };
}]);

