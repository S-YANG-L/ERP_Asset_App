/**
 * Created by chenzhuo on 2018/11/8.
 */
Asset.controller('retreatingListCtrl', ['$scope', '$state', '$ionicHistory', '$ionicLoading', 'retreatingListService', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, $ionicHistory, $ionicLoading, retreatingListService, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      // 定义查询内容
      $scope.searchContent = '';
      $scope.currentPageNo = 0;
      $scope.getDate();
    });
    // 返回
    $scope.goBack = function () {

      $ionicHistory.goBack();
    };
    //获取数据字典
    $scope.getDate = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        corpCode: UserService.getUser().corpCode_
      };
      retreatingListService.getData1(params)
        .success(function (response) {
          $scope.officeList = response.page;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
    $scope.chioce = function (articlesFile) {
      console.log(articlesFile)
      DataService.clearData("articles");//清除缓存
      DataService.setData("articles", articlesFile);
      $ionicHistory.goBack();
    }
  }
]);
Asset.service('retreatingListService', ['$http', 'UrlService', function ($http, UrlService) {
  //获取退库子表数据
  this.getData1 = function (params) {
    return $http.post(UrlService.getUrlData_check('ARTICLES'), params);
  }
}]);
