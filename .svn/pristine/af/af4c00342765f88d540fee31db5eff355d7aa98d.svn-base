/**
 * Created by ecodeadmin on 2016/11/2.
 */
Asset.controller('RemindController', ['$scope', '$state','$rootScope','$location', '$ionicHistory', '$stateParams','$ionicPlatform', '$ionicPopup',
  function ($scope, $state,$rootScope,$location, $ionicHistory, $stateParams,$ionicPlatform, $ionicPopup) {
    $scope.$on('$ionicView.enter', function () {
          $ionicHistory.clearHistory()
    });
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
    $scope.goBack = function () {
      $state.go("app.home.home1")
    };
  }]);

