/**
 * Created by chenzhuo on 2018/11/8.
 */
Asset.controller('assetRefundCtrl', ['$ionicPopup', '$scope', '$state', '$ionicLoading', 'assetRefundService', 'UserService', 'UrlService', '$localstorage', '$ionicHistory', '$ionicActionSheet', 'httpUtil', 'PopupService', '$filter', 'ionicDatePicker', 'ionicTimePicker', '$cordovaCamera', 'DataService',
  function ($ionicPopup, $scope, $state, $ionicLoading, assetRefundService, UserService, UrlService, $localstorage, $ionicHistory, $ionicActionSheet, httpUtil, PopupService, $filter, ionicDatePicker, ionicTimePicker, $cordovaCamera, DataService) {
    $scope.$on('$ionicView.enter', function () {
      //获取工作流模板
      $scope.getFlowID();
      //获取资产列表
      $scope.department = DataService.getData("departmentList1");
      $scope.approval = DataService.getData('selectApply');
      console.log("returnModelData",DataService.getData('returnModelData'));
      console.log("useRefundCache",DataService.getData('useRefundCache'));
      if(DataService.getData('useRefundCache')!=null||DataService.getData('useRefundCache')!=undefined){
        console.log("_____________________成新提交————————————————————————");
        var date = new Date();
        $scope.modelData = {
          retireName: DataService.getData("useRefundCache").retireName,//人
          retireCode: DataService.getData("useRefundCache").retireCode,//编码
          returnOfficeName: DataService.getData("useRefundCache").returnOfficeName,//部门编码
          returnOfficeCode:DataService.getData("useRefundCache").returnOfficeCode,//部门编码
          remarks:DataService.getData("useRefundCache").remarks,
          receiverDate:date,
          id:DataService.getData("useRefundCache").id,
          isNewRecord: false,
          approvalStatus:"0"
        }
        console.log("_____________________成新提交————————————————————————",$scope.modelData);
        if (DataService.getData("assetRefundlist")!= undefined) {
          console.log("_____________________成新提交————————————————————————");
          $scope.items=DataService.getData("assetRefundlist");
        }else{
          $scope.itemsApprove = DataService.getData("useRefundCache").assetReturnDtlList
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
                isNewRecord: true
              }
              $scope.items.push(itemsMode);
            }
          }
        }
        $scope.chose = DataService.getData("chose")
        if ($scope.chose != null) {
          if (DataService.getData("returnInfoApply") == undefined || DataService.getData("returnInfoApply") == '') {
            $scope.items = [{
              detailId: 1,
              sortCode: $scope.chose.sortCode,//类别编码
              sortName: $scope.chose.sortName,//类别名称
              assetCode: $scope.chose.assetCode,//资产名称
              assetName: $scope.chose.assetName,//资产编码
              brand: $scope.chose.brand,//品牌名称
              version: $scope.chose.version,//规格型号
              isNewRecord: true,
            }];
          } else {
            $scope.items = DataService.getData("returnInfoApply");
            var number = $scope.items[$scope.items.length - 1].detailId + 1;
            var itemsMode = {
              detailId: number,
              sortCode: $scope.chose.sortCode,//类别编码
              sortName: $scope.chose.sortName,//类别名称
              assetCode: $scope.chose.assetCode,//资产名称
              assetName: $scope.chose.assetName,//资产编码
              brand: $scope.chose.brand,//品牌名称
              version: $scope.chose.version,//规格型号
              isNewRecord: true
            }
            $scope.items.push(itemsMode);
          }
        }

      }else{
        console.log("_____________________新增————————————————————————");
        if(DataService.getData('returnModelData')==null||DataService.getData('returnModelData')==undefined){
          console.log("returnModelData",DataService.getData('returnModelData'))
          console.log("_____________________1————————————————————————");
          var date = new Date();
          $scope.modelData = {
            retireName: UserService.getUser().refObj.empName,//人
            retireCode: UserService.getUser().refObj.empCode,//编码
            returnOfficeName: UserService.getUser().refObj.officeName,//部门编码
            returnOfficeCode: UserService.getUser().refObj.officeCode,//部门编码
            remarks:"",
            receiverDate:date,
          }
        }else{
          console.log("_____________________1————————————————————————");
          $scope.modelData=DataService.getData('returnModelData')
        }
        $scope.chose = DataService.getData("chose")
        if ($scope.chose != null) {
          if (DataService.getData("returnInfoApply") == undefined || DataService.getData("returnInfoApply") == '') {
            $scope.items = [{
              detailId: 1,
              sortCode: $scope.chose.sortCode,//类别编码
              sortName: $scope.chose.sortName,//类别名称
              assetCode: $scope.chose.assetCode,//资产名称
              assetName: $scope.chose.assetName,//资产编码
              brand: $scope.chose.brand,//品牌名称
              version: $scope.chose.version,//规格型号
              isNewRecord: false,

            }];
          } else {
            $scope.items = DataService.getData("returnInfoApply");
            var number = $scope.items[$scope.items.length - 1].detailId + 1;
            var itemsMode = {
              detailId: number,
              sortCode: $scope.chose.sortCode,//类别编码
              sortName: $scope.chose.sortName,//类别名称
              assetCode: $scope.chose.assetCode,//资产名称
              assetName: $scope.chose.assetName,//资产编码
              brand: $scope.chose.brand,//品牌名称
              version: $scope.chose.version,//规格型号
              isNewRecord: false
            }
            $scope.items.push(itemsMode);
          }
        }else{
          if (DataService.getData("assetRefundlist")!= undefined || DataService.getData("assetRefundlist") != '') {
            $scope.items=DataService.getData("assetRefundlist");
          }
        }
      }
    });
    //返回
    $scope.goBack = function () {
      DataService.clearData("selectApply");
      DataService.clearData("publicAssets")
      DataService.clearData("returnModelData")
      DataService.clearData("addAssets")
      DataService.clearData("chose")
      DataService.clearData("CurrBillInfo")
      DataService.clearData("assetRefundlist")
      DataService.clearData("returnInfoApply")
      DataService.clearData('pictureListRE')
      DataService.clearData("assetUsedApply")
      DataService.clearData("useRefundCache")
      DataService.clearData("assetRefundlist")
      $state.go("useRefund.refund");
    };

    //获取工作流模板
    $scope.getFlowID = function () {
      var params = {
        billType: 'ZCTK',//模板单据类型
        companyCode:UserService.getUser().refObj.companyCode,//申请人公司编码
        __sid: $localstorage.getObject('sid'),
        flowID: $localstorage.getObject('flowID')
      }
      assetRefundService.getFlowID(params)
        .success(function (response) {
          console.log('获取工作流模板');
          console.log(222,response);
          //工作流Id
          $scope.flowId=response.message;
          console.log($scope.flowId);
          getSelectApply();
        }).error(function (response) {
        // 回调失败,隐藏进度条
        PopupService.showToast("网络错误.");
        $ionicLoading.hide();
      });
    }

    //判断选择审批人是否为空,选择审批人
    var getSelectApply = function () {
      var params = {
        sid: $localstorage.getObject('sid'),
        applicantCode:UserService.getUser().userCode,//申请人编码
        flowId:$scope.flowId,//工作流Id
        pageSize:'100'//分页（写死的）
      }
      assetRefundService.getSelectApply(params)
        .success(function (response) {
          console.log('申请审批人列表');
          console.log(response.list);
          $scope.approvalList = response.list;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        PopupService.showToast("网络错误.");
      });
    }

    //选择审批人
    $scope.selectApply = function () {
      DataService.clearData("returnModelData");
      DataService.setData("returnModelData", $scope.modelData)
      DataService.clearData("addAssets");
      DataService.setData("addAssets",$scope.flowId)
      DataService.clearData("chose");
      DataService.clearData("assetRefundlist");
      DataService.setData("assetRefundlist", $scope.items)
      $state.go('selectApply');
    };

    //获取资产列表
    $scope.getreturnInfoDtl = function () {
      DataService.clearData("returnModelData");
      DataService.setData("returnModelData", $scope.modelData)
      DataService.clearData("returnInfoApply");
      DataService.setData("returnInfoApply", $scope.items)
      DataService.clearData("chose");
      DataService.clearData("assetRefundlist");
      DataService.setData("assetRefundlist", $scope.items)
      $scope.assetCodes=[];
      if ($scope.items!= undefined||$scope.items!= null) {
        for(var i=0;i<$scope.items.length;i++){
          $scope.assetCodes.push($scope.items[i].assetCode)
        }
      }

      console.log("$scope.items",$scope.items)
      $state.go('collarTable',{assetCodes:$scope.assetCodes});
      // $state.go('collarTable');
    };

    //  confirm 对话框和删除一个报销明细
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
              $scope.items[detailId - 1].detailId = i ;
            }
        } else {
          console.log("选择cancle的时候执行的代码")
        }
      });
    };
    //提交申请
    $scope.toSubmit = function () {
      if (($scope.approval == null || $scope.approval.refName == 0) && $scope.approvalList != 0) {
        PopupService.showToast('请选择审批人');
        return;
      }else if ($scope.items == undefined ||$scope.items=='') {
        PopupService.showToast('请选择资产');
        return;
      }
      $ionicLoading.show();
      var params = {
        id: $scope.modelData.id == undefined ? null : $scope.modelData.id,
        sysCode: $scope.modelData.sysCode == undefined ? null : $scope.modelData.sysCode,
        remarks: $scope.modelData.remarks,  //备注
        // receiverDate: $scope.modelData.receiverDate,  //入库日期
        receiverDate: $filter('date')($scope.modelData.receiverDate, 'yyyy-MM-dd'),//申请时间
        retireName: $scope.modelData.retireName,  //退库人
        retireCode: $scope.modelData.retireCode,  //退库人编码
        returnOfficeName: $scope.modelData.returnOfficeName,  //退库后使用部门
        returnOfficeCode: $scope.modelData.returnOfficeCode,  //退库后使用部门编码
        approvalName: $scope.approval.refName,  //审批人
        approval: $scope.approval.refCode,  //审批人编码
        assetReturnDtl: JSON.stringify($scope.items),//明细数据
        __sid: $localstorage.getObject('sid'),
        approvalStatus: $scope.modelData.approvalStatus == undefined ? "" : $scope.modelData.approvalStatus,
        flowId: $scope.flowId,//工作流FlowID~
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
      }
      console.log('-----参数打印------');
      console.log(params);
      assetRefundService.submitData(params)
        .success(function (response) {
          console.log('资产领用申请提交');
          if (response.code == 200) {
            $ionicLoading.hide();
            console.log(response);
            $scope.goBack();
            DataService.clearData("selectApply");
            DataService.clearData("publicAssets")
            DataService.clearData("returnModelData")
            DataService.clearData("addAssets")
            DataService.clearData("chose")
            DataService.clearData("CurrBillInfo")
            DataService.clearData("assetRefundlist")
            DataService.clearData("returnInfoApply")
            DataService.clearData('pictureListRE')
            DataService.clearData("assetUsedApply")
            DataService.clearData("useRefundCache")
            DataService.clearData("assetRefundlist")
            PopupService.showToast('提交成功');
            $state.go('app.home.home1');
          } else if (response.code == 201) {
            $ionicLoading.hide();
            console.log(response);
            PopupService.showToast('提交失败');
          }
        }).error(function (response) {
        $ionicLoading.hide();
        PopupService.showToast('网络错误,请稍后重试.');
      });
    }
    //审批同意
    $scope.goApproval = function () {
      var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
      if ($scope.flowId == null || $scope.flowId == undefined || $scope.flowId.length == 0) {
        PopupService.showToast('请等待,还未获取到流程ID');
        return;
      } else if ($scope.modelData.receiverCode == null || $scope.modelData.receiverCode.length == 0) {
        PopupService.showToast('申请人不能为空');
        return;
      }
      if ($scope.ApprovalType == "0") {
        if (($scope.approval == null) && $scope.approvalList != 0) {
          PopupService.showToast('请选择审批人');
          return;
        }
      }
      $ionicLoading.show();
      //时间转换
      var param = {
        id: $scope.modelData.id == undefined ? null : $scope.modelData.id,
        sysCode: $scope.modelData.sysCode == undefined ? null : $scope.modelData.sysCode,
        remarks: $scope.modelData.remarks,  //备注
        receiverDate: $filter('date')($scope.modelData.receiverDate, 'yyyy-MM-dd'),//申请时间
        retireName: $scope.modelData.retireName,  //退库人
        retireCode: $scope.modelData.retireCode,  //退库人编码
        returnOfficeName: $scope.modelData.returnOfficeName,  //退库后使用部门
        returnOfficeCode: $scope.modelData.returnOfficeCode,  //退库后使用部门编码
        approvalName: $scope.approval.refName,  //审批人
        approval: $scope.approval.refCode,  //审批人编码
        assetReturnDtl: JSON.stringify($scope.items),//明细数据
        __sid: $localstorage.getObject('sid'),
        flowId: $scope.flowId,//工作流FlowID~
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
      };
      console.log('-----参数打印------');
      console.log(billInfo);
      console.log(param);
      assetUsedApplyService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            console.log(response);
            DataService.clearData("pictureListRE");
            DataService.clearData("assetUsedApply");
            DataService.clearData("selectApply")
            DataService.clearData("selectApply");
            DataService.clearData("publicAssets")
            DataService.clearData("returnModelData")
            DataService.clearData("CurrBillInfo")
            DataService.clearData("addAssets")
            DataService.clearData("chose")
            DataService.clearData("assetRefundlist")
            DataService.clearData("returnInfoApply")
            DataService.clearData('pictureListRE')
            DataService.clearData("assetUsedApply")
            DataService.clearData("useRefundCache")
            DataService.clearData("assetRefundlist")
            PopupService.showToast('提交成功');
            if ($scope.ApprovalType == "0") {
              var params = {
                sid: $localstorage.getObject('sid'),
                id: billInfo.bizKey,
                flowBusinessId: billInfo.id,
                approvalMemo1: "",
                nextApprovalCode: $scope.approval.refCode,
                nextApprovalName: $scope.approval.refName,
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
            assetRefundService.approvalBill(params)
              .success(function (response) {
                console.log('审批结果');
                console.log(response);
                // 回调成功,处理返回值
                if (response.code == "200") {
                  $ionicLoading.hide();
                  DataService.clearData("pictureListRE");
                  DataService.clearData("assetUsedApply");
                  DataService.clearData("selectApply")
                  PopupService.showToast('提交成功');
                  PopupService.showToast("审批通过!");
                  $state.go('app.home.home1');//跳转至待我审批
                }
                else {
                  $ionicLoading.hide();
                  PopupService.showToast(response.messagePC);
                }
              }).error(function (response) {
              $ionicLoading.hide();
              // 回调失败,隐藏进度条
              console.log(response);
              $scope.$broadcast('scroll.refreshComplete');
              $scope.$broadcast('scroll.infiniteScrollComplete');
              PopupService.showToast("网络错误.");
            });
          } else if (response.code == 201) {
            $ionicLoading.hide();
            console.log(response);
            PopupService.showToast('提交失败');
          }
        }).error(function (response) {
        $ionicLoading.hide();
        PopupService.showToast('网络错误,请稍后重试.');
      });
    }
  }]);
Asset.service('assetRefundService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getFlowID = function(params) { //获取工作流flowID
    return $http.post(UrlService.getUrlData_check('GET_FLOW_TEMPLATE'),params);
  }
  this.getSelectApply = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_APPLY_LIST') + "?__sid=" + params['sid'] + "&applicantCode=" + params['applicantCode'] + "&flowId=" + params["flowId"] + "&pageSize=" + params["pageSize"]);
  }
  this.submitData = function (params) {//数据提交
    return $http.post(UrlService.getUrlData_check('RECEIVE_LIST_SAVE'), params);
  }
  this.showConfirm = function (params) {//撤销
    return $http.post(UrlService.getUrlData_check('REVOKE_RETURNINFO'), params);
  };
}]);






