/**
 * creater:chuanpeng.zhu@dhc.com.cn
 * create time:2016/1/20
 * describe：todo
 **/

Asset.run(['$ionicPlatform', '$rootScope', 'UserService', '$state', '$ionicHistory', '$timeout', '$ionicLoading', 'PopupService', '$location', '$ionicPopup', 'UrlService', '$localstorage', 'DataService', 'JPushService',
  function ($ionicPlatform, $rootScope, UserService, $state, $ionicHistory, $timeout, $ionicLoading, PopupService, $location, $ionicPopup, UrlService, $localstorage, DataService, JPushService) {
    $rootScope.contentUpdateDate="";
    //如果服务端返回告知当前会话失效，则要求重新登录

    function showUpdateConfirm(data) {
      var confirmPopup = $ionicPopup.confirm({
        title: '海尔巨商汇',
        template: '<strong>发现新版本:' + data.version + ',是否更新?</strong>',
        okText: '更新',
        cancelText: '取消'
      });

      confirmPopup.then(function (res) {
        if (res) {
          // 打开浏览器更新
          window.open(data.url, '_system', 'location=yes');
          $scope.showUpdateConfirm(data)
        } else {
          // exit
          ionic.Platform.exitApp();
        }
      });
    };

    var requestCount = 0;
    /** loading 拦截器 **/
    $rootScope.$on('LOADING:SHOW', function () {
      requestCount++;
      if (!$rootScope.isLoadShowing) {
        var params = {
          template: '<div style="float: left;"><img src="img/icon_loading.gif" style="width: 40px"/></div><div style="margin-top: 10px;float: left">正在加载中……</div>'
        };
        $ionicLoading.show(params)
      }
      $rootScope.isLoadShowing = true;
    });

    $rootScope.$on('LOADING:HIDE', function () {
      requestCount--;
      if (requestCount <= 0) {
        $rootScope.isLoadShowing = false;
        $ionicLoading.hide()
      }
    });

    $ionicPlatform.ready(function () {
      window.plugins.jPushPlugin.init();
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova) {
        if (window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        window.InAppBrowser = window.cordova.InAppBrowser;
        window.open = window.cordova.InAppBrowser.open;
      } else {
        window.InAppBrowser = {
          open: function (url, target, params) {
            window.open(url);
          }
        };
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      if (window.plugins) {
        //推送初始化
        var setTagsWithAliasCallback = function (event) {
          //alert('result code:' + event.resultCode + ' tags:' + event.tags + ' alias:' + event.alias);
        }
        var receiveNotificationCallback = function (data) {
          try {
            var alertContent;
            if (device.platform == "Android") {
              alertContent = event.alert;
            } else {
              alertContent = event.aps.alert;
            }
          } catch (exception) {
            console.log(exception)
          }
        }
        var receiveMessageCallback = function (data) {
          try {
            var message;
            if (device.platform == "Android") {
              message = event.message;
            } else {
              message = event.content;
            }
          } catch (exception) {
            console.log("JPushPlugin:onReceiveMessage&ndash;&gt;" + exception);
          }
        }

        //静默登陆账号
        /*function loginin () {
         var params = {
         username:$localstorage.get("LoginUsername"),
         password: DesUtils.encode($localstorage.get("LoginPassword"), 'cn,net,ecode')
         }

         CheckUpdateService.login(params)
         .success(function (response) {
         console.log("登录信息");
         console.log(response);
         if (response.result) {
         UserService.setUser(response.user);

         $localstorage.setObject("sid", response.sessionid);
         //调用待审核列表
         alert("getTodoList");
         getTodoList(1);
         //获取待我审批列表
         }
         })
         .error(function (error) {
         PopupService.showToast('用户名或密码错误，请重新输入。');
         })
         };*/

        var config = {
          stac: setTagsWithAliasCallback,
          iosNotice: openNotificationCallback,
          receiveNotice: receiveNotificationCallback,
          recevieMsg: receiveMessageCallback
        };
        JPushService.init(config);
      }


      /*       if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
       }*/
      // android返回键
      //主页面显示退出提示框
      $ionicPlatform.registerBackButtonAction(function (e) {

        e.preventDefault();
        $rootScope.$broadcast('BackButtonAction');
        function showConfirm() {
          var confirmPopup = $ionicPopup.confirm({
            title: '一起赢',
            template: '确定要退出吗？',
            okText: '退出',
            cancelText: '取消'
          });

          confirmPopup.then(function (res) {
            if (res) {
              ionic.Platform.exitApp();
            } else {
              // Don't close
            }
          });
        }

        // Is there a page to go back to?
        if ($location.path().indexOf("login") > -1) {
          // 登录页按返回键
          showConfirm();
        } else if ($location.path().indexOf("app.home.home1/") > -1) {
          // 主页按返回键
          showConfirm();
        } else if ($ionicHistory.viewHistory().backView != null) {
          $ionicHistory.goBack();
        } else {
          // This is the last page: Show confirmation popup
          showConfirm();
        }
        return false;
      }, 101);


      if (window.cordova) {
        // 检查更新 TODO 暂时放在Login里检查更新,
        //checkUpdate();
      }
    });

    window.onerror = function (msg, url, line) {
      var idx = url.lastIndexOf("/");
      if (idx > -1) {
        url = url.substring(idx + 1);
      }
      //  alert("ERROR in " + url + " (line #" + line + "): " + msg);
      return false;
    };
    /* ADD START BY geshuo 20160122:获取设备屏幕的宽高 --------------- */
    $rootScope.deviceWidth = document.body.clientWidth;
    $rootScope.deviceHeight = document.body.scrollHeight;
    /* ADD END   BY geshuo 20160122:获取设备屏幕的宽高 --------------- */

  }]);
