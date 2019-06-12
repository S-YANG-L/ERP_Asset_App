// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var Asset = angular.module('starter', ['ionic', 'ngCordova', 'ionic-datepicker', 'ionic-ratings', 'ionic-monthpicker', 'ionic-timepicker', 'highcharts-ng'])
    .config([
      '$httpProvider',
      function ($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type']
          = 'application/x-www-form-urlencoded;';
        $httpProvider.defaults.headers.post['Content-Type']
          = 'application/x-www-form-urlencoded';
       /* $httpProvider.defaults.headers.get['Content-Type']
          = 'application/json';
        $httpProvider.defaults.headers.get['Authorization']
          = 'Bearer vxjs4bmxrju4egqr6hhurtvwa7g4rwvd';*/

        $httpProvider.defaults.transformRequest = function (obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        }

        $httpProvider.interceptors.push("httpInterceptor");
      }//解决JUDP请求头
    ])
    .factory("httpInterceptor", ["$q", "$rootScope", "$injector", function ($q, $rootScope, $injector) {
      return {
        request: function (config) {
// do something on request success
          return config || $q.when(config);
        },
        requestError: function (rejection) {
          // do something on request error
          return $q.reject(rejection)
        },
        response: function (response) {
          //判断session失效
          if (response.data.result == "login") {
            $injector.get("$state").go("login");
          }
          else
            return response || $q.when(response);
        },
        responseError: function (rejection) {
// do something on response error
          return $q.reject(rejection);
        }
      };
    }])
    .directive('onFinishRenderFilters', function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function () {
              scope.$emit('ngRepeatFinished');
            });
          }
        }
      };
    })
    .config(function (ionicDatePickerProvider, ionicTimePickerProvider) {
      var datePickerObj = {
          inputDate: new Date(),
          titleLabel: '选择日期',
          setLabel: '确定',
          todayLabel: '今天',
          closeLabel: '关闭',
          mondayFirst: false,
          weeksList: ["日", "一", "二", "三", "四", "五", "六"],
          monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          templateType: 'popup',
          from: new Date(1960, 1, 1),
          to: new Date(2019, 9, 1),
          showTodayButton: true,
          dateFormat: 'dd MMMM yyyy',
          closeOnSelect: false,
          disableWeekdays: []
        }
        ;

      var timePickerObj = {
        inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
        format: 12,
        step: 15,
        setLabel: '确定',
        closeLabel: '关闭'
      };

      ionicTimePickerProvider.configTimePicker(timePickerObj);

      ionicDatePickerProvider.configDatePicker(datePickerObj);
    })
  ;
