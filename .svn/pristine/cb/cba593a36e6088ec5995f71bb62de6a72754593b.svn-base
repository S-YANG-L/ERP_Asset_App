/**
 * Created by xulan on 2018-7-20.
 */
/*接口地址管理 */
Asset.service('UrlService', [function () {

  //联调环境
  // var CHECK_SERVICE_URL = "http://localhost:5050/a";
  // var SERVICE_URL = "http://localhost:5050";
   var CHECK_SERVICE_URL = "http://www.botemc.com/edp/a";
   var SERVICE_URL = "http://www.botemc.com/edp";
  //测试环境
  // var CHECK_SERVICE_URL = "http://www.botemc.com/ERP_Product/a";
  // var SERVICE_URL = "http://www.botemc.com/ERP_Product";
  // var CHECK_SERVICE_URL_IMG = "http://www.botemc.com";

  var path = {
    LOGIN: "/login",//登录
    LOGOUT: "/logout",//登出
    FILE_DELETE: '/filedelete',//删除上传文件
    UPLOAD: '/fileupload',//上传
    GET_FILE: '/file/fileList',//查看附件
    WX_OPENID: '/app/wx/getopenid',//微信获取openid

    /***************登录********************/
    GET_REGISTER_FINDLIST: '/app/register/findList',//获取企业验证码
    REGISTER_VERIFICTIONCODE: '/app/register/verificationCode',//发送验证码
    REGISTER_CHANGEPW: '/app/register/updatePassword',//重置密码

    //--------------工作台--------------------------------------
    TODO_LIST: '/eflow/flowBusiness/flowTodoListData',//待我审批的
    DONE_LIST: '/eflow/flowBusiness/finishData',//我已审批的
    MYAPPLY_LIST: '/eflow/flowLog/findapplicationList',//我的申请列表
    REPORT_ASSETCARD: '/ass/assetInfo/getAssetList',//资产列表


    //--------------单据公共方法(工作流)---------------------------------
    GET_FLOW_TEMPLATE: '/eflow/flowTemplate/getFlowTemplate',//流程
    GET_APPROVAL_LIST: '/eflow/flowBusiness/listApprovalData', //平台获取审批人接口
    GET_NEXT_FLOWBUSINESS: '/app/basic/getNextFlowBusiness',//判断是否是最后一步
    NOT_FINISH_BIZKEY: "/app/basic/findNotFinishListByBizKey",//
    FLOWHELP: "/approval/flowHelp/getFlowren",//审批帮助
    GET_NEXT_APPROVAL_LIST: '/eflow/flowBusiness/listNextApprovalData',//平台获取下一步审批人接口

    //----------------资产---------------
    MESSAGE_LIST: '/ass/assetInfo/getAssetList',//资产详情
    NEW_ASSETCARD: '/ass/assetInfo/getAssetList',//资产台账
    ASSET_USE: '/usedinfo/assetUsedInfo/saveAPP',//资产领用保存与提交
    findOfficeList: "/sys/office/treeData?type=2&isAll=true",//部门接口
    SYS_USERNAME: '/sys/user/listData?type=3',//获取用户
    SYS_COMPANY: '/sys/company/treeData',//获取公司
    SUBMIT_BRIPAPPLY: '/application/travel/save',//出差申请提交数据

    //--------------------common---------------------------
    FLOWID_BORROWAPPLY: '/usedinfo/assetUsedInfo/getNextFlowBusinessAPP',//领用退库
    GET_APPLY_LIST: '/borrow/assetBorrowInfo/getNextFlowBusinessAPP',//借用归还
    SUBMIT_BORROWAPPLY: '/ass/assetInfo/saveAPP',//数据提交
    ASSET_ASSETSORTLIST:"/ass/assetSort/getTreeData",//资产类别
    ASSET_ASSETTOPSORTLIST: "/ass/assetSort/treeDataTopApp",//资产大类
    ASSET_ASSETSORTLIST1: "/ass/assetSort/treeDataXiaoApp",//资产小类
    RECEIVE_LIST_QUERY: "/usedinfo/assetUsedInfo/getAssetInfoList",// 领用列表查询
    RECEIVE_LIST_LOOK: "/usedinfo/assetUsedInfo/getinfoApp",//领用列表点击查看信息
    RECEIVE_AGREE: "/usedinfo/assetUsedInfo/agree", //通过
    SYS_EMPLIST: "/app/appMessage/findCompany",//个人中心通讯录
    SYS_PerInfo: "/app/appMessage/findPersonnelInfo",//个人中心通讯录
    SYS_PUSHSETTING: '/app/pushModel/save',//推送消息设置
    SYS_GETPUSHSETTING: '/app/pushModel/listData',//获取推送设置
    ASSET_ADDRESS: '/location/assLocation/locationListApp',//选择存放地点


    /*---------------人事模块-------------------*/
    REPORT_ASSETCA: "/ass/assetInfo/getAssetList",
    ALLOCAT_TYPELIST: "/app/basic/getUserDictType", //调拨类型

    /*---------------调拨-------------------*/
    GET_ALLOCAT: "/allotinfo/assetAllotInfo/getAllDateApp",//资产获取
    ASSET_ALLOCT: "/allotinfo/assetAllotInfo/getAssetAllotDtlAPP",//资产调拨详情
    SAVE_ALLOCAT: "/allotinfo/assetAllotInfo/saveAPP",//资产调拨保存
    GET_APPROVAL_ALLOCAT: '/allotinfo/assetAllotInfo/listApprovalData',//获取审批人列表
    AGREE_ALLOCAT: '/allotinfo/assetAllotInfo/agree',// 资产领用单审批同意
    SYS_ALLOCATAPPLY: "/allotinfo/assetAllotInfo/getAssetAllotInfo",//得到已审批流程log日志，单条业务数据
    REVOKE_ALLOCAT: '/allotinfo/assetAllotInfo/unSubmit',//撤销
    DELETE_ALLOCAT: '/allotinfo/assetAllotInfo/delete',//办公领用单据删除
    AGIN_APPROVE_BORROW: '/allotinfo/assetAllotInfo/unDo',//重新审批
    REFUSE_ALLOCAT: '/allotinfo/assetAllotInfo/disagreeApp',//办公领用单审批拒绝
    GET_NEXTAPPROVAL_ALLOCAT: '/allotinfo/assetAllotInfo/listNextApprovalData',//获取下一步审批人列表


    /*---------------资产领用-------------------*/
    USEDINFO_SAVE: "/usedinfo/assetUsedInfo/saveAPP", //仓库信息
    SYS_USEDINFOAPPLY: "/usedinfo/assetUsedInfo/getAssetUsedInfo",//领用申请
    REVOKE_USEDINFO: '/usedinfo/assetUsedInfo/unSubmit',//撤销
    DELETE_USEDINFO: '/usedinfo/assetUsedInfo/delete',//资产领用单据删除
    AGIN_APPROVE_USEDINFO: '/usedinfo/assetUsedInfo/unDo',//资产领用单重新审批
    AGREE_USEDINFO: '/usedinfo/assetUsedInfo/agree',// 资产领用单审批同意
    GET_APPROVAL_USEDINFO: '/usedinfo/assetUsedInfo/listApprovalData',//获取审批人列表
    GET_NEXTAPPROVAL_USEDINFO: '/usedinfo/assetUsedInfo/listNextApprovalData',//获取下一步审批人列表
    REFUSE_USEDINFO: '/usedinfo/assetUsedInfo/disagreeApp',//资产领用单审批拒绝
    USEDINFO_LIST_APP: '/usedinfo/assetUsedInfo/getAssetInfoList',//资产领用单列表
    GET_USEDINFOBILL: "/usedinfo/assetUsedInfo/getAssetUsedInfoAPP",//得到资产已审批，审批log


    /*---------------办公用品-------------------*/
    WAREITEMS_INFO: "/wareitems/warehouseItems/listDataApp", //仓库信息
    OUTBOUND_SAVE: "/outbound/outboundBill/saveAPP", //仓库信息
    SYS_OUTBOUNDAPPLY: "/outbound/outboundBill/getOutBoundBill",//得到已审批流程log日志，单条业务数据
    REVOKE_OUTBOUND: '/outbound/outboundBill/unSubmit',//撤销
    ARTICLES_OUTBOUND: "/articlesfile/articlesFile/sortTreeDataAPP", //办公用品分类
    DELETE_OUTBOUND: '/outbound/outboundBill/delete',//办公领用单据删除
    AGIN_APPROVE_OUTBOUND: '/outbound/outboundBill/unDo',//办公领用单重新审批
    AGREE_OUTBOUND: '/outbound/outboundBill/agreeApp',// 办公领用单审批同意
    GET_APPROVAL_OUTBOUND: '/outbound/outboundBill/listApprovalData',//获取审批人列表
    GET_NEXTAPPROVAL_OUTBOUND: '/outbound/outboundBill/listNextApprovalData',//获取下一步审批人列表
    REFUSE_OUTBOUND: '/outbound/outboundBill/disagreeApp',//办公领用单审批拒绝
    OUTBOUND_LIST_APP: '/outbound/outboundBill/outBoundListApp',//办公领用单列表
    GET_OUTBOUNDBILL: "/outbound/outboundBill/getOutBoundBillAPP",//得到已审批流程log日志，单条业务数据


    //-------------------------盘点------------------------------
    GET_PROJECT_STAGE: '/assetcheck/assetCheck/undeterminedAssetCheck',//库存盘点

    //-------------------------退库------------------------------
    RECEIVE_LIST_RETIRING: '/cancelstocks/assetReturnInfo/returnListDataAPP',//退库列表
    RECEIVE_LIST_SUBTABLE: '/cancelstocks/assetReturnInfo/getAssetReturnInfoAPP',//退库子表
    RECEIVE_LIST_SAVE: '/cancelstocks/assetReturnInfo/saveAPP',//退库保存
    GET_RETIRING: "/cancelstocks/assetReturnInfo/getAssetReturnInfoAPP",//查看详情
    REVOKE_RETURNINFO: '/cancelstocks/assetReturnInfo/unSubmit',//退库单据撤回重新审批
    AGIN_APPROVE_RETIR: '/cancelstocks/assetReturnInfo/unDo',//资产退库重新审批
    SYS_ASSETRETURN: "/cancelstocks/assetReturnInfo/getAssetReturnInfo",//得到已审批流程log日志，单条业务数据
    GET_APPROVAL_REFUND: '/cancelstocks/assetReturnInfo/listApprovalData', //获取退库审批人
    GET_RETURNINFODTL_LIST: '/usedinfo/assetUsedInfo/getDtlDataReturnAPP', //获取领用子表
    DELETE_RETURN: '/cancelstocks/assetReturnInfo/delete', //删除退库申请
    DELETE_FEE: '/cancelstocks/assetReturnInfo/disagreeApp', //拒绝退库申请
    AGREE_FEE: '/cancelstocks/assetReturnInfo/agree', //退库申请审批同意
    GET_APPROVAL_NEXT: '/cancelstocks/assetReturnInfo/listNextApprovalData', //退库申请审批同意
    DELETE_DISAGREE: '/cancelstocks/assetReturnInfo/disagree', //退库驳回

    /*---------------common-------------------*/
    ARTICLES: "/articlesfile/articlesFile/getArticlesfileList", //办公用品档案
    ORDERBILL: "/orderbill/orderBill/getOrderBillList", //采购单
    INOUTBILL_LIST: "/scm/inout/inoutBill/getInoutBillList",//办公用品列表
    SUPPLIER: "/supplier/supplierInfo/supplierListApp",//供应商接口
    INOUTBILL_LIST_Detail: "/scm/inout/inoutBill/getDtlDataAPP",//办公用品列表详情
    ORDERBILL_LIST_Detail: "/orderbill/orderBill/getDtlDataAPP",//采购子表详情
    WAREHOUSE: "/warehouse/WarehouseInfo/getWarehouseInfoList", //仓库列表
    INOUTBILL: "/scm/inout/inoutBill/materialStorageSaveAPP", //保存办公用品
    DTLDATA: "/orderbill/orderBill/getDtlData"  //采购单子表
  };

  //非验证登录接口地址
  this.getUrlData = function (param) {
    return SERVICE_URL + path[param];
  };
  this.getUrlData_Image = function (param) {
    return SERVICE_URL;
  };
  //需要验证登录的接口地址
  this.getUrlData_check = function (param) {
    return CHECK_SERVICE_URL + path[param];
  };
}]);
