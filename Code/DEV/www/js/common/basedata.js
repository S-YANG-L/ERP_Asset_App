/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('basedataCtrl', ['$scope', '$state', 'basedataService', '$ionicHistory', '$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, DepartmentListService, $ionicHistory, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
    });
    //返回
    $scope.goBack = function () {
      $state.go("app.home.home1")
    };
    $scope.assettype=function () {
      $state.go("selectAssetType")
    }
    $scope.officeFile=function () {
      $state.go("articlesFile")
    }
    $scope.wareHouse=function () {
      $state.go("warehouse")
    }

  }]);
Asset.service('basedataService', ['$http', 'UrlService', function ($http, UrlService) {

}]);

