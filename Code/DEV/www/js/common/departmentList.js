/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('departmentListCtrl', ['$scope', '$state', 'DepartmentListService', '$ionicHistory', '$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, DepartmentListService, $ionicHistory, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      // 定义查询内容
      $scope.searchContent = '';
      $scope.getData();

    });
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.selectDepartment = function (selectDepartment) {
      console.log(7,selectDepartment.id)
      DataService.setData("departmentList1", selectDepartment);
      DataService.setData("departmentListCode", selectDepartment.id);
      DataService.setData("departmentListName", selectDepartment.name);
      $ionicHistory.goBack();
    }
    console.log()
    //获取数据字典
    $scope.getData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        usercode:UserService.getUser().userCode,
      }
      DepartmentListService.getDate(params)
        .success(function (response) {
          console.log(222,response);
          $scope.departmentList=response;//部门
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(222,response);
        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('DepartmentListService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getDate = function (params) {//获取部门列表
    return $http.post(UrlService.getUrlData_check('findOfficeList'),params);
  }
}]);

