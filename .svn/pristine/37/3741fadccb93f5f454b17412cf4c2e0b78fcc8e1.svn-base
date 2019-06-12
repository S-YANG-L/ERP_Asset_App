/**
 * Created by SuYangLong on 2018/10/31.
 */
Asset.controller('assetUsedFilterCtrl', ['$filter', '$scope', '$state', 'assetUsedFilterService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($filter, $scope, $state, assetUsedFilterService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {

    });
    $scope.approvalStatusList=[
      {statusCode: '1', statusName: '审批中'},
      {statusCode: '2', statusName: '审批结束'},
      {statusCode: '', statusName: '全部'}
    ]
    $scope.assetUsedDateList=[
      {dateFilter: '近三天'},
      {dateFilter: '近一周'},
      {dateFilter: '近一月'},
      {dateFilter: '不限'}
    ]
    //返回
    $scope.goBack = function () {
      DataService.clearData("boundFilter");
      $ionicHistory.goBack();
    };
    if (DataService.getData('boundFilter') == undefined || DataService.getData('boundFilter') == null) {
      $scope.modelData = {
        dateFilter:'',//时间段
        statusCode: '',//审批状态
        assetUsederName: '',//出库人
      }
    } else {
      $scope.modelData = DataService.getData('boundFilter');
    }
    //单击确定
    $scope.goTrue = function () {
      DataService.clearData("boundFilter");
      DataService.setData("boundFilter", $scope.modelData);
      console.log($scope.modelData)
      $ionicHistory.goBack();
    }
  }]);
Asset.service('assetUsedFilterService', ['$http', 'UrlService', function ($http, UrlService) {

}]);
