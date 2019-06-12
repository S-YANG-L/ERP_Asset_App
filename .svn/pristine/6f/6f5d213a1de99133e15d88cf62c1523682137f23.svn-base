/********************************
 creater:xulan
 create time:2018-7-20
 describe：拦截器
 ********************************/
/*网络图片拦截器*/
Asset.filter('ImageFilter', ['UrlService', function (UrlService) {
  return function (value) {
    var osrc = value;
    var nsrc = 'default.png';
    if (osrc != null) {
      nsrc = osrc;
      return UrlService.getImageUrlData() + nsrc;
    } else {
      return "./data/temp_img/" + nsrc;
    }
    //return "data/temp_img/" + nsrc;
  }
}]);
/*服务端静态图片拦截器 拼接全路径 value=图片名称*/
Asset.filter('StaticImageFilter', [function () {
  return function (value) {
    var osrc = value;
    var nsrc = 'default.png';
    if (osrc != null) {
      nsrc = osrc;
      return nsrc;
    } else {
      return "./data/temp_img/" + nsrc;
    }
  }
}]);
/*服务端静态图片拦截器 仅拼接域名 value=除域名意外的全路径*/
Asset.filter('StaticImageByBuyerFilter', ['UrlService', function (UrlService) {
  return function (value) {
    var osrc = value;
    var nsrc = 'default.png';
    if (osrc != null) {
      nsrc = osrc;
      return UrlService.getBuyerUrl() + nsrc;
    } else {
      return "./data/temp_img/" + nsrc;
    }
  }
}]);
/*百分比拦截器*/
Asset.filter('PercentageFilter', function () {
  return function (value) {
    return (Math.round(value[0] / value[1] * 10000) / 100.00 + "%");// 小数点后两位百分比
  }
});
/*时间拦截器 将毫秒转化为时间*/
Asset.filter('millisecondFilter', function () {
  return function (value) {
    var format = function (time, format) {
      var t = new Date(time);
      var tf = function (i) {
        return (i < 10 ? '0' : '') + i
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
          case 'yyyy':
            return tf(t.getFullYear());
            break;
          case 'MM':
            return tf(t.getMonth() + 1);
            break;
          case 'mm':
            return tf(t.getMinutes());
            break;
          case 'dd':
            return tf(t.getDate());
            break;
          case 'HH':
            return tf(t.getHours());
            break;
          case 'ss':
            return tf(t.getSeconds());
            break;
        }
      })
    };
    //返回时间 格式 format(value, 'yyyy-MM-dd HH:mm:ss');
    return format(value, 'yyyy-MM-dd');
  }
});

Asset.filter('customCurrency', ["$filter", function ($filter) {
  return function (amount, currencySymbol) {
    var currency = $filter('currency');

    if (amount < 0) {
      return currency(amount, currencySymbol).replace("(¥", "¥-").replace(")", "");
    }

    return currency(amount, currencySymbol);
  };
}]);
//过滤器---数值累加
Asset.filter('sumMoney', ["$filter", function () {
  return function (data, key) {
    if (data == undefined || data == null)
      return 0;
    else {
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
        sum += parseFloat(data[i][key]);
      }
      return sum;
    }

  }
}]);
//时间截取年月日过滤器
Asset.filter('timeFilter', ["$filter", function () {
  var myDate = new Date();
  return function (data) {
    if (data == undefined || data == null) {
      return myDate;
    } else {
      data = data.substring(0, 10);
    }
    return data
  }
}]);

