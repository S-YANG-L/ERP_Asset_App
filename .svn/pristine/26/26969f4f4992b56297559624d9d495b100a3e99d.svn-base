Asset.controller('ReturnListController', ['$scope', '$state', 'homeService', '$location', 'PopupService', '$rootScope', 'UserService', '$localstorage', '$ionicLoading',
  function ($scope, $state, homeService, $location, PopupService, $rootScope, UserService, $localstorage, $ionicLoading) {//页面加载
    $scope.$on('$ionicView.enter', function () {
    });
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.currentPageNo = 0;
      getData(1);
    }
    $scope.item1 = [
      {
        beginDate: '2018-10-11',
        empName: '周星驰',
        guDate: '3099-9-9',
        endDate: '2099-9-9'

      },
      {
        beginDate: '2018-10-12',
        empName: '王祖贤',
        guDate: '3088-8-8',
        endDate: '3088-8-8'
      },
      {
        beginDate: '2018-11-11',
        empName: '封启航',
        guDate: '3111-1-1',
        endDate: '3111-1-1'
      }

    ]
    $scope.districts = [
      {code: '01', name: '条码正序'},
      {code: '02', name: '条码倒序'},
      {code: '03', name: '购入日期正序'},
      {code: '04', name: '购入日期倒序'},
    ]
    // 上拉加载
    $scope.doLoadMore = function () {
      console.log($scope.currentPageNo)
      if ($scope.currentPageNo == 0)
        return;
      else {
        getData($scope.currentPageNo + 1);
      }

    };
  }])
