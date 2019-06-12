/**
 * Created by Administrator on 2016/11/3.
 */
Asset.controller('useRefundApplyCtrl', ['$ionicLoading', '$scope', '$state', 'useRefundApplyService','$ionicHistory','$ionicPopup','$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService', '$filter', 'ionicDatePicker',
  function ($ionicLoading, $scope, $state, useRefundApplyService, $ionicHistory,$ionicPopup, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService, $filter, ionicDatePicker) {
    $scope.approval = {}//清除缓存
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      console.log('登陆信息');
      console.log(UserService.getUser().refObj);
      //选择审批人姓名
      $scope.step = "";//审批步骤
      $scope.stepType = ""; //是不是审批进入
      $scope.ApprovalType = "0"; //是不是终审
      $scope.approval={refCode:"",refName:""}
      if (DataService.getData('selectApply') != undefined || DataService.getData('selectApply') != null) {
        $scope.approval = DataService.getData('selectApply')
      }
      if (DataService.getData('CurrBillInfoApprove') != undefined || DataService.getData('CurrBillInfoApprove') != null) {
        var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
        $scope.step = billInfo.step;
        var bStep= $scope.step;
        if($scope.step=="3"){
          bStep="1";
        }
        var params = {
          flowId: billInfo.bizKey,//业务id
          step: bStep,//第几步
          sid: $localstorage.getObject('sid')
        }
        $scope.stepType = "Approve";
      } else {
        $scope.stepType = "";
      }
      //获取工作流模板
      $scope.getFlowID();
    });
    $scope.openDatePicker = function () {
      ipObj1.inputDate = new Date($scope.modelData.useRefundApplyDate);
      ipObj1.callback = function (val) {
        $scope.modelData.useRefundApplyDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };
    //返回
    $scope.goBack = function () {
      $ionicHistory.goBack();
      DataService.clearData("borrowApply");
      DataService.clearData("selectApply");
      DataService.clearData("useRefundApplyCache");
      DataService.clearData("publicType");
    };
    //判断选择审批人是否为空
    var getSelectApply = function () {
      var params = {
        sid: $localstorage.getObject('sid'),
        applicantCode: UserService.getUser().userCode,//申请人编码
        flowId: $scope.flowId,//工作流Id
        pageSize: '100'//分页（写死的）
      }
      useRefundApplyService.getSelectApply(params)
        .success(function (response) {
          console.log('申请审批人列表');
          console.log(response.list);
          $scope.approvalList = response.list.length;
        }).error(function (response) {
        // 回调失败,隐藏进度条
        console.log(response);
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
      useRefundApplyService.getNextFlowBusiness(params)
        .success(function (response) {
          console.log('获取下一步审批人');
          console.log(response);
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
          console.log("sadasdasdasd", $scope.approvalList);
        }).error(function (response) {
        // 回调失败,隐藏进度条
        $ionicLoading.hide();
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
    console.log(888,DataService.getData('useRefundApplyCache'))
    if (DataService.getData('useRefundApplyCache') != undefined || DataService.getData('useRefundApplyCache') != null) {
      $scope.step = "0";
      console.log("-------------------C______________________")
      console.log('退库单重新提交');
      $scope.modelData = DataService.getData('useRefundApplyCache');
      console.log($scope.modelData);
    } else if (DataService.getData('useRefundApprove') != undefined || DataService.getData('useRefundApprove') != null) {
      $scope.stepType = "Approve"
      console.log("-------------------B______________________")
      console.log("AaaAAAAAAAAAAAAA", DataService.getData('useRefundApprove'))
      $scope.modelData = DataService.getData('useRefundApprove');
      $scope.modelData.isNewRecord = false;
      console.log(5656,$scope.modelData);
      $scope.itemsApprove = DataService.getData('useRefundApprove').assetReturnDtlList;
      console.log("-------------------itemsApprove______________________", $scope.itemsApprove)
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
          console.log("-------------------A______________________", i)
          var itemsMode = {
            detailId: 1,
            sortCode: $scope.itemsApprove[i].sortCode,//类别编码
            sortName: $scope.itemsApprove[i].sortName,//类别名称
            assetCode: $scope.itemsApprove[i].assetCode,//资产名称
            assetName: $scope.itemsApprove[i].assetName,//资产编码
            brand: $scope.itemsApprove[i].brand,//品牌名称
            version: $scope.itemsApprove[i].version,//规格型号
            isNewRecord: true,
          }
          $scope.items.push(itemsMode);
        }
      }
      $scope.wareHouseinfo = DataService.getData("wareHouseinfo")
      if ($scope.wareHouseinfo != null) {
        if (DataService.getData("useRefundApplyApply") == undefined || DataService.getData("useRefundApplyApply") == '') {
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
          $scope.items = DataService.getData("useRefundApplyApply");
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
    } else {
      $scope.step = "0";
      console.log("-------------------A______________________")
      var date = new Date();
      $scope.modelData = {
        retireName: UserService.getUser().refObj.empName,//人
        retireCode: UserService.getUser().refObj.empCode,//编码
        returnOfficeName: UserService.getUser().refObj.officeName,//部门编码
        returnOfficeCode: UserService.getUser().refObj.officeCode,//部门编码
        remarks:"",
        receiverDate:date,
        isNewRecord: true //是否是新数据
      };
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
          if (detailId != 1) {
            $scope.items.splice(detailId - 1, 1);
            for (var i = detailId - 1; i < $scope.items.length; i++) {
              $scope.items[detailId - 1].detailId = i + 1;
            }
          }
        } else {
          console.log("选择cancle的时候执行的代码")
        }
      });
    };
    //提交申请
    $scope.toSubmit = function () {
      if ($scope.approval.refName == null || $scope.approval.refName.length == 0) {
        PopupService.showToast('请选择审批人');
        return;
      }else if ($scope.modelData.receiverDate == null || $scope.modelData.receiverDate.length == 0) {
        PopupService.showToast('请输入退库时间');
        return;
      }
      $ionicLoading.show();
      var param = {
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
        flowId: $scope.flowId,//工作流FlowID~
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,

      };
      console.log('-----参数打印------');
      console.log(param);
      useRefundApplyService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            console.log(response);
            DataService.clearData("useRefundApplyApply");
            DataService.clearData("selectApply")
            $state.go('app.home.home1');//跳转至待我审批

          } else if (response.code == 201) {
            $ionicLoading.hide();
            console.log(response);
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
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
        id: $scope.modelData.id == undefined ? null : $scope.modelData.id,
        sysCode: $scope.modelData.sysCode == undefined ? null : $scope.modelData.sysCode,
        retireCode: $scope.modelData.retireCode,//退库人编码
        retireName: $scope.modelData.retireName,//退库人
        receiverDate: $filter('date')($scope.modelData.receiverDate, 'yyyy-MM-dd'),//退库时间
        returnOfficeCode: $scope.modelData.returnOfficeCode,  //部门编码
        returnOfficeName: $scope.modelData.returnOfficeName,  //部门名称
        refCode: $scope.approval.refCode,//审批人编码
        refName: $scope.approval.refName,//审批人
        remarks: $scope.modelData.remarks,//备注
        step: billInfo.step,
        approvalStatus: billInfo.approvalStatus,
        assetReturnDtl: JSON.stringify($scope.items),//明细数据
        // memo: $scope.modelData.memo,
        __sid: $localstorage.getObject('sid'),
        flowId: $scope.flowId,//工作流FlowID~
      };
      console.log('-----参数打印------');
      console.log(param);
      useRefundApplyService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            console.log(response);
            DataService.clearData("useRefundApplyApply");
            DataService.clearData("selectApply")
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
              }
            }
            console.log(898989898,params)
            useRefundApplyService.approvalBill(params)
              .success(function (response) {
                console.log('审批结果');
                console.log(response);
                // 回调成功,处理返回值
                if (response.code == "200") {
                  $ionicLoading.hide();
                  PopupService.showToast("审批通过!");
                  $state.go('app.home.remind.todo_list');//跳转至待我审批
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
    //获取工作流模板
    $scope.getFlowID = function () {
      var params = {
        billType: 'ZCTK',//模板单据类型
        companyCode: UserService.getUser().refObj.companyCode,//申请人公司编码
        sid: $localstorage.getObject('sid')
      }
      useRefundApplyService.getFlowID(params)
        .success(function (response) {
          console.log('获取工作流模板');
          console.log(response);
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
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
    /*
   * refuseBill 拒绝单据,填写审核不同意的意见

   * @param

   * @return 没有返回值
   */
    $scope.refuseBill = function () {
      $state.go('useRefundRefuse');
    }

    //点击选择审批人
    $scope.selectApply = function () {
      if (DataService.getData('CurrBillInfoApprove') != undefined || DataService.getData('CurrBillInfoApprove') != null) {
        $ionicLoading.show();
        var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
        var params = {
          bizKey: billInfo.bizKey,
          step: billInfo.step,//第几步
          sid: $localstorage.getObject('sid')
        }
        //判断是否有下一步审批人
        useRefundApplyService.getNextFlowBusiness(params)
          .success(function (response) {
            console.log('获取下一步审批人');
            console.log(response);
            // 回调成功,处理返回值
            if (response.code == "200") {
              if (response.data.hasNextStep == true) {
                //跳转到选择审批人画面
                $state.go("assetUsedApprove");
                $ionicLoading.hide();
              }
              else {

                alert(11111)
                //直接执行审批方法
                //$scope.approvalBill();
                $ionicLoading.hide();
              }
            }

          }).error(function (response) {
          // 回调失败,隐藏进度条
          $ionicLoading.hide();
          console.log(response);
          PopupService.showToast("网络错误.");
        });
      } else {
        DataService.clearData("useRefundApplyApply");
        DataService.setData("useRefundApplyApply", $scope.modelData)
        $state.go('assetUsedSelect', {flowId: $scope.flowId});
      }

    }
  }]);
Asset.service('useRefundApplyService', ['$http', 'UrlService', function ($http, UrlService) {
  // this.getFlowHelp = function (params) {//获取工作流flowID
  //   return $http.post(UrlService.getUrlData_check('FLOWHELP') + "?__sid=" + params['sid'] + "&flowId=" + params["flowId"] + "&step=" + params["step"]);
  // }
  this.getFlowID = function (params) {//获取工作流flowID
    return $http.post(UrlService.getUrlData_check('GET_FLOW_TEMPLATE') + "?__sid=" + params['sid'] + "&billType=" + params["billType"] + "&companyCode=" + params["companyCode"]);
  }
  this.submitData = function (params) {//数据提交
    return $http.post(UrlService.getUrlData_check('RECEIVE_LIST_SAVE'), params);
  }
  this.getSelectApply = function (params) {//获取退库审批人
    return $http.post(UrlService.getUrlData_check('GET_APPROVAL_REFUND') + "?__sid=" + params['sid'] + "&applicantCode=" + params['applicantCode'] + "&flowId=" + params["flowId"] + "&pageSize=" + params["pageSize"]);
  }
  this.getNextFlowBusiness = function (params) {//判断是否是最后一步
    return $http.post(UrlService.getUrlData_check('GET_NEXT_FLOWBUSINESS') + "?__sid=" + params['sid'] + "&step=" + params["step"] + "&bizKey=" + params["bizKey"]);
  }
  this.approvalBill = function (params) {//审批同意
    return $http.post(UrlService.getUrlData_check('AGREE_FEE') + "?__sid=" + params["sid"], params);
  }
}]);


