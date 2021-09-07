function asyncGetData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("你好")
        }, 2000)
    })
}

function * task() {
    console.log("开始获取数据....")
    const data = yield asyncGetData()
    console.log('获取到数据：', data)
    const data2 = yield asyncGetData()
    console.log('获取到数据：', data2)
    const data3 = yield 1;
    console.log("又获取到数据：", data3)
}

// promise 写法
// asyncGetData().then((resp) => {
//     console.log(resp)
// })

// generator写法
// var generator = task()
// var result = generator.next()
// result.value.then(data => generator.next(data))

/**
 * 通用的---运行一个生成器函数
 */

function run(generatorFunction) {
    const generator = generatorFunction(); // 得到一个生成器
    next()
    // 这里会卡死，while不会等待value.then()执行完再往下执行，而是value.then()里面有setTimeout，还没等执行完就继续循环while(!result.done),无线循环，卡死
    // while(!result.done) {
    //     // 有迭代结果
    //     const value = result.value
    //     if(typeof value.then === 'function'){
    //         // 迭代的数据是一个promise
    //         value.then(data => result = generator.next(result.value))
    //     }else{
    //         result = generator.next(result.value)
    //     }
    // }

    // 用函数是正确的写法
    /**
     * 通用函数：运行一个生成器任务
     */
    function next(nextValue) {
        const result = generator.next(nextValue)
        if(result.done) {
            return;
        }
        const value = result.value;
        if(typeof value.then === 'function'){
            // 迭代的数据是一个promise
            value.then(data => next(data))
        }else {
            next(result.value)
        }
    }
}
run(task)
