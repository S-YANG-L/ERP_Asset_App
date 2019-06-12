/**
 * Created by SuYangLong on 2018/10/8.
 */
Asset.controller('assetClassCtrl', ['$scope', '$state', '$ionicHistory', '$ionicLoading', 'assetClassService', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($scope, $state, $ionicHistory, $ionicLoading, assetClassService, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.sortCode=DataService.getData("assetTopcode")
      // 定义查询内容
      $scope.searchContent = '';
      $scope.getDate();
    });
    // 返回
    $scope.goBack = function () {

      $ionicHistory.goBack();
    };
    /**
     * 带出下一级
     * @param e
     */
    $scope.expandAsset = function(e){
      $scope.str1[e].isExpand = !$scope.str1[e].isExpand;
    };

    /*
   * 选中
   */
    $scope.selected = function (e) {
      console.log(e.sortName)
      DataService.clearData("assetClassName");//清除缓存
      DataService.clearData("assetClasscode");//清除缓存
      console.log("adsd",e);
      DataService.setData("assetClassName", e.sortName);
      DataService.setData("assetClassCode", e.sortCode);
      $ionicHistory.goBack();
    },
      //获取数据字典
      $scope.getDate = function () {
        var params = {
          __sid: $localstorage.getObject('sid'),
          corpCode: UserService.getUser().corpCode_,
          id:$scope.sortCode,
          // id:"FA_CARD_000000003"
        }
        assetClassService.getData1(params)
          .success(function (response) {
            $scope.officeList = response.data;
            var str = [];
            //一级
            var map = {}; // 1级
            var map2 = {}; // 2级
            //确定父子
            for (var i = 0; i < $scope.officeList.length; i++) {
              if($scope.officeList[i].parentCode == 0){
                map[$scope.officeList[i].id] = $scope.officeList[i];
                map[$scope.officeList[i].id].empList = [];
              }else{
                map2[$scope.officeList[i].id] = $scope.officeList[i];
                map2[$scope.officeList[i].id].empList = [];
              }
            }
            //将属于子数组插入map2中
            for (var i = 0; i < $scope.officeList.length; i++) {
              var asset = map2[$scope.officeList[i].parentCode];
              if(asset!=null && asset!="" && asset!=undefined){
                map2[$scope.officeList[i].parentCode].empList.push($scope.officeList[i]);
              }
            }
            // 将map2插入map父类
            for(var i in map2){
              map[map2[i].parentCode].empList.push(map2[i]);
            }
            //将map插入到str数组中
            for(var i in map){
              str.push(map[i])
            }
            $scope.str1 = str;
          }).error(function (response) {
          // 回调失败,隐藏进度条
          console.log(response);
          PopupService.showToast("网络错误.");
        });
    $scope.selectOriganization = function (selectOriganization) {
      DataService.clearData("origanizationList");//清除缓存
      DataService.setData("origanizationList", selectOriganization);
      $ionicHistory.goBack();
    }
    $scope.isGroupShown = function (group) {
      return group.isShow;
    };
  }}
  ]);
Asset.service('assetClassService', ['$http', 'UrlService', function ($http, UrlService) {
  //获取资产类别列表
  this.getData1 = function (params) {
    return $http.post(UrlService.getUrlData_check('ASSET_ASSETSORTLIST1'), params);
  }
}]);
