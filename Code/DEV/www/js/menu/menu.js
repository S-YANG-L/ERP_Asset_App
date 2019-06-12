/*
 * Created by xulan on 2018-9-13.
 * */
Asset.controller('menuCtrl',['$scope', '$state','$ionicHistory', '$location', 'PopupService','menuService','$ionicPopup', '$rootScope', 'UserService', '$localstorage', '$ionicLoading',
  function($scope, $state,$ionicHistory, $location, PopupService,menuService,$ionicPopup, $rootScope, UserService, $localstorage, $ionicLoading) {
    $scope.$on('$ionicView.loaded', function () {
      $scope.user=UserService.getUser();

    });


    // //菜单
    // $scope.modelData=[
    //   {
    //     name:'资产管理',
    //     hasNext:true,
    //     isShow:false,
    //     menu:[
    //       {
    //         name:'资产入库',
    //         hasNext:false,
    //         href:'#/addAssets'
    //       },{
    //         name:'资产列表',
    //         hasNext:false,
    //         href:'#/app/assets'
    //       },{
    //         name:'资产修改',
    //         hasNext:false,
    //         href:'#/modify'
    //       },{
    //         name:'领用退库',
    //         hasNext:false,
    //         href:'#/app/useRefund'
    //       },
    //       {
    //         name:'领用单',
    //         hasNext:false,
    //         href:'#/app/assetsUse'
    //       },{
    //         name:'资产调拨',
    //         hasNext:false,
    //         href:'#/app/allocatIn'
    //       },{
    //         name:'维修信息登记',
    //         hasNext:false,
    //         href:'#/app/repairList'
    //       },
    //     ]
    //   },{
    //     name:'办公用品管理',
    //     hasNext:true,
    //     isShow:false,
    //     menu:[
    //       {
    //         name:'入库单',
    //         hasNext:false,
    //         href:'#/app/inOutBill'
    //       },{
    //         name:'出库单',
    //         hasNext:false,
    //         href: '#/app/outBoundApply'
    //       },{
    //         name:'调拨单',
    //         hasNext:false,
    //         href:'#/app/home1'
    //       },{
    //         name:'即时库存',
    //         hasNext:false,
    //         href:'#/app/home1'
    //       },
    //     ]
    //   }, {
    //     name:'工作台',
    //     hasNext:true,
    //     isShow:false,
    //     menu:[
    //       {
    //         name:'待办业务',
    //         hasNext:false,
    //         href:'#/app/remind/todo_list'
    //       },{
    //         name:'已办业务',
    //         hasNext:false,
    //         href:'#/app/remind/done_list'
    //       },{
    //         name:'我的申请',
    //         hasNext:false,
    //         href:'#/app/remind/apply_list'
    //       }
    //     ]
    //   }, {
    //     name:'资产入库',
    //     hasNext:true,
    //     isShow:false,
    //     menu:[
    //       {
    //         name:'资产台账',
    //         hasNext:false,
    //         href:'#/app/AssetCardReport'
    //       },{
    //         name:'资产卡片',
    //         hasNext:false,
    //         href:'#/app/assetCardDetail'
    //       }
    //     ]
    //   },{
    //     name:'借用归还',
    //     hasNext:true,
    //     isShow:false,
    //     menu:[
    //       {
    //         name:'借用',
    //         hasNext:false,
    //         href:'#/app/borrowRemind/borrowList'
    //       },{
    //         name:'归还',
    //         hasNext:false,
    //         href:'#/app/borrowRemind/returnList'
    //       },
    //     ]},
    //
    // ]

    // $scope.toggleLeft = function() {
    //   $ionicSideMenuDelegate.toggleLeft();
    // };
    //
    // //菜单栏展开|折叠
    // $scope.toggleGroup = function(e) {
    //   for(var i=0;i<$scope.modelData.length;i++){
    //     if(i==e){
    //       $scope.modelData[i].isShow = !$scope.modelData[i].isShow;
    //     }else{
    //       $scope.modelData[i].isShow = false;
    //     }
    //   }
    // };
    //
    // $scope.isGroupShown = function(group) {
    //   return group.isShow;
    // };
    //版本
    $scope.checkUpdateInfo = function (data) {
      var confirmPopup = $ionicPopup.confirm({
        title: '固定资产管理系统',
        // template: '<strong>发现新版本:' + data.version + ',是否更新?</strong>',
        template: '<strong>版本1.0</strong>',
        okText: '确定',
        // okText: '更新',
        cancelText: '取消'
      });

      // confirmPopup.then(function (res) {
      //   if (res) {
      //     // 打开浏览器更新
      //     window.open(data.url, '_system', 'location=yes');
      //     $scope.showUpdateConfirm(data)
      //   } else {
      //     ionic.Platform.exitApp();
      //   }
      // });
    };
    $scope.goBaseData=function () {
      $state.go("basedata")
    }
    $scope.goChangePassword=function () {
      $state.go("changePW")
    }
    //前往推送消息设置
    $scope.goPushSetting = function () {
      $state.go('personSetting');
    };
    console.log()
    //退出当前账号前往登录页
    $scope.goLogin = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: '是否退出登录?',
        okText: '是',
        cancelText: '否'
      });
      confirmPopup.then(function (res) {
        if (res) {
          var param = {
            __sid: $localstorage.getObject('sid'),
          };
          menuService.logout(param)
            .success(function (response) {
              // $localstorage.setObject("sid");
              var views = $ionicHistory.viewHistory().views;
              var stateIds = [];
              for(var id in views){
                stateIds.push(views[id].__sid);
              }
              $ionicHistory.clearCache(stateIds).then(function(){
                // $location.path('/login');//设置路由地址
                var clearHistoryForIndexPage = function() {
                  var history = $ionicHistory.forwardView();
                  if(history && history.stateName) {
                    $ionicHistory.clearHistory();
                  }
                };
                clearHistoryForIndexPage();  
                $state.go('login');
              })

            }).error(function (error) {
              $state.go('login');
            });
        } else {
        }
      });
    }
  }])
Asset.service('menuService', ['$http', 'UrlService', function ($http, UrlService) {
  this.logout = function (params) {//退出
    return $http.post(UrlService.getUrlData_check('LOGOUT'),params);
  }
}]);
