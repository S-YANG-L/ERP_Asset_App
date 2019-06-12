/**
 * Created by zhaohongbin on 2018/11/2.
 */
Asset.controller('assetUsedformCtrl', ['$scope', '$state', 'assetUsedformService','$ionicHistory','$rootScope','DataService','UrlService','PopupService','$localstorage','$stateParams',
  function ($scope, $state, assetUsedformService,$ionicHistory,$rootScope,DataService,UrlService,PopupService,$localstorage,$stateParams) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      getData();
    });
    //返回
    $scope.goBack=function(){
      $ionicHistory.goBack();
    };
    //数据请求
    var getData =function() {
      var billInfo = DataService.getData("CurrBillInfo");//当前操作的单据
      console.log("aaaaaaaaaaaaaaaaaaa",billInfo);
      // 设置参数
      var param = {
        sid: $localstorage.getObject('sid'),
        id:billInfo.id
      };
      // 调用接口
      assetUsedformService.getassetUsed(param)
        .success(function (response) {
          console.log('对公支付单');
          console.log(response);
          if (response.code == 200) {
            $scope.assetUsedApply=response.list;
            $scope.assetUsedDtls=response.list.assetUsedDtls;
          } else {
          }
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    };

  }]);
Asset.service('assetUsedformService', ['$http', 'UrlService',function ($http, UrlService) {
  this.getassetUsed = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_USEDINFOBILL')+"?__sid="+params['sid']+"&id="+params["id"]+"&bizKey="+params["sysCode"]);
    //  return $http.get('data/getPeople.json');
  };
}]);

