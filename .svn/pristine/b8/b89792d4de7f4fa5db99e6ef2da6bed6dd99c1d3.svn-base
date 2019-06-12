/**
 * Created by 封启航 on 2018/10/19.
 */
Asset.controller('allocatScreenController', ['$filter','MonthPicker','$scope', '$state', 'allocatScreenService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService','ionicDatePicker','$ionicLoading',
  function ($filter,MonthPicker,$scope, $state, allocatScreenService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService,ionicDatePicker,$ionicLoading) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.addDate=new Date();
      $scope.myModal=false;//单据类型选择框
      //$scope.isShowIntraduce=false;//金额范围
      /********添加datePicker*******/
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
        mondayFirst: true,//周一是否是第一个 
        disableWeekdays: [],//设置工作日 
        closeOnSelect: false,//可选,设置选择日期后是否要关掉界面。
        templateType: 'popup',
        dateFormat: 'yyyy-MM-dd'//Optional
      };
      $scope.openDatePicker = function (date, beginEnd) {
        if(date!=$scope.addDate){
          date=$scope.addDate;
        };
        ipObj1.inputDate = new Date(date);
        ipObj1.callback = function (val) {
          var myDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
          if (beginEnd == 'beginDate') {
            $scope.modelData.beginDate = myDate;
            $scope.modelData.beginDateTime = $scope.modelData.beginDate;
          }
          if (beginEnd == 'endDate') {
            $scope.modelData.endDate = myDate;
            $scope.modelData.endDateTime = $scope.modelData.endDate;
          }
        };
        ionicDatePicker.openDatePicker(ipObj1);
      };
    });
    if(DataService.getData('billScreenCache')!=null||DataService.getData('billScreenCache')!=undefined){
      $scope.modelData=DataService.getData('billScreenCache');
    }else{
      $scope.modelData={
        searchContent:'',//申请人
        beginDate:'',//开始日期
        endDate:'',//结束日期
        billtypeCode:'',//单据编码
        billtypeName:'',//单据类型
        requestContent:'',//单据内容
        range:''//日期范围
      }
    }

    if(DataService.getData('selectPerson')!=null||DataService.getData('selectPerson')!=undefined){
      $scope.modelData.searchContent=DataService.getData('selectPerson').userName;
    }

    //返回
    $scope.goBack=function(){
      DataService.clearData('billScreenCache');
      DataService.clearData('billScree');
      DataService.clearData('selectPerson');
      $ionicHistory.goBack();
    }
    //添加人员
    $scope.addPerson=function(){
      DataService.clearData('billScreenCache');
      DataService.setData('billScreenCache',$scope.modelData)
      $state.go('selectPerson');
    }

    //定义时间范围
    $scope.dateRange = [
      {
        id: 1,
        range: "近一月"
      },
      {
        id: 2,
        range: "近半年"
      },
      {
        id: 3,
        range: "近一年"
      },
      {
        id: 4,
        range: "全部"
      },
    ];
    //选中时间范围跳转筛选页面
    $scope.rangeClick = function (dataRangeItem) {
      console.log('选中测试');
      console.log(dataRangeItem);
      var now = new Date();
      var startYearMonth;
      console.log(now.getTime())
      //var date = new Date(now.getTime() - 27 * 24 * 3600 * 1000);
      if(dataRangeItem=="1"){
        var date = new Date();
        //获取年份
        var year = date.getFullYear();
        //获取当前月份
        var mouth = date.getMonth() + 1;
        //定义当月的天数；
        var days;
        //当月份为二月时，根据闰年还是非闰年判断天数
        if (mouth == 2) {
          days = year % 4 == 0 ? 29 : 28;
        }
        else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
          //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
          days = 31;
        }
        else {
          //其他月份，天数为：30.
          days = 30;
        }
        //输出天数
        //alert('当月天数为：' + days);
        startYearMonth=new Date(now.getTime() - days * 24 * 3600 * 1000);
      }
      if(dataRangeItem=="2"){
        if(now.getFullYear()/4==0){
          //闰年
          startYearMonth=new Date(now.getTime() - (366 * 24 * 3600 * 1000)/2);
        }else{
          //平年
          startYearMonth=new Date(now.getTime() - (365 * 24 * 3600 * 1000)/2);
        }
      }
      if(dataRangeItem=="3"){
        if(now.getFullYear()/4==0){
          //闰年
          startYearMonth=new Date(now.getTime() - 366 * 24 * 3600 * 1000);
        }else{
          //平年
          startYearMonth=new Date(now.getTime() - 365 * 24 * 3600 * 1000);
        }
      }
      if(dataRangeItem=="4  "){
        $scope.modelData.beginDate = "";
        $scope.modelData.endDate = "";
        return;
      }
      $scope.modelData.beginDate=startYearMonth;
      $scope.modelData.endDate=now;

    }
    //清空
    $scope.goClear=function(){
      $scope.modelData={
        searchContent:'',
        beginDate:'',//开始日期
        endDate:'',//结束日期
        moneyStart:'',//起始金额
        moneyEnd:'',//结束金额
        billtypeCode:'',//单据编码
        billTypeName:'',//单据类型
        content:'',//单据内容
        range:''//日期范围
      }
    }
    //选择单据类型
    $scope.addAttachment = function () {
      if($scope.myModal!=true){
        $scope.myModal=true;
        getData();
      }else{
        $scope.myModal=false;
      }
    };
    //单击背景
    $scope.hidden = function () {
      $scope.myModal=false;
    };
    $scope.add=function (colItem) {
      for(var i=0;i<$scope.report.length;i++){
        if(colItem.name ==$scope.report[i].name){
          $scope.billList=$scope.report[i];
          $scope.report[i].isRoot=true;
        }else{
          $scope.report[i].isRoot=false;
        }
      }
      $scope.myModal=false;
      $scope.modelData.billtypeCode=$scope.billList.value;
      $scope.modelData.billtypeName=$scope.billList.name;
      //if($scope.modelData.billTypeCode=='JK'||$scope.modelData.billTypeCode=='ZF'||$scope.modelData.billTypeCode=='BX'){
      //  $scope.isShowIntraduce=true;
      //}else{
      //  $scope.isShowIntraduce=false;
      //}
      console.log('选中的单据类型',$scope.modelData);
    }
    //获取单据类型列表
    var getData = function () {
      var params = {
        __sid: $localstorage.getObject('sid'),
      }
      BillScreenService.getBillData(params)
        .success(function (response) {
          console.log('单据类型列表');
          console.log(response);
          $scope.report = response.data;
          $scope.report.isRoot=true;
          $scope.reportDataList=[];
          for(var i=0;i<$scope.report.length;i++){
            $scope.reportDataList.push($scope.report[i]);
          }
          $scope.itemList = [];
          var row = Math.ceil($scope.reportDataList.length / 3);
          for (var i = 0; i < row; i++) {
            var col = 3;
            var rowInfoList = [];
            for (var j = 0; j < col; j++) {
              if (i * 3 + j >= $scope.reportDataList.length) {
                var colItem = {
                  "name": "",
                  "counts": "",
                  "typeCode": "",
                }
                rowInfoList.push(colItem);
              } else {
                rowInfoList.push($scope.reportDataList[i * 3 + j]);
              }
            }
            $scope.itemList.push(rowInfoList);
          }
        }).error(function (response) {
          // 回调失败,隐藏进度条
          console.log(response);
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
          PopupService.showToast("网络错误.");
        });
    }
    //确认筛选条件
    $scope.toSubmit=function(){
      if(new Date($scope.modelData.beginDate).getTime()>new Date($scope.modelData.endDate).getTime()){
        PopupService.showToast("开始时间不得大于结束时间.");
        return;
      }
      //if($scope.modelData.moneyStart>$scope.modelData.moneyEnd){
      //  PopupService.showToast("起始金额不得大于结束金额.");
      //  return;
      //}
      $scope.modelData.beginDate=$filter('date')($scope.modelData.beginDate, 'yyyy-MM-dd');
      $scope.modelData.endDate=$filter('date')($scope.modelData.endDate, 'yyyy-MM-dd');
      DataService.clearData('billScree');
      DataService.setData('billScree',$scope.modelData);
      console.log('筛选条件');
      console.log(DataService.getData('billScree'));
      $ionicHistory.goBack();
      DataService.clearData('billScreenCache');
      DataService.clearData('selectPerson');
    }
  }]);
Asset.service('allocatScreenService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getBillData = function (params) {//获取单据列表
    return $http.post(UrlService.getUrlData('SYS_BILLTYPE'),params);
  }
}]);
