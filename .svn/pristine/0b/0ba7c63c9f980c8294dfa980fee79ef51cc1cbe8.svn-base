/**
 * Created by Administrator on 2016/11/3.
 */
Asset.controller('addAllocatCtrl', ['$ionicLoading','$ionicPlatform', '$scope', '$state', 'addAllocatService', '$ionicPopup', '$ionicHistory', '$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService', '$filter', 'ionicDatePicker',
  function ($ionicLoading,$ionicPlatform, $scope, $state, addAllocatService, $ionicPopup, $ionicHistory, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService, $filter, ionicDatePicker) {
    $scope.approval = {}//清除缓存
    $scope.$on('$ionicView.enter', function () {
      //选择审批人姓名
      $scope.step = "";//审批步骤
      $scope.stepType = ""; //是不是审批进入
      $scope.ApprovalType = "0"; //是不是终审
      $scope.approval = DataService.getData('selectApply');
      if (DataService.getData('CurrBillInfoApprove') != undefined || DataService.getData('CurrBillInfoApprove') != null) {
        $scope.stepType = "Approve";
      } else {
        $scope.stepType = "";
      }
      if (DataService.getData('CurrBillInfoApprove') != undefined || DataService.getData('CurrBillInfoApprove') != null) {
        var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
        $scope.step = billInfo.step;
      }else{
        $scope.step = "0";//审批步骤
      }
      //获取工作流模板
      $scope.getFlowID();
    });

    // 领用日期
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
      mondayFirst: true,//周一是否是第一个?
      disableWeekdays: [],//设置工作日?
      closeOnSelect: false,       //可选,设置选择日期后是否要关掉界面。
      templateType: 'popup',
      dateFormat: 'yyyy-MM-dd'//Optional
    };

    $scope.openDatePicker = function () {
      ipObj1.inputDate = new Date($scope.modelData.addAllocatDate);
      ipObj1.callback = function (val) {
        $scope.modelData.addAllocatDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };



    //返回
    $scope.goBack = function () {
      DataService.clearData("selectApply  ");
      DataService.clearData("CurrBillInfoApprove  ");
      DataService.clearData('addAllocatCache')
      DataService.clearData("dictTypeCode");
      DataService.clearData('dictTypeName')
      DataService.clearData("departmentListCode")
      DataService.clearData("departmentListName")
      DataService.clearData("chose")
      DataService.clearData("addAllocat")
      DataService.clearData("allocatApprove")
      DataService.clearData("addAllocatmodelData")
      DataService.clearData("publicType")
      $ionicHistory.goBack();
    };
    $ionicPlatform.registerBackButtonAction(function (e) {
      DataService.clearData("addAllocat");
      DataService.clearData("selectApply");
      DataService.clearData('CurrBillInfoApprove')
      DataService.clearData('addAllocatCache')
      DataService.clearData('allocatApprove')
      DataService.clearData("dictTypeCode")
      DataService.clearData("dictTypeName")
      DataService.clearData("departmentListCode")
      DataService.clearData("departmentListName")
      DataService.clearData("addAllocatmodelData")
      DataService.clearData("chose")
      DataService.clearData("publicType")
      $ionicHistory.goBack();
    }, 101);


    //判断选择审批人是否为空
    var getSelectApply = function () {
      var params = {
        sid: $localstorage.getObject('sid'),
        applicantCode: UserService.getUser().userCode,//申请人编码
        flowId: $scope.flowId,//工作流Id
        pageSize: '100'//分页（写死的）
      }
      addAllocatService.getSelectApply(params)
        .success(function (response) {
          $scope.approvalList = response.list.length;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    }

    //判断选择审批人是否为空
    var getNextSelectApply = function () {
      var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
      var params = {
        bizKey: billInfo.bizKey,
        step: billInfo.step,//第几步
        sid: $localstorage.getObject('sid')
      }
      //判断是否有下一步审批人
      addAllocatService.getNextFlowBusiness(params)
        .success(function (response) {
          // 回调成功,处理返回值
          if (response.code == "200") {
            if (response.data.hasNextStep) {
              //跳转到选择审批人画面
              $ionicLoading.hide();
            }
            else {
              $scope.ApprovalType = "1"; //是不是终审
              $ionicLoading.hide();
            }
          }
        }).error(function (response) {
        // 回调失败,隐藏进度条
        $ionicLoading.hide();
        PopupService.showToast("网络错误.");
      });
    }
    if (DataService.getData('addAllocatCache') != undefined || DataService.getData('addAllocatCache') != null) {
      console.log("-------------------重新提交",DataService.getData('addAllocatCache'))
      $scope.step = "0";
      // $scope.modelData = DataService.getData('addAllocatCache');
      var date = new Date();
      $scope.modelData = {
        id:DataService.getData('addAllocatCache').id,
        approvalStatus: DataService.getData('addAllocatCache').approvalStatus,
        operatorCode:DataService.getData('addAllocatCache').operatorCode,
        operatorName:DataService.getData('addAllocatCache').operatorName,
        officeCode:DataService.getData('addAllocatCache').officeCode,
        officeName: DataService.getData('addAllocatCache').officeName,
        allotDate: date,
        allotTypeCode: DataService.getData('dictTypeCode')== undefined?DataService.getData('addAllocatCache').allotTypeCode:DataService.getData('dictTypeCode'),
        allotTypeName:DataService.getData('dictTypeName')== undefined?DataService.getData('addAllocatCache').allotTypeName:DataService.getData('dictTypeName'),
        allotOfficeCode:DataService.getData('departmentListCode')== undefined?DataService.getData('addAllocatCache').allotOfficeCode:DataService.getData('departmentListCode'),
        allotOfficeName:DataService.getData('departmentListName')== undefined?DataService.getData('addAllocatCache').allotOfficeName:DataService.getData('departmentListName'),
        remarks:DataService.getData('addAllocatCache').remarks,
        isNewRecord: false
      };
      if(DataService.getData('addAllocatCache').assetAllotDtlList != undefined){
        $scope.itemsApprove = DataService.getData('addAllocatCache').assetAllotDtlList;
        for (var i = 0; i < $scope.itemsApprove.length; i++) {
          if (i == 0) {
            $scope.items = [{
              detailId: 1,
              sortCode: $scope.itemsApprove[i].sortCode,//类别编码
              sortName: $scope.itemsApprove[i].sortName,//类别名称
              assetCode: $scope.itemsApprove[i].assetCode,//资产名称
              assetName: $scope.itemsApprove[i].assetName,//资产编码
              brand: $scope.itemsApprove[i].brand,//品牌名称
              version: $scope.itemsApprove[i].version,//规格型号
              unitPrice: $scope.itemsApprove[i].unitPrice,//单价
              unit: $scope.itemsApprove[i].unit,//计量单位
              isNewRecord: true,
            }];
          } else {
            var itemsMode = {
              detailId: i + 1,
              sortCode: $scope.itemsApprove[i].sortCode,//类别编码
              sortName: $scope.itemsApprove[i].sortName,//类别名称
              assetCode: $scope.itemsApprove[i].assetCode,//资产名称
              assetName: $scope.itemsApprove[i].assetName,//资产编码
              brand: $scope.itemsApprove[i].brand,//品牌名称
              version: $scope.itemsApprove[i].version,//规格型号
              unitPrice: $scope.itemsApprove[i].unitPrice,//单价
              unit: $scope.itemsApprove[i].unit,//计量单位
              isNewRecord: true
            }
            $scope.items.push(itemsMode);
          }
        }
      }else{
        $scope.chose = DataService.getData("chose")
        if ($scope.chose != null) {
          if (DataService.getData("addAllocat") == undefined || DataService.getData("addAllocat") == '') {
            $scope.items = [{
              detailId: 1,
              sortCode: $scope.chose.sortCode,//资产编码
              sortName: $scope.chose.sortName,//资产类别
              assetCode: $scope.chose.assetCode,//资产名称
              assetName: $scope.chose.assetName,//资产名称
              brand: $scope.chose.brand,//品牌名称
              version: $scope.chose.version,//型号
              unitPrice: $scope.chose.unitPrice,//单价
              unit: $scope.chose.unit,//计量单位
              isNewRecord: true
            }];
          } else {
            $scope.items = DataService.getData("addAllocat");
            var number = $scope.items[$scope.items.length - 1].detailId + 1;
            var itemsMode = {
              detailId: number,
              sortCode: $scope.chose.sortCode,//资产编码
              sortName: $scope.chose.sortName,//资产类别
              assetCode: $scope.chose.assetCode,//资产名称
              assetName: $scope.chose.assetName,//资产名称
              brand: $scope.chose.brand,//品牌名称
              version: $scope.chose.version,//型号
              unitPrice: $scope.chose.unitPrice,//单价
              unit: $scope.chose.unit,//计量单位
              isNewRecord: true
            }
            $scope.items.push(itemsMode);
          }
        }else{
          $scope.items = DataService.getData("addAllocat");
        }
      }
    } else if (DataService.getData('allocatApprove') != undefined || DataService.getData('allocatApprove') != null) {
      console.log("-------------------审批",DataService.getData('allocatApprove'))
      $scope.stepType = "Approve";
      $scope.step="1";
      $scope.modelData = DataService.getData('allocatApprove');
      $scope.modelData.isNewRecord = false;
      $scope.itemsApprove = DataService.getData('allocatApprove').assetAllotDtlList;
      for (var i = 0; i < $scope.itemsApprove.length; i++) {
        if (i == 0) {
          $scope.items = [{
            detailId: 1,
            sortCode: $scope.itemsApprove[i].sortCode,//类别编码
            sortName: $scope.itemsApprove[i].sortName,//类别名称
            assetCode: $scope.itemsApprove[i].assetCode,//资产名称
            assetName: $scope.itemsApprove[i].assetName,//资产编码
            brand: $scope.itemsApprove[i].brand,//品牌名称
            version: $scope.itemsApprove[i].version,//规格型号
            unitPrice: $scope.itemsApprove[i].unitPrice,//单价
            unit: $scope.itemsApprove[i].unit,//计量单位
            isNewRecord: true,
          }];
        } else {
          var itemsMode = {
            detailId: i + 1,
            sortCode: $scope.itemsApprove[i].sortCode,//类别编码
            sortName: $scope.itemsApprove[i].sortName,//类别名称
            assetCode: $scope.itemsApprove[i].assetCode,//资产名称
            assetName: $scope.itemsApprove[i].assetName,//资产编码
            brand: $scope.itemsApprove[i].brand,//品牌名称
            version: $scope.itemsApprove[i].version,//规格型号
            unitPrice: $scope.itemsApprove[i].unitPrice,//单价
            unit: $scope.itemsApprove[i].unit,//计量单位
            isNewRecord: true
          }
          $scope.items.push(itemsMode);
        }
      }
      $scope.chose = DataService.getData("chose")
      if ($scope.chose != null) {
        if (DataService.getData("addAllocat") == undefined || DataService.getData("addAllocat") == '') {
          $scope.items = [{
            detailId: 1,
            sortCode: $scope.chose.sortCode,//资产编码
            sortName: $scope.chose.sortName,//资产类别
            assetCode: $scope.chose.assetCode,//资产名称
            assetName: $scope.chose.assetName,//资产名称
            brand: $scope.chose.brand,//品牌名称
            version: $scope.chose.version,//型号
            unitPrice: $scope.chose.unitPrice,//单价
            unit: $scope.chose.unit,//计量单位
            isNewRecord: true
          }];
        } else {
          $scope.items = DataService.getData("addAllocat");
          var number = $scope.items[$scope.items.length - 1].detailId + 1;
          var itemsMode = {
            detailId: number,
            sortCode: $scope.chose.sortCode,//资产编码
            sortName: $scope.chose.sortName,//资产类别
            assetCode: $scope.chose.assetCode,//资产名称
            assetName: $scope.chose.assetName,//资产名称
            brand: $scope.chose.brand,//品牌名称
            version: $scope.chose.version,//型号
            unitPrice: $scope.chose.unitPrice,//单价
            unit: $scope.chose.unit,//计量单位
            isNewRecord: true
          }
          $scope.items.push(itemsMode);
        }
      }
    } else {
      console.log("-------------------新增")
      $scope.step = "0";
      var date = new Date();
      $scope.modelData = {
        operatorCode: UserService.getUser().refObj.empCode,
        operatorName: UserService.getUser().refObj.empName,
        officeCode: UserService.getUser().refObj.officeCode,
        officeName: UserService.getUser().refObj.officeName,
        companyCode: UserService.getUser().refObj.companyCode,
        companyName: UserService.getUser().refObj.companyNameSimple,
        allotDate: date,
        allotCompanyName:DataService.getData("addAllocatmodelData") == undefined ? null : DataService.getData("addAllocatmodelData").allotCompanyName,
        allotTypeCode: DataService.getData("dictTypeCode"),
        allotTypeName: DataService.getData("dictTypeName"),
        allotOfficeCode: DataService.getData("departmentListCode"),
        allotOfficeName: DataService.getData("departmentListName"),
        addAllocatDate: $filter('date')(new Date(), 'yyyy-MM-dd'),
        remarks: DataService.getData("addAllocatmodelData") == undefined ? null : DataService.getData("addAllocatmodelData").remarks,
        isNewRecord: true
      };
      $scope.chose = DataService.getData("chose")//缓存
      if ($scope.chose != null) {
        if (DataService.getData("addAllocat") == undefined || DataService.getData("addAllocat") == '') {
          $scope.items = [{
            detailId: 1,
            sortCode: $scope.chose.sortCode,//资产编码
            sortName: $scope.chose.sortName,//资产类别
            assetCode: $scope.chose.assetCode,//资产名称
            assetName: $scope.chose.assetName,//资产名称
            brand: $scope.chose.brand,//品牌名称
            version: $scope.chose.version,//型号
            unitPrice: $scope.chose.unitPrice,//单价
            unit: $scope.chose.unit,//计量单位
            isNewRecord: true
          }];
        } else {
          $scope.items = DataService.getData("addAllocat");
          var number = $scope.items[$scope.items.length - 1].detailId + 1;
          var itemsMode = {
            detailId: number,
            sortCode: $scope.chose.sortCode,//资产编码
            sortName: $scope.chose.sortName,//资产类别
            assetCode: $scope.chose.assetCode,//资产名称
            assetName: $scope.chose.assetName,//资产名称
            brand: $scope.chose.brand,//品牌名称
            version: $scope.chose.version,//型号
            unitPrice: $scope.chose.unitPrice,//单价
            unit: $scope.chose.unit,//计量单位
            isNewRecord: true
          }
          $scope.items.push(itemsMode);
        }
      }else{
        $scope.items = DataService.getData("addAllocat");
      }
    }

    //  选择调拨类型
    $scope.choiceDictType = function () {
      DataService.clearData("addAllocatmodelData")
      DataService.setData("addAllocatmodelData", $scope.modelData);
      DataService.clearData("chose")
      DataService.clearData("addAllocat");
      DataService.setData("addAllocat", $scope.items)
      if (DataService.getData('addAllocatCache') != undefined || DataService.getData('addAllocatCache') != null) {
        DataService.clearData("addAllocatCache");
         DataService.setData("addAllocatCache", $scope.modelData)
      }
      $state.go("dictType")
    }


    //选择调拨后部门
    $scope.goSelectdepartment = function () {
      DataService.clearData("addAllocatmodelData")
      DataService.setData("addAllocatmodelData", $scope.modelData);
      DataService.clearData("chose")
      DataService.clearData("addAllocat");
      DataService.setData("addAllocat", $scope.items)
      if (DataService.getData('addAllocatCache') != undefined || DataService.getData('addAllocatCache') != null) {
        DataService.clearData("addAllocatCache");
        DataService.setData("addAllocatCache", $scope.modelData)
      }
      $state.go("departmentList")
    }

    //领用类型赋值
    if (DataService.getData('publicType') != undefined || DataService.getData('publicType') != null) {
      $scope.modelData.name = DataService.getData('publicType').name;
      $scope.modelData.value = DataService.getData('publicType').value;
    }

    //  confirm 对话框和删除
    $scope.showConfirm = function (detailId) {
      var confirmPopup = $ionicPopup.confirm({
        title: '是否删除',
        okText: '是',
        cancelText: '否'
        //template: 'Are you sure you want to eat this ice cream?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.items.splice(detailId - 1, 1);
          for (var i = detailId - 1; i < $scope.items.length; i++) {
            $scope.items[detailId - 1].detailId = i + 1;
          }
        } else {
        }
      });
    };

    //提交申请
    $scope.toSubmit = function () {
      if ($scope.modelData.allotTypeName=='调拨到部门') {
        if (($scope.approval == null || $scope.approval.refName == 0) && $scope.approvalList != 0) {
          PopupService.showToast('请选择审批人');
          return;
        }
      }
      if ($scope.flowId == null || $scope.flowId == undefined || $scope.flowId.length == 0) {
        PopupService.showToast('请等待,还未获取到流程ID');
        return;
      } else if ($scope.modelData.operatorCode == null || $scope.modelData.operatorCode.length == 0) {
        PopupService.showToast('申请人不能为空');
        return;
      } else if ($scope.modelData.allotDate == null || $scope.modelData.allotDate.length == 0) {
        PopupService.showToast('请选择申请时间');
        return;
      }else if ($scope.modelData.officeName == $scope.modelData.allotOfficeName) {
        PopupService.showToast('调拨后部门不能与原部门相同');
        return;
      }else if ($scope.items == undefined ||$scope.items=='') {
        PopupService.showToast('请选择资产');
        return;
      }
      $ionicLoading.show();
      if ($scope.modelData.allotTypeName=='调拨到部门') {
        var param = {
          isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
          id: $scope.modelData.id == undefined ? null : $scope.modelData.id,
          operatorCode: $scope.modelData.operatorCode,//申请人
          operatorName: $scope.modelData.operatorName,//申请人编码
          allotDate: $filter('date')($scope.modelData.allotDate, 'yyyy-MM-dd'),//申请时间
          office: UserService.getUser().refObj.officeCode,  //部门编码
          officeName: $scope.modelData.officeName,  //部门名称
          allotOfficeCode: $scope.modelData.allotOfficeCode,  //部门编码
          allotOfficeName: $scope.modelData.allotOfficeName,  //部门名称
          step: "",
          allotTypeCode: $scope.modelData.allotTypeCode,//调拨类型编码
          allotTypeName: $scope.modelData.allotTypeName,//调拨类型名称
          approvalCode: $scope.approval.refCode==undefined ? '':$scope.approval.refCode,
          approvalName: $scope.approval.refName==undefined ? '':$scope.approval.refName,
          allotCompanyName:$scope.modelData.allotCompanyName,
          remarks: $scope.modelData.remarks,
          assetAllotDtl: JSON.stringify($scope.items),//明细数据
          approvalStatus:$scope.modelData.approvalStatus == undefined ? "1": $scope.modelData.approvalStatus,
          __sid: $localstorage.getObject('sid'),
          flowId: $scope.flowId,//工作流FlowID~
        };
      }else{
        var param = {
          isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
          id: $scope.modelData.id == undefined ? null : $scope.modelData.id,
          operatorCode: $scope.modelData.operatorCode,//申请人
          operatorName: $scope.modelData.operatorName,//申请人编码
          allotDate: $filter('date')($scope.modelData.allotDate, 'yyyy-MM-dd'),//申请时间
          office: UserService.getUser().refObj.officeCode,  //部门编码
          officeName: $scope.modelData.officeName,  //部门名称
          allotOfficeCode: $scope.modelData.allotOfficeCode,  //部门编码
          allotOfficeName: $scope.modelData.allotOfficeName,  //部门名称
          step: "",
          allotTypeCode: $scope.modelData.allotTypeCode,//调拨类型编码
          allotTypeName: $scope.modelData.allotTypeName,//调拨类型名称
          allotCompanyName:$scope.modelData.allotCompanyName,
          remarks: $scope.modelData.remarks,
          assetAllotDtl: JSON.stringify($scope.items),//明细数据
          approvalStatus:$scope.modelData.approvalStatus == undefined ? "1": $scope.modelData.approvalStatus,
          __sid: $localstorage.getObject('sid'),
          flowId: $scope.flowId,//工作流FlowID~
        };
      }
      addAllocatService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            DataService.clearData("selectApply  ");
            DataService.clearData("CurrBillInfoApprove  ");
            DataService.clearData('addAllocatCache')
            DataService.clearData("dictTypeCode");
            DataService.clearData('dictTypeName')
            DataService.clearData("departmentListCode")
            DataService.clearData("departmentListName")
            DataService.clearData("chose")
            DataService.clearData("addAllocat")
            DataService.clearData("allocatApprove")
            DataService.clearData("addAllocatmodelData")
            DataService.clearData("publicType")
            $state.go('app.home.home1');//跳转至待办业务
            if ($scope.modelData.allotTypeName == "调拨到部门") {
              PopupService.showToast('提交申请成功!');
            } else if ($scope.modelData.allotTypeName == "调拨到新单位") {
              PopupService.showToast('调拨成功!')
            } else {
              PopupService.showToast('捐献成功!')
            }
          } else if (response.code == 201) {
            $ionicLoading.hide();
            PopupService.showToast('提交失败');
          }
        }).error(function (response) {
        $ionicLoading.hide();
        PopupService.showToast('网络错误,请稍后重试.');
      });
    };




    //审批同意
    $scope.goApproval = function () {
      var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
      if ($scope.flowId == null || $scope.flowId == undefined || $scope.flowId.length == 0) {
        PopupService.showToast('请等待,还未获取到流程ID');
        return;
      } else if ($scope.modelData.operatorCode == null || $scope.modelData.operatorCode.length == 0) {
        PopupService.showToast('申请人不能为空');
        return;
      } else if ($scope.modelData.allotDate == null || $scope.modelData.allotDate.length == 0) {
        PopupService.showToast('请选择申请时间');
        return;
      }else if ($scope.modelData.officeName == $scope.modelData.allotOfficeName) {
        PopupService.showToast('调拨后部门不能与原部门相同');
        return;
      }
      if ($scope.ApprovalType == "0") {
        if (($scope.approval == null) && $scope.approvalList != 0) {
          PopupService.showToast('请选择审批人');
          return;
        }
      }

      $ionicLoading.show();
      var param = {
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
        id: $scope.modelData.id == undefined ? null : $scope.modelData.id,
        operatorCode: $scope.modelData.operatorCode,//申请人
        operatorName: $scope.modelData.operatorName,//申请人编码
        allotDate: $filter('date')($scope.modelData.allotDate, 'yyyy-MM-dd'),//申请时间
        office: UserService.getUser().refObj.officeCode,  //部门编码
        officeName: $scope.modelData.officeName,  //部门名称
        allotOfficeCode: $scope.modelData.allotOfficeCode,  //部门编码
        allotOfficeName: $scope.modelData.allotOfficeName,  //部门名称
        step: billInfo.step,
        allotTypeCode: $scope.modelData.allotTypeCode,//调拨类型编码
        allotTypeName: $scope.modelData.allotTypeName,//调拨类型名称
        allotCompanyName:$scope.modelData.allotCompanyName,
        remarks: $scope.modelData.remarks,
        assetAllotDtl: JSON.stringify($scope.items),//明细数据
        approvalStatus: billInfo.approvalStatus,
        __sid: $localstorage.getObject('sid'),
        flowId: $scope.flowId,//工作流FlowID~
      };
      addAllocatService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            DataService.clearData("selectApply  ");
            DataService.clearData("CurrBillInfoApprove  ");
            DataService.clearData('addAllocatCache')
            DataService.clearData("dictTypeCode");
            DataService.clearData('dictTypeName')
            DataService.clearData("departmentListCode")
            DataService.clearData("departmentListName")
            DataService.clearData("chose")
            DataService.clearData("addAllocat")
            DataService.clearData("allocatApprove")
            DataService.clearData("addAllocatmodelData")
            DataService.clearData("publicType")
            PopupService.showToast('提交成功');
            if ($scope.ApprovalType == "0") {
              var params = {
                sid: $localstorage.getObject('sid'),
                id: billInfo.bizKey,
                flowBusinessId: billInfo.id,
                approvalMemo1: "",
                nextApprovalCode: $scope.approval.refCode==undefined? '':$scope.approval.refCode,
                nextApprovalName: $scope.approval.refName==undefined? '':$scope.approval.refName,
                sysCode: billInfo.bizKey,
                billSortCode: billInfo.billtypeCode//单据类型
              }
            } else {
              var params = {
                sid: $localstorage.getObject('sid'),
                flowBusinessId: billInfo.id,
                id: billInfo.bizKey,
                sysCode: billInfo.bizKey
              }
            }
            addAllocatService.approvalBill(params)
              .success(function (response) {
                // 回调成功,处理返回值
                if (response.code == "200") {
                  $ionicLoading.hide();
                  PopupService.showToast("审批通过!");
                  DataService.clearData("addAllocat");
                  DataService.clearData("selectApply");
                  DataService.clearData('CurrBillInfoApprove')
                  $state.go('app.home.home1');//跳转至待我审批
                }
                else {
                  $ionicLoading.hide();
                  PopupService.showToast(response.messagePC);
                }
              }).error(function (response) {
              $ionicLoading.hide();
              // 回调失败,隐藏进度条
              $scope.$broadcast('scroll.refreshComplete');
              $scope.$broadcast('scroll.infiniteScrollComplete');
              PopupService.showToast("网络错误.");
            });
          } else if (response.code == 201) {
            $ionicLoading.hide();
            PopupService.showToast('提交失败');
          }
        }).error(function (response) {
        $ionicLoading.hide();
        PopupService.showToast('网络错误,请稍后重试.');
      });
    }


    //获取工作流模板
    $scope.getFlowID = function () {
      var params = {
        billType: 'ZCDB',//模板单据类型
        companyCode: UserService.getUser().refObj.companyCode,//申请人公司编码
        sid: $localstorage.getObject('sid')
      }
      addAllocatService.getFlowID(params)
        .success(function (response) {
          //工作流Id
          $scope.flowId = response.message;
          //判断选择审批人是否为空
          var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
          if (DataService.getData('CurrBillInfoApprove') != undefined || DataService.getData('CurrBillInfoApprove') != null) {
            getNextSelectApply();
          } else {
            getSelectApply();
          }
        }).error(function (response) {
        // 回调失败,隐藏进度条
        PopupService.showToast("网络错误.");
      });
    }

    //添加资产
    $scope.goAdd = function () {
      DataService.clearData("addAllocatmodelData");
      DataService.setData("addAllocatmodelData", $scope.modelData)
      DataService.clearData("addAllocat");
      DataService.setData("addAllocat", $scope.items)
      DataService.clearData("addAllocatlist");
      DataService.setData("addAllocatlist", $scope.items)
      DataService.clearData("chose")
      if (DataService.getData('addAllocatCache') != undefined || DataService.getData('addAllocatCache') != null) {
        DataService.clearData("addAllocatCache");
        DataService.setData("addAllocatCache", $scope.modelData)
      }
      $scope.assetCodes = [];
      if ($scope.items != undefined || $scope.items != null) {
        for (var i = 0; i < $scope.items.length; i++) {
          $scope.assetCodes.push($scope.items[i].assetCode)
        }
      }
      $state.go('publicAssets', {code: 2, assetCodes: $scope.assetCodes});
    };

    /*
   * refuseBill 拒绝单据,填写审核不同意的意见
   * @param
   * @return 没有返回值
   */
    $scope.refuseBill = function () {
      DataService.clearData("selectApply  ");
      DataService.clearData("CurrBillInfoApprove  ");
      DataService.clearData('addAllocatCache')
      DataService.clearData("dictTypeCode");
      DataService.clearData('dictTypeName')
      DataService.clearData("departmentListCode")
      DataService.clearData("departmentListName")
      DataService.clearData("chose")
      DataService.clearData("addAllocat")
      DataService.clearData("allocatApprove")
      DataService.clearData("addAllocatmodelData")
      DataService.clearData("publicType")
      $state.go('addAlloactRefuse');
    }


    //点击选择审批人
    $scope.selectApply = function () {
      DataService.clearData("chose")
      DataService.clearData("addAllocat");
      DataService.setData("addAllocat", $scope.items)
      if (DataService.getData('addAllocatCache') != undefined || DataService.getData('addAllocatCache') != null) {
        DataService.clearData("addAllocatCache");
        DataService.setData("addAllocatCache", $scope.modelData)
      }
      if (DataService.getData('CurrBillInfoApprove') != undefined || DataService.getData('CurrBillInfoApprove') != null) {
        $ionicLoading.show();
        var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
        var params = {
          bizKey: billInfo.bizKey,
          step: billInfo.step,//第几步
          sid: $localstorage.getObject('sid')
        }
        addAllocatService.getNextFlowBusiness(params)
          .success(function (response) {
            // 回调成功,处理返回值
            if (response.code == "200") {
              if (response.data.hasNextStep == true) {
                //跳转到选择下一步审批人画面
                $state.go("allocatApprove",{allotOfficeCode:$scope.modelData.allotOfficeCode});
                $ionicLoading.hide();
              }
              else {
                $ionicLoading.hide();
              }
            }
          }).error(function (response) {
          $ionicLoading.hide();
          PopupService.showToast("网络错误.");
        });
      } else {
        DataService.clearData("addAllocatmodelData");
        DataService.setData("addAllocatmodelData", $scope.modelData)
        $state.go('Selectapproval', {flowId: $scope.flowId});
      }

    }



  }]);
