/**
 * Created by user on 2016-6-20.
 */

Asset.controller('ChangePwCtrl', ['$scope', '$state', 'UserService', 'ChangePWService', '$ionicHistory', 'PopupService', '$stateParams', 'DataService', '$localstorage',
  function ($scope, $state, UserService, ChangePWService, $ionicHistory, PopupService, $stateParams, DataService, $localstorage) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      //定义中间量
      $scope.modelData = {
        newPassword:'',	//新密码
        confirmNewPassword:'',//确认密码
        oldPassword:''//原密码
      };
    });
    console.log($localstorage.get("LoginPassword"))
    // 返回前画面
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.toSubmit = function () {
      //点击提交按钮对输入密码进行校验
      if ($scope.modelData.newPassword == null || $scope.modelData.newPassword.length == 0){
        PopupService.showToast('请输入新密码');
        return;
      } else if ($scope.modelData.confirmNewPassword == null || $scope.modelData.confirmNewPassword.length == 0){
        PopupService.showToast('请输入确认密码');
        return;
      } else if ($scope.modelData.oldPassword == null || $scope.modelData.oldPassword.length == 0){
        PopupService.showToast('请输入原始密码');
        return;
      }else if ($scope.modelData.newPassword !=$scope.modelData.confirmNewPassword ){
        PopupService.showToast('新密码与确认密码不一致');
        return;
      }else if ($scope.modelData.newPassword ==$scope.modelData.oldPassword ){
        PopupService.showToast('新密码与原密码不能一致');
        return;
      }
      //参数
      var param = {
        __sid: $localstorage.getObject('sid'),
        userCode:UserService.getUser().refObj.empCode,
        newPassword:$scope.modelData.newPassword,
        oldPassword:$scope.modelData.oldPassword,
        confirmNewPassword:$scope.modelData.confirmNewPassword
      };
      ChangePWService.getChangePW(param)
        .success(function (response) {
          if (response.code == 200) {
            PopupService.showToast('重置成功');
            $state.go('app.home.home1');
          } else if (response.code == 201) {
            PopupService.showToast('重置失败');
          }
        }).error(function (response) {
        $state.go('app.home.home1');
        PopupService.showToast('网络错误,请稍后重试.');
      });
    }
  }]);

Asset.service('ChangePWService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getChangePW = function (params) {
    return $http.post(UrlService.getUrlData_check('REGISTER_CHANGEPW'), params);
  }
}]);
