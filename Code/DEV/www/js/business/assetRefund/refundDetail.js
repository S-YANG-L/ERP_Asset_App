/**
 * Created by chenzhuo on 2018/11/8.
 */
Asset.controller('refundDetailCtrl', ['$scope', '$state','$sce','$localstorage','$stateParams','PopupService', 'refundDetailService','$ionicHistory','UrlService','DataService','$filter',
  function ($scope, $state,$sce,$localstorage, $stateParams,PopupService,refundDetailService,$ionicHistory,UrlService,DataService,$filter) {
    $scope.$on('$ionicView.enter', function () {
      $scope.assetDataList=DataService.getData("assetData");
      $scope.getAssetData();
    });
    $scope.goBack=function(){
      DataService.clearData("assetData");
      $ionicHistory.goBack();
    }
    //获取资产详情
    $scope.getAssetData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        id:DataService.getData("assetData").id,
      }
      refundDetailService.getData(params)
        .success(function (response) {
          if (response.result == "login")
          {
            $state.go("login");
          }
          if(response.length==0){
            $scope.blank=false;
          }else{
            $scope.blank=true;
          }
          console.log('资产详情');
          console.log(response);
          // $scope.assetCardList = response.page.list;
          $scope.assetCardData=response.list.assetReturnDtlList;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('refundDetailService', ['$http', 'UrlService',function ($http, UrlService) {
  this.getData = function(params) {
    return $http.post(UrlService.getUrlData_check('RECEIVE_LIST_SUBTABLE'),params);
  }
}]);
