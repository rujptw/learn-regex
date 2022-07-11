// 括号提供分组和分支的功能
var reg = /a+/ //匹配连续出现的a
// 分组
var reg = /(ab)+/g //匹配连续出现的ab
var str = "ababa abbb ababab"
console.log(str.match(reg)) //[ 'abab', 'ab', 'ababab' ]

// 分支结构，例如(p1|p2)
var reg = /^I love (Javascript|Regular Expression)$/

console.log(reg.test("I love Javascript")) //true
console.log(reg.test("I hate Javascript")) //false
console.log(reg.test("I love Regular Expression")) //true
console.log("I love Regular Expression".match(reg)) //reg上加上g修饰符得到[ 'I love Regular Expression' ]
// 将括号去掉
var reg = /^I love Javascript|Regular Expression$/g
console.log("I love Regular Expression".match(reg)) //[ 'Regular Expression' ]
console.log("I love Javascript".match(reg)) //[ 'I love Javascript' ]
console.log("I hate Javascript".match(reg)) //null

// 分组引用，需要配合实现环境的api

var reg = /\d{4}-\d{2}-\d{2}/
console.log(reg.test("kk2021-03-04")) //true
console.log(reg.test("2021-03-04")) //true

// 使用分组
var reg = /(\d{4})-(\d{2})-(\d{2})/
console.log(reg.test("kk2021-03-04")) //true
console.log(reg.test("2021-03-04")) //true
// 提取年、月、日
var str = "kk2021-03-04"
console.log(str.match(reg)) //['2021-03-04','2021','03','04',index: 2,input: 'kk2021-03-04',groups: undefined]
// match返回一个数组，第一个是整体匹配结果，第二个是各个分组里匹配的内容，第三个是匹配到的下标，第四个是输入的内容，最后一个是命名
// 捕获组，如果没有则为undefined
// 有g修饰符，则单独返回整体的匹配结果，不会返回捕获组

// exec方法,在一个指定字符串中执行搜索匹配，返回一个结果数组或null
var reg = /(\d{4})-(\d{2})-(\d{2})/
var str = "2017-06-12"
console.log(reg.exec(str)) //["2017-06-12","2017","06","12",groups: undefined,index: 0,input: "2017-06-12"]
reg.exec(str) //NOTE:需要正则操作，才能使用正则的构造函数的全局属性
// NOTE:可以使用正则的构造函数的全局属性$1到$9获取对应的数据,$1,$2等这些代表对应的分组

console.log(RegExp.$1) //2017
console.log(RegExp.$2) //06
console.log(RegExp.$3) //12
console.log(RegExp.$4) //''
console.log(RegExp.$5) //''

// 替换
var reg = /(\d{4})-(\d{2})-(\d{2})/
var str = "2017-06-12"
// 第一种replace
var result = str.replace(reg, "$2/$3/$1")
console.log("result", result) //06/12/2017

//第二种replace
var result = str.replace(reg, function () {
  return RegExp.$2 + "/" + RegExp.$3 + "/" + RegExp.$1
})
console.log("result", result) //06/12/2017

// 第三种replace
var result = str.replace(reg, function (match, year, month, day) {
  return month + "/" + day + "/" + year
})
console.log("result: ", result) //06/12/2017

// 分组引用的另一种方法，反向引用，反向引用只能引用之前出现的分组
var reg = /\d{4}(-|\/|\.)\d{2}(\-|\/|\.)\d{2}/
var str1 = "2017-06-12"
var str2 = "2017/06/12"
var str3 = "2017.06.12"
var str4 = "2017.06-12"
console.log(reg.test(str1)) //true
console.log(reg.test(str2)) //true
console.log(reg.test(str3)) //true
console.log(reg.test(str4)) //true,str4两个分隔符不一致还是可以通过校验

// 统一分隔符，使用反向引用
var reg = /\d{4}(-|\/|\.)\d{2}\1\d{2}/
var str1 = "2017-06-12"
var str2 = "2017/06/12"
var str3 = "2017.06.12"
var str4 = "2017.06-12"
console.log(reg.test(str1)) //true
console.log(reg.test(str2)) //true
console.log(reg.test(str3)) //true
console.log(reg.test(str4)) //false,\1表示引用之前的(-|\/|\.)分组，如果它匹配到-，\1会匹配搭配-
// \1代表匹配第一个分组，\2,\3，匹配到第二个和第三个分组

// 括号嵌套的情况
var reg = /^((\d)(\d(\d)))\1\2\3\4$/
var str = "1231231233"
console.log(reg.test(str)) //true
console.log(RegExp.$1) //123
console.log(RegExp.$2) //1
console.log(RegExp.$3) //23
console.log(RegExp.$4) //3

