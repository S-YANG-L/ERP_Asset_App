/*
* Created by suyanglong on 2018-11-06.
* */
Asset.controller('home1Ctrl',['$scope', '$state', 'home1Service', '$location', 'PopupService', '$rootScope','$ionicHistory', 'UserService', '$localstorage','$ionicPlatform','$ionicPopup','$ionicLoading',
  function($scope, $state, home1Service, $location, PopupService, $rootScope,$ionicHistory, UserService, $localstorage,$ionicPlatform,$ionicPopup, $ionicLoading) {
    $scope.$on('$ionicView.enter', function () {
      $scope.roleCodes=UserService.getUser().refObj.roleCodes
      $ionicHistory.clearHistory()
    });

    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      if ($scope.playlists == null || $scope.playlists.length == 0 && $scope.playlists1== null || $scope.playlists1.length == 0) {
        // 部门
        if($scope.user.roleCodes=='101'){
          $scope.ifShow=true;
          $scope.ifShow1=true;
          $scope.playlists = [
            { title: '领用退库', id: 2 ,permission:'receive'},
            { title: '资产调拨', id: 3 ,permission:'BorrowReturn'},
            { title: '资产盘点', id: 4 ,permission:'assetAllot'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
          $scope.playlists1 = [
            { title: '办公用品领用', id: 2 ,permission:'outBound'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
        // 员工
        }else  if($scope.user.roleCodes=='123,0'){
          $scope.ifShow=true;
          $scope.ifShow1=true;
          $scope.playlists = [
            { title: '领用退库', id: 2 ,permission:'receive'},
            { title: '资产盘点', id: 4 ,permission:'assetAllot'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
          $scope.playlists1 = [
            { title: '办公用品领用', id: 2 ,permission:'outBound'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
          // 采购
        }else  if($scope.user.roleCodes=='104'){
          $scope.ifShow=true;
          $scope.ifShow1=true;
          $scope.playlists = [
            { title: '领用退库', id: 2 ,permission:'receive'},
            { title: '资产盘点', id: 4 ,permission:'assetAllot'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
          $scope.playlists1 = [
            { title: '办公用品领用', id: 2 ,permission:'outBound'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
          // 仓库
        }else  if($scope.user.roleCodes=='121'){
          $scope.ifShow=true;
          $scope.ifShow1=true;
          $scope.playlists = [
            { title: '领用退库', id: 2 ,permission:'receive'},
            { title: '资产盘点', id: 4 ,permission:'assetAllot'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
          $scope.playlists1 = [
            { title: '办公用品入库', id: 1 ,permission:'inOutBill'},
            { title: '办公用品领用', id: 2 ,permission:'outBound'},
              { title: '', id: 4 ,permission:'blank'},
          ];
          // 最高
        }else  if($scope.user.roleCodes=='100'){
          $scope.ifShow=true;
          $scope.ifShow1=true;
          $scope.playlists = [
            { title: '资产入库', id: 1 ,permission:'assetInto'},
            { title: '领用退库', id: 2 ,permission:'receive'},
            { title: '资产调拨', id: 3 ,permission:'BorrowReturn'},
            { title: '资产盘点', id: 4 ,permission:'assetAllot'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
          $scope.playlists1 = [
            { title: '办公用品入库', id: 1 ,permission:'inOutBill'},
            { title: '办公用品领用', id: 2 ,permission:'outBound'},
            { title: '即时库存查询', id: 3 ,permission:'inventory'}
          ];
          // 财务
        }else  if($scope.user.roleCodes=='122'){
          $scope.ifShow=true;
          $scope.ifShow1=true;
          $scope.playlists = [
            { title: '资产入库', id: 1 ,permission:'assetInto'},
            { title: '领用退库', id: 2 ,permission:'receive'},
            { title: '资产盘点', id: 4 ,permission:'assetAllot'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
          $scope.playlists1 = [
            { title: '办公用品领用', id: 2 ,permission:'outBound'},
            { title: '', id: 4 ,permission:'blank'},
            { title: '', id: 4 ,permission:'blank'},
          ];
        }

      }else {
        $scope.playlists==''
        $scope.playlists1==''
      }

    });
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
      console.log($scope.user)
    };
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
//跳转到配置应用controller页面
    $scope.goToItemPage = function (permission) {
      switch (permission) {
        case 'assetInto':
          $state.go("assets");
          break;
        case 'receive':
          $state.go("useRefund.assetUsedList");
          break;
        case 'BorrowReturn':
          $state.go("allocatIn");
          break;
        case 'assetAllot':
          $state.go("Inventory");
          break;
        case 'blank':
          $state.go("tripApply");
          break;
        case 'inOutBill':
          $state.go("app.inOutBillList");
          break;
          case 'outBound':
          $state.go("app.outBoundList");
          break;
          case 'inventory':
          $state.go("wareHouseList");
          break;
      }
      return;
    };
}]);

Asset.service('home1Service',['$http', 'UrlService', function ($http, UrlService) {

}]);
