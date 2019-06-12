/**
 * Created by Administrator on 2016/11/2.
 */
Asset.controller('ForgetPWCtrl', ['$scope', '$state', 'ForgetPassWordService','$ionicHistory','$rootScope','DataService','UrlService','PopupService','$localstorage','$stateParams','CheckUtil','$ionicLoading',
  function ($scope, $state, ForgetPassWordService,$ionicHistory,$rootScope,DataService,UrlService,PopupService,$localstorage,$stateParams,CheckUtil,$ionicLoading) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
    });
    $scope.typeList=[
      {name:'使用手机号码找回您的密码',value:'mobile'},
      {name:'使用电子邮箱找回您的密码',value:'email'},
    ]
    $scope.modelData={
      mobile:'',
      loginCode:$stateParams.loginCode?$stateParams.loginCode:'',
      corpCode:'',
      verificationCode:'',
      type:'',
    }
    //返回
    $scope.goBack=function(){
      $ionicHistory.goBack();
    };

    //下一步
    $scope.goNext=function(){
      if ($scope.modelData.loginCode== ''|| $scope.modelData.loginCode==undefined) {
        PopupService.showToast('请输入登录账号');
        return;
      }if ($scope.modelData.type.value== ''|| $scope.modelData.type.value==undefined) {
        PopupService.showToast('请选择验证方式');
        return;
      }
      $ionicLoading.show();
      var param = {
        loginCode:$scope.modelData.loginCode,
        mobile:$scope.modelData.type.value
      }
      ForgetPassWordService.getYzCode(param)
        .success(function (response) {
          $ionicLoading.hide();
          if(response.code=='200'){
            //验证码
            $scope.modelData.verificationCode=response.verificationCode;
            $scope.modelData.corpCode=response.user.corpCode_;
            if($scope.modelData.type.value=='mobile'){ //手机号验证
              $scope.modelData.mobile=response.user.mobile;
            }else{                                        //邮箱验证
              $scope.modelData.mobile=response.user.email;
            }
            $state.go("validateCode",{data:$scope.modelData});
          }else{
           PopupService.showToast(response.message);
          }
        }).error(function (response) {
          $ionicLoading.hide();
          // 回调失败,隐藏进度条
          PopupService.showToast("网络错误.");
        });
    }
  }]);
Asset.service('ForgetPassWordService', ['$http', 'UrlService',function ($http, UrlService) {
  this.getYzCode = function(params) {
    return $http.post(UrlService.getUrlData('REGISTER_VERIFICTIONCODE'),params);
  }
}]);

