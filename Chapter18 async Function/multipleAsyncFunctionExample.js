//call apiA
const getFoo = async () => {
    return await fetchDataFromAPI(apiA)
}
//call apiB
const getBar = async () => {
    return await fetchDataFromAPI(apiB)
}

//如果需要并发，不要写成
const foo = await getFoo()
const bar = await getBar()

//第一种并行异步调用写法
let [foo, bar] = await Promise.all([getFoo(), getBar()])
//something else need todo...

//第二种写法
let fooPromise = getFoo()
let barPromise = getBar()
let foo = await fooPromise
let bar = await barPromise
//something else need todo...


//在循环中调用异步方法

//不要写成
array.forEach(async () => {
    const res = await getFoo()
    //something need todo...
})

//第一种写法，用Promise.all
let promises = array.map(() => getFoo)
let results = await Promise.all(promises)
//something else need todo...

//第二种写法，用for...of循环
let promises = array.map(() => getFoo)
let results = []
for (let promise of promises) {
    results.push(await promise)
}
//something else need todo


//继发访问多个url
async function logInOrder(urls) {
    for (const url of urls) {
        const response = await fetch(url)
        console.log(await response.text())
    }
}

//并发
async function logInOrder(urls) {
    const textPromises = urls.map(async url => {
        const response = await fetch(url)
        return response.text()
    })


    for (const textPromise of textPromises) {
        console.log(await textPromise)
    }
}
