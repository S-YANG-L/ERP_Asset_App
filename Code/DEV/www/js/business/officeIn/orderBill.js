/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('orderBillCtrl', ['$scope', '$state', '$ionicHistory', '$ionicLoading', 'orderBillService', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, $ionicHistory, $ionicLoading, orderBillService, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      // 定义查询内容
      $scope.searchContent = '';
      $scope.getDate();
    });
    // 返回
    $scope.goBack = function () {
      $state.go("app.inOutBill")
    };
    //获取数据字典
    $scope.getDate = function () {
      console.log(1111)
      var params = {
        __sid: $localstorage.getObject('sid'),
        corpCode: UserService.getUser().corpCode_
      };
      orderBillService.getData1(params)
        .success(function (response) {
          console.log(222, response)
          $scope.orderBillList = response.page;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
    $scope.chioce = function (orderBills) {
      console.log(11, orderBills.id)
      $scope.DtlData(orderBills.id);
    }
    //采购单子表
    $scope.DtlData = function (e) {
      var params = {
        __sid: $localstorage.getObject('sid'),
        isNewRecord: false,
        sysCode:e,
      }
      orderBillService.DtlData(params)
        .success(function (response) {
          console.log(33333333333333, response)
          $scope.DtlDataList = response[0];
          DataService.clearData("orderBills");//清除缓存
          DataService.setData("orderBills", $scope.DtlDataList);
          $ionicHistory.goBack();
        }).error(function (response) {
      });
    }
  }
]);
Asset.service('orderBillService', ['$http', 'UrlService', function ($http, UrlService) {
  //获取采购单
  this.getData1 = function (params) {
    return $http.post(UrlService.getUrlData_check('ORDERBILL'), params);
  }
  this.DtlData = function (params) {//数据提交
    return $http.post(UrlService.getUrlData_check('DTLDATA'), params);
  };
}]);
