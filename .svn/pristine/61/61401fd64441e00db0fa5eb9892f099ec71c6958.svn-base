/**
 * Created by chenzhuo on 2018/10/29.
 */
Asset.controller('assetScreenCtrl', ['$filter','MonthPicker','$scope', '$state', 'assetScreenService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService','ionicDatePicker','$ionicLoading',
  function ($filter,MonthPicker,$scope, $state, assetScreenService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService,ionicDatePicker,$ionicLoading) {

  //进入页面后初始化页面
        $scope.$on('$ionicView.enter', function () {

        });
        $scope.approvalStatusList=[
          { statusName: '闲置', assetStatus: '0',},
          // {assetStatus: '闲置'},
          {assetStatus: '1', statusName: '领用'},
          {assetStatus: '2', statusName: '报废'},
          {assetStatus: '3', statusName: '调拨中'},
          {assetStatus: '4', statusName: '已捐献'},
          {assetStatus: '5', statusName: '到新单位'},
          {assetStatus: '', statusName: '全部'}
          // ?'闲置':(item.assetStatus=='1'?'领用':(item.assetStatus=='2'?'报废':
          //   (item.assetStatus=='3'?'调拨中':(item.assetStatus=='4'?'已捐献':(item.assetStatus=='5'?'到新单位':'到新单位')))))}}

  ]
        $scope.outboundDateList=[
          {dateFilter: '近三天'},
          {dateFilter: '近一周'},
          {dateFilter: '近一月'},
          {dateFilter: '不限'}
        ]
        //返回
        $scope.goBack = function () {
          DataService.clearData("boundFilter");
          $ionicHistory.goBack();
        };
        if (DataService.getData('boundFilter') == undefined || DataService.getData('boundFilter') == null) {
          $scope.modelData = {
            dateFilter:'',//时间段
            statusCode: '',//审批状态
            // outbounderName: '',//出库人
          }
        } else {
          $scope.modelData = DataService.getData('boundFilter');
        }
        //单击确定
        $scope.goTrue = function () {
          DataService.clearData("boundFilter");
          DataService.setData("boundFilter", $scope.modelData);
          console.log($scope.modelData)
          $ionicHistory.goBack();
        }
      }]);
    //
    // //进入页面后初始化页面
    // $scope.$on('$ionicView.enter', function () {
    //   // $scope.userName = DataService.getData("ctTaskParam");
    //   $scope.addDate=new Date();
    //
    //   /********添加datePicker*******/
    //   var ipObj1 = {
    //     callback: function (val) {
    //     },
    //     disabledDates: [            //Optional
    //       new Date(2016, 2, 16),
    //       new Date(2015, 3, 16),
    //       new Date(2015, 4, 16),
    //       new Date(2015, 5, 16),
    //       new Date('Wednesday, August 12, 2015'),
    //       new Date("08-16-2016"),
    //       new Date(1439676000000)
    //     ],
    //     mondayFirst: true,//周一是否是第一个 
    //     disableWeekdays: [],//设置工作日 
    //     closeOnSelect: false,//可选,设置选择日期后是否要关掉界面。
    //     templateType: 'popup',
    //     dateFormat: 'yyyy-MM-dd'//Optional
    //   };
    //   $scope.openDatePicker = function (date, beginEnd) {
    //     if(date!=$scope.addDate){
    //       date=$scope.addDate;
    //     };
    //     ipObj1.inputDate = new Date(date);
    //     ipObj1.callback = function (val) {
    //       var myDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
    //       if (beginEnd == 'beginDate') {
    //         $scope.modelData.beginDate = myDate;
    //         $scope.modelData.beginDateTime = $scope.modelData.beginDate;
    //       }
    //       if (beginEnd == 'endDate') {
    //         $scope.modelData.endDate = myDate;
    //         $scope.modelData.endDateTime = $scope.modelData.endDate;
    //       }
    //     };
    //     ionicDatePicker.openDatePicker(ipObj1);
    //   };
    // });
    // if(DataService.getData('billScreenCache')!=null||DataService.getData('billScreenCache')!=undefined){
    //   $scope.modelData=DataService.getData('billScreenCache');
    // }else{
    //   $scope.modelData={
    //     beginDate:'',//开始日期
    //     endDate:'',//结束日期
    //     range:''//日期范围
    //   }
    //   // $scope.userName=''
    // }
    //
    // // if(DataService.getData('selectPerson')!=null||DataService.getData('selectPerson')!=undefined){
    // //   $scope.modelData.userName=DataService.getData('selectPerson').userName;
    // // }
    //
    // //返回
    // $scope.goBack=function(){
    //   DataService.clearData('billScreenCache');
    //   DataService.clearData('billScree');
    //   DataService.clearData('selectPerson');
    //   $ionicHistory.goBack();
    // }
    // // //添加人员
    // // $scope.addPerson=function(){
    // //   DataService.clearData('billScreenCache');
    // //   DataService.setData('billScreenCache',$scope.modelData)
    // //   $state.go('addOneMember');
    // // }
    //
    // //定义时间范围
    // $scope.dateRange = [
    //   {
    //     id: 1,
    //     range: "近一月"
    //   },
    //   {
    //     id: 2,
    //     range: "近半年"
    //   },
    //   {
    //     id: 3,
    //     range: "近一年"
    //   },
    //   {
    //     id: 4,
    //     range: "全部"
    //   },
    // ];
    // //选中时间范围跳转筛选页面
    // $scope.rangeClick = function (dataRangeItem) {
    //   console.log('选中测试');
    //   console.log(dataRangeItem);
    //   var now = new Date();
    //   var startYearMonth;
    //   console.log(now.getTime())
    //   if(dataRangeItem=="1"){
    //     var date = new Date();
    //     //获取年份
    //     var year = date.getFullYear();
    //     //获取当前月份
    //     var mouth = date.getMonth() + 1;
    //     //定义当月的天数；
    //     var days;
    //     //当月份为二月时，根据闰年还是非闰年判断天数
    //     if (mouth == 2) {
    //       days = year % 4 == 0 ? 29 : 28;
    //     }
    //     else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
    //       //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
    //       days = 31;
    //     }
    //     else {
    //       //其他月份，天数为：30.
    //       days = 30;
    //     }
    //     //输出天数
    //     //alert('当月天数为：' + days);
    //     startYearMonth=new Date(now.getTime() - days * 24 * 3600 * 1000);
    //   }
    //   if(dataRangeItem=="2"){
    //     if(now.getFullYear()/4==0){
    //       //闰年
    //       startYearMonth=new Date(now.getTime() - (366 * 24 * 3600 * 1000)/2);
    //     }else{
    //       //平年
    //       startYearMonth=new Date(now.getTime() - (365 * 24 * 3600 * 1000)/2);
    //     }
    //   }
    //   if(dataRangeItem=="3"){
    //     if(now.getFullYear()/4==0){
    //       //闰年
    //       startYearMonth=new Date(now.getTime() - 366 * 24 * 3600 * 1000);
    //     }else{
    //       //平年
    //       startYearMonth=new Date(now.getTime() - 365 * 24 * 3600 * 1000);
    //     }
    //   }
    //   if(dataRangeItem=="4  "){
    //     $scope.modelData.beginDate = "";
    //     $scope.modelData.endDate = "";
    //     return;
    //   }
    //   $scope.modelData.beginDate=startYearMonth;
    //   $scope.modelData.endDate=now;
    //
    // }
    // //清空
    // $scope.goClear=function(){
    //   $scope.modelData={
    //     beginDate:'',//开始日期
    //     endDate:'',//结束日期
    //     range:''//日期范围
    //   }
    //   // $scope.userName=''
    // }
    // //确认筛选条件
    // $scope.toSubmit=function(){
    //   if(new Date($scope.modelData.beginDate).getTime()>new Date($scope.modelData.endDate).getTime()){
    //     PopupService.showToast("开始时间不得大于结束时间.");
    //     return;
    //   }
    //   $scope.modelData.beginDate=$filter('date')($scope.modelData.beginDate, 'yyyy-MM-dd');
    //   $scope.modelData.endDate=$filter('date')($scope.modelData.endDate, 'yyyy-MM-dd');
    //   // $scope.userName.userName=$filter()($scope.userName.userName);
    //   DataService.clearData('billScree');
    //   DataService.setData('billScree',$scope.modelData);
    //   console.log('筛选条件');
    //   console.log(DataService.getData('billScree'));
    //   $ionicHistory.goBack();
    //   DataService.clearData('billScreenCache');
    //   DataService.clearData('selectPerson');
    // }
    //
    // // //返回
    // // $scope.toSubmit = function () {
    // //   $ionicHistory.goBack();
    // // };
  // }]);
Asset.service('assetScreenService', ['$http', 'UrlService', function ($http, UrlService) {

}]);
