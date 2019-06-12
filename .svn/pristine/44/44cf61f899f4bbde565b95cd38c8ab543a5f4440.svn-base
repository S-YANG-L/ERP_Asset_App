/**
 * Created by chenzhuo on 2018/10/19.
 */
Asset.controller('addAssetsCtrl', ['$ionicLoading', '$scope', '$state', 'addAssetsService', '$ionicHistory', '$rootScope', 'DataService', 'UrlService', 'PopupService', '$localstorage', '$stateParams', 'UserService', '$filter', 'ionicDatePicker', '$ionicActionSheet', '$cordovaCamera', '$cordovaImagePicker', '$cordovaFileTransfer',
  function ($ionicLoading, $scope, $state, addAssetsService, $ionicHistory, $rootScope, DataService, UrlService, PopupService, $localstorage, $stateParams, UserService, $filter, ionicDatePicker, $ionicActionSheet, $cordovaCamera, $cordovaImagePicker, $cordovaFileTransfer) {
    //进入页面后初始化页面
    $scope.$on('$ionicView.enter', function () {
      $scope.topSortCode = DataService.getData("assetTopcode"); // 资产大类编码
      $scope.topSortName = DataService.getData("assetTopname"); // 资产大类名称
      $scope.sortName = DataService.getData("assetClassName");
      $scope.sortCode = DataService.getData("assetClassCode");
      $scope.userName = DataService.getData("ctTaskParam");
      $scope.department = DataService.getData("departmentList1");

      var date = new Date();
      $scope.modelData = {
        assetName: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").assetName == undefined ? '' : DataService.getData('modelData').assetName),  //资产名称
        userCode: DataService.getData("ctTaskParam") == undefined ? '' : (DataService.getData("ctTaskParam").userCode == undefined ? '' : DataService.getData('ctTaskParam').userCode),
        userName: DataService.getData("ctTaskParam") == undefined ? '' : (DataService.getData("ctTaskParam").userName == undefined ? '' : DataService.getData('ctTaskParam').userName),
        officeCode: DataService.getData("departmentList1") == undefined ? '' : (DataService.getData("departmentList1").id == undefined ? '' : DataService.getData('departmentList1').id),
        officeName: DataService.getData("departmentList1") == undefined ? '' : (DataService.getData("departmentList1").name == undefined ? '' : DataService.getData('departmentList1').name),
        imageList: DataService.getData("modelData") == undefined ?[]: (DataService.getData("modelData").imageList == undefined ?[]: DataService.getData('modelData').imageList),//图片
        regionCode: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").regionCode == undefined ? '' : DataService.getData('modelData').regionCode),//区域编码
        regionName: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").regionName == undefined ? '' : DataService.getData('modelData').regionName),//区域名名称
        topSortCode: DataService.getData('assetTopcode') == undefined ? '' : DataService.getData('assetTopcode'),//资产大类编码
        topSortName: DataService.getData('assetTopname') == undefined ? '' : DataService.getData('assetTopname'),//资产大类名称
        sortCode: DataService.getData('assetClassCode') == undefined ? '' : DataService.getData('assetClassCode'),//资产小类编码
        sortName: DataService.getData('assetClassName') == undefined ? '' : DataService.getData('assetClassName'),//资产小类名称
        storagePlace: DataService.getData("address") == undefined ? '' : (DataService.getData("address").localeName == undefined ? '' : DataService.getData('address').localeName),//存放地点
        storagePlaceCode: DataService.getData("address") == undefined ? '' : (DataService.getData("address").localeCode == undefined ? '' : DataService.getData('address').localeCode),//存放地点编码
        version: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").version == undefined ? '' : DataService.getData('modelData').version),//型号
        quantity: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").quantity == undefined ? '' : DataService.getData('modelData').quantity),//数量
        unit: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").unit == undefined ? '' : DataService.getData('modelData').unit),//计量单位
        unitPrice: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").unitPrice == undefined ? '' : DataService.getData('modelData').unitPrice),//单价
        ageLimit: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").ageLimit == undefined ? '' : DataService.getData('modelData').ageLimit),//使用年限
        supplier: DataService.getData("supplierList") == undefined ? '' : (DataService.getData("supplierList").supplierName == undefined ? '' : DataService.getData('supplierList').supplierName),//供应商
        supplierCode: DataService.getData("supplierList") == undefined ? '' : (DataService.getData("supplierList").id == undefined ? '' : DataService.getData('supplierList').id),//供应商
        notes: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").notes == undefined ? '' : DataService.getData('modelData').notes),//备注
        financeCode: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").financeCode == undefined ? '' : DataService.getData('modelData').financeCode),//财务编码
        residualValue: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").residualValue == undefined ? '' : DataService.getData('modelData').residualValue),//残值率
        accountStatus: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").accountStatus == undefined ? '' : DataService.getData('modelData').accountStatus),//折旧
        brand: DataService.getData("modelData") == undefined ? '' : (DataService.getData("modelData").brand == undefined ? '' : DataService.getData('modelData').brand),//品牌
        buyDate: date,
        isNewRecord: true
      };
    });
    //返回
    $scope.goBack = function () {
      //清除缓存
      DataService.clearData("ctTaskParam");
      DataService.clearData("departmentList1");
      DataService.clearData("assetTopcode");
      DataService.clearData("assetTopName");
      DataService.clearData("assetClassName")
      DataService.clearData("assetClassCode")
      DataService.clearData("modelData")
      DataService.clearData("supplierList");
      DataService.clearData("address");
      $state.go('assets');
    };
    //区域名称
    $scope.changeType = function () {
      DataService.clearData("rewardCache");
      console.log('区域名称');
      console.log($scope.modelData.regionCode)
      if ($scope.modelData.regionCode == "01") {
        $scope.modelData.regionName = '本地';
        $scope.modelData.punishmentMonty = 0
      } else if ($scope.modelData.regionCode == "02") {
        $scope.modelData.regionName = '外地';
        $scope.modelData.rewardMonty = 0
      }
    }

    //提交申请
    $scope.toSubmit = function () {
      if ($scope.topSortName == null || $scope.topSortName.length == 0) {
        PopupService.showToast('请选择资产大类');
        return;
      } else if ($scope.modelData.sortName == null || $scope.modelData.sortName.length == 0) {
        PopupService.showToast('请输入资产小类');
        return;
      }
      else if ($scope.modelData.assetName == null || $scope.modelData.assetName.length == 0) {
        PopupService.showToast('请输入资产名称');
        return;
      } else if ($scope.modelData.buyDate == null || $scope.modelData.buyDate.length == 0) {
        PopupService.showToast('请选择购入日期');
        return;
      } else if ($scope.modelData.unit == null || $scope.modelData.unit.length == 0) {
        PopupService.showToast('请输入计量单位');
        return;
      } else if ($scope.modelData.unitPrice == null || $scope.modelData.unitPrice.length == 0) {
        PopupService.showToast('请输入单价');
        return;
      } else if ($scope.modelData.quantity == null || $scope.modelData.quantity.length == 0) {
        PopupService.showToast('请输入数量');
        return;
      } else if ($scope.modelData.residualValue == null || $scope.modelData.residualValue.length == 0) {
        PopupService.showToast('请输入净残值率');
        return;
      } else if ($scope.modelData.regionCode == null || $scope.modelData.regionCode.length == 0) {
        PopupService.showToast('请选择区域名称');
        return;
      } else if ($scope.modelData.accountStatus == null || $scope.modelData.accountStatus.length == 0) {
        PopupService.showToast('请选择是否折旧');
        return;
      } else if ($scope.modelData.storagePlaceCode == null || $scope.modelData.storagePlaceCode.length == 0) {
        PopupService.showToast('请选择存放地点');
        return;
      } else if ($scope.modelData.ageLimit == null || $scope.modelData.ageLimit.length == 0) {
        PopupService.showToast('请输入使用期限');
        return;
      } else if ($scope.modelData.supplier == null || $scope.modelData.supplier.length == 0) {
        PopupService.showToast('请输入供货商');
        return;
      }
      $ionicLoading.show();
      $scope.type_BX = "";
      console.log("提交信息");
      console.log(JSON.stringify($scope.modelData.imageList));
      //alert(JSON.stringify($scope.modelData.imageList));

      for (var i = 0; i < $scope.modelData.imageList.length; i++) {
        $scope.type_BX += $scope.modelData.imageList[i].url;
        // alert($scope.type_BX);
        if (i < $scope.modelData.imageList.length - 1) {
          $scope.type_BX += ',';
        }
      }
      $ionicLoading.show();
      $scope.type_BX = $scope.type_BX.split("http://www.botemc.com").join("");
      console.log("提交信息");
      var param = {
        assetName: $scope.modelData.assetName,//资产名称
        quantity: $scope.modelData.quantity,//数量
        financeCode: $scope.modelData.financeCode,//财务编码
        topSortCode: $scope.modelData.topSortCode,//资产大类编码
        topSortName: $scope.modelData.topSortName,//资产大类名称
        sortCode: $scope.modelData.sortCode,//资产小类编码
        sortName: $scope.modelData.sortName,//资产小类名称
        brand: $scope.modelData.brand,//品牌
        version: $scope.modelData.version,//规格型号
        unitPrice: $scope.modelData.unitPrice,//单价
        unit: $scope.modelData.unit,//计量单位
        residualValue: $scope.modelData.residualValue,//残值率
        regionCode: $scope.modelData.regionCode,//区域编码
        regionName: $scope.modelData.regionName,//区域名称
        storagePlaceCode: $scope.modelData.storagePlaceCode,//存放地点编码
        storagePlace: $scope.modelData.storagePlace,//存放地点
        accountStatus: $scope.modelData.accountStatus,//折旧
        ageLimit: $scope.modelData.ageLimit,//使用年限
        supplier: $scope.modelData.supplier,//供应商
        supplierCode: $scope.modelData.supplierCode,//供应商编码
        userName: $scope.modelData.userName,//使用人
        userCode: $scope.modelData.userCode,//使用人编码
        officeCode: $scope.modelData.officeCode,//部门编码
        officeName: $scope.modelData.officeName,//使用部门
        remarks: $scope.modelData.notes,//备注
        picturePath: $scope.type_BX,//图片路径
        buyDate: $scope.modelData.buyDate,//日期
        __sid: $localstorage.getObject('sid'),
        isNewRecord: $scope.modelData.isNewRecord == undefined ? true : $scope.modelData.isNewRecord,
      }
      console.log('-----参数打印------');
      console.log(param);
      addAssetsService.submitData(param)
        .success(function (response) {
          if (response.code == 200) {
            $ionicLoading.hide();
            //清除缓存
            DataService.clearData("ctTaskParam");
            DataService.clearData("departmentList1");
            DataService.clearData("assetTopname");
            DataService.clearData("assetTopcode");
            DataService.clearData("assetClassName")
            DataService.clearData("assetClassCode")
            DataService.clearData("modelData")
            DataService.clearData("supplierList");
            DataService.clearData("address");
            PopupService.showToast('保存成功');
            $state.go('app.home.home1');
          } else if (response.code == 201) {
            $ionicLoading.hide();
            PopupService.showToast('保存失败');
          }
        }).error(function (response) {
        $ionicLoading.hide();
        PopupService.showToast('网络错误,请稍后重试.');
      });
    }
    //使用期限必须为整数
    $scope.leaveTime = function (code) {
      $scope.ageLimit = $scope.modelData.ageLimit % 1;
      if ($scope.ageLimit != 0) {
        PopupService.showToast("使用期限必须为整数");
        $scope.modelData.ageLimit = '';
      }
    }

    //数量必须为整数
    $scope.leaveTime2 = function (code) {
      $scope.quantity = $scope.modelData.quantity % 1;
      if ($scope.quantity != 0) {
        PopupService.showToast("数量必须为整数");
        $scope.modelData.quantity = '';
      }
    }

    // //净残值率小于100
    $scope.leaveTime1 = function () {
      $scope.residualValue = $scope.modelData.residualValue;
      if ($scope.residualValue > 99) {
        PopupService.showToast("净残值率不能大于100");
        $scope.modelData.residualValue = '';
      }
    }
    //区域
    $scope.districts = [
      {code: '01', name: '外地'}
    ]
    //存放地点
    $scope.district = [
      {code: '01', name: '黄岛仓库'}
    ]
    //前往选择申请人员
    $scope.goSelectPerson = function () {
      DataService.clearData("modelData");
      DataService.setData("modelData", $scope.modelData)
      $state.go('addOneMember');
    };

    //选择供应商
    $scope.goSupplier = function () {
      DataService.clearData("modelData");
      DataService.setData("modelData", $scope.modelData)
      $state.go('supplier');
    };

    //前往选择申请部门
    $scope.goSelectdepartment = function () {
      DataService.clearData("modelData");
      DataService.setData("modelData", $scope.modelData)
      $state.go('departmentList');
    };

    // 选择存放地点
    $scope.goWareHouse = function () {
      DataService.clearData("modelData");
      DataService.setData("modelData", $scope.modelData)
      $state.go('address');
    };

    //前往选择资产大类
    $scope.goSelectType = function () {
      DataService.clearData("assetClassName")
      DataService.clearData("assetClassCode")
      DataService.clearData("modelData");
      DataService.setData("modelData", $scope.modelData)  //传入缓存
      $state.go('selectAssetTop');
    };
    //前往选择资产小类
    $scope.goSelectSortType = function () {
      DataService.clearData("modelData");
      DataService.setData("modelData", $scope.modelData)  //传入缓存
      DataService.clearData("assetTopcode")
      DataService.setData("assetTopcode", $scope.topSortCode)
      $state.go('assetClass');
    };
    //添加图片
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
    //打开相机
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
        $scope.imagetData = [];
        $scope.imagetData[0] = imageData;
        $scope.upload($scope.imagetData);
      }, function (err) {

      });
    }

    angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])
    //打开图库
    $scope.openPictures = function () {
      var options = {
        maximumImagesCount: 10,
        width: 800,
        height: 800,
        quality: 100
      };
      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          console.log('选择后的图片:');
          //alert(JSON.stringify(results));
          console.log(results[0]);
          // $scope.images_list = results;
          $scope.upload(results);

        }, function (error) {
          // error getting photos
        });
    }
    //上传文件
    $scope.upload = function (fileEntry) {
      $ionicLoading.show();
      for (var i = 0; i < fileEntry.length; i++) {
        var options = new FileUploadOptions();
        var ft = new FileTransfer();
        //上传地址
        var SERVER = UrlService.getUrlData('UPLOAD');

        ft.upload(fileEntry[i], encodeURI(SERVER), function (response) {
          var response = angular.fromJson(response.response);

          response.list[0].url =UrlService.getUrlData_Image()+ response.list[0].url;

          response.list[0].fUserlist = response.fUserlist[0];

          $scope.modelData.imageList.push(response.list[0]);
          console.log("push结束");
          console.log(JSON.stringify($scope.modelData.imageList));
          $ionicLoading.hide();
        }, function (error) {
          console.log("SERVER", "上传失败");
          PopupService.showToast("上传失败! Code = " + error.code);
          $ionicLoading.hide();
        }, options);
      }
    };
    //删除图片
    $scope.removeImg = function (img, index) {
      var params = {
        filepath: img.pathName.replace('\\', '/'),//地址
        guid: img.guid,
        fUserlist: img.fUserlist
      }
      console.log(JSON.stringify(img));
      console.log(JSON.stringify(params));
      addAssetsService.deleteFile(params)
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
  }])
Asset.service('addAssetsService', ['$http', 'UrlService', function ($http, UrlService) {
  this.submitData = function (params) {//数据提交
    return $http.post(UrlService.getUrlData_check('SUBMIT_BORROWAPPLY'), params);
  }
  this.deleteFile = function (params) {
    return $http.post(UrlService.getUrlData('FILE_DELETE'), params);
  }
}]);

