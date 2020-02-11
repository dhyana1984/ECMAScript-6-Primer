//done(), 用于Promise的最后捕捉其中的错误
Promise.prototype.done = function (onFullfilled, onRejected) {
    this.then(onFullfilled, onRejected)
        .catch(function (reason) {
            //抛出一个全局错误
            setTimeout(() => { throw reason }, 0)
        })
}

//finally用于指定不管Promise对象最后状态如何都会执行的操作
//与done不同，接受普通回调函数，该函数无论如何都会执行
Promise.prototype.finally = function (callback) {
    let p = this.constructor
    return this.then(
        value => p.resolve(callback()).then(() => value),
        reason => p.resolve(callback().then(() => { throw reason }))
    )
}