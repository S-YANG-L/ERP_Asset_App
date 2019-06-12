/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('addOneMemberCtrl', ['$scope', '$state', 'addOneMemberService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams','UserService',
  function ($scope, $state, addOneMemberService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams,UserService) {

    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      // 定义查询内容
      $scope.searchContent = '';
      //获取所有用户
      getData();
    });
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    //获取人员列表
    var getData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
      }
      addOneMemberService.getData(params)
        .success(function (response) {
          $scope.btypeInfoList = response.list;

        }).error(function (response) {
        // 回调失败,隐藏进度条
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    }

    //选中人员跳转页面
    $scope.selectPerson=function(e){
      console.log(e);
      DataService.clearData("ctTaskParam");
      DataService.setData("ctTaskParam",e);
      $ionicHistory.goBack();
    }

  }]);
Asset.service('addOneMemberService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('SYS_PerInfo'),params);
  }
}]);


