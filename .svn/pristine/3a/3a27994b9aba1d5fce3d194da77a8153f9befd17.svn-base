/**
 * Created by Administrator on 2016/11/2.
 */
Asset.controller('validateCodeCtrl', ['$scope', '$state', 'validateCodeService','$ionicHistory','$rootScope','DataService','UrlService','PopupService','$localstorage','$stateParams','CheckUtil','$ionicLoading',
  function ($scope, $state, validateCodeService,$ionicHistory,$rootScope,DataService,UrlService,PopupService,$localstorage,$stateParams,CheckUtil,$ionicLoading) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.modelData=$stateParams.data;
      $scope.startTimer($scope.phone);
    });

    //倒计时相关
    $scope.phone = {
      locker: false,
      timer: 0,
      buttonText: '获取短信验证码',
      timerId: 0,
      text: '无',
      inputCode: ''//验证码输入框
    };

    //返回
    $scope.goBack=function(){
      $ionicHistory.goBack();
    };
    //发送验证码
    $scope.getCode=function() {
      var param = {
        loginCode:$scope.modelData.loginCode,
        mobile:$scope.modelData.type.value
      }
      $ionicLoading.show();
      validateCodeService.getYzCode(param)
        .success(function (response) {
          $ionicLoading.hide();
          if(response.code=='200'){
            //验证码
            $scope.modelData.verificationCode=response.verificationCode;
            $scope.startTimer($scope.phone);
          }else{
            PopupService.showToast(response.message);
          }
        }).error(function (response) {
          $ionicLoading.hide();
          // 回调失败,隐藏进度条
          PopupService.showToast("网络错误.");
        });
    }
    //下一步
    $scope.goNext=function(){
      if($scope.modelData.verificationCode==$scope.modelData.yzCode){ //输入的验证码等于发送的验证码
        PopupService.showToast("验证成功");
        $state.go("changePW",{mobile:$scope.modelData});
      }else{
        PopupService.showToast("验证码不正确");
      }
    }
    //60秒倒计时
    $scope.startTimer = function (object) {
      object.timer = 60;
      object.buttonText = '重新获取';
      object.locker = true;//锁定
      //返回当前setInterval的ID，用于停止用。
      return setInterval(function () {
        $scope.$apply(
          function () {
            if (object.timer > 0) {
              object.timer = object.timer - 1;
            } else {
              clearInterval(object.timerId);//停止计时
              object.locker = false;//解锁
              //计时完成解除禁用
              $scope.confirmBtn = false;

            }
          }
        )
      }, 1000);
    };
  }]);
Asset.service('validateCodeService', ['$http', 'UrlService',function ($http, UrlService) {
  this.getYzCode = function(params) {
    return $http.post(UrlService.getUrlData('REGISTER_VERIFICTIONCODE'),params);
  }
}]);

