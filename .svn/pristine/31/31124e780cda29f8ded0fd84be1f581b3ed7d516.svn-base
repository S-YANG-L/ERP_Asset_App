/**
 * Created by 封启航 on 2018/10/18
 */
Asset.controller('repairCtrl', ['$ionicActionSheetRecording', 'UrlService', 'UserService', '$scope', '$state', '$ionicLoading', 'assetsUseService', '$localstorage', '$ionicHistory', '$cordovaImagePicker', '$ionicActionSheet', 'httpUtil', 'PopupService', '$filter', 'ionicDatePicker', 'ionicTimePicker', '$cordovaCamera', 'DataService',
  function ($ionicActionSheetRecording, UrlService, UserService, $scope, $state, $ionicLoading, assetsUseService, $localstorage, $ionicHistory, $cordovaImagePicker, $ionicActionSheet, httpUtil, PopupService, $filter, ionicDatePicker, ionicTimePicker, $cordovaCamera, DataService) {
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    //新增
    $scope.goAdd = function () {
      $state.go("addAsset");
    };
    $scope.districts = [
      {code:'1',name:'11111'},
    {code:'2',name:'2222'}
    ]
    //进入页面后初始化页面
    $scope.$on('$ionicView.beforeEnter', function () {
      //获取工作流模板
      $scope.getFlowID();
    });
    //获取工作流模板
    $scope.getFlowID = function () {
      var params = {
        billType: 'ZCLY',//模板单据类型
        companyCode: UserService.getUser().refObj.companyCode,//申请人公司编码
        __sid: $localstorage.getObject('sid')
      }
      assetsUseService.getFlowID(params)
        .success(function (response) {
          //工作流Id
          $scope.flowId = response.message;
          getSelectApply();
        }).error(function (response) {
        // 回调失败,隐藏进度条
        PopupService.showToast("网络错误.");
      });
    }
    //获取审批人物的方法
    var getSelectApply = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
        applicantCode: UserService.getUser().userCode,//申请人编码
        flowId: $scope.flowId,//工作流Id
        pageSize: '100'//分页（写死的）
      }
      assetsUseService.getSelectApply(params)
        .success(function (response) {
          $scope.approvalList = response.list.length;
          $scope.approvalList = response.list;
          console.log($scope.approvalList);
        }).error(function (response) {
        // 回调失败,隐藏进度条
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    }
    $scope.$on('$ionicView.enter', function () {
      $scope.searchContent = '';
      //接受页面传值
      // getData();
      $scope.leader = DataService.getData("ctTaskParam");
      $scope.company = DataService.getData("selectCompany");
      $scope.department = DataService.getData("departmentList");
      //领用日期
      var ipObj1 = {
        callback: function (val) {
        },
        disabledDates: [            //Optional
          new Date(2016, 2, 16),
          new Date(2015, 3, 16),
          new Date(2015, 4, 16),
          new Date(2015, 5, 16),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-16-2016"),
          new Date(1439676000000)
        ],
        //to: new Date(), //结束日期?
        // inputDate: $scope.modelData.overDate==undefined?new Date():new Date($scope.modelData.overDate),//默认显示日期
        mondayFirst: true,//周一是否是第一个?
        disableWeekdays: [],//设置工作日?
        closeOnSelect: false,       //可选,设置选择日期后是否要关掉界面。
        templateType: 'popup',
        dateFormat: 'yyyy-MM-dd'//Optional
      };
      $scope.openDatePicker = function () {
        ipObj1.inputDate = new Date($scope.modelData.useBeginDate);
        ipObj1.callback = function (val) {
          $scope.modelData.useBeginDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
        };
        ionicDatePicker.openDatePicker(ipObj1);
      };
      //预计退还日期
      /********添加datePicker*******/
      var ipObj2 = {
        callback: function (val) {
        },
        disabledDates: [            //Optional
          new Date(2016, 2, 16),
          new Date(2015, 3, 16),
          new Date(2015, 4, 16),
          new Date(2015, 5, 16),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-16-2016"),
          new Date(1439676000000)
        ],
        //to: new Date(), //结束日期?
        // inputDate: $scope.modelData.overDate==undefined?new Date():new Date($scope.modelData.overDate),//默认显示日期
        mondayFirst: true,//周一是否是第一个?
        disableWeekdays: [],//设置工作日?
        closeOnSelect: false,       //可选,设置选择日期后是否要关掉界面。
        templateType: 'popup',
        dateFormat: 'yyyy-MM-dd'//Optional
      };
      $scope.openDatePicker1 = function () {
        ipObj2.inputDate = new Date($scope.modelData.useEndDate);
        ipObj2.callback = function (val) {
          $scope.modelData.useEndDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
        };
        ionicDatePicker.openDatePicker(ipObj2);
      };

    });
    var date = new Date();
    $scope.modelData = {
      useBeginDate: date,//领用日期
      useEndDate: date,//预计归还时间
    };


    //前往选择申请人员
    $scope.goSelectPerson = function () {
      $state.go('addOneMember');
    };
    //前往选择申请公司
    $scope.goSelectCompany = function () {
      $state.go('selectFirm');
    };
//菜单栏展开|折叠
    $scope.toggleGroup = function (e) {
      for (var i = 0; i < $scope.btypeInfoList.length; i++) {
        if (i == e) {
          $scope.btypeInfoList[i].isShow = !$scope.btypeInfoList[i].isShow;
        } else {
          $scope.btypeInfoList[i].isShow = false;
        }
      }
    };

    $scope.isGroupShown = function (group) {
      return group.isShow;
    };


    //显示或隐藏详情
    $scope.toggle = function (item) {

      $scope.myVar = !$scope.myVar;
    };
    // 选择领用处理人
    $scope.addPer = function () {
      $state.go('app.addOneMember');
    };


  }]);
Asset.service('repairCtrl', ['$http', 'UrlService', function ($http, UrlService) {
  this.getFlowID = function (params) {//获取工作流flowID
    return $http.post(UrlService.getUrlData_check('GET_FLOW_TEMPLATE'), params);
  };
  this.getSelectApply = function (params) {//获取工作流flowID
    return $http.post(UrlService.getUrlData_check('GET_APPROVAL_LIST'), params);
  };

}]);







