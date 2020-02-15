//fn就是需要传入回调的函数
const Thunk = function (fn) {
    //args是fn的参数
    return function (...args) {
        return function (callback) {
            //绑定到this执行fn, 传入args，并且在执行完之后调用callback
            return fn.call(this, ...args, callback)
        }
    }
}

//生成fs.readFile的Thunk函数
const readFileThunk = Thunk(fs.readFile)
readFileThunk(fileA)(callback)

//另一个完整的例子
function f(a, cb) {
    cb(a)
}

const ft = Thunk(f)

ft(1)(consol.log) //1


//基于Thunk哈数的Generator执行器

//run函数就是一个Generator函数的自动执行器
function run(fn) {
    var gen = fn()

    //next函数就是Thunk的回调函数
    function next(err, data) {
        var result = gen.next(data)
        if(result.done) return
        //如果没有结束，就将next函数再传入Thunk函数
        result.value(next)//此时的value就是run的递归
    }

    next()
}
//每一个异步操作都要是Thunk函数
//也就是在yield后面的必须是Thunk函数
function* g() {
    //...
}

run(g)