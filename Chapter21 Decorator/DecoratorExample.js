// @decorator
// class A{}
// //等同
// class A{}
// A = decorator(A) || A

function testable(isTestable) {
    return function (target) {
        target.isTestable = isTestable //实际上是给被装饰的类添加了一个isTestable的静态属性
        target.prototype.isTestable = !isTestable //给被装饰的类 添加实例属性
    }
}

@testable(true)
class MyTestableClass{}

MyTestableClass.isTestable // true
let obj = new MyTestableClass()
obj.isTestable // false


//修饰器修饰类的属性
class Math{
    @log //修饰add方法
    add(a,b){
        return a+b
    }
}

//修饰属性的装饰器有3个参数，第一个参数是被修饰的属性对象，第二个是被修饰的属性名，第三个是该属性的描述对象
function log(target, name, descriptor) {
    const oldValue = descriptor.value
    descriptor.value = function () {
        console.log(`Calling "${name}" with`, arguments) //调用属性时输出log
        return oldValue.apply(null, arguments)
    }
    return descriptor
}

const math = new Math()
math.add(2,4) //此时会输出log
