// {}量词表示出现的数量，横向模糊匹配，g是一个正则的修饰话，表示全局匹配
var reg = /ab{2,5}c/g
var str = "abc abbc abbbc abbbbc abbbbbc abbbbbbc"
console.log(str.match(reg))

// 纵向模糊匹配 []字符组可能出现的字符，只匹配其中的一个字符，
var reg = /a[123]b/g
var str = "a1b a2b a3b"
console.log(str.match(reg))

// 量词简写
// {m,} //表示至少出现m次
// {m} //表示出现m次
// ?,等价于{0,1} 表示出现或者不出现
// +等价于{1,},表示至少出现一次
// *等价于{0,}表示出现任意次，也有可能为0
// 字符组可以使用范围表示法,用连字符连接
var reg = /a[1-6]/g

var str = "a1b a2b a3b a4b a5b a6b"

console.log(str.match(reg))
// 匹配-连字符可以使用转义符，或者放在开头和结尾
var reg = /[-az]/
var reg = /[az-]/
var reg = /[a\-z]/

// 排除字符组,^表示匹配除了字符组内的任何一个字符

var reg = /a[^1-6]b/g
var str = "a1b a2b a3b a4b a5b a6b a7b"
console.log(str.match(reg))

// 字符组简写
// \d 表示为[0-9]，代表一位数字
// \D 表示[^0-9],代表除数字外的任意字符
// \w 表示[0-9a-zA-Z_],表示数字，大小写字母和下划线，代表单词字符
// \W 表示[^0-9a-zA-Z_],表示非单词字符

// 贪婪匹配、惰性匹配

// 贪婪匹配尽可能多得匹配
var reg = /\d{2,5}/g
var str = "123 1234 12345 123456"
console.log(str.match(reg))

// 惰性匹配，满足最低条件即可
var reg = /\d{2,5}?/g
var str = "123 1234 12345 123456"
console.log(str.match(reg))

// 惰性匹配 = 量词后面加个?

// 多选分支:支持多个子模式任选其一
// 形式 (p1|p2|p3),p1,p2,p3是子模式，用|（管道符）分割

var reg = /good|nice/g
var str = "good idea, nice try"
console.log(str.match(reg)) //['good','nice']

// 分支是惰性的，当前匹配上，后面就不再尝试
var reg = /good|goodbye/g

var str = "goodbye"
console.log(str.match(reg)) //['good']
var reg = /goodbye|good/g
console.log(str.match(reg)) //['goodbye']

// 案例练习

var reg = /#([0-9a-zA-Z]{6}|[0-9a-zA-Z]{3})/g
var str = "#ccc #Ffff,#0Fcccc"
console.log(str.match(reg))

var reg = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/

console.log(reg.test("23:59"))
console.log(reg.test("02:07"))

var reg = /^(0?[0-9]|1[0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])$/
console.log(reg.test("23:59"))
console.log(reg.test("02:07"))
console.log(reg.test("7:9"))

console.log(reg.test("9:9"))

var reg = /^[0-9]{4}-([0][1-9]|[1][0-2])-([0][1-9]|[12][0-9]|3[01])$/g
console.log(reg.test("2017-06-12"))

var reg = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/
console.log(reg.test("F:\\study\\javascript\\regex\\regular expression.pdf"))
console.log(reg.test("F:\\study\\javascript\\regex\\"))
console.log(reg.test("F:\\study\\javascript"))
console.log(reg.test("F:\\"))

var reg = /id=".*?"/
var str = '<div id="container" class="main"></div>'
console.log(str.match(reg)[0])

var reg = /id="[^"]*"/
var str = '<div id="container" class="main"></div>'
console.log(str.match(reg))
