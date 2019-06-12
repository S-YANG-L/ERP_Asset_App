/**
 * Created by WuZhibao on 2018/10/9.
 */
Asset.controller('newAssetController',['$ionicActionSheetRecording','$scope','newAssetService', '$state','$ionicLoading', 'UrlService','PopupService','$localstorage','$ionicHistory', '$cordovaImagePicker', '$ionicActionSheet', 'httpUtil', 'PopupService', '$filter', 'ionicDatePicker', 'ionicTimePicker','$cordovaCamera', 'DataService',
    function($ionicActionSheetRecording,$scope, newAssetService,$state, $ionicLoading, UrlService,PopupService, $localstorage, $ionicHistory, $cordovaImagePicker, $ionicActionSheet, httpUtil, PopupService, $filter, ionicDatePicker, ionicTimePicker, $cordovaCamera, DataService){
      $scope.modelData = {
        beginDate: $filter('date')(new Date(), 'yyyy-MM-dd'), //开始日期
      }
      $scope.$on('$ionicView.enter', function () {
        // $scope.url = UrlService.getUrlData_Image();
      //接受页面传值
      $scope.leader = DataService.getData("ctTaskParam");
      $scope.company = DataService.getData("selectCompany");//返回
        $scope.goBack = function () {
          DataService.clearData("useDate");
          DataService.clearData("useDateCache");
          $ionicHistory.goBack();
        };
      $scope.department = DataService.getData("departmentList");

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

      $scope.openDatePicker = function (date, beginEnd) {
        ipObj1.inputDate = new Date(date);
        ipObj1.callback = function (val) {
          var myDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
          if (beginEnd == 'beginDate') {
            $scope.modelData.beginDate = myDate;
          }
          if (beginEnd == 'endDate') {
            $scope.modelData.endDate = myDate;
          }
          //  $scope.getDateTime();
        };
        ionicDatePicker.openDatePicker(ipObj1);
      };
      /********添加timePicker*******/
      $scope.openTimePicker = function (beginEnd) {
        var ipObj1 = {
          callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
            } else {
              var selectedTime = new Date(val * 1000);
              var selectedTimeH = "" + selectedTime.getUTCHours();
              var selectedTimeF = "" + selectedTime.getUTCMinutes();
              if (selectedTimeH.length < 2) {
                selectedTimeH = "0" + selectedTime.getUTCHours();
              }
              if (selectedTimeF.length < 2) {
                selectedTimeF = "0" + selectedTime.getUTCMinutes();
              }
              var beginTime = selectedTimeH + ':' + selectedTimeF;
              if ($scope.punchData.status == 1) {
                if (beginTime > $scope.leaveEnd || beginTime < $scope.leaveBegin) {
                  PopupService.showToast('请选择正确日期');
                  $scope.modelData.beginTime = $scope.leaveBegin;
                } else if (beginTime >= $scope.leaveBegin) {
                  $scope.modelData.beginTime = beginTime;
                }
              } else {
                if (beginTime > $scope.punchData.xbClock || beginTime < $scope.punchData.clockPunch) {
                  PopupService.showToast('请选择正确日期');
                  $scope.modelData.beginTime = $scope.punchData.clockPunch.substr(0, 5);
                } else if (beginTime >= $scope.punchData.clockPunch) {
                  $scope.modelData.beginTime = beginTime;
                }
              }
            }
          },
          inputTime: 50400,   //Optional
          format: 12,         //Optional
          step: 30          //Optional
        };
        ionicTimePicker.openTimePicker(ipObj1);
      };
      $scope.openTimePicker2 = function (beginEnd) {
        var ipObj1 = {
          callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
            } else {
              var selectedTime = new Date(val * 1000);
              var selectedTimeH = "" + selectedTime.getUTCHours();
              var selectedTimeF = "" + selectedTime.getUTCMinutes();
              if (selectedTimeH.length < 2) {
                selectedTimeH = "0" + selectedTime.getUTCHours();
              }
              if (selectedTimeF.length < 2) {
                selectedTimeF = "0" + selectedTime.getUTCMinutes();
              }
              var endTime = selectedTimeH + ':' + selectedTimeF;//2016-12-16 02:00
              if ($scope.punchData.status == 1) {
                if (endTime > $scope.leaveEnd || endTime < $scope.leaveBegin) {
                  PopupService.showToast('请选择正确日期');
                  $scope.modelData.endTime = $scope.leaveEnd;
                } else if (endTime <= $scope.leaveEnd) {
                  $scope.modelData.endTime = endTime;
                }
              }else{
                if (endTime > $scope.punchData.xbClock || endTime < $scope.punchData.clockPunch) {
                  PopupService.showToast('请选择正确日期');
                  $scope.modelData.endTime = $scope.punchData.xbClock.substr(0, 5);
                } else if (endTime <= $scope.punchData.xbClock) {
                  $scope.modelData.endTime = endTime;
                }
              }
            }
          },
          inputTime: 50400,   //Optional
          format: 12,         //Optional
          step: 30          //Optional
        };
        ionicTimePicker.openTimePicker(ipObj1);
      };
      });
      //区域
      $scope.districts=[
        {code: '01', name: '外地'}
      ]
       //来源
      $scope.source=[
        {code: '01', name: '自建'},
        {code: '01', name: '租赁'},
        {code: '01', name: '捐赠'},
        {code: '01', name: '其他'}
      ]
      //前往选择申请人员
      $scope.goSelectPerson = function () {
        $state.go('addOneMember');
      };
      //前往选择申请公司
      $scope.goSelectCompany = function () {
        $state.go('selectFirm');
      };
      //前往选择申请部门
      $scope.goSelectdepartment = function () {
        $state.go('departmentList');
      };

      //上传图片
      $scope.addAttachment = function () {
        $ionicActionSheet.show({
          buttons: [
            {text: '相机'},
            {text: '图库'}
          ],
          cancelText: '关闭',
          cancel: function () {
            return true;
          },
          buttonClicked: function (index) {
            switch (index) {
              case 0:
                $scope.openCamera();
                break;
              case 1:
                $scope.openPictures();
                break;
              default:
                break;
            }
            return true;
          }
        });
      }

      $scope.openCamera = function () {
        var options = {
          //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
          quality: 100,                                            //相片质量0-100
          destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
          sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
          allowEdit: false,                                        //在选择之前允许修改截图
          encodingType: Camera.EncodingType.PNG,                   //保存的图片格式： JPEG = 0, PNG = 1
          targetWidth: 800,                                        //照片宽度
          targetHeight: 800,                                       //照片高度
          mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
          cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

          //  alert(imageData);
          $scope.imagetData = [];
          $scope.imagetData[0] = imageData;
          //  $scope.modelData.imageList[0] = imageData;
          $scope.upload($scope.imagetData);
        }, function (err) {
          // error
        });
      }

      $scope.openPictures = function () {
        //alert(1);
        var options = {
          maximumImagesCount: 10,
          width: 800,
          height: 800,
          quality: 100
        };
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            console.log('选择后的图片:');
            console.log(results[0]);
            //alert('图片' + results[0]);
            // $scope.images_list = results;
            if (results.length >= 1) {
              $scope.upload(results);
            }
          }, function (error) {
            // error getting photos
          });
      }

      //图片上传
      $scope.upload = function (fileEntry) {
        $ionicLoading.show();
        $scope.modelData.fUserlist = "";
        for (var i = 0; i < fileEntry.length; i++) {
          var options = new FileUploadOptions();
          var ft = new FileTransfer();
          //上传地址
          var SERVER = UrlService.getUrlData_check('UPLOAD');
          //alert('上传地址'+fileEntry[i]);
          ft.upload(fileEntry[i], encodeURI(SERVER), function (response) {
            var response = angular.fromJson(response.response);
            console.log(response.response);
            /* $scope.modelData.fUserlist += response.fUserlist[0];
             $scope.modelData.fUserlist += ",";*/
            response.list[0].url = UrlService.getUrlData_Image() + response.list[0].url;
            //if (response.list[0].fUserlist != undefined) {
            response.list[0].fUserlist = response.fUserlist[0];
            //}
            $scope.modelData.imageList.push(response.list[0]);
            console.log("push结束");
            console.log(JSON.stringify($scope.modelData.imageList));
            //alert(JSON.stringify($scope.modelData.imageList));

            $ionicLoading.hide();
          }, function (error) {
            PopupService.showToast("上传失败! Code = " + error.code);
            $ionicLoading.hide();
          }, options);
        }
      };

      $scope.removeImg = function (img, index) {
        //lert(img.pathName.replace);
        var params = {
          filepath: img.pathName.replace('\\', '/'),//地址
          guid: img.guid,
          fUserlist: img.fUserlist
        }
        console.log(JSON.stringify(params));
        newAssetService.deleteFile(params)
          .success(function (data) {
            if (data.result == "login") {
              $state.go("login");
            }
            else if (data.result == "true") {
              PopupService.showToast(data.message);
              $scope.modelData.imageList.splice(index, 1);
            }
            else {
              PopupService.showToast(data.message);
            }
          }).error(function (data) {
          // 回调失败后,隐藏进度条
          console.log(data);
          PopupService.showToast("网络错误.");
        });

      }

      $scope.showImg = function (img) {
        PopupService.showImgViewer(img, '');
      }

      //滑动页面触发事件
      $scope.slideHasChanged = function (index) {
        if (index > 0) {
          $scope.sudoku = true;
        } else {
          $scope.sudoku = false;
        }
      };
      //点击图片放大
      $scope.shouBigImage = function () {  //传递一个参数（图片的URl）
        $scope.bigImage = true;                   //显示大图
      };
      $scope.hideBigImage = function () {
        $scope.bigImage = false;
      };
      //滑动页面触发事件
      $scope.slideHasChanged = function (index) {
        if (index > 0) {
          $scope.sudoku = true;
        } else {
          $scope.sudoku = false;
        }
      };
      //提交申请
      $scope.toSubmit = function () {
        if ($scope.flowId == null ||$scope.flowId == undefined ||$scope.flowId.length == 0) {
          PopupService.showToast('请等待,还未获取到流程ID');
          return;
        } else if ($scope.modelData.assetName ==null|| $scope.modelData.assetNamelength==0) {
          PopupService.showToast('请输入资产名称');
          return;
        } else if ($scope.modelData.assetStd == null || $scope.modelData.assetStd.length == 0) {
          PopupService.showToast('请输入规格型号');
          return;
        } else if ($scope.modelData.beginDate == null || $scope.modelData.beginDate.length == 0) {
          PopupService.showToast('请输入购入日期');
          return;
        } else if ($scope.modelData.unit == null || $scope.modelData.unit.length == 0) {
          PopupService.showToast('请选择计量单位');
          return;
        } else if ($scope.modelData.money == null || $scope.modelData.money.length == 0) {
          PopupService.showToast('请输入金额');
          return;
        } else if ($scope.company.name == null || $scope.company.name.length == 0) {
          PopupService.showToast('请选择公司');
          return;
        } else if ($scope.department.departmenName == null || $scope.department.departmenName.length == 0) {
          PopupService.showToast('请选择部门');
          return;
        } else if ($scope.user.userName == null || $scope.user.userName.length == 0) {
          PopupService.showToast('请选择管理员');
          return;
        } else if ($scope.leader.userName == null || $scope.leader.userName.length == 0) {
          PopupService.showToast('请选择使用人');
          return;
        } else if ($scope.modelData.companys == null || $scope.modelData.companys.length == 0) {
          PopupService.showToast('请选择所属公司');
          return;
        } else if ($scope.modelData.place == null || $scope.modelData.place.length == 0) {
          PopupService.showToast('请输入存放地点');
          return;
        } else if ($scope.modelData.supplier == null || $scope.modelData.supplier.length == 0) {
          PopupService.showToast('请输入供应商');
          return;
        } else if ($scope.modelData.content == null || $scope.modelData.content.length == 0) {
          PopupService.showToast('请输入备注');
          return;
        } else if ($scope. modelData.source == null || $scope. modelData.source.length == 0) {
          PopupService.showToast('请选择来源');
          return;
        } else if ($scope.modelData.time == null || $scope.modelData.time.length == 0) {
          PopupService.showToast('请输入使用年限');
          return;
        } else if ($scope.modelData.area == null || $scope.modelData.area.length == 0) {
          PopupService.showToast('请选择区域');
          return;
          return;
        } else if (($scope.approval == null || $scope.approval.refName == 0) && $scope.approvalList!=0) {
          PopupService.showToast('请选择审批人');
        }$ionicLoading.show();
        $scope.beginDateLong = new Date($filter('date')($scope.modelData.beginDate, 'yyyy/MM/dd')).getTime();
        var param = {
          approval: DataService.getData('selectApply')==undefined ? '' : DataService.getData('selectApply').userCode,
          approvalName: DataService.getData('selectApply')==undefined ? '' : DataService.getData('selectApply').userName,
          /*  approval: DataService.getData('selectApply').userCode,//申请人编码
            approvalName: DataService.getData('selectApply').userName,//申请人姓名*/
          __sid: $localstorage.getObject('sid'),
          assetName: $scope.modelData.assetName,//资产名称
          assetStd: $scope.modelData.assetStd ,//规格型号
          unit: $scope.modelData.unit,//计量单位
          beginDate: $filter('date')($scope.modelData.beginDate, 'yyyy-MM-dd'),//购入日期
          money:$scope.modelData.money,//金额
          dept: $scope.department.departmenName,//部门
          company: $scope.company.name,//公司
          applyName: $scope.user.userName,//管理员
          userName: $scope.leader.userName,//使用人
          companys: $scope.modelData.companys ,//所属公司
          place: $scope.modelData.place,//存放地点
          supplier: $scope.modelData.supplier,//供应商
          content: $scope.modelData.content,//备注
          source: $scope. modelData.source,//来源
          time: $scope.modelData.time,//使用年限
          source: $scope. modelData.source,//来源
          area: $scope.modelData.area,//区域
          flowId: $scope.flowId,//工作流FlowID,
          isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,      //判断是保存还是新增,
          id: $scope.modelData.id == undefined ? null : $scope.modelData.id
        };
        newAssetService.submitData(param)
          .success(function (response) {

            if (response.code == 200) {
              $ionicLoading.hide();
              PopupService.showToast('提交成功');
              DataService.clearData("tripApply");
              DataService.clearData("selectApply");
              DataService.clearData("nameBill");
              $state.go('tab.app');
            }else if (response.code == 201){
              $ionicLoading.hide();
              PopupService.showToast('提交失败');
              $ionicLoading.hide();
            }
          }).error(function (response) {
          $ionicLoading.hide();
          PopupService.showToast('网络错误,请稍后重试.');
        });
      };
    }]);
