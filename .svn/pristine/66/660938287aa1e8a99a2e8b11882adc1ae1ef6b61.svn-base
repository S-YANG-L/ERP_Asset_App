Asset
  .directive('textareaAuto', function ($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        //判断是否是    TEXTAREA
        if("TEXTAREA"==element[0].nodeName&&attr.textareaAuto){
          //自适应高度
          $(element).autoTextarea()
        }
      }
    };
  });
Asset
  .directive('ionSpinnerAudio',['$document',function($document){
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      template : '<svg viewBox="0 0 70 70" style="width: 28px;height: 16px;">'+
      '<g stroke-width="3" stroke-linecap="round">'+
      '<line x1="10" x2="10" y2="40.3389" y1="23.6611">'+
      '<animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>'+
      '<animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>'+
      '<animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line>'+
      '<line x1="24" x2="24" y2="45.8503" y1="17.0748">'+
      '<animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>'+
      '<animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>'+
      '<animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line>'+
      '<line x1="38" x2="38" y2="41.5813" y1="22.4187">'+
      '<animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>'+
      '<animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>'+
      '<animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line>'+
      '<line x1="52" x2="52" y2="46.4838" y1="17.5162">'+
      '<animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate>'+
      '<animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate>'+
      '<animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line>'+
      '</g>'+
      '</svg>'
    }
  }]);

Asset
  .directive('ionActionSheetRecording',['$document',function($document){
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      template : '<div class="action-sheet-backdrop" ng-click="cancel();">' +
                    '<div class="action-sheet-wrapper">' +
                      '<div class="action-sheet-recording">' +
                          '<table class="table-spinner"><tbody>'+
                            '<tr ng-if="isInit">'+
                              '<th><ion-spinner icon="ripple" class="spinner spinner-ripple"></ion-spinner></th>'+
                              '<td><code>按住说话</code></td></tr>'+
                            '<tr ng-if="isReadyShow">'+
                              '<th><ion-spinner icon="ios-small" class="spinner spinner-ios-small"></ion-spinner></th>'+
                              '<td><code>准备中</code></td></tr>'+
                            '<tr ng-if="isRecordingShow">'+
                              '<th><ion-spinner icon="lines" class="spinner spinner-lines"></ion-spinner></th>'+
                              '<td><code>{{time}}</code></td>'+
                              '<th><ion-spinner icon="lines" class="spinner spinner-lines"></ion-spinner></th></tr>'+

                          '</tbody></table>'+
                          '<div class="btn-task-recording" on-touch="buttonTouch();" on-hold="buttonHold();" on-release="buttonRelease();">'+
                            '<i class="erp-icon-add icon-center"></i>'+
                          '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>'
    }
  }]);




