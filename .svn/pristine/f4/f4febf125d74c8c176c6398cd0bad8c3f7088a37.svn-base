Asset.controller('LoginCtrl', ['$scope', '$state', '$rootScope', '$location', 'LoginService','PopupService', 'UrlService','$localstorage', 'UserService', '$ionicLoading','$ionicHistory', 'DataService','$ionicPlatform','JPushService', '$ionicPopup',
  function ($scope, $state, $rootScope,$location, LoginService,PopupService, UrlService,$localstorage, UserService, $ionicLoading,$ionicHistory, DataService,$ionicPlatform,JPushService, $ionicPopup) {
    $scope.$on('$ionicView.enter', function () {
      $scope.isShowIntraduce = false;
      $scope.user = {
        userCode: '',
        username: $localstorage.get("LoginUsername"),
        password: $localstorage.get("LoginPassword"),
        savePwd: $localstorage.get("LoginSavePassword") == -1 ? false : true,
        typeList: DataService.getData('businessType'),
      }
      $ionicHistory.clearHistory()
    });

    //控制密码图片
    $scope.showPassword = function () {
      $scope.isShowPassword = true;
    };
    $scope.hidePassword = function () {
      $scope.isShowPassword = false;
    };

    $scope.loginin = function () {
      $ionicLoading.show();

      if ($scope.user.username == undefined || $scope.user.username.length == 0) {
        PopupService.showToast('请输入用户名');
        return;
      } else if ($scope.user.password == undefined || $scope.user.password.length == 0) {
        PopupService.showToast('请输入密码');
        return
      }

      var params = {
        username: $scope.user.username,
        password: DesUtils.encode($scope.user.password, 'cn,net,ecode'),//密码加密
        corpCode: $scope.businessCode//angula
      }

      LoginService.login(params)
        .success(function (response) {

          if (response.result) {
            UserService.setUser(response.user);
            $localstorage.set("LoginUsername", $scope.user.username);
            if ($scope.user.savePwd) {
              $localstorage.set("LoginSavePassword", 1);
              $localstorage.set("LoginPassword", $scope.user.password);
            } else {
              $localstorage.set("LoginSavePassword", -1);
              $localstorage.set("LoginPassword", '');
            }
            $localstorage.setObject("sid", response.sessionid);
            $ionicLoading.hide();
            $state.go("app.home.home1");
          }
          if (window.cordova) {
          JPushService.setAlias(UserService.getUser().id);
          }
        })
        .error(function (error) {
          PopupService.showToast('用户名或密码错误，请重新输入。');
        })
    };
    //忘记密码
    // $scope.goForgetPW = function () {
    //   $state.go('forgetPassWord', {loginCode: $scope.user.username});
    // }
    //获取公司企业码
    $scope.getBusinessCode = function () {
      var params = {
        loginCode: $scope.user.username,
      }
      LoginService.getBusinessCode(params)
        .success(function (response) {
          if(response.code==200){
            if(response.data==undefined){
              $scope.businessCode = '0';
              $scope.loginin();
            }else{
              $scope.businessCode = response.data;
              $scope.loginin();
            }
          }else if (response.code == 201) {
            $scope.businessCode = '0';
            $scope.loginin();
          }

        }).error(function (response) {
          // 回调失败,隐藏进度条
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          PopupService.showToast("网络错误.请稍后再试！");
        });
    },
         $ionicPlatform.registerBackButtonAction(function (e) {
                e.preventDefault();
                $rootScope.$broadcast('BackButtonAction');
                function showConfirm() {
                  var confirmPopup = $ionicPopup.confirm({
                    title: '固定资产',
                    template: '确定要退出吗？',
                    okText: '退出',
                    cancelText: '取消'
                  });
                  confirmPopup.then(function (res) {
                    if (res) {
                      ionic.Platform.exitApp();
                    } else {
                      // Don't close
                    }
                  });
                }
                            // Is there a page to go back to?
                            if ($location.path().indexOf("login") > -1) {
                              // 登录页按返回键
                              showConfirm();
                            } else if ($location.path().indexOf("app.home/") > -1) {
                              // 主页按返回键
                              showConfirm();
                            } else if ($ionicHistory.viewHistory().backView != null) {
                              $ionicHistory.goBack();
                            } else {
                              // This is the last page: Show confirmation popup
                              showConfirm();
                            }
                return false;
              }, 101);
  }]);


Asset.service('LoginService', ['$http', 'UrlService', function ($http, UrlService) {
  this.login = function (params) {
    var myUrl = UrlService.getUrlData_check("LOGIN") + "?__ajax=true&__login=true&param_deviceType=" +
      "mobileApp&__callback=JSON_CALLBACK&username=" + params.username + "&password=" + params.password + "&param_corpCode=" + params.corpCode;
    return $http.jsonp(myUrl);
  }

  //获取公司企业码
  this.getBusinessCode = function (params) {
    return $http.post(UrlService.getUrlData('GET_REGISTER_FINDLIST'), params);
  }
}]);
