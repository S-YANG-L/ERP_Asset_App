/**
 * Created by Administrator on 2016/11/14.
 */
Asset.controller('assetUsedSelectCtrl', ['$scope', '$state', 'assetUsedSelectService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams','UserService',
  function ($scope, $state, assetUsedSelectService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams,UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      //接受页面传值
      $scope.flowId = $stateParams.flowId;
      getData();
    });
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    //获取下一步审批人列表
    var getData = function () {
      var params = {
        sid: $localstorage.getObject('sid'),
        applicantCode:UserService.getUser().userCode,//申请人编码
        flowId:$scope.flowId,//工作流Id
        pageSize:'100'//分页（写死的）
      }
      assetUsedSelectService.getData(params)
        .success(function (response) {
          console.log('申请审批人列表');
          console.log(response);
          $scope.approvalList = response.list;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    }
    //选中审批人跳转申请页面
    $scope.approvalBill=function(selectApply){
      DataService.clearData("selectApply");//清除缓存
      DataService.setData("selectApply",selectApply);//将当前操作的数据存入数据缓存。
      $ionicHistory.goBack();
    }
  }]);
Asset.service('assetUsedSelectService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_APPROVAL_USEDINFO') + "?__sid=" + params['sid'] + "&applicantCode=" + params['applicantCode'] + "&flowId=" + params["flowId"] + "&pageSize=" + params["pageSize"]);
  }
}]);

