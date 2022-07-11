// 位置的类型
var reg = /^$\b\B(?=a)(?!b)/g

// ^脱字符，匹配开头，多行匹配匹配行开头
// $美元符号，匹配结尾，多行匹配匹配行结尾
var result = "hello".replace(/^|$/g, "#")
console.log(result) //#hello#

// 多行匹配时，即有修饰符m时，^,$是行的概念
var result = "I\nlove\njavascript".replace(/^|$/gm, "#")
console.log(result) //#I#,#love#,#javascript#

// \b:单词边界，就是\w和\W之间的位置。也包括\w和^之间的距离和\w和$之间的距离、\B非单词边界,在所有位置中，去掉\b，剩下的是\B。
// 具体就是\w和\w、\W和\W\、^和\W、\W和$之间的位置
var result = "[JS] Lesson_01.mp4".replace(/\b/g, "#")
console.log(result) //[#JS#] #Lesson_01#.#mp4#
var result = "[JS] Lesson_01.mp4".replace(/\B/g, "#")
console.log(result) //#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4

// NOTE:这下面四个不太懂
// (?=p)，p是其中的一个子模式，即p前面的位置，该位置后面的字符要匹配p
// 可以理解为该位置后面跟着p模式(p可以为任意值)
//英文名叫 positive lookahead,中文叫正向先行断言

var result = "hello".replace(/(?=l)/g, "#")
console.log(result) //he#l#lo

// (?!p)是(?=p)的反义,即p后面的位置，英文名叫 negative lookahead，中文叫负向先行断言
//  可以理解为该位置后面不跟着p模式(p可以为任意值)
var result = "hello".replace(/(?!l)/g, "#")
console.log(result) //#h#ell#o#

// (?<=p),positive lookbehind
var result = "hello".replace(/(?<=l)/g, "#")
console.log(result) //hel#l#o

// (?<!p), negative lookbehind
var result = "hello".replace(/(?<!l)/g, "#")
console.log(result) //#h#e#llo#

// 位置的特性，可以将位置理解成空字符""
var str = "hello"
var str2 = "" + "h" + "" + "e" + "" + "l" + "" + "l" + "" + "o" + ""
var str3 = "" + "" + "hello"
console.log(str2) //"hello"
console.log(str3) //hello

var result = /^^hello$$/.test("hello")
console.log(result) //true

var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello")
console.log(result) //true
console.log(/.^/.test("."))

// 数字千分位分隔符表示法
// var result ="12345678".replace(/\B/g,',')
var result = "12345678".replace(/(?=(\d{3})+$)/g, ",")
console.log("result: ", result) //12,345,678
// 以三位数为一步，需要9位数开头，就会多一个，
var result = "123456789".replace(/(?=(\d{3})+$)/g, ",")
console.log("result: ", result) //,123,456,789

// 改进
var result = "123456789".replace(/(?!^)(?=(\d{3})+$)/g, ",")
console.log("result: ", result) //123,456,789

// 支持其他形式 "12345678 123456789"=>12,345,678 123,456,789

var result = "12345678 123456789".replace(/(?!\b)(?=(\d{3})+\b)/g, ",")
console.log("result: ", result) //12,345,678 123,456,789

// 进一步 ?!\b其实就是\B
var result = "12345678 123456789".replace(/\B(?=(\d{3})+\b)/g, ",")
console.log("result: ", result) //12,345,678 123,456,789

// 应用货币格式化

function format(num) {
  return num
    .toFixed(2)
    .replace(/\B(?=(\d{3})+\b)/g, ",")
    .replace(/^/, "$$ ")
}
console.log(format(1888)) //$ 1,888.00

//密碼6-12位，包括数字，小写字母,至少包括两种字符
var reg = /^(?=[0-9])[0-9a-zA-Z]{6,12}$/g

//至少要有一个数字
var reg = /(?=.*[0-9])^[0-9a-zA-Z]{6,12}$/

console.log("reg.test(kkkkkkk): ", reg.test("kkkkkkk")) //false;
console.log("reg.test(kkkkkkk): ", reg.test("kkkkkkk1")) //true;
// 同时包含数字和小写字母
var reg = /(?=.*[0-9])(?=.*[a-z])^[0-9a-zA-Z]{6,12}$/
console.log(reg.test("kkkkkkk")) //false
console.log(reg.test("kkk2kkkk")) //true

// 最终版
var reg =
  /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[A-Z])(?=.*[a-z]))^[0-9a-zA-Z]{6,12}$/
console.log(reg.test("1234567")) // false 全是数字
console.log(reg.test("abcdef")) // false 全是小写字母
console.log(reg.test("ABCDEFGH")) // false 全是大写字母
console.log(reg.test("ab23C")) // false 不足6位
console.log(reg.test("ABCDEF234")) // true 大写字母和数字
console.log(reg.test("abcdEF234")) // true 三者都有

// 另外一种解法
// 要求不能全部是数字
var reg = /(?!^[0-9]{6,12}$)^[0-9A-Za-z]{6,12}$/

console.log(reg.test("123456"))
false
console.log(reg.test("123456k"))
true

// 另外一种解放-最终版
var reg =
  /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/
console.log(reg.test("1234567")) // false 全是数字
console.log(reg.test("abcdef")) // false 全是小写字母
console.log(reg.test("ABCDEFGH")) // false 全是大写字母
console.log(reg.test("ab23C")) // false 不足6位
console.log(reg.test("ABCDEF234")) // true 大写字母和数字
console.log(reg.test("abcdEF234")) // true 三者都有
