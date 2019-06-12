/**
 * Created by Administrator on 2016/11/3.
 */
Asset.controller('outBoundApplyCtrl', ['$ionicLoading', '$scope', '$state', 'outBoundApplyService','$ionicHistory','$ionicPopup','$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService', '$filter', 'ionicDatePicker',
  function ($ionicLoading, $scope, $state, outBoundApplyService, $ionicHistory,$ionicPopup, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService, $filter, ionicDatePicker) {
    $scope.approval = {}//清除缓存
    //进入页面后初始化页面
    $scope.$on('$ionicView.loaded', function () {
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
        if($scope.step=="2"){
          outBoundApplyService.getFlowHelp(params)
            .success(function (response) {
            $scope.approval.refCode=response.applicantCode,
            $scope.approval.refName=response.applicantName
            }).error(function (response) {
            // 回调失败,隐藏进度条
            $ionicLoading.hide();
            PopupService.showToast("网络错误.");
          });
        }else if($scope.step=="3"){
          outBoundApplyService.getFlowHelp(params)
            .success(function (response) {
              $scope.approval.refCode=response.applicantCode,
                $scope.approval.refName=response.applicantName
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
      ipObj1.inputDate = new Date($scope.modelData.outboundDate);
      ipObj1.callback = function (val) {
        $scope.modelData.outboundDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };
    //返回
    $scope.goBack = function () {
      DataService.clearData("selectApply")
      DataService.clearData("CurrBillInfoApprove")
      DataService.clearData("outBoundCache")
      DataService.clearData("outBoundApprove")
      DataService.clearData("wareHouseinfo")
      DataService.clearData("outBoundApply")
      DataService.clearData("classifyName")
      DataService.clearData("classifyCode")
      DataService.clearData("outBoundmodelData")
      DataService.clearData("publicType")
      $state.go("app.outBoundList");
    };
    //判断选择审批人是否为空
    var getSelectApply = function () {
      var params = {
        sid: $localstorage.getObject('sid'),
        applicantCode: UserService.getUser().userCode,//申请人编码
        flowId: $scope.flowId,//工作流Id
        pageSize: '100'//分页（写死的）
      }
      outBoundApplyService.getSelectApply(params)
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
      outBoundApplyService.getNextFlowBusiness(params)
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
        }).error(function (response) {
        // 回调失败,隐藏进度条
        $ionicLoading.hide();
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }

    if (DataService.getData('outBoundCache') != undefined || DataService.getData('outBoundCache') != null) {
      $scope.step = "0";
      console.log("-------------------C______________________")
      console.log('领用单重新提交');
      $scope.modelData = DataService.getData('outBoundCache');
      $scope.modelData.isNewRecord = false;
    } else if (DataService.getData('outBoundApprove') != undefined || DataService.getData('outBoundApprove') != null) {
      $scope.stepType = "Approve"
      $scope.modelData = DataService.getData('outBoundApprove');
      $scope.modelData.isNewRecord = false;
      console.log($scope.modelData);
      $scope.itemsApprove = DataService.getData('outBoundApprove').outboundBillDtlList;
      console.log("-------------------B______________________",$scope.itemsApprove);
      //解决后台数据没有detailId的问题
      if($scope.itemsApprove.length>0){
        for (var i = 0; i < $scope.itemsApprove.length; i++) {
          if (i == 0) {
            $scope.items = [{
              detailId: 1,
              sortCode: $scope.itemsApprove[i].sortCode,//类别编码
              sortName: $scope.itemsApprove[i].sortName,//类别名称
              articlesName: $scope.itemsApprove[i].articlesName,//办公用品名称
              articlesCode: $scope.itemsApprove[i].articlesCode,//办公用品编码
              whCode: $scope.itemsApprove[i].whCode,//仓库名称
              whName: $scope.itemsApprove[i].whName,//仓库名称
              brand: $scope.itemsApprove[i].brand,//品牌名称
              version: $scope.itemsApprove[i].version,//规格型号
              qty: $scope.itemsApprove[i].qty,//库存
              price: $scope.itemsApprove[i].price,//价格
              outboundNumber: $scope.itemsApprove[i].outboundNumber,// 出库数量
              isNewRecord: true,
            }];
          } else {
            var itemsMode = {
              detailId: i + 1,
              sortCode: $scope.itemsApprove[i].sortCode,//类别编码
              sortName: $scope.itemsApprove[i].sortName,//类别名称
              articlesName: $scope.itemsApprove[i].articlesName,//办公用品名称
              articlesCode: $scope.itemsApprove[i].articlesCode,//办公用品编码
              whCode: $scope.itemsApprove[i].whCode,//仓库名称
              whName: $scope.itemsApprove[i].whName,//仓库名称
              brand: $scope.itemsApprove[i].brand,//品牌名称
              version: $scope.itemsApprove[i].version,//规格型号
              qty: $scope.itemsApprove[i].qty,//库存
              price: $scope.itemsApprove[i].price,//价格
              outboundNumber: $scope.itemsApprove[i].outboundNumber,// 出库数量
              isNewRecord: true
            }
            $scope.items.push(itemsMode);
          }
        }
      }else{
        $scope.wareHouseinfo = DataService.getData("wareHouseinfo")
        if ($scope.wareHouseinfo != null) {
          if (DataService.getData("outBoundApply") == undefined || DataService.getData("outBoundApply") == '') {
            $scope.items = [{
              detailId: 1,
              sortCode: $scope.wareHouseinfo.sortCode,//类别编码
              sortName: $scope.wareHouseinfo.sortName,//类别名称
              articlesName: $scope.wareHouseinfo.articlesName,//办公用品名称
              articlesCode: $scope.wareHouseinfo.articlesCode,//办公用品编码
              whCode: $scope.wareHouseinfo.whCode,//仓库名称
              whName: $scope.wareHouseinfo.whName,//仓库名称
              brand: $scope.wareHouseinfo.brand,//品牌名称
              version: $scope.wareHouseinfo.version,//规格型号
              qty: $scope.wareHouseinfo.qty,//入库数量
              price: $scope.wareHouseinfo.price,//入库数量
              outboundNumber: "",// 出库数量
              isNewRecord: true,
            }];
          } else {
            $scope.items = DataService.getData("outBoundApply");
            var number = $scope.items[$scope.items.length - 1].detailId + 1;
            var itemsMode = {
              detailId: number,
              sortCode: $scope.wareHouseinfo.sortCode,//类别编码
              sortName: $scope.wareHouseinfo.sortName,//类别名称
              articlesName: $scope.wareHouseinfo.articlesName,//办公用品名称
              articlesCode: $scope.wareHouseinfo.articlesCode,//办公用品编码
              whCode: $scope.wareHouseinfo.whCode,//仓库名称
              whName: $scope.wareHouseinfo.whName,//仓库名称
              brand: $scope.wareHouseinfo.brand,//品牌名称
              version: $scope.wareHouseinfo.version,//规格型号
              qty: $scope.wareHouseinfo.qty,//入库数量
              price: $scope.wareHouseinfo.price,//入库数量
              outboundNumber: "",// 出库数量
              isNewRecord: true
            }
            $scope.items.push(itemsMode);
          }
        }else{
          $scope.items = DataService.getData("outBoundApply");
        }
      }
    } else {
      $scope.step = "0";
      console.log("-------------------A______________________")
      var date = new Date();
        $scope.modelData = {
          outboundDate: date,//领用日期
          outbounderName: UserService.getUser().refObj.empName,//申请人
          outbounderCode: UserService.getUser().refObj.empCode,//申请人编码
          officeCode: UserService.getUser().refObj.officeCode,//申请人部门编码
          officeName: UserService.getUser().refObj.officeName,//申请人部门编码
          sortName: DataService.getData("classifyName"),
          sortCode: DataService.getData("classifyCode"),
          outboundNumber:DataService.getData("outBoundmodelData")== undefined ? '' : DataService.getData("outBoundmodelData").outboundNumber,
          remarks:DataService.getData("outBoundmodelData")== undefined ? '' : DataService.getData("outBoundmodelData").remarks,
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
          console.log("选择cancle的时候执行的代码")
        }
      });
    };
    //提交申请
    $scope.toSubmit = function () {
      if ($scope.flowId == null || $scope.flowId == undefined || $scope.flowId.length == 0) {
        PopupService.showToast('请等待,还未获取到流程ID');
        return;
      } else if ($scope.modelData.outbounderName == null || $scope.modelData.outbounderName.length == 0) {
        PopupService.showToast('申请人不能为空');
        return;
      } else if ($scope.modelData.officeName == null || $scope.modelData.officeName.length == 0) {
        PopupService.showToast('请选择部门');
        return;
      } else if ($scope.modelData.outboundDate == null || $scope.modelData.outboundDate.length == 0) {
        PopupService.showToast('请选择申请时间');
        return;
      } else if ($scope.modelData.sortName == null || $scope.modelData.sortName.length == 0) {
        PopupService.showToast('请选择办公用品分类');
        return;
      } else if ($scope.modelData.outboundNumber == null || $scope.modelData.outboundNumber.length == 0) {
        PopupService.showToast('请输入领用数量');
        return;
      } else if (($scope.approval == null || $scope.approval.refName == 0) && $scope.approvalList != 0) {
        PopupService.showToast('请选择审批人');
        return;
      }
      console.log("data",$scope.modelData);
      $ionicLoading.show();
      var param = {
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
        id: $scope.modelData.id == undefined ? '' : $scope.modelData.id,
        sysCode: $scope.modelData.sysCode == undefined ? '' : $scope.modelData.sysCode,
        outbounderCode: $scope.modelData.outbounderCode,//申请人
        outbounderName: $scope.modelData.outbounderName,//申请人编码
        outboundDate: $filter('date')($scope.modelData.outboundDate, 'yyyy-MM-dd'),//申请时间
        office: $scope.modelData.officeCode,  //部门编码
        officeName: $scope.modelData.officeName,  //部门名称
        sortCode: $scope.modelData.sortCode,//资产类别
        sortName: $scope.modelData.sortName,//资产类别编码
        outboundNumber: $scope.modelData.outboundNumber,
        approval: $scope.approval.refCode,
        approvalName: $scope.approval.refName,
        step: "",
        approvalStatus: $scope.modelData.approvalStatus,
        outboundBillDtlListString: JSON.stringify($scope.items),//明细数据
        remarks: $scope.modelData.remarks,
        __sid: $localstorage.getObject('sid'),
        flowId: $scope.flowId,//工作流FlowID~
      };
      console.log('-----参数打印------');
      console.log(param);
      outBoundApplyService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            console.log(response);
            DataService.clearData("selectApply")
            DataService.clearData("CurrBillInfoApprove")
            DataService.clearData("outBoundCache")
            DataService.clearData("outBoundApprove")
            DataService.clearData("wareHouseinfo")
            DataService.clearData("outBoundApply")
            DataService.clearData("classifyName")
            DataService.clearData("classifyCode")
            DataService.clearData("outBoundmodelData")
            DataService.clearData("publicType")
            PopupService.showToast('提交成功');
            $state.go('app.home.remind.todo_list');//跳转至待我审批
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
    $scope.changeNumber = function (e) {
      if ($scope.items[e - 1].outboundNumber > $scope.items[e - 1].qty) {
        $scope.items[e - 1].outboundNumber = 0;
        PopupService.showToast("不能大于库存");
      } else {

      }
    };
    //审批同意
    $scope.goApproval = function () {
      var billInfo = DataService.getData("CurrBillInfoApprove");//当前操作的单据
      if ($scope.flowId == null || $scope.flowId == undefined || $scope.flowId.length == 0) {
        PopupService.showToast('请等待,还未获取到流程ID');
        return;
      } else if ($scope.modelData.outbounderName == null || $scope.modelData.outbounderName.length == 0) {
        PopupService.showToast('申请人不能为空');
        return;
      } else if ($scope.modelData.officeName == null || $scope.modelData.officeName.length == 0) {
        PopupService.showToast('请选择部门');
        return;
      } else if ($scope.modelData.outboundDate == null || $scope.modelData.outboundDate.length == 0) {
        PopupService.showToast('请选择申请时间');
        return;
      } else if ($scope.modelData.sortName == null || $scope.modelData.sortName.length == 0) {
        PopupService.showToast('请选择办公用品分类');
        return;
      } else if ($scope.modelData.outboundNumber == null || $scope.modelData.outboundNumber.length == 0) {
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
        id: $scope.modelData.id == undefined ? '' : $scope.modelData.id,
        sysCode: $scope.modelData.sysCode == undefined ? '' : $scope.modelData.sysCode,
        outbounderCode: $scope.modelData.outbounderCode,//申请人
        outbounderName: $scope.modelData.outbounderName,//申请人编码
        outboundDate: $filter('date')($scope.modelData.outboundDate, 'yyyy-MM-dd'),//申请时间
        office: $scope.modelData.officeCode,  //部门编码
        officeName: $scope.modelData.officeName,  //部门名称
        sortCode: $scope.modelData.sortCode,//资产类别
        sortName: $scope.modelData.sortName,//资产类别编码
        outboundNumber: $scope.modelData.outboundNumber,
        step: billInfo.step,
        approvalStatus: billInfo.approvalStatus,
        outboundBillDtlListString: JSON.stringify($scope.items),//明细数据
        remarks: $scope.modelData.remarks,
        __sid: $localstorage.getObject('sid'),
        flowId: $scope.flowId,//工作流FlowID~
      };
      console.log('-----参数打印------');
      console.log(param);
      outBoundApplyService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            console.log(response);
            DataService.clearData("selectApply")
            DataService.clearData("CurrBillInfoApprove")
            DataService.clearData("outBoundCache")
            DataService.clearData("outBoundApprove")
            DataService.clearData("wareHouseinfo")
            DataService.clearData("outBoundApply")
            DataService.clearData("classifyName")
            DataService.clearData("classifyCode")
            DataService.clearData("outBoundmodelData")
            DataService.clearData("publicType")
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
                sysCode: billInfo.bizKey,
              }
            }
            outBoundApplyService.approvalBill(params)
              .success(function (response) {
                console.log('审批结果');
                console.log(response);
                // 回调成功,处理返回值
                if (response.code == "200") {
                  $ionicLoading.hide();
                  if(billInfo.step>2){
                    PopupService.showToast("确认成功!");
                  }else{
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
        billType: 'WZCK',//模板单据类型
        companyCode: UserService.getUser().refObj.companyCode,//申请人公司编码
        sid: $localstorage.getObject('sid')
      }
      outBoundApplyService.getFlowID(params)
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
      DataService.clearData("outBoundmodelData");
      DataService.setData("outBoundmodelData", $scope.modelData)
      DataService.clearData("outBoundApply");
      DataService.setData("outBoundApply", $scope.items)
      DataService.clearData("wareHouseinfo");
      $state.go('classify');
    };
    //获取仓库物品
    $scope.getwareHouseinfo = function (e) {
      DataService.clearData("outBoundmodelData");
      DataService.setData("outBoundmodelData", $scope.modelData)
      DataService.clearData("outBoundApply");
      DataService.setData("outBoundApply", $scope.items)
      DataService.clearData("wareHouseinfo");
      $scope.articlesCodes=[];
      if ($scope.items!= undefined||$scope.items!= null) {
        for(var i=0;i<$scope.items.length;i++){
          $scope.articlesCodes.push($scope.items[i].articlesCode)
        }
      }
      $state.go('wareHouseJump',{flCode:$scope.modelData.sortCode,articlesCodes:$scope.articlesCodes});
    };


    /*
   * refuseBill 拒绝单据,填写审核不同意的意见
   * @param
   * @return 没有返回值
   */
    $scope.refuseBill = function () {
      DataService.clearData("selectApply")
      DataService.clearData("CurrBillInfoApprove")
      DataService.clearData("outBoundCache")
      DataService.clearData("outBoundApprove")
      DataService.clearData("wareHouseinfo")
      DataService.clearData("outBoundApply")
      DataService.clearData("classifyName")
      DataService.clearData("classifyCode")
      DataService.clearData("outBoundmodelData")
      DataService.clearData("publicType")
      $state.go('outBoundRefuse');
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
        outBoundApplyService.getNextFlowBusiness(params)
          .success(function (response) {
            console.log('获取下一步审批人');
            console.log(response);
            // 回调成功,处理返回值
            if (response.code == "200") {
              if (response.data.hasNextStep == true) {
                //跳转到选择审批人画面
                $state.go("outBoundApprove");
                $ionicLoading.hide();
              }
              else {
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
        DataService.clearData("outBoundmodelData");
        DataService.setData("outBoundmodelData", $scope.modelData)
        DataService.clearData("outBoundApply");
        DataService.setData("outBoundApply", $scope.items)
        $state.go('outBoundSelect', {flowId: $scope.flowId});
      }

    }
  }]);
Asset.service('outBoundApplyService', ['$http', 'UrlService', function ($http, UrlService) {

  this.getFlowHelp = function (params) {//获取工作流flowID
    return $http.post(UrlService.getUrlData_check('FLOWHELP') + "?__sid=" + params['sid'] + "&flowId=" + params["flowId"] + "&step=" + params["step"]);
  }
  this.getFlowID = function (params) {//获取工作流flowID
    return $http.post(UrlService.getUrlData_check('GET_FLOW_TEMPLATE') + "?__sid=" + params['sid'] + "&billType=" + params["billType"] + "&companyCode=" + params["companyCode"]);
  }
  this.submitData = function (params) {//数据提交
    return $http.post(UrlService.getUrlData_check('OUTBOUND_SAVE'), params);
  }
  this.getSelectApply = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_APPROVAL_OUTBOUND') + "?__sid=" + params['sid'] + "&applicantCode=" + params['applicantCode'] + "&flowId=" + params["flowId"] + "&pageSize=" + params["pageSize"]);
  }
  this.getNextFlowBusiness = function (params) {
    return $http.post(UrlService.getUrlData_check('GET_NEXT_FLOWBUSINESS') + "?__sid=" + params['sid'] + "&step=" + params["step"] + "&bizKey=" + params["bizKey"]);
  }
  this.approvalBill = function (params) {
    return $http.post(UrlService.getUrlData_check('AGREE_OUTBOUND') + "?__sid=" + params["sid"], params);
  }
}]);


