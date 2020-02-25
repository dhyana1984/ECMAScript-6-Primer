class A {

}

class B extends A {

}

//子类的__proto__属性表示构造函数的继承，总是指向父类
B.__proto__ === A //true
//子类prototype属性的__proto__属性表示方法的继承，总是指向父类的prototype属性
B.prototype.__proto__ === A.prototype.__proto__ //true



//作为一个对象，子类B的原型__proto__属性是父类A
//作为一个构造函数，子类B的原型prototype属性是父类A的实例

Object.create(A.prototype)
//等同于
B.prototype.__proto__ = A.prototype