//通过装饰器实现mixin
export function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list)
    }
}


//应用
const Foo = {
    foo() { console.log('foo')}
}
//通过mixins装饰器混入Foo的foo方法到MyClass
@mixins(Foo)
class MyClass{}

let obj = new MyClass()
obj.foo() // foo

//还有一种办法是在SubClass和ParentClass之间插入一个混入类，这个类具有foo方法且继承了ParentClass的所有方法，然后SubClass再继承这个类

class Parent{
    foo(){
        console.log('foo from Parent')
    }
}

//这是一个混入类生成器，接受superclass作为参数，返回一个继承superclass的子类，该子类包含foo方法
//如果要混入多个方法，就生成多个混入类
let MyMixin = (superclass) => class extends superclass{
    foo(){
        console.log('foo from MyMixin')
        //这种写法的好处是可以调用super，避免在混入过程中覆盖父类的同名方法
        if(super.foo){
            super.foo()
        }
    }
}
let MyMixin1 = (superclass) => class extends superclass{
    foo(){
        console.log('foo from MyMixin1')
        if(super.foo){
            super.foo()
        }
    }
}
let MyMixin2 = (superclass) => class extends superclass{
    foo(){
        console.log('foo from MyMixin2')
        if(super.foo){
            super.foo()
        }
    }
}

//再用目标类去继承这个混入类，即可达到混入foo方法的目的
class SubClass extends MyMixin1(MyMixin2(Parent)){
    foo(){
        console.log('foo from Subclass')
    }
}

const sub = new SubClass()
//上面代码中，每次混入发生时都调用了父类的super.foo，但是没有被覆盖
sub.foo()
//foo from Subclass
//foo from MyMixin1
//foo from MyMixin2
//foo from MyMixin Parent
