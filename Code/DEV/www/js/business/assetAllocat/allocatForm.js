/**
 * Created by Administrator on 2016/11/2.
 */
Asset.controller('allocatFormCtrl', ['$scope', '$state', 'allocatFormService','$ionicHistory','$rootScope','DataService','UrlService','PopupService','$localstorage','$stateParams',
  function ($scope, $state, allocatFormService,$ionicHistory,$rootScope,DataService,UrlService,PopupService,$localstorage,$stateParams) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      getData();
    });
    //返回
    $scope.goBack=function(){
      $state.go("allocatIn");
    };

    //数据请求0
    var getData =function() {
      // 设置参数
      var param = {
        __sid: $localstorage.getObject('sid'),
        id:DataService.getData("CurrBillInfo").id,
      };
      // 调用接口
      allocatFormService.getOutBound(param)
        .success(function (response) {
          console.log('调拨单');
          console.log(response);
          if (response.code == 200) {
            $scope.outBoundApply=response.list;
            console.log(132,$scope.outBoundApply)
            $scope.outboundBillDtlList=response.list.assetAllotDtlList
          } else {
          }
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    };

  }]);
Asset.service('allocatFormService', ['$http', 'UrlService',function ($http, UrlService) {
  this.getOutBound = function (params) {
    return $http.post(UrlService.getUrlData_check('ASSET_ALLOCT'),params);
    //  return $http.get('data/getPeople.json');
  };
}]);

