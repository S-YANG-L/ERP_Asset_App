/**
 * Created by Administrator on 2016/11/2.
 */
Asset.controller('allocatDoneCtrl', ['$scope', '$state', 'allocatDoneService','$ionicHistory','$rootScope','DataService','UrlService','PopupService','$localstorage','$stateParams','$ionicPopup',
  function ($scope, $state, allocatDoneService,$ionicHistory,$rootScope,DataService,UrlService,PopupService,$localstorage,$stateParams,$ionicPopup) {
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
      if($scope.allocatApply.approvalStatus=='0'){
        $scope.goDeleate();
      }else{
        var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
        var param = {
          sid: $localstorage.getObject('sid'),
          bizKey:billInfo.bizKey,
        };
        allocatDoneService.revokeBillApply(param)
          .success(function (response) {
            console.log('调拨单删除');
            console.log(response);
            if(response.code==200){
              $scope.goDeleate();
              PopupService.showToast('删除调拨单成功！');
              $state.go('app.home.remind.apply_list');//跳转至待我审批
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
      console.log(billInfo);
      var params = {
        sid: $localstorage.getObject('sid'),
        bizKey:billInfo.bizKey,
        id:billInfo.bizKey
      };
      allocatDoneService.deleteForm(params)
        .success(function (response) {
          // 回调成功,处理返回值
          console.log('单据删除');
          console.log(response);
          if(response.code==200){

            PopupService.showToast("删除调拨单成功！");
            $state.go('app.home.home1');//跳转至待我审批
          }else if(response.code==201){
            PopupService.showToast("删除失败");
            $state.go('app.home.remind');//跳转至待我审批
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
          console.log(3,res)
          $scope.Submit()
        } else {
        }
      });
    }
    $scope.Submit=function(){
      console.log($scope.allocatApply.approvalStatus);
      if($scope.allocatApply.approvalStatus=='0'){
        DataService.clearData("addAllocatCache");
        DataService.setData("addAllocatCache",$scope.allocatApply);
        console.log(2,DataService.getData("addAllocatCache"))
        $state.go('addAllocat');
      }else{
        var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
        var param = {
          sid: $localstorage.getObject('sid'),
          bizKey:billInfo.bizKey,
        };
        allocatDoneService.revokeBillApply(param)
          .success(function (response) {
            if (response.code == 200) {
              $scope.allocatApply.approvalStatus='0';
              DataService.clearData("addAllocatCache");
              DataService.setData("addAllocatCache",$scope.allocatApply);
              $state.go('addAllocat');
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
      allocatDoneService.progressBar(param)
        .success(function (response) {
          console.log('资产调拨单',response);
          if (response.code == 200) {
            $scope.allocatApply = response.list;
            $scope.flowLogs = response.flList;
          } else if(response.code == 201){
            PopupService.showToast(response.message);
          } else if(response.code == 203){;
            PopupService.showToast(response.message);
            $state.go('app.home.home1');
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
      allocatDoneService.notProgressBar(notParam)
        .success(function (response) {

          console.log('未完成工作流');
          console.log(response);
          if (response.code == 200) {
            $scope.notFlowLogs = response.data;
          } else if(response.code == 201){
            PopupService.showToast(response.message);
          } else if(response.code == 203){;
            PopupService.showToast(response.message);
            $state.go('app.home.home1');
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
      allocatDoneService.revokeApprove(param)
        .success(function (response) {
          console.log('调拨单重新审批');
          console.log(response);
          if (response.code == 200) {
            $state.go('app.home.home1');
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
Asset.service('allocatDoneService', ['$http', 'UrlService',function ($http, UrlService) {
  this.progressBar = function (params) {
    return $http.post(UrlService.getUrlData_check('SYS_ALLOCATAPPLY')+"?__sid="+params['sid']+"&id="+params["sysCode"]+"&bizKey="+params["sysCode"]);
    //  return $http.get('data/getPeople.json');
  };
  this.notProgressBar = function (params) {
    return $http.post(UrlService.getUrlData_check('NOT_FINISH_BIZKEY'),params);
    //  return $http.get('data/getPeople.json');
  };
  this.revokeBillApply = function (params) {//撤销单据申请
    return $http.post(UrlService.getUrlData_check('REVOKE_ALLOCAT')+"?__sid="+params['sid']+"&bizKey="+params['bizKey']);
  };
  this.deleteForm = function (params) {//单据删除
    return $http.post(UrlService.getUrlData_check('DELETE_ALLOCAT')+"?__sid="+params['sid'],params);
  };
  this.revokeApprove = function (params) {//重新审批
    return $http.post(UrlService.getUrlData_check('AGIN_APPROVE_BORROW') + "?__sid=" + params['sid'] + "&bizKey=" + params['bizKey']);
  };
}]);

