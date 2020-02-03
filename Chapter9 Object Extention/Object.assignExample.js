//为对象添加属性
class Point {
    constructor(x, y) {
        //将x, y 添加到Point类的对象实例中
        Object.assign(this, { x, y })
    }
}

//为对象添加方法，为Point添加getData和setData方法
Object.assign(Point.prototype, {
    getData(a, b) {
        return [a, b]
    },
    setData(a) {
        return a
    }
})

//合并多个对象
const merge = (target, ...sources) => Object.assign(target, ...sources)
//如果希望合并后返回一个新对象
const mergeNew = (...source) => Object.assign({}, ...source)


//为属性指定默认值

const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
}

const processContent = (options) => {
    //用DEFAULTS和options合成一个新对象，options会覆盖DEFAULT内相同属性名的内容
    //但是所有属性必须是简单类型，不能指向另一个对象，否则直接全部被options覆盖
    options = Object.assign({}, DEFAULTS, options)
    console.log(options)
}