//时间截取年月日过滤器
Asset.filter('monthDateFilter', ["$filter", function () {
  var myDate = new Date();
  return function (data) {
    if (data == undefined || data == null) {
      return myDate;
    } else {
      data = data.substring(5, 10);
    }
    return data
  }
}]);
//时间截取年月日过滤器
Asset.filter('DateFilter', ["$filter", function () {
  var myDate = new Date();
  return function (data) {
    if (data == undefined || data == null) {
      return myDate;
    } else {
      data = data.substring(8, 10);
    }
    return data
  }
}]);
//时间截取年月日过滤器
Asset.filter('monthFilter', ["$filter", function () {
  var myDate = new Date();
  return function (data) {
    if (data == undefined || data == null) {
      return myDate;
    } else {
      data = data.substring(5, 8);
    }
    return data
  }
}]);
//时间截取时分过滤器
Asset.filter('minuteFilter', ["$filter", function () {
  var myDate = new Date();
  return function (data) {
    if (data == undefined || data == null) {
      return myDate;
    } else {
      data = data.substring(11, 16);
    }
    return data
  }
}]);
Asset.filter('unique', function() {
  return function (collection, keyname) {
    var output = [],
      keys = [];
    angular.forEach(collection, function (item) {
      var key = item[keyname];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item);
      }
    });
    return output;
  }
});
Asset.filter('ConvertCurrencyFilter', ["$filter", function () {
  return function (currencyDigits) {
// Constants:
    var MAXIMUM_NUMBER = 99999999999.99;
// Predefine the radix characters and currency symbols for output:
    var CN_ZERO = "零";
    var CN_ONE = "壹";
    var CN_TWO = "贰";
    var CN_THREE = "叁";
    var CN_FOUR = "肆";
    var CN_FIVE = "伍";
    var CN_SIX = "陆";
    var CN_SEVEN = "柒";
    var CN_EIGHT = "捌";
    var CN_NINE = "玖";
    var CN_TEN = "拾";
    var CN_HUNDRED = "佰";
    var CN_THOUSAND = "仟";
    var CN_TEN_THOUSAND = "万";
    var CN_HUNDRED_MILLION = "亿";
    var CN_SYMBOL = "人民币";
    var CN_DOLLAR = "元";
    var CN_TEN_CENT = "角";
    var CN_CENT = "分";
    var CN_INTEGER = "整";

// Variables:
    var integral; // Represent integral part of digit number.
    var decimal; // Represent decimal part of digit number.
    var outputCharacters; // The output result.
    var parts;
    var digits, radices, bigRadices, decimals;
    var zeroCount;
    var i, p, d;
    var quotient, modulus;
    if (currencyDigits == null || currencyDigits == undefined) {
      return "零元整";
    }
// Validate input string:
    currencyDigits = currencyDigits.toString();
    if (currencyDigits == "") {
      //alert("Empty input!");
      return "零元整";
    }
    if (currencyDigits.match(/[^,.\d]/) != null) {
      //alert("Invalid characters in the input string!");
      //return "";
      return "零元整";
    }
    if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
      /*alert("Illegal format of digit number!");
       return "";*/
      return "零元整";
    }

// Normalize the format of input digits:
    currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
    currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
// Assert the number is not greater than the maximum number.
    if (Number(currencyDigits) > MAXIMUM_NUMBER) {
      alert("Too large a number to convert!");
      return "";
    }

// Process the coversion from currency digits to characters:
// Separate integral and decimal parts before processing coversion:
    parts = currencyDigits.split(".");
    if (parts.length > 1) {
      integral = parts[0];
      decimal = parts[1];
// Cut down redundant decimal digits that are after the second.
      decimal = decimal.substr(0, 2);
    }
    else {
      integral = parts[0];
      decimal = "";
    }
// Prepare the characters corresponding to the digits:
    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
    decimals = new Array(CN_TEN_CENT, CN_CENT);
// Start processing:
    outputCharacters = "";
// Process integral part if it is larger than 0:
    if (Number(integral) > 0) {
      zeroCount = 0;
      for (i = 0; i < integral.length; i++) {
        p = integral.length - i - 1;
        d = integral.substr(i, 1);
        quotient = p / 4;
        modulus = p % 4;
        if (d == "0") {
          zeroCount++;
        }
        else {
          if (zeroCount > 0) {
            outputCharacters += digits[0];
          }
          zeroCount = 0;
          outputCharacters += digits[Number(d)] + radices[modulus];
        }
        if (modulus == 0 && zeroCount < 4) {
          outputCharacters += bigRadices[quotient];
        }
      }
      outputCharacters += CN_DOLLAR;
    }
// Process decimal part if there is:
    if (decimal != "") {
      for (i = 0; i < decimal.length; i++) {
        d = decimal.substr(i, 1);
        if (d != "0") {
          outputCharacters += digits[Number(d)] + decimals[i];
        }
      }
    }
// Confirm and return the final output string:
    if (outputCharacters == "") {
      outputCharacters = CN_ZERO + CN_DOLLAR;
    }
    if (decimal == "") {
      outputCharacters += CN_INTEGER;
    }
    outputCharacters = outputCharacters;
    return outputCharacters;
  }
}]);


