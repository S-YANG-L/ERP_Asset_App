/**
 * Created by Administrator on 2016/11/14.
 */
Asset.controller('leaveTypeCtrl', ['$scope', '$state', 'leaveTypeService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams','UserService',
  function ($scope, $state, leaveTypeService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams,UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      //接受页面传值
      $scope.typeCode = $stateParams.typeCode;
      $scope.getLeaveType();
    });
    // //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    //获取下一步请假类型
    $scope.getLeaveType = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
      }
      leaveTypeService.getLeaveType(params)
        .success(function (data) {
          if (data.result == "login")
          {
            $state.go("login");
          }
          console.log('请假类型列表');
          console.log(data.page);
          $scope.leaveType = data.page;


        }).error(function (data) {
          // 回调失败,隐藏进度条
          console.log(data);
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          PopupService.showToast("网络错误.");
        });
    };

    //选中请假类型跳转申请页面
    $scope.leaveTypeClick = function (leaveType) {
      console.log(1111111,leaveType)
      // var leaveApplyObj=DataService.getData("leaveApplyObj");
      // leaveApplyObj.typeList=leaveType;
      DataService.setData("leaveApplyObj",leaveType);
      $ionicHistory.goBack();
    }
  }]);
Asset.service('leaveTypeService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getLeaveType = function (params) {
    return $http.post(UrlService.getUrlData_check('ARTICLES'),params);
  }
}]);

