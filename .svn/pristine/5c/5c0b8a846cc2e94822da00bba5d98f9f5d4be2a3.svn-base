/**
 * Created by 封启航 on 2018/10/17.
 */
Asset.controller('BorrowReturnCtrl', ['$scope', '$state', 'borrowReturnService','UserService', '$ionicHistory', '$rootScope', 'DataService', '$localstorage', '$stateParams', 'PopupService', '$ionicScrollDelegate', '$filter', 'ionicDatePicker',
  function ($scope, $state, borrowReturnService,UserService, $ionicHistory, $rootScope, DataService, $localstorage, $stateParams, PopupService, $ionicScrollDelegate, $filter, ionicDatePicker) {
    $scope.blank = true;
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.getFlowID();
    });
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = true
      //接受页面传值
      $scope.leader = DataService.getData("ctTaskParam");
    });
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.modelData = {
      empName: '',
      beginDate: $filter('date')(new Date(), 'yyyy-MM-dd'), //开始日期
      endDate: $filter('date')(new Date(), 'yyyy-MM-dd'),   //结束日期

    }
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
      //to: new Date(), //结束日期

      // inputDate: $scope.modelData.overDate==undefined?new Date():new Date($scope.modelData.overDate),//默认显示日期
      mondayFirst: true,//周一是否是第一个

      disableWeekdays: [],//设置工作日

      closeOnSelect: false,       //可选,设置选择日期后是否要关掉界面。
      templateType: 'popup',
      dateFormat: 'yyyy-MM-dd'//Optional
    };
    //获取工作流模板
    $scope.getFlowID = function () {
      console.log(111111111)
      var params = {
        billType: 'ZCJYGH',//模板单据类型
        companyCode: UserService.getUser().refObj.companyCode,//申请人公司编码
        __sid: $localstorage.getObject('sid')
      }
      borrowReturnService.getFlowID(params)
        .success(function (response) {

          console.log('获取工作流模板');
          console.log(response);
          //工作流Id
          $scope.flowId = response.message;
          // getSelectApply();
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    };
    $scope.openDatePicker = function (date, beginEnd) {
      ipObj1.inputDate = new Date(date);
      ipObj1.callback = function (val) {
        var myDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
        if (beginEnd == 'beginDate') {
          $scope.modelData.beginDate = myDate;
        }
        if (beginEnd == 'endDate') {
          $scope.modelData.endDate = myDate;
        }
        //  $scope.getDateTime();
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };
    /********添加timePicker*******/
    $scope.openTimePicker = function (beginEnd) {
      var ipObj1 = {
        callback: function (val) {      //Mandatory
          if (typeof (val) === 'undefined') {
          } else {
            var selectedTime = new Date(val * 1000);
            var selectedTimeH = "" + selectedTime.getUTCHours();
            var selectedTimeF = "" + selectedTime.getUTCMinutes();
            if (selectedTimeH.length < 2) {
              selectedTimeH = "0" + selectedTime.getUTCHours();
            }
            if (selectedTimeF.length < 2) {
              selectedTimeF = "0" + selectedTime.getUTCMinutes();
            }
            var beginTime = selectedTimeH + ':' + selectedTimeF;
            if ($scope.punchData.status == 1) {
              if (beginTime > $scope.leaveEnd || beginTime < $scope.leaveBegin) {
                PopupService.showToast('请选择正确日期');
                $scope.modelData.beginTime = $scope.leaveBegin;
              } else if (beginTime >= $scope.leaveBegin) {
                $scope.modelData.beginTime = beginTime;
              }
            } else {
              if (beginTime > $scope.punchData.xbClock || beginTime < $scope.punchData.clockPunch) {
                PopupService.showToast('请选择正确日期');
                $scope.modelData.beginTime = $scope.punchData.clockPunch.substr(0, 5);
              } else if (beginTime >= $scope.punchData.clockPunch) {
                $scope.modelData.beginTime = beginTime;
              }
            }
          }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 30          //Optional
      };
      ionicTimePicker.openTimePicker(ipObj1);
    };
    $scope.openTimePicker2 = function (beginEnd) {
      var ipObj1 = {
        callback: function (val) {      //Mandatory
          if (typeof (val) === 'undefined') {
          } else {
            var selectedTime = new Date(val * 1000);
            var selectedTimeH = "" + selectedTime.getUTCHours();
            var selectedTimeF = "" + selectedTime.getUTCMinutes();
            if (selectedTimeH.length < 2) {
              selectedTimeH = "0" + selectedTime.getUTCHours();
            }
            if (selectedTimeF.length < 2) {
              selectedTimeF = "0" + selectedTime.getUTCMinutes();
            }
            var endTime = selectedTimeH + ':' + selectedTimeF;//2016-12-16 02:00
            if ($scope.punchData.status == 1) {
              if (endTime > $scope.leaveEnd || endTime < $scope.leaveBegin) {
                PopupService.showToast('请选择正确日期');
                $scope.modelData.endTime = $scope.leaveEnd;
              } else if (endTime <= $scope.leaveEnd) {
                $scope.modelData.endTime = endTime;
              }
            } else {
              if (endTime > $scope.punchData.xbClock || endTime < $scope.punchData.clockPunch) {
                PopupService.showToast('请选择正确日期');
                $scope.modelData.endTime = $scope.punchData.xbClock.substr(0, 5);
              } else if (endTime <= $scope.punchData.xbClock) {
                $scope.modelData.endTime = endTime;
              }
            }
          }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 30          //Optional
      };
      ionicTimePicker.openTimePicker(ipObj1);
    };
    //前往选择申请人员
    $scope.goSelectPerson = function () {
      $state.go('addOneMember');
    };

    // //进入详情
    // $scope.goDetail = function (item) {
    //   DataService.clearData("CurrBillInfo");//清除缓存
    //   DataService.setData("CurrBillInfo", item);//将当前操作的单据存入数据缓存。
    //   $state.go('borrowReturn');
    // }
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.currentPageNo = 0;
      $scope.getData(1);
    }

    // 上拉加载
    $scope.doLoadMore = function () {
      if ($scope.currentPageNo == 0)
        return;
      else {
        $scope.getData($scope.currentPageNo + 1);
      }
    };

    //提交申请
    $scope.toSubmit = function () {
      if ($scope.flowId == null || $scope.flowId == undefined || $scope.flowId.length == 0) {
        PopupService.showToast('请等待,还未获取到流程ID');
        return;
      }
      else if ($scope.modelData.type == null || $scope.modelData.type.length == 0) {
        PopupService.showToast('请选择报修类型');
        return;
      } else if ($scope.modelData.repairTime == null || $scope.modelData.repairTime.length == 0) {
        PopupService.showToast('请输入维修日期');
        return;
      } else if ($scope.modelData.depiction == null || $scope.modelData.depiction.length == 0) {
        PopupService.showToast('请输入故障描述');
        return;
      } else if (($scope.approval == null || $scope.approval.refName == 0) && $scope.approvalList != 0) {
        PopupService.showToast('请选择审批人');
        return;
      }
      $ionicLoading.show();
      $scope.type_BX = "";
      console.log("提交信息");
      console.log(JSON.stringify($scope.modelData.imageList));
      //alert(JSON.stringify($scope.modelData.imageList));

      for (var i = 0; i < $scope.modelData.imageList.length; i++) {
        $scope.type_BX += $scope.modelData.imageList[i].fUserlist;
        // alert($scope.type_BX);
        if (i < $scope.modelData.imageList.length - 1) {
          $scope.type_BX += ',';
        }
      }
      var param = {
        borrowerName: $scope.modelData.type.userName,//借用人
        borrowDate: $scope.modelData.type.beginDate,//借用日期
        expectedReturnDate:$scope.modelData.type.endDate,//预计归还日期
        approval: DataService.getData('selectApply') == undefined ? '' : DataService.getData('selectApply').userCode,
        approvalName: DataService.getData('selectApply') == undefined ? '' : DataService.getData('selectApply').userName,
        __sid: $localstorage.getObject('sid'),
        flowBusinessId: $scope.flowId,//工作流FlowID~
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
        sysCode: $scope.modelData.sysCode == undefined ? null : $scope.modelData.sysCode,
        type_BXIU: $scope.type_BX
      }
      console.log('-----参数打印------');
      console.log(param);
      borrowReturnService.submitData(param)
        .success(function (response) {
          console.log('报修申请提交');
          if (response.code == 200) {
            $ionicLoading.hide();
            console.log(response);
            $scope.goBack();
            DataService.clearData('pictureListRE');
            DataService.clearData('repairApply');
            DataService.clearData('repairCache');
            PopupService.showToast('保存成功');
            $state.go('tab.app');
          } else if (response.code == 201) {
            $ionicLoading.hide();
            console.log(response);
            PopupService.showToast('保存失败');
          }
        }).error(function (response) {
        $ionicLoading.hide();
        PopupService.showToast('网络错误,请稍后重试.');
      });
    }
  }]);
Asset.service('borrowReturnService', ['$http', 'UrlService', function ($http, UrlService) {
 this.toSubmit=function (params) {
   return $http.post(UrlService.getUrlData_check('ASSET_BORROW'),params)

 }
  this.getFlowID = function (params) {                                                    //获取工作流flowID
    return $http.post(UrlService.getUrlData_check('GET_FLOW_TEMPLATE'), params);
}}]);


