/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('selectFirmCtrl', ['$scope', '$state', 'SelectFirmService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams','UserService',
  function ($scope, $state, SelectFirmService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams,UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      //接受页面传值
      getData();
    });
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    //获取公司列表
    var getData = function () {
      var params = {
        __sid: $localstorage.getObject('sid')
      };

      SelectFirmService.getData(params)
        .success(function (response) {
          $scope.companyList = response;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (response) {
          // 回调失败,隐藏进度条
          console.log(response);
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          PopupService.showToast("网络错误.");
        });
    }
    //选中跳转申请页面
    $scope.companyBill=function(company){
      DataService.clearData("selectCompany");//清除缓存
      DataService.setData("selectCompany",company.name);//将当前操作的数据存入数据缓存。
      $ionicHistory.goBack();
    }
  }]);
Asset.service('SelectFirmService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('SYS_COMPANY'),params);
  }
  // }
}]);

