/**
 * Created by xulan on 2018-7-19.
 */
var commonConfig = ['$ionicConfigProvider', function ($ionicConfigProvider) {
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');
  $ionicConfigProvider.views.maxCache(5);
  $ionicConfigProvider.scrolling.jsScrolling(true);//ionic1.2以后默认值为false。重置为true，去掉滚动条，滚动更平滑
  $ionicConfigProvider.views.forwardCache(true);
  $ionicConfigProvider.views.transition('ios'); //ios、android、none、platform 如果平台不是IOS或安卓，那就默认使用IOS. string
  $ionicConfigProvider.backButton.text(''); //返回按钮文本 string
  $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');  //返回按钮图标。 string
  $ionicConfigProvider.backButton.previousTitleText(false); //如果以前的标题文本应该成为后退按钮的文本。这是iOS默认。 boolean
  $ionicConfigProvider.navBar.alignTitle('center'); // navBar的标题的对齐方式,默认center. left、center、right、 platform: 根据你应用运行的平台自动切换正确的标题样式。ios:center.android:left
  $ionicConfigProvider.views.swipeBackEnabled(false);

}];
