/*
* Created by chenzhuo on 2018-11-5.
* */
Asset.controller('stockTakingCtrl', ['$scope', '$state', 'DataService', '$ionicHistory', 'stockTakingService', '$location', 'PopupService', '$rootScope','$ionicPopup', 'UserService', '$localstorage', '$ionicLoading',
  function ($scope, $state, DataService, $ionicHistory, stockTakingService, $location, PopupService, $rootScope,$ionicPopup, UserService, $localstorage, $ionicLoading) {
    $scope.$on('$ionicView.enter', function () {
      $scope.blank = true;
      $scope.getAssetList();
    });

    //盘点
    $scope.inventory = function () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          if (result.wasCancelled) {
            popup.loadMsg("departmentList");
          }
          $scope.modelData = {
            Result: result.text,
            Format: result.format,
            Cancelled: result.cancelled
          }
          $state.go('htmlPaly',{targetUrl:$scope.modelData.Result});
        },
        function (error) {
          alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: false, // iOS and Android
          showTorchButton: true, // iOS and Android 显示开起手电筒的按钮
          torchOn: false, // Android, launch with the torch switched on (if available)  默认开启手电筒
          prompt: "请将二维码放在扫描框中", // Android 提示信息
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 多久开始识别
          formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device 垂直还是水平
          // disableAnimations : true // iOS
        }
      );
    }
    //盘亏
    $scope.losses = function (e) {
    alert(e);
      var confirmPopup = $ionicPopup.confirm({
        title: '确定资产不在了吗？',
        okText: '确定',
        cancelText: '取消'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.getlossesList(e)
        } else {

        }
      });
    }
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    //获取盘点列表
    $scope.getlossesList = function (e) {
     alert(e);
        var params = {
          __sid: $localstorage.getObject('sid'),
          assetCode:e
        }
         stockTakingService.getlosses(params).success(function (response) {
        if(response.code="200"){
         PopupService.showToast("盘亏成功！");
         $state.go('Inventory');
        }else{
        PopupService.showToast("盘亏失败！");
        }
        }).error(function (response) {
        // 回调失败,隐藏进度条1
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
    //获取盘点列表
    $scope.getAssetList = function () {
      console.log(DataService.getData('allFilter'))
      if (DataService.getData('allFilter') == undefined || DataService.getData('allFilter') == null) {
        var params = {
          __sid: $localstorage.getObject('sid'),
          pageSize: 10000,
          userCode: UserService.getUser().refObj.empCode,
          pageNo: 1
        }
      } else {
        var params = {
          __sid: $localstorage.getObject('sid'),
          pageSize: 100,
          userCode: UserService.getUser().refObj.empCode,
          pageNo: 1,
          principalName: DataService.getData('allFilter').principalName,
          assetStd: DataService.getData('allFilter').assetStd,
          companyName: DataService.getData('allFilter').companyName,
          assetName: DataService.getData('allFilter').assetName,
        }
      }
      stockTakingService.getData(params)
        .success(function (response) {
          if (response.result == "login") {
            $state.go("login");
          }
          if (response.data.length == 0) {
            $scope.blank = false;
          } else {
            $scope.blank = true;
          }
          $scope.assetCardList1 = response.data[0].assetCheckDtlList;
          $scope.assetCardList = response.data;
        }).error(function (response) {
        // 回调失败,隐藏进度条1
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }


  }])

Asset.service('stockTakingService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getData = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_PROJECT_STAGE'), params);
  };
   this.getlosses = function (params) {
      return $http.post(UrlService.getUrlData_check('UPDATE_CHECKDTL'), params);
    };
}]);
