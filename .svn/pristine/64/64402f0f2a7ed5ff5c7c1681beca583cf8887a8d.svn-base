/**
 * Created by SuYangLong on 2018/10/31.
 */
Asset.controller('inOutBillDetailCtrl', ['$scope', '$state','$sce','$localstorage','$stateParams','PopupService', 'inOutBillDetaiService','$ionicHistory','UrlService','DataService','$filter',
  function ($scope, $state,$sce,$localstorage, $stateParams,PopupService,inOutBillDetaiService,$ionicHistory,UrlService,DataService,$filter) {
    $scope.$on('$ionicView.enter', function () {
      $scope.assetDataList=DataService.getData("assetData");
      console.log($scope.assetDataList)
      $scope.getAssetData();
      $scope.getAssetData1();
    });
    $scope.goBack=function(){
      DataService.clearData("assetData");
      $state.go("app.inOutBillList")
    }
    //获取资产详情
    $scope.getAssetData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        grantNo:'1',
        sysCode:DataService.getData("assetData").sysCode
      }
      inOutBillDetaiService.getData(params)
        .success(function (response) {
          if (response.result == "login")
          {
            $state.go("login");
          }
          if(response.page.length==0){
            $scope.blank=false;
          }else{
            $scope.blank=true;
          }
          console.log('详情');
          console.log(response);
          $scope.assetCardData=response.page;
        }).error(function (response) {
          // 回调失败,隐藏进度条
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          // 回调失败,隐藏进度条
          console.log(response);
          PopupService.showToast("网络错误.");
        });
    }

    //获取资产详情
    $scope.getAssetData1 = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        grantNo:'2',
        sysCode:DataService.getData("assetData").sysCode
      }
      inOutBillDetaiService.getData(params)
        .success(function (response) {
          if (response.result == "login")
          {
            $state.go("login");
          }
          if(response.page.length==0){
            $scope.blank=false;
          }else{
            $scope.blank=true;
          }
          console.log('详情');
          console.log(response);
          $scope.assetCardData1=response.page;
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
Asset.service('inOutBillDetaiService', ['$http', 'UrlService',function ($http, UrlService) {
  this.getData = function(params) {
    return $http.post(UrlService.getUrlData_check('INOUTBILL_LIST_Detail'),params);
  }
}]);
