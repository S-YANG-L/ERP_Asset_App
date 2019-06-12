/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('dictTypeCtrl', ['$scope', '$state', 'dictTypeService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, dictTypeService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {

    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      //获取所有用户
      getData();
    });
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    //获取调拨类型列表
    var getData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        dictCode: 'ass_allot_type',
        pageSize: '100'//分页
      }
      dictTypeService.getData(params)
        .success(function (response) {
          $scope.dictTypeList = response.list;
console.log(1,response)
        }).error(function (response) {
        // 回调失败,隐藏进度条
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    }

    //选中调拨类型跳转页面
    $scope.selectdictType = function (e) {
      console.log(1,e.dictName);
      DataService.clearData("dictTypeCache");
      DataService.setData("dictTypeCode", e.dictValue);
      DataService.setData("dictTypeName", e.dictName);
      $ionicHistory.goBack();
    }

  }]);
Asset.service('dictTypeService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {//调拨类型
    return $http.post(UrlService.getUrlData_check('ALLOCAT_TYPELIST'), params);
  }
}]);


