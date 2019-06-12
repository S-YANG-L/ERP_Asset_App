/*
* Created by chenzhuo on 2018-10-25.
* */
Asset.controller('htmlPalyCtrl', ['$scope', '$state', 'DataService', '$ionicHistory','$sce','htmlPalyService','$stateParams', '$location', 'PopupService', '$rootScope', 'UserService', '$localstorage', '$ionicLoading',
  function ($scope, $state, DataService, $ionicHistory,$sce, htmlPalyService,$stateParams, $location, PopupService, $rootScope, UserService, $localstorage, $ionicLoading) {
    $scope.$on('$ionicView.enter', function () {
      $scope.target = $stateParams.targetUrl;
      $scope.targetUrl = $sce.trustAsResourceUrl($scope.target)
      console.log("code",$scope.targetUrl);
    });
    //返回
    $scope.goBack = function () {
      $state.go('app.home.home1');
    };
  }])
Asset.service('htmlPalyService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_PROJECT_STAGE'), params);
  };
}]);
