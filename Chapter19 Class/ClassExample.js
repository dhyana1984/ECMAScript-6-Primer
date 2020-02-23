//类的所有方法都定义在类的prototype属性上
class Point {
    constructor() {
        //...
    }

    toString() {
        //...
    }

    toValue() {
        //...
    }
}

    //等同于

    Point.prototype ={
    constructor() {
},
    toString() {
},
    toValue() {
}
}

//在类的实例上调用方法，其实就是调用原型上的方法
class B { }
let b = new B()
b.constructor === B.prototype.constructor //true

//实例的属性除非显式定义在其本身（即this对象），否则都是定义在原型即（class）上
class A {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    toString() {
        return `${this.x},${this.y}`
    }
}

var a = new A(1, 2)
a.toString() //1,2
//x,y是定义在实例对象a的属性，所以hasOwnProperty返回true
a.hasOwnProperty('x') // true 
a.hasOwnProperty('y') // true
//toString是定义在原型对象，所以hasOwnProperty('toString') 返回false
a.hasOwnProperty('toString') // false
//toString定义在a的Class上，所以返回true
a.__proto__.hasOwnProperty('toString') // true 

//这个类的名字是MyClass而不是Me，Me只是在Class的内部代码可用，只当前类
const MyClass = class Me { //Me指当前类， 只在Class内部有定义
    getClassName() {
        return Me.name
    }
}

//静态方法不会被类的实例继承，通过类直接调用
class Foo {
    static go() {
        console.log('go')
    }
}

const p = new Foo()
p.go() //Error
Foo.go() //go

//但是静态方法可以被子类继承
class subFoo extends Foo {

}
subFoo.go() //go

//静态方法也可以从super对象调用
class subFoo1 extends Foo {
    //静态方法也可以从super对象上调用
    static go() {
        super.go()
        console.log('123')
    }
}

subFoo1.go() 
//go
//123


//静态属性和实例实行
class Sample{
    myProp = 123 //实例属性
    static myStaticProp = 456 //静态属性
    constructor(){
        console.log(this.myProp)
    }
}

const obj = new Sample() // 123
Sample.myStaticProp //456


//不能直接使用，必须继承父类使用
class Shape{
    constructor(){
        // new.target返回Class本身
        if(new.target === Shape){
            throw new Error('This Class cannot be used as instance!')
        }
    }
}

class Rectangle extends Shape{
    constructor(){
        //子类的new.target返回子类，这里返回Rectangle而不是Shape
        //...
    }
}

const shape = new Shape() // Error
const rectAngle = new Rectangle() // Correct

//ew.target使用new所作用的构造函数返回Class本身，否则返回undefined
const b = Shape.call(shape) //这时new.target返回undefined