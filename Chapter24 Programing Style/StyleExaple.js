/*优先使用const*/

//1. const可以提醒阅读程序的人，变量不会改变
//2. 比较符合函数式编程思想, 运算不改变值，只是新建值
//3. JS编译器会对const进行优化

//静态字符串使用单引号或者反引号，动态字符串用双引号

/*解构值*/

//1.使用数组成员对变量赋值时，优先使用解构赋值
const arr = [1, 2, 3, 4]

// bad
const first = arr[0]
const second = arr[1]

//good
const [first, second, ...rest] = arr

//2. 函数的参数如果是对象成员，优先使用解构赋值

// bad
function getFullName(user) {
    const firstName = user.firstName
    const lastName = user.lastName
}

// good
function getFullName(obj) {
    const { firstName, lastName } = obj
}

//best
function getFullName({ firstName, lastName }) {
    //...
}

//3. 如果函数返回多个值，优先使用对象俄解构赋值，而不是数组的解构赋值，这样便于以后添加返回值，以及更改返回值的顺序

// bad
function processInput(input) {
    return [left, right, top, bottom]
}

//good
function processInput(input) {
    return { left, right, top, botton }
}

//使用
var input = {}
const { left, right } = processInput(input)

/*对象 */

//单行定义对象不带逗号，多行定义对象带逗号

// good
const a = { a: 1, b: 2 }
const b = {
    a: 1,
    b: 2,
}

//对象尽量静态化，一旦定义，就不得随意添加新的属性，如果添加属性不可避免，就要使用object.assign

//bad
const a = {}
a.x = 3

//use assign
const a = {}
Object.assign(a, { x: 3 })

// good
const a = { x: null }
a.x = 3

//如果对象的属性名是动态俄，可以在创造对象的时候使用属性表达式

//bad
const obj = {
    id: 5,
    name: 'aaa'
}
obj[getFullName(input)] = true

//good , 所有属性在同一个地方定义了
const obj = {
    id: 5,
    name: 'aaa',
    [getFullName(input)]: true
}

/*数组 */

// 复制数组
const arrayA = [1, 2, 3]

const arrayCopy = [...arrayA]









