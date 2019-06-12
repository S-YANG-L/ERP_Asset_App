/**
 * Created by SuYangLong on 2018/10/31.
 */
Asset.controller('inOutBillFilterCtrl', ['$filter', '$scope', '$state', 'inOutBillFilterService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($filter, $scope, $state, inOutBillFilterService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {

    });
    //返回
    $scope.goBack = function () {
      DataService.clearData("allFilter");
      $ionicHistory.goBack();
    };
    if (DataService.getData('allFilter') == undefined || DataService.getData('allFilter') == null) {
      $scope.modelData = {
        billCode: '',//单号
        psnName: '',//经办人
        orderDate: '',//入库日期
      }
    } else {
      $scope.modelData = DataService.getData('allFilter');
    }
    //单击确定
    $scope.goTrue = function () {
      DataService.clearData("allFilter");
      DataService.setData("allFilter", $scope.modelData);
      console.log($scope.modelData)
      $ionicHistory.goBack();
    }
    //清空
    $scope.goClear=function(){
      $scope.modelData = {
        billCode: '',//单号
        psnName: '',//经办人
        orderDate: '',//入库日期
      }
    }
  }]);
Asset.service('inOutBillFilterService', ['$http', 'UrlService', function ($http, UrlService) {

}]);
