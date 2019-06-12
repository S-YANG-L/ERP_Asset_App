/**
 * Created by xulan on 2018-7-20.
 */
(function(Asset){
  Asset
    .factory('$ionicActionSheetRecording', ['$rootScope', '$compile', '$animate', '$timeout','$ionicBody', '$interval',
      function($rootScope, $compile, $animate, $timeout, $ionicBody,$interval) {
        var extend = angular.extend,
          jqLite = angular.element,
          noop = angular.noop;
        return {
          show: actionSheet
        };


        function actionSheet(opts) {
          var scope = $rootScope.$new(true);

          extend(scope, {
            isInit: true ,
            isReadyShow : false ,
            isRecordingShow : false ,
            time :"0:00",
            cancel : noop,
            buttonTouch : noop,
            buttonHold: noop,
            buttonRelease: noop,
            cancelOnStateChange: true
          }, opts || {});

          var t = {minute:0,second:0};
          var timerHandler = null;
          // Compile the template
          var element = scope.element = $compile('<ion-action-sheet-recording></ion-action-sheet-recording>')(scope);

          //终止事件冒泡
          var action_sheet_wrapper_element = element[0].querySelector('.action-sheet-wrapper') ;
          action_sheet_wrapper_element.addEventListener('click',function(e){
            e.stopPropagation();
          });

          // 获取按钮元素
          var action_sheet_button_element = element[0].querySelector('.btn-task-recording');

          // 获取元素的动画
          var sheetEl = jqLite(action_sheet_wrapper_element);

          // 移除sheet
          scope.removeSheet = function(done) {

            if (scope.removed) return;

            sheetEl.removeClass('action-sheet-up');
            $timeout(function() {
              $ionicBody.removeClass('action-sheet-open');
            }, 400);

            $animate.removeClass(element, 'active').then(function() {
              scope.$destroy();
              element.remove();

              scope.cancel.$scope = sheetEl = null;
              (done || noop)();
            });
          };

          // 显示sheet
          scope.showSheet = function(done) {
            if (scope.removed) return;

            $ionicBody.append(element)
              .addClass('action-sheet-open');

            $animate.addClass(element, 'active').then(function() {
              if (scope.removed) return;
              (done || noop)();
            });
            $timeout(function() {
              if (scope.removed) return;
              sheetEl.addClass('action-sheet-up');
            }, 20, false);
          };

          scope.cancel = function(){
            scope.removeSheet();
          };

          scope.buttonTouch = function(){
            opts.buttonTouch();
            scope.isInit = false ;
            scope.isReadyShow = true ;
            scope.isRecordingShow = false ;
            action_sheet_button_element.style.backgroundColor = '#005fb6';
          };

          scope.buttonHold = function() {
            opts.buttonHold();
            scope.isInit = false ;
            scope.isReadyShow = false ;
            scope.isRecordingShow = true ;
            timerStart();
          };

          scope.buttonRelease = function() {
            opts.buttonRelease(scope.time);

            scope.isInit = true ;
            scope.isReadyShow = false ;
            scope.isRecordingShow = false ;
            action_sheet_button_element.style.backgroundColor = '#4b8dfa';

            t.second = t.minute = 0;
            scope.time="0:00";
            $interval.cancel(timerHandler);
            scope.cancel();
          };

          var timerStart = function(){
            timerHandler = $interval(function(){
                var minute = t.minute ;
                var second = t.second ;

                t.second = parseInt(t.second)+1;
                if(t.second>=60)
                {
                  t.second=0;
                  t.minute=parseInt(t.minute)+1;
                }

                minute = t.minute;
                second = t.second<10?"0"+ t.second: t.second ;
                scope.time = minute+":"+second ;

            },1000);
          };

          scope.showSheet();

          return scope.cancel;
        }
      }]);
})(Asset);
