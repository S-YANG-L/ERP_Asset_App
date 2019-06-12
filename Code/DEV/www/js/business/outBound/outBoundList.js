/**
 * Created by zhaohongbin on 2018/11/2.
 */
Asset.controller('outBoundListCtrl', ['$scope', '$state', 'outBoundListService', '$ionicHistory','UserService', '$rootScope', 'DataService', '$filter', '$localstorage', '$stateParams', '$ionicScrollDelegate', 'PopupService', 'ionicDatePicker',
  function ($scope, $state, outBoundListService, $ionicHistory,UserService, $rootScope, DataService,$filter, $localstorage, $stateParams, $ionicScrollDelegate, PopupService,ionicDatePicker) {
    $scope.blank = true;
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.getData(1);
      $scope.isLoading = false;
      $scope.currentPageNo = 0;
      $scope.hasMore = true
    });

    $scope.modelData = {
      sortName:''
    }
    $scope.BoundApply= function () {
      $state.go("outBoundApply");
    };
    //返回
    $scope.goBack = function () {
      DataService.clearData("CurrBillInfo");//清除缓存
      DataService.clearData("boundFilter");//清除缓存
      $state.go("app.home.home1");
    };
    //查询
    $scope.goSearchContent = function () {
      $scope.currentPageNo = 0;
      $scope.getData(1);
    }
    //进入详情
    $scope.goDetail = function (item) {
      console.log('传值');
      console.log(item);
      DataService.clearData("CurrBillInfo");//清除缓存
      DataService.setData("CurrBillInfo", item);//将当前操作的单据存入数据缓存。
      $state.go('outBoundform');
    }
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.currentPageNo = 0;
      $scope.getData(1);
    }

    // 上拉加载
    $scope.doLoadMore = function () {
      if ($scope.currentPageNo == 0)
        return;
      else {
        $scope.getData($scope.currentPageNo+1);
      }
    };
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
      //to: new Date(), //结束日期 
      // inputDate: $scope.modelData.overDate==undefined?new Date():new Date($scope.modelData.overDate),//默认显示日期
      mondayFirst: true,//周一是否是第一个 
      disableWeekdays: [],//设置工作日 
      closeOnSelect: false,       //可选,设置选择日期后是否要关掉界面。
      templateType: 'popup',
      dateFormat: 'yyyy-MM-dd'//Optional
    };
    $scope.openDatePicker = function () {
      ipObj1.callback = function (val) {
        $scope.modelData.outboundDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };
    $scope.addOutBound = function () {
      $state.go('outBoundApply');
    }
    //数据请求
    $scope.getData = function (pageNo) {
      console.log("pageNo", pageNo)
      if ($scope.isLoading) {
        return;
      }
      $scope.isLoading = true;
      if (DataService.getData('boundFilter') == undefined || DataService.getData('boundFilter') == null) {
        var params = {
          sid: $localstorage.getObject('sid'),
          memo: "标准出库",
          sortName:$scope.modelData.sortName,
          outbounderCode:UserService.getUser().refObj.empCode,
          pageSize: 10,
          pageNo: pageNo
        }
      }else{
        if (DataService.getData('boundFilter').statusCode.statusCode == undefined || DataService.getData('boundFilter').statusCode.statusCode == null) {
          var statusCode="";
        }else{
          var statusCode=DataService.getData('boundFilter').statusCode.statusCode;
        }
        var params = {
          sid: $localstorage.getObject('sid'),
          pageSize: 10,
          pageNo: pageNo,
          memo: "标准出库",
          dateFilter:DataService.getData('boundFilter').dateFilter.dateFilter,
          outbounderName:DataService.getData('boundFilter').outbounderName,
          approvalStatus:statusCode,
          sortName:$scope.modelData.sortName,
          applyDate: "",
          orderBy: ""
        }
      }
      console.log('----------参数-------------');
      console.log(params);
      outBoundListService.getDateOutBound(params)
        .success(function (response) {
          console.log('获取领用单据列表');
          if (pageNo == 1) {
            $scope.todoList = [];
          }
          $scope.todoList=$scope.todoList.concat(response.page.list);
          if ($scope.todoList.length == 0) {
            $scope.blank = false;
            $scope.isLoading = false;
            $scope.hasMore = false;
            return;
          } else {
            $scope.blank = true;
          }
          $ionicScrollDelegate.resize();
          //当分页数据小于等于Pagesize时
          if (response.page.totalPage == 1 && response.page.count <= response.page.pageSize) {
            $scope.hasMore = false;
          } else if ($scope.currentPageNo == response.page.totalPage-1) {
            $scope.hasMore = false;
          } else {
            // 设置当前页数
            $scope.currentPageNo = response.page.pageNo;
            $scope.hasMore = true;
          }
          $scope.isLoading = false;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (response) {
        $scope.isLoading = false;
        $scope.hasMore = false;
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        // 回调失败,隐藏进度条
        console.log(response);
        PopupService.showToast("网络错误.");
      });
    }
  }]);
Asset.service('outBoundListService', ['$http', 'UrlService', function ($http, UrlService) {
  this.getDateOutBound = function (params) {
    return $http.post(UrlService.getUrlData_check('OUTBOUND_LIST_APP') + "?__sid=" + params['sid'], params);
  }
}]);