Asset.service('newAssetService', ['$http', 'UrlService', function ($http, UrlService) {

}]);
/**
 * Created by WuZhibao on 2018/10/9.
 */
Asset.controller('newAssetController', ['$ionicActionSheetRecording', '$scope', 'newAssetService', '$state', '$ionicLoading', 'UrlService', 'PopupService', '$localstorage', '$ionicHistory', '$cordovaImagePicker', '$ionicActionSheet', 'httpUtil', 'PopupService', '$filter', 'ionicDatePicker', 'ionicTimePicker', '$cordovaCamera', 'DataService',
  function ($ionicActionSheetRecording, $scope, newAssetService, $state, $ionicLoading, UrlService, PopupService, $localstorage, $ionicHistory, $cordovaImagePicker, $ionicActionSheet, httpUtil, PopupService, $filter, ionicDatePicker, ionicTimePicker, $cordovaCamera, DataService) {
    $scope.modelData = {
      beginDate: $filter('date')(new Date(), 'yyyy-MM-dd'), //开始日期
    }
    $scope.$on('$ionicView.enter', function () {
      $scope.url = UrlService.getUrlData_Image();
      //接受页面传值
      $scope.leader = DataService.getData("ctTaskParam");
      $scope.company = DataService.getData("selectCompany");//返回
      $scope.goBack = function () {
        DataService.clearData("useDate");
        DataService.clearData("useDateCache");
        $ionicHistory.goBack();
      };
      $scope.department = DataService.getData("departmentList");

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

      $scope.openDatePicker = function (date, beginEnd) {
        ipObj1.inputDate = new Date(date);
        ipObj1.callback = function (val) {
          var myDate = $filter('date')(new Date(val), 'yyyy-MM-dd');
          if (beginEnd == 'beginDate') {
            $scope.modelData.beginDate = myDate;
          }
          if (beginEnd == 'endDate') {
            $scope.modelData.endDate = myDate;
          }
          //  $scope.getDateTime();
        };
        ionicDatePicker.openDatePicker(ipObj1);
      };
      /********添加timePicker*******/
      $scope.openTimePicker = function (beginEnd) {
        var ipObj1 = {
          callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
            } else {
              var selectedTime = new Date(val * 1000);
              var selectedTimeH = "" + selectedTime.getUTCHours();
              var selectedTimeF = "" + selectedTime.getUTCMinutes();
              if (selectedTimeH.length < 2) {
                selectedTimeH = "0" + selectedTime.getUTCHours();
              }
              if (selectedTimeF.length < 2) {
                selectedTimeF = "0" + selectedTime.getUTCMinutes();
              }
              var beginTime = selectedTimeH + ':' + selectedTimeF;
              if ($scope.punchData.status == 1) {
                if (beginTime > $scope.leaveEnd || beginTime < $scope.leaveBegin) {
                  PopupService.showToast('请选择正确日期');
                  $scope.modelData.beginTime = $scope.leaveBegin;
                } else if (beginTime >= $scope.leaveBegin) {
                  $scope.modelData.beginTime = beginTime;
                }
              } else {
                if (beginTime > $scope.punchData.xbClock || beginTime < $scope.punchData.clockPunch) {
                  PopupService.showToast('请选择正确日期');
                  $scope.modelData.beginTime = $scope.punchData.clockPunch.substr(0, 5);
                } else if (beginTime >= $scope.punchData.clockPunch) {
                  $scope.modelData.beginTime = beginTime;
                }
              }
            }
          },
          inputTime: 50400,   //Optional
          format: 12,         //Optional
          step: 30          //Optional
        };
        ionicTimePicker.openTimePicker(ipObj1);
      };
      $scope.openTimePicker2 = function (beginEnd) {
        var ipObj1 = {
          callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
            } else {
              var selectedTime = new Date(val * 1000);
              var selectedTimeH = "" + selectedTime.getUTCHours();
              var selectedTimeF = "" + selectedTime.getUTCMinutes();
              if (selectedTimeH.length < 2) {
                selectedTimeH = "0" + selectedTime.getUTCHours();
              }
              if (selectedTimeF.length < 2) {
                selectedTimeF = "0" + selectedTime.getUTCMinutes();
              }
              var endTime = selectedTimeH + ':' + selectedTimeF;//2016-12-16 02:00
              if ($scope.punchData.status == 1) {
                if (endTime > $scope.leaveEnd || endTime < $scope.leaveBegin) {
                  PopupService.showToast('请选择正确日期');
                  $scope.modelData.endTime = $scope.leaveEnd;
                } else if (endTime <= $scope.leaveEnd) {
                  $scope.modelData.endTime = endTime;
                }
              } else {
                if (endTime > $scope.punchData.xbClock || endTime < $scope.punchData.clockPunch) {
                  PopupService.showToast('请选择正确日期');
                  $scope.modelData.endTime = $scope.punchData.xbClock.substr(0, 5);
                } else if (endTime <= $scope.punchData.xbClock) {
                  $scope.modelData.endTime = endTime;
                }
              }
            }
          },
          inputTime: 50400,   //Optional
          format: 12,         //Optional
          step: 30          //Optional
        };
        ionicTimePicker.openTimePicker(ipObj1);
      };
    });
    //区域
    $scope.districts = [
      {code: '01', name: '外地'}
    ]
    //来源
    $scope.source = [
      {code: '01', name: '自建'},
      {code: '01', name: '租赁'},
      {code: '01', name: '捐赠'},
      {code: '01', name: '其他'}
    ]
    //前往选择申请人员
    $scope.goSelectPerson = function () {
      $state.go('addOneMember');
    };
    //前往选择申请公司
    $scope.goSelectCompany = function () {
      $state.go('selectFirm');
    };
    //前往选择申请部门
    $scope.goSelectdepartment = function () {
      $state.go('departmentList');
    };

    //上传图片
    $scope.addAttachment = function () {
      $ionicActionSheet.show({
        buttons: [
          {text: '相机'},
          {text: '图库'}
        ],
        cancelText: '关闭',
        cancel: function () {
          return true;
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              $scope.openCamera();
              break;
            case 1:
              $scope.openPictures();
              break;
            default:
              break;
          }
          return true;
        }
      });
    }

    $scope.openCamera = function () {
      var options = {
        //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
        quality: 100,                                            //相片质量0-100
        destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
        sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
        allowEdit: false,                                        //在选择之前允许修改截图
        encodingType: Camera.EncodingType.PNG,                   //保存的图片格式： JPEG = 0, PNG = 1
        targetWidth: 800,                                        //照片宽度
        targetHeight: 800,                                       //照片高度
        mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
        cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {

        //  alert(imageData);
        $scope.imagetData = [];
        $scope.imagetData[0] = imageData;
        //  $scope.modelData.imageList[0] = imageData;
        $scope.upload($scope.imagetData);
      }, function (err) {
        // error
      });
    }

    $scope.openPictures = function () {
      //alert(1);
      var options = {
        maximumImagesCount: 10,
        width: 800,
        height: 800,
        quality: 100
      };
      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          console.log('选择后的图片:');
          console.log(results[0]);
          //alert('图片' + results[0]);
          // $scope.images_list = results;
          if (results.length >= 1) {
            $scope.upload(results);
          }
        }, function (error) {
          // error getting photos
        });
    }

    //图片上传
    $scope.upload = function (fileEntry) {
      $ionicLoading.show();
      $scope.modelData.fUserlist = "";
      for (var i = 0; i < fileEntry.length; i++) {
        var options = new FileUploadOptions();
        var ft = new FileTransfer();
        //上传地址
        var SERVER = UrlService.getUrlData_check('UPLOAD');
        //alert('上传地址'+fileEntry[i]);
        ft.upload(fileEntry[i], encodeURI(SERVER), function (response) {
          var response = angular.fromJson(response.response);
          console.log(response.response);
          /* $scope.modelData.fUserlist += response.fUserlist[0];
           $scope.modelData.fUserlist += ",";*/
          response.list[0].url = UrlService.getUrlData_Image() + response.list[0].url;
          //if (response.list[0].fUserlist != undefined) {
          response.list[0].fUserlist = response.fUserlist[0];
          //}
          $scope.modelData.imageList.push(response.list[0]);
          console.log("push结束");
          console.log(JSON.stringify($scope.modelData.imageList));
          //alert(JSON.stringify($scope.modelData.imageList));

          $ionicLoading.hide();
        }, function (error) {
          PopupService.showToast("上传失败! Code = " + error.code);
          $ionicLoading.hide();
        }, options);
      }
    };

    $scope.removeImg = function (img, index) {
      //lert(img.pathName.replace);
      var params = {
        filepath: img.pathName.replace('\\', '/'),//地址
        guid: img.guid,
        fUserlist: img.fUserlist
      }
      console.log(JSON.stringify(params));
      newAssetService.deleteFile(params)
        .success(function (data) {
          if (data.result == "login") {
            $state.go("login");
          }
          else if (data.result == "true") {
            PopupService.showToast(data.message);
            $scope.modelData.imageList.splice(index, 1);
          }
          else {
            PopupService.showToast(data.message);
          }
        }).error(function (data) {
        // 回调失败后,隐藏进度条
        console.log(data);
        PopupService.showToast("网络错误.");
      });

    }

    $scope.showImg = function (img) {
      PopupService.showImgViewer(img, '');
    }

    //滑动页面触发事件
    $scope.slideHasChanged = function (index) {
      if (index > 0) {
        $scope.sudoku = true;
      } else {
        $scope.sudoku = false;
      }
    };
    //点击图片放大
    $scope.shouBigImage = function () {  //传递一个参数（图片的URl）
      $scope.bigImage = true;                   //显示大图
    };
    $scope.hideBigImage = function () {
      $scope.bigImage = false;
    };
    //滑动页面触发事件
    $scope.slideHasChanged = function (index) {
      if (index > 0) {
        $scope.sudoku = true;
      } else {
        $scope.sudoku = false;
      }
    };
    //提交申请
    $scope.toSubmit = function () {
      if ($scope.flowId == null || $scope.flowId == undefined || $scope.flowId.length == 0) {
        PopupService.showToast('请等待,还未获取到流程ID');
        return;
      } else if ($scope.modelData.assetName == null || $scope.modelData.assetNamelength == 0) {
        PopupService.showToast('请输入资产名称');
        return;
      } else if ($scope.modelData.assetStd == null || $scope.modelData.assetStd.length == 0) {
        PopupService.showToast('请输入规格型号');
        return;
      } else if ($scope.modelData.beginDate == null || $scope.modelData.beginDate.length == 0) {
        PopupService.showToast('请输入购入日期');
        return;
      } else if ($scope.modelData.unit == null || $scope.modelData.unit.length == 0) {
        PopupService.showToast('请选择计量单位');
        return;
      } else if ($scope.modelData.money == null || $scope.modelData.money.length == 0) {
        PopupService.showToast('请输入金额');
        return;
      } else if ($scope.company.name == null || $scope.company.name.length == 0) {
        PopupService.showToast('请选择公司');
        return;
      } else if ($scope.department.departmenName == null || $scope.department.departmenName.length == 0) {
        PopupService.showToast('请选择部门');
        return;
      } else if ($scope.user.userName == null || $scope.user.userName.length == 0) {
        PopupService.showToast('请选择管理员');
        return;
      } else if ($scope.leader.userName == null || $scope.leader.userName.length == 0) {
        PopupService.showToast('请选择使用人');
        return;
      } else if ($scope.modelData.companys == null || $scope.modelData.companys.length == 0) {
        PopupService.showToast('请选择所属公司');
        return;
      } else if ($scope.modelData.place == null || $scope.modelData.place.length == 0) {
        PopupService.showToast('请输入存放地点');
        return;
      } else if ($scope.modelData.supplier == null || $scope.modelData.supplier.length == 0) {
        PopupService.showToast('请输入供应商');
        return;
      } else if ($scope.modelData.content == null || $scope.modelData.content.length == 0) {
        PopupService.showToast('请输入备注');
        return;
      } else if ($scope.modelData.source == null || $scope.modelData.source.length == 0) {
        PopupService.showToast('请选择来源');
        return;
      } else if ($scope.modelData.time == null || $scope.modelData.time.length == 0) {
        PopupService.showToast('请输入使用年限');
        return;
      } else if ($scope.modelData.area == null || $scope.modelData.area.length == 0) {
        PopupService.showToast('请选择区域');
        return;
        return;
      } else if (($scope.approval == null || $scope.approval.refName == 0) && $scope.approvalList != 0) {
        PopupService.showToast('请选择审批人');
      }
      $ionicLoading.show();
      $scope.beginDateLong = new Date($filter('date')($scope.modelData.beginDate, 'yyyy/MM/dd')).getTime();
      var param = {
        approval: DataService.getData('selectApply') == undefined ? '' : DataService.getData('selectApply').userCode,
        approvalName: DataService.getData('selectApply') == undefined ? '' : DataService.getData('selectApply').userName,
        /*  approval: DataService.getData('selectApply').userCode,//申请人编码
          approvalName: DataService.getData('selectApply').userName,//申请人姓名*/
        __sid: $localstorage.getObject('sid'),
        assetName: $scope.modelData.assetName,//资产名称
        assetStd: $scope.modelData.assetStd,//规格型号
        unit: $scope.modelData.unit,//计量单位
        beginDate: $filter('date')($scope.modelData.beginDate, 'yyyy-MM-dd'),//购入日期
        money: $scope.modelData.money,//金额
        dept: $scope.department.departmenName,//部门
        company: $scope.company.name,//公司
        applyName: $scope.user.userName,//管理员
        userName: $scope.leader.userName,//使用人
        companys: $scope.modelData.companys,//所属公司
        place: $scope.modelData.place,//存放地点
        supplier: $scope.modelData.supplier,//供应商
        content: $scope.modelData.content,//备注
        source: $scope.modelData.source,//来源
        time: $scope.modelData.time,//使用年限
        source: $scope.modelData.source,//来源
        area: $scope.modelData.area,//区域
        flowId: $scope.flowId,//工作流FlowID,
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,      //判断是保存还是新增,
        id: $scope.modelData.id == undefined ? null : $scope.modelData.id
      };
      newAssetService.submitData(param)
        .success(function (response) {

          if (response.code == 200) {
            $ionicLoading.hide();
            PopupService.showToast('提交成功');
            DataService.clearData("tripApply");
            DataService.clearData("selectApply");
            DataService.clearData("nameBill");
            $state.go('tab.app');
          } else if (response.code == 201) {
            $ionicLoading.hide();
            PopupService.showToast('提交失败');
            $ionicLoading.hide();
          }
        }).error(function (response) {
        $ionicLoading.hide();
        PopupService.showToast('网络错误,请稍后重试.');
      });
    };
  }]);
Asset.service('newAssetService', ['$http', 'UrlService', function ($http, UrlService) {

}]);