// \10代表匹配第10个分组
var reg = /(1)(2)(3)(4)(5)(6)(7)(8)(9)(#) \10+/
var str = "123456789# ######"
console.log(str.match(reg)) //['123456789# ######','1','2','3','4','5','6','7','8','9','#',index: 0,input: '123456789# ######',groups: undefined]
console.log(reg.test(str)) //true
// 如果要匹配\1和0时，可以使用(?:\1)0或者\1(?:0).?:是非捕获匹配
// 匹配冒号后的内容但是不获取结果
// 非捕获型匹配
var reg = /(1)(2)(3)(4)(5)(6)(7)(8)(9)(#) (?:\10)+/
var str = "123456789# ######"
console.log(str.match(reg)) //['123456789# ######','1','2','3','4','5','6','7','8','9','#',index: 0,input: '123456789# ######',groups: undefined]
console.log(reg.test(str)) //true

// 引用不存在的分组，正则不会报错，只是匹配反向引用的字符本身
var reg = /\1/
var str = "\1\2\3\4\5\6\789"
console.log(reg.test(str)) //true
console.log(str.split("")) //['\x01', '\x02', '\x03', '\x04', '\x05', '\x06', '\x07', '8', '9']
// NOTE:浏览器会进行转化，不同的浏览器转化效果不同

//分组加上量词,捕获到的是数据是最后一次匹配的数据
var reg = /(\d)+/
var str = "12345"
console.log(str.match(reg)) //[ '12345', '5', index: 0, input: '12345', groups: undefined ]
// (\d)捕获到的是"5"

// 反向引用，加上量词也是如此
var reg = /(\d)+ \1/
var str = "12345 1"
var str2 = "12345 5"
console.log(str.match(reg)) //null
console.log(reg.test(str)) //false
console.log(str2.match(reg)) //[ '12345 5', '5', index: 0, input: '12345 5', groups: undefined ]
console.log(reg.test(str2)) //true

// 非捕获括号
// 含义:非捕获括号只做分组的功能，不会引用它，即不在API里引用，也不在正则里反向引用

var reg = /(?:ab)+/g
var str = "ababa abbb ababab"
console.log(str.match(reg)) //[ 'abab', 'ab', 'ababab' ]
console.log("1", RegExp.$1) //''

var reg = /^I love (?:JavaScript|Regular Expression)$/
console.log(reg.test("I love JavaScript")) //true
console.log(reg.test("I love Regular Expression")) //true

// 案例
// 模拟trim方法
function trim(str) {
  return str.replace(/^\s+|\s+$/g, "")
}
console.log(trim(" foobar "), trim(" foobar ").length) //foobar,6

// 第二种，匹配整个字符串，用引用来提取相应的数据

function trim(str) {
  // *?,惰性匹配,没有?会把除了最后一个空格之前所有的空格都匹配的
  return str.replace(/^\s*(.*?)\s*$/g, "$1")
}
console.log(trim(" foobar "), trim(" foobar ").length) //foobar,6

// 手字母转化为大写
function titleize(str) {
  return str.toLowerCase().replace(/(^|\s)\w/g, function (match) {
    return match.toUpperCase()
  })
}
// 也可以用非捕获型匹配(?:^|s)
console.log(titleize("my name is sam")) //My Name Is Sam

// 驼峰化
function camlize(str) {
  return str.replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : ""
  })
}
console.log(camlize("-moz-transform")) //MozTransform
console.log(camlize("_moz_transform")) //MozTransform
console.log(camlize("moz transform")) //mozTransform
console.log(camlize("--moz-transform ")) //MozTransform,?是为了应对不是str尾部不是单词字符的情况

//中划线化
function dasherize(str) {
  // 第一个replace，返回-Moz-Trans_form,第二个,返回-Moz-Trans-form,toLowerCase将字母字符转为小写
  return str
    .replace(/([A-Z])/g, "-$1")
    .replace(/[-_\s]+/g, "-")
    .toLowerCase()
}
console.log(dasherize("MozTrans_form")) //-moz-trans-form
console.log(dasherize("escapeHTHML")) //escape-h-t-h-m-l

// html转义
function escapeHTML(str) {
  var escapeChars = {
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "&": "amp",
    "'": "#39",
  }
  return str.replace(
    new RegExp("[" + Object.keys(escapeChars).join("") + "]", "g"),
    function (match) {
      return "&" + escapeChars[match] + ";"
    }
  )
}
console.log(escapeHTML("<span class='name'>I am sam</span>")) //&lt;span class=&#39;name&#39;&gt;I am sam&lt;/span&gt;
//字符串转义为相等的html
function unescapeHTML(str) {
  var htmlEntities = {
    nbsp: " ",
    lt: "<",
    gt: ">",
    quot: '"',
    amp: "&",
    "#39": "'",
  }
  return str.replace(/\&([^;]+);/g, function (match, key) {
    if (key in htmlEntities) {
      return htmlEntities[key]
    }
    return match
  })
}
console.log(
  unescapeHTML("&lt;span class=&#39;name&#39;&gt;I am sam&lt;/span&gt;")
) //<span class='name'>I am sam</span>
var str = "&lt;span class=&#39;name&#39;&gt;I am sam&lt;/span&gt;"
//在[],^代表取反
let reg = /\&([^;]+);/g
console.log("str: ", str.match(reg)) //[ '&lt;', '&#39;', '&#39;', '&gt;', '&lt;', '&gt;' ]
// 匹配一个开标签
var reg = /<[^>]+>/
// 匹配一个闭标签
var reg = /<\/[^>]+>/

// 匹配成对的标签，使用了反向引用和分组
var reg = /<([^>]+)>[\d\D]*<\/\1>/
var string1 = "<title>regular expression</title>"
var string2 = "<p>laoyao bye bye</p>"
var string3 = "<title>wrong!</p>"
console.log(reg.test(string1)) // true
console.log(reg.test(string2)) // true
console.log(reg.test(string3)) // false

// NOTE:括号可以提供分组，让我们提取数据
