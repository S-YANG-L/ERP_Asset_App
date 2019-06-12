/**
 * Created by Administrator on 2016/11/3.
 */
Asset.controller('assetUsedApplyCtrl', ['$ionicLoading', '$scope', '$state', 'assetUsedApplyService', '$ionicPopup', '$ionicHistory', '$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService', '$filter', 'ionicDatePicker',
  function ($ionicLoading, $scope, $state, assetUsedApplyService, $ionicPopup, $ionicHistory, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService, $filter, ionicDatePicker) {
    $scope.approval = {}//清除缓存
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      //选择审批人姓名
      $scope.step = "";//审批步骤
      $scope.stepType = ""; //是不是审批进入
      $scope.ApprovalType = "0"; //是不是终审
      $scope.approval = {refCode: "", refName: ""}
      if (DataService.getData('selectApply') != undefined || DataService.getData('selectApply') != null) {
        $scope.approval = DataService.getData('selectApply')
      }
      if (DataService.getData('CurrBillInfoApprove') != undefined || DataService.getData('CurrBillInfoApprove') != null) {
        var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
        $scope.step = billInfo.step;
        var bStep = $scope.step;
        if ($scope.step == "3") {
          bStep = "1";
        }
        var params = {
          flowId: billInfo.bizKey,//业务id
          step: bStep,//第几步
          sid: $localstorage.getObject('sid')
        }
        if ($scope.step == "2") {
          assetUsedApplyService.getFlowHelp(params)
            .success(function (response) {
              console.log("zhao", response.applicantCode)
              $scope.approval.refCode = response.applicantCode,
                $scope.approval.refName = response.applicantName
              console.log("zhao", $scope.approval)
            }).error(function (response) {
            // 回调失败,隐藏进度条
            $ionicLoading.hide();
            PopupService.showToast("网络错误.");
          });
        } else if ($scope.step == "3") {
          assetUsedApplyService.getFlowHelp(params)
            .success(function (response) {
              console.log("zhao", response.applicantCode)
              $scope.approval.refCode = response.applicantCode,
                $scope.approval.refName = response.applicantName
              console.log("zhao", $scope.approval)
            }).error(function (response) {
            // 回调失败,隐藏进度条
            $ionicLoading.hide();
            PopupService.showToast("网络错误.");
          });
        }
        $scope.stepType = "Approve";
      } else {
        $scope.stepType = "";
      }
      //获取工作流模板
      $scope.getFlowID();
    });


    $scope.openDatePicker = function () {
      ipObj1.inputDate = new Date($scope.modelData.assetUsedDate);
      ipObj1.callback = function (val) {
        $scope.modelData.assetUsedDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };
    //返回
    $scope.goBack = function () {
      DataService.clearData("borrowApply");
      DataService.clearData("selectApply");
      DataService.clearData("assetUsedCache");
      DataService.clearData("publicType");
      DataService.clearData("assetUsedApply");
      DataService.clearData("assetUsedmodelData");
      DataService.clearData("assetname");
      DataService.clearData("assetcode");
      DataService.clearData("chose");
      DataService.clearData("CurrBillInfoApprove");
      DataService.clearData("assetUsedApprove");
      $state.go("useRefund.assetUsedList");
    };
    //判断选择审批人是否为空
    var getSelectApply = function () {
      var params = {
        sid: $localstorage.getObject('sid'),
        applicantCode: UserService.getUser().userCode,//申请人编码
        flowId: $scope.flowId,//工作流Id
        pageSize: '100'//分页（写死的）
      }
      assetUsedApplyService.getSelectApply(params)
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
      assetUsedApplyService.getNextFlowBusiness(params)
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
    if (DataService.getData('assetUsedCache') != undefined || DataService.getData('assetUsedCache') != null) {
      $scope.step = "0";
      console.log("-------------------C______________________")
      console.log('领用单重新提交');
      $scope.modelData = DataService.getData('assetUsedCache');
      var date = new Date();
      $scope.modelData = {
        id: DataService.getData('assetUsedCache').id,
        approvalStatus: DataService.getData('assetUsedCache').approvalStatus,
        receiverDate: date,//领用日期
        receiverName: DataService.getData('assetUsedCache').receiverName,//申请人
        receiverCode: DataService.getData('assetUsedCache').receiverCode,//申请人编码
        usedOfficeCode: DataService.getData('assetUsedCache').usedOfficeCode,//申请人部门编码
        usedOfficeName: DataService.getData('assetUsedCache').usedOfficeName,//申请人部门编码
        assetClass: DataService.getData("assetname") == undefined ? DataService.getData('assetUsedCache').assetClass : DataService.getData("assetname"),
        assetClassCode: DataService.getData("assetcode") == undefined ? DataService.getData('assetUsedCache').assetClassCode : DataService.getData("assetcode"),
        numberRecipients: DataService.getData('assetUsedCache').numberRecipients,
        remarks: DataService.getData('assetUsedCache').remarks,
        isNewRecord: false //是否是新数据
      };
    } else if (DataService.getData('assetUsedApprove') != undefined || DataService.getData('assetUsedApprove') != null) {
      $scope.stepType = "Approve"
      console.log("-------------------B______________________")
      console.log("AaaAAAAAAAAAAAAA", DataService.getData('assetUsedApprove'))
      $scope.modelData = DataService.getData('assetUsedApprove');
      $scope.modelData.isNewRecord = false;
      console.log($scope.modelData);
      $scope.itemsApprove = DataService.getData('assetUsedApprove').assetUsedDtls;
      if ($scope.itemsApprove.length > 0) {
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
      } else {
        $scope.chose = DataService.getData("chose")
        if ($scope.chose != null) {
          if (DataService.getData("assetUsedApply") == undefined || DataService.getData("assetUsedApply") == '') {
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
            $scope.items = DataService.getData("assetUsedApply");
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
        } else {
          $scope.items = DataService.getData("assetUsedApply");
        }
      }


    } else {
      $scope.step = "0";
      console.log("-------------------A______________________")
      var date = new Date();
      $scope.modelData = {
        receiverDate: date,//领用日期
        receiverName: UserService.getUser().refObj.empName,//申请人
        receiverCode: UserService.getUser().refObj.empCode,//申请人编码
        usedOfficeCode: UserService.getUser().refObj.officeCode,//申请人部门编码
        usedOfficeName: UserService.getUser().refObj.officeName,//申请人部门编码
        assetClass: DataService.getData("assetname"),
        assetClassCode: DataService.getData("assetcode"),
        numberRecipients: DataService.getData("assetUsedmodelData") == undefined ? null : DataService.getData("assetUsedmodelData").numberRecipients,
        remarks: DataService.getData("assetUsedmodelData") == undefined ? null : DataService.getData("assetUsedmodelData").remarks,
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
          $scope.items.splice(detailId - 1, 1);
          for (var i = detailId - 1; i < $scope.items.length; i++) {
            $scope.items[detailId - 1].detailId = i + 1;
          }

        } else {
          console.log("选择的时候执行的代码")
        }
      });
    };
    //提交申请
    $scope.toSubmit = function () {
      if ($scope.flowId == null || $scope.flowId == undefined || $scope.flowId.length == 0) {
        PopupService.showToast('请等待,还未获取到流程ID');
        return;
      } else if ($scope.modelData.receiverCode == null || $scope.modelData.receiverCode.length == 0) {
        PopupService.showToast('申请人不能为空');
        return;
      } else if ($scope.modelData.usedOfficeCode == null || $scope.modelData.usedOfficeCode.length == 0) {
        PopupService.showToast('请选择部门');
        return;
      } else if ($scope.modelData.receiverDate == null || $scope.modelData.receiverDate.length == 0) {
        PopupService.showToast('请选择申请时间');
        return;
      } else if ($scope.modelData.assetClassCode == null || $scope.modelData.assetClassCode.length == 0) {
        PopupService.showToast('请选择资产分类');
        return;
      } else if ($scope.modelData.numberRecipients == null || $scope.modelData.numberRecipients.length == 0) {
        PopupService.showToast('请输入领用数量');
        return;
      } else if (($scope.approval == null || $scope.approval.refName == 0) && $scope.approvalList != 0) {
        PopupService.showToast('请选择审批人');
        return;
      }
      $ionicLoading.show();
      var param = {
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
        id: $scope.modelData.id == undefined ? null : $scope.modelData.id,
        sysCode: $scope.modelData.sysCode == undefined ? null : $scope.modelData.sysCode,
        receiverCode: $scope.modelData.receiverCode,//申请人
        receiverName: $scope.modelData.receiverName,//申请人编码
        receiverDate: $filter('date')($scope.modelData.receiverDate, 'yyyy-MM-dd'),//申请时间
        usedOfficeCode: $scope.modelData.usedOfficeCode,  //部门编码
        usedOfficeName: $scope.modelData.usedOfficeName,  //部门名称
        assetClassCode: $scope.modelData.assetClassCode,//资产类别
        assetClass: $scope.modelData.assetClass,//资产类别编码
        numberRecipients: $scope.modelData.numberRecipients,
        approvalCode: $scope.approval.refCode,
        approvalName: $scope.approval.refName,
        step: "",
        approvalStatus: $scope.modelData.approvalStatus,
        assetUsedDtlsString: JSON.stringify($scope.items),//明细数据
        remarks: $scope.modelData.remarks,
        __sid: $localstorage.getObject('sid'),
        flowId: $scope.flowId,//工作流FlowID~
      };
      console.log('-----参数打印------');
      console.log(param);
      assetUsedApplyService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            console.log(response);
            DataService.clearData("borrowApply");
            DataService.clearData("selectApply");
            DataService.clearData("assetUsedCache");
            DataService.clearData("publicType");
            DataService.clearData("assetUsedApply");
            DataService.clearData("assetUsedmodelData");
            DataService.clearData("assetname");
            DataService.clearData("assetcode");
            DataService.clearData("chose");
            DataService.clearData("CurrBillInfoApprove");
            DataService.clearData("assetUsedApprove");
            $state.go('app.home.home1');//跳转至待我审批
            PopupService.showToast('提交成功');
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
      } else if ($scope.modelData.receiverCode == null || $scope.modelData.receiverCode.length == 0) {
        PopupService.showToast('申请人不能为空');
        return;
      } else if ($scope.modelData.usedOfficeCode == null || $scope.modelData.usedOfficeCode.length == 0) {
        PopupService.showToast('请选择部门');
        return;
      } else if ($scope.modelData.receiverDate == null || $scope.modelData.receiverDate.length == 0) {
        PopupService.showToast('请选择申请时间');
        return;
      } else if ($scope.modelData.assetClassCode == null || $scope.modelData.assetClassCode.length == 0) {
        PopupService.showToast('请选择资产分类');
        return;
      } else if ($scope.modelData.numberRecipients == null || $scope.modelData.numberRecipients.length == 0) {
        PopupService.showToast('请输入领用数量');
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
        receiverCode: $scope.modelData.receiverCode,//申请人
        receiverName: $scope.modelData.receiverName,//申请人编码
        receiverDate: $filter('date')($scope.modelData.receiverDate, 'yyyy-MM-dd'),//申请时间
        usedOfficeCode: $scope.modelData.usedOfficeCode,  //部门编码
        usedOfficeName: $scope.modelData.usedOfficeName,  //部门名称
        assetClassCode: $scope.modelData.assetClassCode,//资产类别
        assetClass: $scope.modelData.assetClass,//资产类别编码
        numberRecipients: $scope.modelData.numberRecipients,
        step: billInfo.step,
        approvalStatus: billInfo.approvalStatus,
        assetUsedDtlsString: JSON.stringify($scope.items),//明细数据
        remarks: $scope.modelData.remarks,
        __sid: $localstorage.getObject('sid'),
        flowId: $scope.flowId,//工作流FlowID
      };
      console.log('-----参数打印------');
      console.log(billInfo);
      console.log(param);
      assetUsedApplyService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            console.log(response);
            DataService.clearData("assetUsedApply");
            DataService.clearData("selectApply")
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
            assetUsedApplyService.approvalBill(params)
              .success(function (response) {
                console.log('审批结果');
                console.log(response);
                // 回调成功,处理返回值
                if (response.code == "200") {
                  DataService.clearData("borrowApply");
                  DataService.clearData("selectApply");
                  DataService.clearData("assetUsedCache");
                  DataService.clearData("publicType");
                  DataService.clearData("assetUsedApply");
                  DataService.clearData("assetUsedmodelData");
                  DataService.clearData("assetname");
                  DataService.clearData("assetcode");
                  DataService.clearData("chose");
                  DataService.clearData("CurrBillInfoApprove");
                  DataService.clearData("assetUsedApprove");
                  $ionicLoading.hide();
                  if (billInfo.step > 2) {
                    PopupService.showToast("确认成功!");
                  } else {
                    PopupService.showToast("审批通过!");
                  }

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
            PopupService.showToast('请添加资产');
          }
        }).error(function (response) {
        $ionicLoading.hide();
        PopupService.showToast('网络错误,请稍后重试.');
      });
    }
    //获取工作流模板
    $scope.getFlowID = function () {
      var params = {
        billType: 'ZCLY',//模板单据类型
        companyCode: UserService.getUser().refObj.companyCode,//申请人公司编码
        sid: $localstorage.getObject('sid')
      }
      console.log('获取工作流模板');
      assetUsedApplyService.getFlowID(params)
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
    //前往选择资产类别
    $scope.goSelectAssetType = function () {
      DataService.clearData("chose");
      DataService.clearData("assetUsedmodelData");
      DataService.setData("assetUsedmodelData", $scope.modelData)
      console.log($scope.modelData)
      DataService.clearData("assetUsedApply");
      DataService.setData("assetUsedApply", $scope.items)
      console.log($scope.items)
      if (DataService.getData('assetUsedCache') != undefined || DataService.getData('assetUsedCache') != null) {
        DataService.clearData("assetUsedCache");
        DataService.setData("assetUsedCache", $scope.modelData)
      }
      $state.go('selectAssetType');
    };
    //获取仓库物品
    $scope.getPublicAssets = function () {
      DataService.clearData("assetUsedmodelData");
      DataService.setData("assetUsedmodelData", $scope.modelData)
      DataService.clearData("assetUsedApply");
      DataService.setData("assetUsedApply", $scope.items)
      if (DataService.getData('assetUsedCache') != undefined || DataService.getData('assetUsedCache') != null) {
        DataService.clearData("assetUsedCache");
        DataService.setData("assetUsedCache", $scope.modelData)
      }
      $scope.assetCodes = [ ];
      if ($scope.items != undefined || $scope.items != null) {
        for (var i = 0; i < $scope.items.length; i++) {
          $scope.assetCodes.push($scope.items[i].assetCode)
        }
      }
      console.log("$scope.items", $scope.items)
      $state.go('publicAssets',{code: 1, sortCode: $scope.modelData.assetClassCode, assetCodes: $scope.assetCodes});
    };
    /*
   * refuseBill 拒绝单据,填写审核不同意的意见

   * @param

   * @return 没有返回值
   */
    $scope.refuseBill = function () {
      DataService.clearData("borrowApply");
      DataService.clearData("selectApply");
      DataService.clearData("assetUsedCache");
      DataService.clearData("publicType");
      DataService.clearData("assetUsedApply");
      DataService.clearData("assetUsedmodelData");
      DataService.clearData("assetname");
      DataService.clearData("assetcode");
      DataService.clearData("chose");
      DataService.clearData("CurrBillInfoApprove");
      DataService.clearData("assetUsedApprove");
      $state.go('assetUsedRefuse');
    }
    //点击选择审批人
    $scope.selectApply = function () {
      if (DataService.getData('assetUsedCache') != undefined || DataService.getData('assetUsedCache') != null) {
        DataService.clearData("assetUsedCache");
        DataService.setData("assetUsedCache", $scope.modelData)
      }
      if (DataService.getData('CurrBillInfoApprove') != undefined || DataService.getData('CurrBillInfoApprove') != null) {
        $ionicLoading.show();
        var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
        var params = {
          bizKey: billInfo.bizKey,
          step: billInfo.step,//第几步
          sid: $localstorage.getObject('sid')
        }
        assetUsedApplyService.getNextFlowBusiness(params)
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
                $ionicLoading.hide();
              }
            }
          }).error(function (response) {
          $ionicLoading.hide();
          console.log(response);
          PopupService.showToast("网络错误.");
        });
      } else {
        DataService.clearData("assetUsedmodelData");
        DataService.setData("assetUsedmodelData", $scope.modelData)
        DataService.clearData("assetUsedApply");
        DataService.setData("assetUsedApply", $scope.items)
        $state.go('assetUsedSelect', {flowId: $scope.flowId});
      }

    }
  }]);
