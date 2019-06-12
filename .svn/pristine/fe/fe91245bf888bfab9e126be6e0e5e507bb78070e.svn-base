/**
 * Created by WuZhibao on 2018/10/17.
 */
Asset.controller('receiveFilterController', ['$filter','MonthPicker','$scope', '$state', 'receiveFilterService', '$ionicHistory', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService',
  function ($filter,MonthPicker,$scope, $state, ReturnMoneyFilterService, $ionicHistory, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
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
        to: new Date(), //结束日期 
        // inputDate: $scope.modelData.overDate==undefined?new Date():new Date($scope.modelData.overDate),//默认显示日期
        mondayFirst: true,//周一是否是第一个 
        disableWeekdays: [],//设置工作日 
        closeOnSelect: false,       //可选,设置选择日期后是否要关掉界面。
        templateType: 'popup',
        dateFormat: 'yyyy-MM-dd',//Optional
        from: new Date(2000, 1, 1), //可选
        to: new Date(2018, 12, 20)  //可选
      };

      $scope.openDatePicker = function (date,beginEnd) {
        if(date!=$scope.addDate){
          date=$scope.addDate;
        };
        ipObj1.inputDate = new Date(date);
        ipObj1.callback = function (val) {
          var myDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
          if(beginEnd=='beginDate'){
            $scope.modelData.startYearMonth=myDate;
          }
          if(beginEnd=='endDate'){
            $scope.modelData.endYearMonth=myDate;
          }
        };
        ionicDatePicker.openDatePicker(ipObj1);
      };
      /********添加datePicker END*******/
      //开始时间结束时间差值判断
      $scope.getDateTime=function(){
        var dateBegin=new Date($scope.modelData.startYearMonth)
        var dateEnd= new Date($scope.modelData.endYearMonth);
        var s1=dateBegin.getTime();
        var s2=dateEnd.getTime();
        var total=(s2-s1)/1000;
        if(total<0){
          PopupService.showToast("结束时间应大于开始时间.");
          $scope.modelData = {
            startYearMonth:'', //开始日期
            endYearMonth:'',   //结束日期
          };
          return;
        }
      }
      $scope.addDate = new Date();
      if(DataService.getData('allFilter') == undefined || DataService.getData('allFilter') == null) {
        $scope.modelData = {
          startYearMonth:'',//筛选开始时间
          endYearMonth: '',//筛选结束时间
          department:'',
          assettype:'',
        };
      } else{
        $scope.modelData = DataService.getData('allFilter');
        console.log('数据打印');
        console.log($scope.modelData);
      }
    var setData=function(){
      DataService.clearData("allFilter");
      DataService.setData("allFilter",$scope.modelData);
    };
      //接受页面传值
      // getData();
      $scope.leader = DataService.getData("ctTaskParam");
      $scope.modelData.department = DataService.getData("departmentList1");
      $scope.modelData.assettype = DataService.getData("assetname");

    //返回
    $scope.goBack=function(){
      DataService.clearData("allFilter");
      DataService.setData("allFilter",$scope.modelData);
      $ionicHistory.goBack();
    };

    //单击选择公司
    $scope.addCompany = function(){
      setData();
      $state.go('selectFirm');
    };
      //前往选择申请部门
      $scope.goSelectdepartment = function () {
        $state.go('departmentList');
      };
      //前往选择资产类别
      $scope.goSelectAssetType = function () {
        $state.go('selectAssetType');
      };
      //日期范围
      $scope.addDateRange=function () {
        setData();
        $state.go('dateRangeMonth');
      }

    //单击确定
    $scope.goTrue = function(){
      DataService.clearData('allFilter');
      DataService.setData("allFilter",$scope.modelData);
      console.log(6666,DataService.getData("allFilter",$scope.modelData))
      $ionicHistory.goBack();
    }
    })
  }]);
Asset.service('receiveFilterService', ['$http', 'UrlService', function ($http, UrlService) {
}]);
