class Point {
    constructor(){

    }
}

class ColorPoint extends Point{
    constructor(){
        //子类的constructor中必须调用super方法，否则报错，因为子类没有自己的this对象，需要通过继承父类的this对象再加工
        //如果不调用super方法就得不到this对象
    }
}

let cp = new ColorPoint() //报错，因为在constructor中没有调用super方法

//Object.getPrototypeOf可以从子类上获取父类，可以使用这个方法判断一个类是否继承了另一个类
Object.getPrototypeOf(ColorPoint) === Point //true

//super作为对象时，在普通方法中指向父类原型对象，在静态方法中指向父类
class A{
    constructor(){
        this.p =2 //p是父类A的实例属性
        this.foo =1 
    }
}
A.prototype.x =1 //在A的原型上定义x属性

class B extends A{
    constructor(){
        super()
        this.x = 2
        //通过super调用父类方法时，super会绑定子类的this
        super.x =3 //子类中给super的属性赋值，相当于在给this的属性赋值，所这里等于this.x=3
        console.log(super.x) //子类中读取super的属性时，相当于在读取父类原型上的属性，这里等于A.prototype.x 所以结果是undefined
    }

    get m (){
        return super.p //这里super指向A的原型，而p是类A的实例属性，所以是找不p属性的
    }

    get n(){
        return super.x //这里super就能找到x属性
    }
}

let b = new B() //因为类B中,m方法里面super.p找不到，所以返回undefined
b.m //undefined
b.n //1

class Parent{
    static myMethod(msg){
        console.log('static', msg)
    }
    myMethod(msg){
        console.log('instance', msg)
    }
}

class Child extends Parent{
    static myMethod(msg){
        super.myMethod(msg) //在static函数中的super指向父类本身
    }
    muMethod(msg){
        super.myMethod(msg) //最普通函数中的super指向父类的原型对象
    }
}

Child.myMethod(1) // static 1，调用的是Parent的静态myMethod

const child = new Child()
child.myMethod(2) // instance 2，调用的是Parent普通myMethod


