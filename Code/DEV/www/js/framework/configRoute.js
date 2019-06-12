/**
 * Created by suyanglong on 2018-11-06.
 */
var route = function ($stateProvider, $urlRouterProvider) {
  $stateProvider

  /******************** login ***********************/

    .state('login', {
      url: '/login',
      params: {userName: ''},
      templateUrl: 'templates/login/login.html',
      controller: 'LoginCtrl'
    })

    /**************忘记密码**********************/
    .state('forgetPassWord', {
      url: '/forgetPassWord',
      params: {loginCode: ''},
      templateUrl: 'templates/login/forgetPassWord.html',
      controller: 'ForgetPWCtrl'
    })

    /**************校验验证码********************/
    .state('validateCode', {
      url: '/validateCode',
      params: {data: ''},
      templateUrl: 'templates/login/validateCode.html',
      controller: 'validateCodeCtrl'
    })

    /**************修改密码********************/
    .state('changePW', {
      url: '/changePW',
      params: {mobile: ''},
      templateUrl: 'templates/login/changePW.html',
      controller: 'ChangePwCtrl'
    })
    // 侧边栏
    .state('app', {
      url: "/app",
      templateUrl: "templates/menu/menu.html",
      controller: 'menuCtrl'
    })
    //底部按钮
    .state('app.home', {
      url: "/home",
      abstract:true,
      views: {
        'menuContent': {
          templateUrl: "templates/business/home.html",
          controller: 'homeCtrl'
        }
      }
    })

    //首页
    .state('app.home.home1', {
      url: '/home1',
      views: {
        'app-home-home1': {
          templateUrl: 'templates/business/home1.html',
          controller: 'home1Ctrl'
        }
      }
    })

    .state('app.home.remind', {
      url: "/remind",
      views: {
        'app-home-remind': {
          templateUrl: 'templates/work/remind.html',
          controller: 'RemindController'
        }
      }
    })
    //待办业务
    .state('app.home.remind.todo_list', {
      url: '/todo_list',
      views: {
        'app-home-remind-todo': {
          templateUrl: 'templates/work/todo_list.html',
          controller: 'TodoListController'
        }
      }
    })
    //已办业务
    .state('app.home.remind.done_list', {
      url: '/done_list',
      views: {
        'app-home-remind-done': {
          templateUrl: 'templates/work/done_list.html',
          controller: 'DoneListController'
        }
      }
    })
    //我的申请
    .state('app.home.remind.apply_list', {
      url: '/apply_list',
      views: {
        'app-home-remind-apply': {
          templateUrl: 'templates/work/apply_list.html',
          controller: 'applyListController'
        }
      }
    })
    //---------------------资产入库----------------------------------
    //资产新增
    .state('addAssets', {
      url: "/addAssets",
      templateUrl: "templates/business/asset/addAssets.html",
      controller: 'addAssetsCtrl'
    })
    //资产详情
    .state('assetDetails', {
      url: "/assetDetails",
      templateUrl: "templates/business/asset/assetDetails.html",
      controller: 'assetDetailsCtrl'
    })
    //资产筛选
    .state('assetScreen', {
      url: "/assetScreen",
      templateUrl: "templates/common/assetScreen.html",
      controller: 'assetScreenCtrl'
    })
    //仓库
    .state('warehouse', {
      url: "/warehouse",
      templateUrl: "templates/common/warehouse.html",
      controller: 'warehouseCtrl'
    })
    //供应商
    .state('supplier', {
      url: "/supplier",
      templateUrl: "templates/common/supplier.html",
      controller: 'supplierCtrl'
    })
   //资产小类
    .state('assetClass', {
      url: "/assetClass",
      params: {sortName: ''},
      templateUrl: "templates/common/assetClass.html",
      controller: 'assetClassCtrl'
    })
    //资产列表
    .state('assets', {
      url: "/assets",
      templateUrl: "templates/business/asset/assets.html",
      controller: 'assetsCtrl'
    })

    //选择员工
    .state('addOneMember', {
      url: "/addOneMember",
      templateUrl: 'templates/common/addOneMember.html',
      controller: 'addOneMemberCtrl'
    })
    //消息推送
    .state('personSetting', {
      url: "/personSetting",
      templateUrl: 'templates/menu/personSetting.html',
      controller: 'personSettingController'
    })


    //公司选择
    .state('selectFirm', {
      url: "/selectFirm",
      templateUrl: 'templates/common/selectFirm.html',
      controller: 'selectFirmCtrl'
    })
    //部门选择
    .state('departmentList', {
      url: "/departmentList",
      templateUrl: 'templates/common/departmentList.html',
      controller: 'departmentListCtrl',
    })
    //选择资产类别
    .state('selectAssetType', {
      url: "/selectAssetType",
      templateUrl: 'templates/common/selectAssetType.html',
      controller: 'selectAssetTypeCtrl'
    })
    //选择资产大类
    .state('selectAssetTop', {
      url: "/selectAssetTop",
      templateUrl: 'templates/common/selectAssetTop.html',
      controller: 'selectAssetTopCtrl'
    })
    //选择资产列表
    .state('publicAssets', {
      url: "/publicAssets",
      params: {code: '', sortCode: "", assetCodes: []},
      templateUrl: 'templates/common/publicAssets.html',
      controller: 'publicAssetsCtrl',
    })
    //存放地点
    .state('address', {
      url: "/address",
      templateUrl: 'templates/common/address.html',
      controller: 'addressCtrl',
    })
    /**************办公用品********************/
    //办公用品档案
    .state('articlesFile', {
      url: "/articlesFile",
      templateUrl: 'templates/common/articlesFile.html',
      controller: 'articlesFileCtrl'
    })
    //采购单
    .state('orderBill', {
      url: "/orderBill",
      templateUrl: 'templates/business/officeIn/orderBill.html',
      controller: 'orderBillCtrl'
    })
    //办公用品入库
    .state('app.inOutBill', {
      url: "/inOutBill",
      views: {
        'menuContent': {
          templateUrl: 'templates/business/officeIn/inoutBill.html',
          controller: 'inOutBillCtrl'
        }
      }
    })
    //办公用品列表
    .state('app.inOutBillList', {
      url: "/inOutBillList",
      views: {
        'menuContent': {
          templateUrl: 'templates/business/officeIn/inOutBillList.html',
          controller: 'inOutBillListCtrl'
        }
      }
    })
    //办公用品列表详情
    .state('inOutBillDetail', {
      url: "/inOutBillDetail",
      templateUrl: 'templates/business/officeIn/inOutBillDetail.html',
      controller: 'inOutBillDetailCtrl'
    })
    //办公用品筛选
    .state('inOutBillFilter', {
      url: "/inOutBillFilter",
      templateUrl: 'templates/business/officeIn/inOutBillFilter.html',
      controller: 'inOutBillFilterCtrl'
    })
    // //办公用品筛选
    // .state('assetUsedDone', {
    //   url: "/assetUsedDone",
    //   templateUrl: 'templates/business/assetUsed/assetUsedDone.html',
    //   controller: 'assetUsedDoneCtrl'
    // })
    .state('outBoundApply', {
      url: "/outBoundApply",
      templateUrl: "templates/business/outBound/outBoundApply.html",
      controller: 'outBoundApplyCtrl'
    })
    //下一步审批人
    .state('approvalSelect', {
      url: "/approvalSelect",
      params: {flowId: ''},
      templateUrl: 'templates/business/outBound/approvalSelect.html',
      controller: 'approvalSelectCtrl'
    })
    .state('outBoundApprove', {
      url: "/approvalSelect",
      params: {flowId: ''},
      templateUrl: 'templates/business/outBound/outBoundApprove.html',
      controller: 'outBoundApproveCtrl'
    })
    //仓库页面信息
    .state('wareHouseJump', {
      url: "/wareHouseJump",
      params: {flCode: '', articlesCodes: []},
      templateUrl: 'templates/business/wareHouse/wareHouseJump.html',
      controller: 'wareHouseJumpCtrl'
    })
    //办公用品领用我的申请
    .state('outBoundDone', {
      url: "/outBoundDone",
      params: {code: ''},
      templateUrl: 'templates/business/outBound/outBoundDone.html',
      controller: 'outBoundDoneCtrl'
    })
    //办公用品领用我的
    .state('outBound', {
      url: "/outBound",
      templateUrl: 'templates/business/outBound/outBound.html',
      controller: 'outBoundCtrl'
    })
    //拒绝
    .state('refuse', {
      url: "/refuse",
      templateUrl: 'templates/business/outBound/refuse.html',
      controller: 'refuseCtrl'
    })
    //拒绝
    .state('outBoundRefuse', {
      url: "/outBoundRefuse",
      templateUrl: 'templates/business/outBound/outBoundRefuse.html',
      controller: 'outBoundRefuseCtrl'
    })
    //出库列表
    .state('app.outBoundList', {
      url: "/outBoundList",
      views: {
        'menuContent': {
          templateUrl: "templates/business/outBound/outBoundList.html",
          controller: 'outBoundListCtrl'
        }
      }
    })
    //办公用品领用我的
    .state('outBoundform', {
      url: "/outBoundform",
      templateUrl: 'templates/business/outBound/outBoundform.html',
      controller: 'outBoundformCtrl'
    })
    //办公用品列表筛选
    .state('outBoundFilter', {
      url: "/outBoundFilter",
      templateUrl: 'templates/business/outBound/outBoundFilter.html',
      controller: 'outBoundFilterCtrl'
    })
    //办公用品列表筛选
    .state('outBoundSelect', {
      url: "/outBoundSelect",
      params: {flowId: ''},
      templateUrl: 'templates/business/outBound/outBoundSelect.html',
      controller: 'outBoundSelectCtrl'
    })

    //办公用品分类
    .state('classify', {
      url: "/classify",
      templateUrl: 'templates/common/classify.html',
      controller: 'classifyCtrl'
    })


    //  ----------------------------------------
    //资产调拨列表
    .state('allocatIn', {
      url: "/allocatIn",
      templateUrl: 'templates/business/assetAllocat/allocatIn.html',
      controller: 'allocatInCtrl'
    })
    //资产调拨详情
    .state('allocatForm', {
      url: "/allocatForm",
      templateUrl: 'templates/business/assetAllocat/allocatForm.html',
      controller: 'allocatFormCtrl'
    })
    //新增资产调拨
    .state('addAllocat', {
      url: "/addAllocat",
      templateUrl: 'templates/business/assetAllocat/addAllocat.html',
      controller: 'addAllocatCtrl'
    })
    //调拨类型
    .state('dictType', {
      url: "/dictType",
      templateUrl: 'templates/business/assetAllocat/dictType.html',
      controller: 'dictTypeCtrl'
    })
    //调拨选择审批人
    .state('Selectapproval', {
      url: "/Selectapproval",
      params: {flowId: ''},
      templateUrl: 'templates/business/assetAllocat/Selectapproval.html',
      controller: 'SelectapprovalCtrl'
    })
    //办公用品领用我的申请
    .state('allocatDone', {
      url: "/allocatDone",
      params: {code: ''},
      templateUrl: 'templates/business/assetAllocat/allocatDone.html',
      controller: 'allocatDoneCtrl'
    })
    .state('allocatApprove', {
      url: "/allocatApprove",
      params: {allotOfficeCode: ''},
      templateUrl: 'templates/business/assetAllocat/allocatApprove.html',
      controller: 'allocatApproveCtrl'
    })
    .state('allocat', {
      url: "/allocat",
      params: {flowId: ''},
      templateUrl: 'templates/business/assetAllocat/allocat.html',
      controller: 'allocatCtrl'
    })
    .state('addAlloactRefuse', {
      url: "/addAlloactRefuse",
      templateUrl: 'templates/business/assetAllocat/addAlloactRefuse.html',
      controller: 'addAlloactRefuseCtrl'
    })
    //资产领用
    .state('assetUsedApply', {
      url: "/assetUsedApply",
      templateUrl: "templates/business/assetUsed/assetUsedApply.html",
      controller: 'assetUsedApplyCtrl'
    })
    .state('assetUsedSelect', {
      url: "/assetUsedSelect",
      params: {flowId: ''},
      templateUrl: 'templates/business/assetUsed/assetUsedSelect.html',
      controller: 'assetUsedSelectCtrl'
    })
    .state('assetUsedApprove', {
      url: "/approvalSelect",
      params: {flowId: ''},
      templateUrl: 'templates/business/assetUsed/assetUsedApprove.html',
      controller: 'assetUsedApproveCtrl'
    })
    //办公用品领用我的申请
    .state('assetUsedDone', {
      url: "/assetUsedDone",
      params: {code: ''},
      templateUrl: 'templates/business/assetUsed/assetUsedDone.html',
      controller: 'assetUsedDoneCtrl'
    })
    //办公用品领用我的
    .state('assetUsed', {
      url: "/assetUsed",
      templateUrl: 'templates/business/assetUsed/assetUsed.html',
      controller: 'assetUsedCtrl'
    })
    //拒绝
    .state('assetUsedRefuse', {
      url: "/assetUsedRefuse",
      templateUrl: 'templates/business/assetUsed/assetUsedRefuse.html',
      controller: 'assetUsedRefuseCtrl'
    })





    //办公用品领用我的
    .state('assetUsedform', {
      url: "/assetUsedform",
      templateUrl: 'templates/business/assetUsed/assetUsedform.html',
      controller: 'assetUsedformCtrl'
    })
    //办公用品列表筛选
    .state('assetUsedFilter', {
      url: "/assetUsedFilter",
      templateUrl: 'templates/business/assetUsed/assetUsedFilter.html',
      controller: 'assetUsedFilterCtrl'
    })
    //办公用品列表库存查询
    .state('wareHouseList', {
      url: "/wareHouseList",
      templateUrl: 'templates/business/wareHouse/wareHouseList.html',
      controller: 'wareHouseListCtrl'
    })

    //-----------------------盘点---------------------------
    //盘点
    .state('stockTaking', {
      url: "/stockTaking",
      templateUrl: 'templates/business/officeLook/stockTaking.html',
      controller: 'stockTakingCtrl'
    })
    //库存盘点
    .state('Inventory', {
      url: "/Inventory",
      templateUrl: 'templates/business/officeLook/Inventory.html',
      controller: 'InventoryCtrl'
    })
    //-------------------------------资产退库-----------------------------------
    //退库子表
    .state('retreatingList', {
      url: "/retreatingList",
      templateUrl: 'templates/common/retreatingList.html',
      controller: 'retreatingListCtrl',
    })
    //领用子表
    .state('collarTable', {
      url: "/collarTable",
      params: {assetCodes: []},
      templateUrl: 'templates/common/collarTable.html',
      controller: 'collarTableCtrl'
    })

    //领用退库
    .state('useRefund', {
      url: "/useRefund",
      abstract: true,
      templateUrl: 'templates/business/assetRefund/useRefund.html',
      controller: 'useRefundController'
    })
    //领用列表
    .state('useRefund.assetUsedList', {
      url: '/assetUsedList',
      views: {
        'useRefund-assetUsedList': {
          templateUrl: 'templates/business/assetUsed/assetUsedList.html',
          controller: 'assetUsedListCtrl'
        }
      }
    })
    //退库列表
    .state('useRefund.refund', {
      url: '/refund',
      views: {
        'useRefund-refund': {
          templateUrl: 'templates/business/assetRefund/refund.html',
          controller: 'refundController'
        }
      }
    })
    //资产退库
    .state('app.assetRefund', {
      url: "/assetRefund",
      views: {
        'menuContent': {
          templateUrl: 'templates/business/assetRefund/assetRefund.html',
          controller: 'assetRefundCtrl'
        }
      }
    })

    //筛选
    .state('receiveFilter', {
      url: "/receiveFilter",
      templateUrl: 'templates/business/assetRefund/receiveFilter.html',
      controller: 'receiveFilterController'
    })
    //资产领用详情
    .state('receiveDetail', {
      url: "/receiveDetail",
      templateUrl: 'templates/business/assetRefund/receiveDetail.html',
      controller: 'receiveDetailCtrl'
    })
    //退库详情
    .state('refundDetail', {
      url: '/refundDetail',
      templateUrl: 'templates/business/assetRefund/refundDetail.html',
      controller: 'refundDetailCtrl'
    })
    //退库申请
    .state('retiring', {
      url: '/retiring',
      params: {code: ''},
      templateUrl: 'templates/business/assetRefund/retiring.html',
      controller: 'retiringCtrl'
    })
    //审批
    .state('useRefundApply', {
      url: '/useRefundApply',
      templateUrl: 'templates/business/assetRefund/useRefundApply.html',
      controller: 'useRefundApplyCtrl'
    })

    //退库审批
    .state('useBound', {
      url: '/useBound',
      templateUrl: 'templates/business/assetRefund/useBound.html',
      controller: 'useBoundCtrl'
    })
    //退库拒绝
    .state('useRefundRefuse', {
      url: '/useRefundRefuse',
      templateUrl: 'templates/business/assetRefund/useRefundRefuse.html',
      controller: 'useRefundRefuseCtrl'
    })
    //退库已审批
    .state('useRefundDone', {
      url: '/useRefundDone',
      templateUrl: 'templates/business/assetRefund/useRefundDone.html',
      controller: 'useRefundDoneCtrl'
    })
    //选择申请的审批人
    .state('selectApply', {
      url: "/selectApply",
      params: {flowId: ''},
      templateUrl: 'templates/business/assetRefund/selectApply.html',
      controller: 'selectApplyCtrl'
    })
    //退库下一步审批人
    .state('assetRefundSelect', {
      url: '/assetRefundSelect',
      templateUrl: 'templates/business/assetRefund/assetRefundSelect.html',
      controller: 'assetRefundSelectCtrl'
    })
    //重新审批
    .state('assetRefundApply', {
      url: '/assetRefundApply',
      templateUrl: 'templates/business/assetRefund/assetRefundApply.html',
      controller: 'assetRefundApplyCtrl'
    })
    //库存盘点
    .state('htmlPaly', {
      url: "/htmlPaly",
      params: {targetUrl: ''},
      templateUrl: 'templates/business/officeLook/htmlPaly.html',
      controller: 'htmlPalyCtrl'
    })

  // if none of the above states are matched, use this as th/e findexlback
  $urlRouterProvider.otherwise('/login');

  // $urlRouterProvider.otherwise('/login');
  // if (window.localStorage.getItem("sid") == null) {
  //   $urlRouterProvider.otherwise('/login');
  // }
  // else {
  //   if (window.localStorage.getItem("sid").length > 20) {
  //     $urlRouterProvider.otherwise('/login');
  //   }
  //   else {
  //     $urlRouterProvider.otherwise('/login');
  //   }
  //
  // }
};