Asset.service('addAllocatService', ['$http', 'UrlService', function ($http, UrlService) {
  //
  this.getFlowHelp = function (params) {//获取工作流flowID
    return $http.post(UrlService.getUrlData_check('FLOWHELP') + "?__sid=" + params['sid'] + "&flowId=" + params["flowId"] + "&step=" + params["step"]);
  }
  //
  this.getFlowID = function (params) {//获取工作流flowID
    return $http.post(UrlService.getUrlData_check('GET_FLOW_TEMPLATE') + "?__sid=" + params['sid'] + "&billType=" + params["billType"] + "&companyCode=" + params["companyCode"]);
  }
  //
  this.submitData = function (params) {//数据提交
    return $http.post(UrlService.getUrlData_check('SAVE_ALLOCAT'), params);
  }
  //
  this.getSelectApply = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_APPROVAL_ALLOCAT') + "?__sid=" + params['sid'] + "&applicantCode=" + params['applicantCode'] + "&flowId=" + params["flowId"] + "&pageSize=" + params["pageSize"]);
  }
  //
  this.getNextFlowBusiness = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_NEXT_FLOWBUSINESS') + "?__sid=" + params['sid'] + "&step=" + params["step"] + "&bizKey=" + params["bizKey"]);
  }
  //
  this.approvalBill = function (params) {
    return $http.post(UrlService.getUrlData_check('AGREE_ALLOCAT') + "?__sid=" + params["sid"], params);
  }
}]);


