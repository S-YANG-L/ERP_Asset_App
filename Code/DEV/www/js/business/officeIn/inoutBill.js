/**
 * Created by SuYangLong on 2018/10/9.
 */
Asset.controller('inOutBillCtrl', ['$ionicPopup', '$scope', '$state', '$ionicLoading', 'inoutBillService', 'UserService', 'UrlService', '$localstorage', '$ionicHistory', '$ionicActionSheet', 'httpUtil', 'PopupService', '$filter', 'ionicDatePicker', 'ionicTimePicker', '$cordovaCamera', 'DataService',
  function ($ionicPopup, $scope, $state, $ionicLoading, inoutBillService, UserService, UrlService, $localstorage, $ionicHistory, $ionicActionSheet, httpUtil, PopupService, $filter, ionicDatePicker, ionicTimePicker, $cordovaCamera, DataService) {
    $scope.$on('$ionicView.enter', function () {
      $scope.Warehouse = DataService.getData("selectwarehouse")
    });
    //返回
    $scope.goBack = function () {
      DataService.clearData("articles")
      DataService.clearData("articlesFile")
      DataService.clearData("orderBills")
      DataService.clearData("orderBillsFile")
      DataService.clearData("inoutBill")
      DataService.clearData("selectwarehouse")
      $state.go("app.inOutBillList")
    };

    //接受页面传值
    $scope.wareHouseinfo = DataService.getData("articles");
    if ($scope.wareHouseinfo != null) {
      if (DataService.getData("articlesFile") == undefined || DataService.getData("articlesFile") == '') {
        $scope.items = [{
          detailId: 1,
          sortCode: $scope.wareHouseinfo.sortCode,//类别名称
          sortName: $scope.wareHouseinfo.sortName,//类别名称
          articlesName: $scope.wareHouseinfo.articlesName,//办公用品名称
          articleCode: $scope.wareHouseinfo.articlesCode,//办公用品编码
          brand: $scope.wareHouseinfo.brand,//品牌名称
          version: $scope.wareHouseinfo.version,//规格型号
          unit: $scope.wareHouseinfo.unit,//单位
          qty: $scope.wareHouseinfo.qty==undefined?'':$scope.wareHouseinfo.qty==undefined,//入库数量
          price: $scope.wareHouseinfo.price==undefined?'':$scope.wareHouseinfo.price,//入库单价
          sumMoney: $scope.wareHouseinfo.price * $scope.wareHouseinfo.qty,//合计金额
          isNewRecord: true,
        }];
      } else {
        $scope.items = DataService.getData("articlesFile");
        var number = $scope.items[$scope.items.length - 1].detailId + 1;
        var itemsMode = {
          detailId: number,
          sortCode: $scope.wareHouseinfo.sortCode,//类别名称
          sortName: $scope.wareHouseinfo.sortName,//类别名称
          articlesName: $scope.wareHouseinfo.articlesName,//办公用品名称
          articleCode: $scope.wareHouseinfo.articlesCode,//办公用品编码
          brand: $scope.wareHouseinfo.brand,//品牌名称
          version: $scope.wareHouseinfo.version,//规格型号
          unit: $scope.wareHouseinfo.unit,//单位
          qty: $scope.wareHouseinfo.qty==undefined?'':$scope.wareHouseinfo.qty==undefined,//入库数量
          price: $scope.wareHouseinfo.price==undefined?'':$scope.wareHouseinfo.price,//入库单价
          sumMoney: $scope.wareHouseinfo.qty * $scope.wareHouseinfo.price,//合计金额
          isNewRecord: true
        }
        $scope.items.push(itemsMode);
      }
    }else {
      $scope.items = DataService.getData("articlesFile");
    }
    
    
    $scope.orderBillsinfo = DataService.getData("orderBills");
    if ($scope.orderBillsinfo != null) {
      if (DataService.getData("orderBillsFile") == undefined || DataService.getData("orderBillsFile") == '') {
        $scope.items1 = [{
          detailId1: 1,
          sortCode: $scope.orderBillsinfo.sortCode,//类别名称
          sortName: $scope.orderBillsinfo.sortName,//类别名称
          articlesName: $scope.orderBillsinfo.articlesName,//办公用品名称
          articleCode: $scope.orderBillsinfo.articlesCode,//办公用品编码
          brand: $scope.orderBillsinfo.brand,//品牌名称
          version: $scope.orderBillsinfo.version,//规格型号
          unit: $scope.orderBillsinfo.unit,//单位
          qty: $scope.orderBillsinfo.qty,//入库数量
          price: $scope.orderBillsinfo.price,//入库单价
          sumMoney: $scope.orderBillsinfo.price * $scope.orderBillsinfo.qty,//合计金额
          isNewRecord: true,
        }];
      } else {
        $scope.items1 = DataService.getData("orderBillsFile");
        var number1 = $scope.items1[$scope.items1.length - 1].detailId1 + 1;
        var itemsMode1 = {
          detailId1: number1,
          sortCode: $scope.orderBillsinfo.sortCode,//类别名称
          sortName: $scope.orderBillsinfo.sortName,//类别名称
          articlesName: $scope.orderBillsinfo.articlesName,//办公用品名称
          articleCode: $scope.orderBillsinfo.articlesCode,//办公用品编码
          brand: $scope.orderBillsinfo.brand,//品牌名称
          version: $scope.orderBillsinfo.version,//规格型号
          unit: $scope.orderBillsinfo.unit,//单位
          qty: $scope.orderBillsinfo.qty,//入库数量
          price: $scope.orderBillsinfo.price,//入库单价
          sumMoney: $scope.orderBillsinfo.qty * $scope.orderBillsinfo.price,//合计金额
          isNewRecord: true
        }
        $scope.items1.push(itemsMode1);
      }
    }else {
      $scope.items1 = DataService.getData("orderBillsFile");
    }

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
      ipObj1.inputDate = new Date($scope.modelData.applyDate);
      ipObj1.callback = function (val) {
        $scope.modelData.applyDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
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
    //选择仓库
    $scope.choicewarhouse = function () {
      DataService.clearData("inoutBill");
      DataService.setData("inoutBill", $scope.modelData)
      DataService.clearData("inoutBill");
      DataService.setData("inoutBill", $scope.modelData)
      DataService.clearData("inoutBill");
      DataService.setData("inoutBill", $scope.modelData)
      $state.go("warehouse");
    }


    console.log(UserService.getUser().refObj.empName)
    var date = new Date();
    if ($scope.modelData == null) {
      $scope.modelData = {
        applyDate: date,//领用日期
        operator: UserService.getUser().refObj.empName,
        content: DataService.getData("inoutBill") == undefined ? '' : DataService.getData("inoutBill").content,
      };
    } else {
      $scope.modelData = {
        applyDate: date,//领用日期
        operator: UserService.getUser().refObj.empName,
        content: DataService.getData("inoutBill") == undefined ? '' : DataService.getData("inoutBill").content,
      };
    }

    //获取办公用品
    $scope.getwareHouseinfo = function (e) {
      DataService.clearData("articles")
      DataService.clearData("orderBills")
      DataService.clearData("orderBillsFile");
      DataService.setData("orderBillsFile", $scope.items1);
      DataService.clearData("articlesFile");
      DataService.setData("articlesFile", $scope.items);
      DataService.clearData("inoutBill");
      DataService.setData("inoutBill", $scope.modelData)
      $state.go('articlesFile');
    };
    //获取采购单数据
    $scope.getorderBill = function (e) {
      DataService.clearData("orderBills")
      DataService.clearData("articles")
      DataService.clearData("articlesFile");
      DataService.setData("articlesFile", $scope.items);
      DataService.clearData("orderBillsFile");
      DataService.setData("orderBillsFile", $scope.items1);
      DataService.clearData("inoutBill");
      DataService.setData("inoutBill", $scope.modelData)
      $state.go('orderBill');
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
    //  confirm 对话框和删除一个报销明细
    $scope.showConfirm1 = function (detailId) {
      var confirmPopup = $ionicPopup.confirm({
        title: '是否删除',
        okText: '是',
        cancelText: '否'
        //template: 'Are you sure you want to eat this ice cream?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.items1.splice(detailId - 1, 1);
          for (var i = detailId - 1; i < $scope.items1.length; i++) {
            $scope.items1[detailId - 1].detailId = i ;
          }
        } else {
          console.log("选择cancle的时候执行的代码")
        }
      });
    };
    //提交申请
    $scope.toSubmit = function () {
      if ($scope.modelData.applyDate == null || $scope.modelData.applyDate.length == 0) {
        PopupService.showToast('请选择入库时间');
        return;
      } else if ($scope.Warehouse == null || $scope.Warehouse.length == 0) {
        PopupService.showToast('请选择仓库');
        return;
      }
      for(var i=0;i<$scope.items.length;i++){
        if ($scope.items[i].price== null || $scope.items[i].price.length == 0) {
          PopupService.showToast('请填写用品单价');
          return;
        }
      }
      for(var i=0;i<$scope.items.length;i++){
        if ($scope.items[i].qty == null || $scope.items[i].qty.length == 0) {
          PopupService.showToast('请填写用品数量');
          return;
        }
      }

      $ionicLoading.show();
      var params = {
        companyCode: UserService.getUser().refObj.companyCode,
        companyName: UserService.getUser().refObj.companyNameSimple,
        deptCode: UserService.getUser().refObj.officeCode,  //部门名称
        deptName: UserService.getUser().refObj.officeName,  //部门名称
        orderDate: $filter('date')($scope.modelData.applyDate, 'yyyy-MM-dd'),//入库日期
        whCode: DataService.getData("selectwarehouse").warehouseCode, //仓库编码
        whName: DataService.getData("selectwarehouse").warehouseName,//仓库名称
        psnCode: UserService.getUser().refObj.empCode,
        psnName: UserService.getUser().refObj.empName,
        remarks: $scope.modelData.content,  //备注
        inoutBillsList: JSON.stringify($scope.items),//明细数据
        inoutOrderbillsList: JSON.stringify($scope.items1),//明细数据
        __sid: $localstorage.getObject('sid'),
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
      }
      inoutBillService.submitData(params)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            $scope.goBack();
            DataService.clearData("articles")
            DataService.clearData("articlesFile")
            DataService.clearData("orderBills")
            DataService.clearData("orderBillsFile")
            DataService.clearData("inoutBill")
            DataService.clearData("selectwarehouse")
            PopupService.showToast('入库成功');
            $state.go('app.home.home1');
          } else if (response.code == 201) {
            $ionicLoading.hide();
            PopupService.showToast('入库失败');
          }
        }).error(function (response) {
        $ionicLoading.hide();
        PopupService.showToast('网络错误,请稍后重试.');
      });
    }


  }]);
Asset.service('inoutBillService', ['$http', 'UrlService', function ($http, UrlService) {
  this.submitData = function (params) {//数据提交
    return $http.post(UrlService.getUrlData_check('INOUTBILL'), params);
  };

}]);







