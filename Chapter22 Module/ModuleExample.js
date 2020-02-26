
function v1() {
    //...
}

function v2() {
    //...   
}

export {
    //可以用as关键字重命名v1和v2的对外接口
    v1 as functionV1,
    v2 as functionV2,
    v2 as anotherV2, //v2可以通过重命名输出两次
}

const m =1

//export m //报错, 因为相当于直接输出1，没有提供对外接口
//这两种正确写法实质是在接口名与模块内部变量之间建立了一一对应关系
//export { m }  //正确
//export const m =1  //正确

function add(x,y) {
    return x+y
}

export {add as default} 
//等同于
export default add

import {default as xxx} from 'xxx'
//等同于
import xxx from 'xxx'

//export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句
export var a =1

//正确
var a =1
export default a

//错误
// export default var a=1 //错误

//因为export default 本质是将该命令后面的值赋给default变量以后再默认，所以直接将一个值写在export default之后

//正确
export default 3 //对外接口为default

//错误
//export 3 //没有对外接口


//在一条import中同时输入默认方法和其他接口
import defaultFunction, {A, B, C } from 'xxxx'

//对应上面代码的export:
export default function (params) {
    //...
}

 function A(params) {
    //..
}

 function B(params) {
    //..
}

 function C(params) {
    //..
}

export {A,B,C}

//export 和 import的复合写法 
export { foo, bar } from 'my_module'

//等同于
import {foo, bar} from 'my_module'
export {foo,bar}








