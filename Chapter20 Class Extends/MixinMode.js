//Mixin模式指的是将多个类的接口混入（Mixin）另一个类，

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== "constructor"
            && key !== "prototype"
            && key !== "name") {
            let desc = Object.getOwnPropertyDescriptor(source, key)
            Object.defineProperty(target, key, desc)
        }
    }
}

//mix函数将多个对象合成一个类，使用时候只要继承这个类即可
function mix(...mixins) {
    class Mix {

    }
    for (const mixin of mixins) {
        copyProperties(Mix, mixin)
        copyProperties(Mix.prototype, mixin.prototype)
    }
    return Mix
}

