/**
 * Created by zhaohongbin on 2018/11/2.
 */
Asset.controller('outBoundformCtrl', ['$scope', '$state', 'outBoundformService','$ionicHistory','$rootScope','DataService','UrlService','PopupService','$localstorage','$stateParams',
  function ($scope, $state, outBoundformService,$ionicHistory,$rootScope,DataService,UrlService,PopupService,$localstorage,$stateParams) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      getData();
    });
    //返回
    $scope.goBack=function(){
    $state.go("app.outBoundList")
    };
    //数据请求
    var getData =function() {
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      console.log("dasdasd",billInfo);
      // 设置参数
      var param = {
        sid: $localstorage.getObject('sid'),
        sysCode:billInfo.sysCode
      };
      // 调用接口
      outBoundformService.getOutBound(param)
        .success(function (response) {
          console.log('对公支付单');
          console.log(response);
          if (response.code == 200) {
            $scope.outBoundApply=response.list;
            $scope.outboundBillDtlList=response.list.outboundBillDtlList;
          } else {
          }
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    };

  }]);
Asset.service('outBoundformService', ['$http', 'UrlService',function ($http, UrlService) {
  this.getOutBound = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_OUTBOUNDBILL')+"?__sid="+params['sid']+"&sysCode="+params["sysCode"]+"&bizKey="+params["sysCode"]);
    //  return $http.get('data/getPeople.json');
  };
}]);