Asset.service('assetUsedApplyService', ['$http', 'UrlService', function ($http, UrlService) {

  this.getFlowHelp = function (params) {//获取工作流flowID
    return $http.post(UrlService.getUrlData_check('FLOWHELP') + "?__sid=" + params['sid'] + "&flowId=" + params["flowId"] + "&step=" + params["step"]);
  }
  this.getFlowID = function (params) {//获取工作流flowID
    return $http.post(UrlService.getUrlData_check('GET_FLOW_TEMPLATE') + "?__sid=" + params['sid'] + "&billType=" + params["billType"] + "&companyCode=" + params["companyCode"]);
  }
  this.submitData = function (params) {//数据提交
    return $http.post(UrlService.getUrlData_check('USEDINFO_SAVE'), params);
  }
  this.getSelectApply = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_APPROVAL_USEDINFO') + "?__sid=" + params['sid'] + "&applicantCode=" + params['applicantCode'] + "&flowId=" + params["flowId"] + "&pageSize=" + params["pageSize"]);
  }
  this.getNextFlowBusiness = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_NEXT_FLOWBUSINESS') + "?__sid=" + params['sid'] + "&step=" + params["step"] + "&bizKey=" + params["bizKey"]);
  }
  this.approvalBill = function (params) {
    return $http.post(UrlService.getUrlData_check('AGREE_USEDINFO') + "?__sid=" + params["sid"], params);
  }
}]);


