/**
 * Created by Administrator on 2017/2/23.
 */
Asset.controller('personSettingController', ['$scope', '$state', 'personSettingService', '$rootScope','$ionicHistory', 'DataService', 'UserService', '$localstorage', 'PopupService', '$ionicPopup','$ionicLoading',
  function ($scope, $state, personSettingService, $rootScope,$ionicHistory, DataService, UserService, $localstorage, PopupService, $ionicPopup,$ionicLoading) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.getPushData();
      //获取手机型号  初始化modelData
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        $scope.disable=false;
      } else if (u.indexOf('iPhone') > -1) {//苹果手机
        $scope.disable=true;
      } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        $scope.disable=false;
      }
    });
    $scope.modelData={
      equipmentType:'',
      pushType:{
        weChat:false,
        Jpush:false,
      },
      billNotice:'',
      newsNotice:'',
    }
    $scope.goBack=function(){
      $state.go("app.home.home1")
    }
    //保存数据
    $scope.save=function(){
      // if($scope.modelData.equipmentType==null||$scope.modelData.equipmentType.length==0){
      //   PopupService.showToast('请选择设备类型');
      //   return;
      // }else
        if ($scope.modelData.pushType.weChat == false&&$scope.modelData.pushType.Jpush==false) {
        PopupService.showToast('请选择推送方式');
        return;
      }else if ($scope.modelData.billNotice == null||$scope.modelData.billNotice.length==0) {
        PopupService.showToast('请选择单据类推送方式');
        return;
      }else if ($scope.modelData.newsNotice == null||$scope.modelData.newsNotice.length==0) {
        PopupService.showToast('请选择消息类推送方式');
        return;
      }
      //推送设置类型 1微信推送  2极光推送  3微信+极光
       if($scope.modelData.pushType.weChat&&$scope.modelData.pushType.Jpush==false){
       var pushSettings='1';
       }else if($scope.modelData.pushType.weChat==false&&$scope.modelData.pushType.Jpush){
       var pushSettings='2';
       }else{
       var pushSettings='3';
       }
       var params= {
         receiverCode:UserService.getUser().userCode,
         receiverName:UserService.getUser().userName,
         deviceModel:$scope.modelData.equipmentType,//设备类型
         pushSettings:pushSettings,  //推送设置
         messageNotice:$scope.modelData.newsNotice,//单据类通知
         billNotice:$scope.modelData.billNotice,
         __sid: $localstorage.getObject('sid'),
       }
       console.log("参数打印");
       console.log(params);
       personSettingService.saveData(params)
       .success(function (response) {
       $ionicLoading.hide();
       PopupService.showToast('保存成功');
       $ionicHistory.goBack();
       }).error(function (response) {
       $ionicLoading.hide();
       PopupService.showToast("网络错误,请稍后再试");
       });
    }
    $scope.getPushData=function(){
      var params={
        // receiverCode:UserService.getUser().userCode,
        __sid: $localstorage.getObject('sid'),
      }
      personSettingService.getData(params)
        .success(function (response) {
          console.log('获取推送设置信息');
          console.log(response);
          $scope.pushSettingData=response.list[0];
          //初始化modelData
          if($scope.pushSettingData!=undefined){
            $scope.modelData.equipmentType=$scope.pushSettingData.deviceModel;
            $scope.modelData.billNotice=$scope.pushSettingData.billNotice;
            $scope.modelData.newsNotice=$scope.pushSettingData.messageNotice;
            if($scope.pushSettingData.pushSettings=='1'){
              $scope.modelData.pushType.weChat=true;
              $scope.modelData.pushType.Jpush=false;
            }else if($scope.pushSettingData.pushSettings=='2'){
              $scope.modelData.pushType.weChat=false;
              $scope.modelData.pushType.Jpush=true;
            }else{
              $scope.modelData.pushType.weChat=true;
              $scope.modelData.pushType.Jpush=true;
            }
          }
        }).error(function (response) {
          // 回调失败,隐藏进度条
          console.log(response);
          PopupService.showToast("网络错误.");
        });
    }
  }]);

Asset.service('personSettingService', ['$http', 'UrlService', function ($http, UrlService) {
  this.saveData = function (params) {//保存设置
    return $http.post(UrlService.getUrlData_check('SYS_PUSHSETTING'),params);
  }
  this.getData = function (params) {//获取设置
    return $http.post(UrlService.getUrlData_check('SYS_GETPUSHSETTING'),params);
  }

}]);

