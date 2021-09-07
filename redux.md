react         ui解决方案
react-router  解决路由问题
redux         数据的解决方案
antd-design   UI库

# redux 核心概念

action reducer store

## mvc

他是一个ui的解决方案，用于降低UI,以及ui关联的数据的复杂度

## 传统的服务端的mvc**

环境：

1.服务器需要相应一个完成的html
2.该html中包含页面需要的数据
3.浏览器仅承担渲染页面的作用

https://www.sina.com.cn/

以上的这种方式叫做**服务端渲染**，即服务端将完整的页面组装好之后，一起发送给客户端

服务器端需要处理ui中要用到的数据，并且要将数据嵌入到页面中，最终生成一个完整的html页面相应

为了降低处理这个过程的复杂度，出现了mvc模式

**controller** 处理请求，组装这次请求需要的数据 （只处理比如/api/login 这个链接的匹配和逻辑）
**model** 需要用于ui渲染的数据模型   （比如经过一些列的逻辑后，产生的对象 {code:'success', msg:'登录成功'} ）
**view** 视图，用于将模型组装到界面中  (生成整个需要的html)

控制器（controller）是为了降低复杂度，但是前端的这些点击事件没有降低复杂度

**前端mvc模式的困难**

react 从没说过提供了一个mvc的视图，mv是有的
vue 可以说是mvvm，因为有数据双向绑定

react解决了  数据（props） =》 视图（return后面的元素）  的问题
​               
function MyCom(props) {
​    return (
​        <div>
​            {props.title}
​        </div>
​    )
}

问题（controller和数据非常复杂，引出redux，降低数据复杂度）

1.前端的controller要比服务器复杂很多，因为前端中的controller处理的是用户的操作，而用户的操作场景是复杂的

2.对于那些组件化的矿建（比如vue react）,他们使用的是单向数据流，vue的数据双向绑定也是语法糖来的。如若需要共享数据，则必须将数据提升到顶层组件，然后数据再一层一层传递，极其繁琐。
​    1. 虽然可以提供上下文来提供共享数据，但对数据的操作难以监控，容易到值调试错误的困难，以及数据还原的困难。并且，若开发一个大中型项目，共享的数据很多，回导致上下文的数据变得非常复杂。


## 前端需要一个独立的数据解决方案

**flux**

facebook提出的数据解决方案，他的最大的历史意义，在于他引入了action的概念
action是一个普通的对象，用于描述他是干什么的（相当于服务器中的url和请求方式，告诉controller要干什么）  **action** 是触发数据变化的唯一原因
store表示数据仓库，用于存储共享数据，还可以根据不同的action更改仓库中的数据

```
示例
....js
var loginAction = {
​    type:'login',
​    payload:{
​        logined:'admin',
​        loginPwd: '123456',
        meta: {               // 元数据
            isAdmin:true
        }
​    }
}

var deleteAction = {
​    type：'delete'
​    payload: 1,  //用户1
}
```

## redux

必须是个纯函数，不能往里面加入什么异步的东西，所以才需要第三方库

在flux的基础上，引入了reducer的概念

reducer： 处理器，用于根据action来处理数据，处理后的数据会被仓库重新保存

（图片看手机）

涉及到store的数据变化的，都在reducer这里完成，相当于mvc中的c（controller）
reducer实际就是一个函数

### Action(就是得到一个普通对象)

1. action是一个plain-object（平面对象）
    1. 他的__proto__指向Object.prototype
2. action中必须有type属性，type属性用于描述操作的类型，type可以是任何类型，不一定要是字符串
3. action中paload表示附加数据，没有强制要求
4. 在大型项目中，由于操作类型非常多，为了避免硬编码（hard code），会将action的类型存放在一个或一些单独的文件中
5. 为了方便传递action，通常会使用action创建函数(action creator)来创建action
    1. action创建函数应为无副作用的**纯函数**
        1. 不能以任何形式改动参数
        2. 不可以有异步
        3. 不可以对外部环境中的数据造成影响
6. 为了方便利用actioni创建函数来分发action，redux提供了一个函数```bindActionCreators```
    该函数用于增强action创建函数的功能,使他不仅可以创建action,并且创建后自动完成分发


### Reducer

Reducer 是用于改变数据的函数

1. 一个数据仓库,有且仅有一个reducer,并且通常情况下,一个工程只有一个数据仓库,
    因此一个系统,只有一个reducer
2. 为了方便管理,同城会将reducer放到单独的文件中
3. reducer被调用的时机
    1. 通过store.dispatch, 分发了一个action,此时,会调用reducer
    2. 当创建一个store的时候,会调用一次reducer
        1. 可以李用者一点,用reducer初始化状态
        2. 创建仓库是,不传递任何状态
        3. 将reducer的参数state设置一个默认值
4. reducer内部通常使用switch来判断type值
5. **reducer必须是一个没有副作用的纯函数**
    1. 为什么需要纯函数
        1. 纯函数有利于测试和调试
        2. 有利于还原数据
        3. 有利于将来和react结合时的优化
    2. 具体要求
        1. 不能改变参数,因此若要让状态变化,必须得到一个新的状态 比如: return {...state, age:3} 或者 Object.assign({}, state, {age:3})
        2. 不能有异步
        3. 不能对外部环境造成影响
6. 由于在大中型项目中,操作比较复杂,数据结构也比较复杂,因为需要对reducer进行细分
    1. redux提供了一个方法,可以帮助我们更加方便的合并reducer
    2. combineReducers: 合并reducer,得到一个新的reducer,该新的reducer管理一个对象,该对象中的每一个属性交给对应的reducer管理


### store

store: 用于保存数据
通过createStore方法创建一个对象

该对象的成员

-dispatch: 分发一个action
-getState: 得到仓库中当前的状态
-replaceReducer: 替换当前的reducer
subscribe: 注册一个监听器,监听器是一个无参函数,当分发一个action之后,会运行注册的监听器. 该函数会返回一个函数,用于取消监听
Symbol("observable"): rxjs

### createStore 源码

### bindActionCreators 源码

### combineReducers 源码

组装reducers，返回一个reducer，数据使用一个对象表示，对象的属性名与传递的参数对象保持一致

## redux 中间件

中间件：类似于插件，可以在不影响原本功能，并且不改动原本代码的基础上，对其功能进行增强
​        在redux中，中间件主要用于增强dispatch函数

实现redux中间件的基本原理，是更改仓库中的dispatch函数

redux中间件书写：
 - 中间件本身是一个函数，该函数接受一个store参数，表示创建的仓库，该仓库并非一个完整的仓库对象，
仅包含getState， dispatch。该函数运行的时间，实在仓库创建之后运行
  - 由于创建仓库后，需要自动运行设置的中间件函数，因此，需要在创建仓库时，告诉仓库有哪些中间件
  - 需要调用applyMiddlewre函数，将函数的返回结果作为createStore作为第二或者第三个参数
  - 中间件函数必须返回一个dispatch创建函数
    - 返回的函数需要有一个参数dispatch

- applyMiddleware函数，用于记录有哪些中间件，他会返回一个函数
 - 该函数用于记录创建仓库的方法，然后又返回一个函数

### 手写applyMiddleware

middleware的本质，是一个调用后可以得到dispatch创建函数的函数

compose: 函数式编程，函数组合，将一个数组中的函数进行组合，形成一个新的函数，该函数调用时，实际上是反向调用之前组合的函数(具体看static的compose流程图)

### 第三方库

#### redux-logger


#### redux-thunk

```
// thunk 中间件可以让action返回函数，而不单单是一个平面对象
export function fetchUsers() {
    // 由于thunk的存在，允许action是一个带有副作用的函数
    return async function (dispatch, getState, extra) {
        dispatch(createSetLoadingAction(true))   // 正在加载
        const users = await getAllStudents()
        const action = createSetUserAction(users.data)
        dispatch(action)
        dispatch(createSetLoadingAction(false))
    }
}
```

thunk 允许action 是一个带有副作用的函数，当action是一个函数被分发时，thunk会阻止action继续向后提交
thunk 会向函数传递三个参数
​    - dispatch 来自于store.dispatch
​    - getState 来自于store.getState
​    - extra: 来自于用户设置的额外参数

#### redux-promise

```
// 由于使用了redux-promise中间件，因此，允许action是一个promise,在promise中，如果要触发action，则使用resolve
export function featchStudent() {
    return new Promise(resolve => {
        setTimeout(() => {
            const action = setStudentAndTotal([{id:1, name:'aaa'}, {id:2, name:'bbb'}])
            resolve(action)   //只能触发一次，不能像redux-thunk那样触发多次dispatch
        }, 1000)
    })
}
```
可以换成下面这种写法,因为async异步函数返回的本身就是一个promise

```
export async function featchStudent(condition) {
    const resp = await searchStudent(condition)
    return setStudentAndTotal(resp.datas, res.count)
}
```

也可以单单把payload做成promise赋值，也可达到上面的效果
```
export async function featchStudent(condition) {
    return {
        type: ActionTypes.setStudentAndTotal,
        payload: new Promise(resolve => {
            saerchStudent(condition).then(resp => {
                data:resp.data,
                total: resp.total
            })
        })
    }
}
```
如果cation是一个promise，则会等待promise完成，将完成的结果作为action触发
如果action不是一个promise,则判断其payload是否是一个promise，如果是，等待promise完成，
然后将得到的结果作为payload的值触发（要求type是string，不能是symbol）

#### redux-saga

##### saga前置知识

迭代器和可迭代协议

解决副作用的redux中间件

1. redux-thunk: 需要改动action, 可接收action是一个函数

2. redux-promise: 需要改动action, 可接收action是一个promise对象，或action的payload是一个promise对象

   以上两个中间件，会导致action或action创建函数不再纯净

3. redux-saga将解决这样的问题，他不仅可以保持action,action创建函数，reducer的纯净，而且可以用模块化的方式解决副作用，并且非常强大

redux-saga是建立在es6的生成器基础上的，要熟练的使用saga，必须理解生成器

要理解生成器，必须先理解迭代器和可迭代协议

- **迭代**

类似于遍历

遍历: 有多个数据组成集合数据结构（map. set. array等其他类数组）,需要从该结构中依次取出数据进行某种处理

迭代：按照某种逻辑，一次取出下一个数据进行处理

- **迭代器**

js语言规定，如果一个对象，具有next方法，并且next方法满足一定的约束，则该对象是一个迭代器
next方法的约束：该方法必须返回一个对象，该对象必须有两个属性
    - value: 下一个数据的值,如果done属性为true,value一般会设置为undefined
    - done: 是否已经迭代完成
```
var iterator = {
    total: 3,   // 不一定是有限的，可以是无穷无尽的，可以一直迭代下去
    i: 3,
    next() {
        var obj = {
            value: this.i > 3 ? undefined : this.i,
            done:this.i > 3
        }
        this.i++
        return obj
    }
}
```
**斐波那契数列**
```
// 一个无限的斐波那契数列 1 1 2 3 5 8 13 21
var iterator = {
    a:1,
    b:1,
    curIndex:1,   //当前渠道斐波那契数列的第几位了，从1开始
    next() {
        if(this.curIndex = 1 || this.curIndex = 2){
            this.curIndex++
            return {
                value:1,
                done:false
            }
        }
        const c = this.a + this.b
        this.a = this.b
        this.b = this.c
        return {
            value:this.c，
            done:
        }
    }
}
const arr = []
for(var i = 0, i < 10, i++){
    arr.push(iterator.next().value)
}
//

// 一个一个迭代，知道不能迭代为止
var next = iterator.next()
while (next.done) {
    // 若当前迭代的数据不是迭代器的结束
    // 如果当前还有数据
    console.log(next.value)
    next = iterator.next()
}
```
通过迭代器的next方法，可以依次取出数据，并可以根据返回的done属性，判断是否迭代结束

**迭代器创建函数 iterator creator**

它是指一个函数，调用该函数后，返回一个迭代器，则该函数称之为迭代器创建函数，可以简称为迭代器函数

```
function createIterator(total) {
    var i = 1;
    return {
        next() {
            var obj = {
                value: i > total ? undefined : Match.random(),
                done: i > total
            }
            i++
            return obj
        }
    }
}
var iterator = createIterator(100)
var next = iterator.next()
while (next.done) {
    // 若当前迭代的数据不是迭代器的结束
    // 如果当前还有数据
    console.log(next.value)
    next = iterator.next()
}
```

```
//创建一个用户迭代数组的迭代器
function createArrayIterator(arr) {
    var i = 0
    return {
        next() {
            const obj =  {
                value: arr[i],
                done: i >= arr.length
            }
            i++
            return obj
        }
    }
}
var iterator = createArrayIterator([3, 6, 7, 2, 1, 3])
```

- **可迭代协议(**数组 map 这些都符合，里面都是实现了相关约束的)

ES6中出现了for-of循环，该循环就是用于某个迭代对象的，因此，for-of循环要求对象必须是可迭代的（对象必须满足可迭代协议）

可迭代协议是用于约束一个对象的，如果一个对象满足下面的规范，则该对象满足可迭代协议，也称之为该对象是可以被迭代的。

可迭代协议的约束如下：
1. 对象必须有一个知名符号属性(Symbol.iterator)
2. 该属性是一个无参的迭代器创建函数

```
//obj满足可迭代协议
// obj可被迭代
var obj = {
    [Symbol.iterator]: function () {
        var total = 3,
            i = 1;
        return {
            next() {
                const obj =  {   // 当前这一次迭代到的数据
                    value: arr[i],
                    done: i >= arr.length
                }
                i++
                return obj
            }
        }
    }
}

//模拟for-of循环
var iterator = obj[Symlbol.iterator]()
var result = iterator.next()
while(!result.done) {
    // 有数据
    const item = result.value;
    console.log(item)   //执行循环体
    result = iterator.next()
}

for(const item of obj) {
    console.log(item)
}
```

**for-of循环的原理**

调用对象的[Symbol.iterator]方法，得到一个迭代器。不断调用next方法，只有返回的done为false，则将返回的value传递给变量，然后进入循环体执行一次

**生成器 generator（提供了一个在函数外能够控制函数里面的执行过程，通过yield可以让他停止，其他的函数都是一执行就全部执行了）**

生成器：由构造函数generator创建的对象，该对象既是一个迭代器，同时，又是一个可迭代对象（满足可迭代协议的对象）

```
// 伪代码
var generator = new Generator()
generator.next() // 她具有next方法
var iterator = generator[Symbol.iterator]  //她也是一个可迭代对象
for(let item of generator) {
    // 由于他是一个可迭代对象，因此也可以使用for of循环
}
```

**注意：Generator构造函数，不提供给开发者使用，仅仅作为js引擎内部使用**

**generator function**

生成器函数（生成器创建函数）：该函数用于创建一个生成器

ES6新增一个特殊的函数，叫做生成器函数，只要在函数名与function关键字之间加上一个*号，则该函数会自动返回一个生成器

生成器函数的特点：
1. 调用生成器函数，会返回一个生成器，而不是执行函数体（因为，生成器函数的函数体执行，受到生成器控制）
2. 每当调用了生成器的next方法，生成器的函数体会从上一次的yeild的位置（或者开始位置）运行到下一个yield
    1. yield关键字只能在生成器内使用，不可以在函数内部使用
    2. 她表示暂定，并返回一个当前迭代的数据
    3. 如果没有下一个yield，到了函数结束，则生成器的next方法得到的结果中的done为true
3. yield关键字后面的表达式返回的数据，会作为当前迭代的数据
4. 生成器函数的返回值，会作为迭代结束时的value
    1. 但是，如果在结束过后，仍然反复调用next(),则value为undefined
5. 生成器调用next的时候，可以传递参数，该参数会作为生成器函数体上一次yield表达式的值
    1. 生成器第一次调用next函数时，传递参数没有任何意义
6. 生成器带有一个throw方法，该方法与next的效果相同，唯一的区别在于：
    1. next方法传递的参数会被返回成一个正常的值
    2. throw方法传递的参数是一个错误对象，会导致生成器函数内部发生一个错误
7. 生成器带有一个return方法， 会直接结束生成器函数
8. 若需要在生成器内部调用其他生成器，注意：如果直接调用，得到的是一个生成器，如果假如*号调用，则进去其生成器内部执行。
    如果是```yield * 函数()```调用生成器函数，则该函数的返回结果，为该表达式的结果

```
// 下面的函数是一个生成器函数，用于创建生成器
funciton * createGenerator() {
    console.log("生成器函数的函数体")    //createGenerator()不会打印出来，generator.next()会从开始的地方执行到下一个yield后停止
    yield 1 // 返回 {value:1, done:false}
    return // 如果这里return 那么第一次运行还是正常的，第二次generator.next()的时候就直接return undefined了
    console.log("生成器函数的函数体- 运行1")
    yield 2
    console.log("生成器函数的函数体- 运行2")
    yield 3
    console.log("生成器函数的函数体- 运行3") // 如果下面那句return "结束" 返回 {value:undefined, done:false} 因为最后没有写return 就等同于 return undefined
    return "结束"  // 返回 {value:"结束", done:false}
}
var generator = createGenerator()   // 调用后，一定得到一个生成器

generator.next === generator[Symbol.iterator]().next
```

```
function * createArrayIterator(arr) {
    for(let i = 0; i < arr.length; i++){
        const item = arr[i]
        console.log(`第${i}次迭代`)
        yield item
    }
    console.log("函数结束")
}
var generator = createArrayIterator([1, 2, 3, 4])
generator.next() // 第1此迭代 return {value:1, done:false}
generator.next() // 第2此迭代 return {value:2, done:false}
generator.next() // 第3此迭代 return {value:3, done:false}
generator.next() // 第4此迭代 return {value:4, done:false}
generator.next() // 函数结束 return {value:undefined, done:true}
```

```
funciton * createGenerator() {
    console.log("生成器函数的函数体")    
    let result = yield 1     // 第一次运行generator.next('a')，直接执行完yield 1就停止了，还没完成赋值的，赋值在第二次generator.next('b)，然后再次在yield 2停止
    console.log("生成器函数的函数体- 运行1", result)
    result = yield 2
    console.log("生成器函数的函数体- 运行2", result)
    result = yield 3
    console.log("生成器函数的函数体- 运行3", result) 
    return "结束"  
}
var generator = createGenerator()   // 调用后，一定得到一个生成器
//generator.next('a')  // 输出  生成器的函数体 返回{value:1, done:false}
//generator.next('b')   // 输出  生成器的函数体- 运行1, b 返回{value:2, done:false}
//generator.next()        // 输出  生成器的函数体- 运行2, undefined  返回{value:3, done:false}

var result = generator.next()   //{value:1, done:false}
while(!result.done) {
    //有迭代的值
    result = generator.next(result.value)
}

generator.next === generator[Symbol.iterator]().next
```

解决异步问题 回调函数  =》 promise =》 generator =》 async await

```
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
```

```
// 生成器 throw 跟next 其实一样的，但是如果传进去的参数是个new Error 会被try catch劫持，如果不劫持就直接报错了
function * task() {
    try{
        console.log("开始获取数据....")
        const data = yield asyncGetData()
        console.log('获取到数据：', data)
        const data2 = yield asyncGetData()
        console.log('获取到数据：', data2)
        const data3 = yield 1;
        console.log("又获取到数据：", data3)
    }
    catch (err) {
        console.log('报错了')
        yield "abc"
    }
}

function asyncGetData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("你好")
        }, 2000)
    })
}

 var generator = task()
 var result = generator.next()   // 开始获取数据.... return {value:promise, done:false}
 generator.throw(new Error('报错了'))   // 报错了 return {value:undefined, done:true}

 generator.return()   //直接让整个生成器函数结束，手动控制
```

```
<!-- 若需要在生成器内部调用其他生成器，注意：如果直接调用，得到的是一个生成器，如果假如*号调用，则进去其生成器内部执行 -->
function * g2() {
    console.log('g2-开始')
    let result = yield "g1"
    console.log("g2-运行1")
    result = yield "g2"
    return 222
}
funciton * createGenerator() {
    console.log("生成器函数的函数体") 
    let result =  yield 1 
    // const g1 = yield g2()      //得到一个生成器,如果需要运行则g1.next()
    yield * g2()   // 进入生成器内部执行相应的语句，直接输 "g2-开始", 如果const result = yield * g2() ,则等于222， 从上面返回
    console.log("生成器函数的函数体- 运行1", result)
    result = yield 2
    console.log("生成器函数的函数体- 运行2", result)
    result = yield 3
    console.log("生成器函数的函数体- 运行3", result) 
    return "结束" 
}
var generator = createGenerator()   // 调用后，一定得到一个生成器
```



##### saga内容

在saga任务中，如果yield了一个普通数据，saga不做任何处理，仅仅将数据传递给yield表达式（把得到的参数放到next的参数中），因此，在saga中，yield一个普通数据没有意义

saga需要你在yield后面放上一些合适的saga指令（saga effects），如果放的是指令，saga中间件会根据不同的指令进行特殊处理，以控制整个任务的流程

每个指令本质上就是一个函数，该函数调用后，会返回一个数据对象，saga会接收到指令对象，进行各种处理

**一旦saga任务完成（生成器函数执行完），则saga中间件一定结束**

**指令前面必须使用yield，以确保该指令的返回结果被saga控制**

- take指令：[造成阻塞]监听某个action，如果action发生了，则会进行下一步处理，take仅监听一次
- all指令：[阻塞]该函数传入一个数组，数组中放入生成器，saga会等待所有的生成器全部完成后才会进一步处理
- takeEvery指令： 【不阻塞】不断的监听某个action，当某个action到达之后，运行一个函数（这个函数也是一个生成器，里面写相应的指令，比如下面的takeEvery put delay指令字段）,                  takeEvery永远不会结束生成器
- delay指令: [阻塞]阻塞指定的毫秒数
- put指令: 用于重新触发action，相当于dispatch一个action
- call指令：【可能阻塞】promise调用，用于副作用（通常是异步）函数调用
- apply指令： 【可能阻塞】， 跟call的使用一样
- select指令： 【不会阻塞】用于得到当前仓库的数据
- cps指令：【可能阻塞】用于调用哪些传统的回调方式的异步函数
-  fork：
- cancel：
- canceled:
- race: 

```
//take 指令
// saga => index.js
import {take} from 'redux-saga/effects'
import {actionType } from '../action/counter'

export default function *() {
     const action = yield take(actionType.increase)
     console.log("increase发生了：", action)
}
```

```
//saga => counterTask.js
import {take} from 'redux-saga/effects'
import {actionTypes} from '../action/counter'
export default function *() {
    while(true) {
        const action = yield take(actionTypes.asyncIncrease)
        console.log('监听到了async-increase', action)
    }
}
```

```
// all指令
import {all} from 'redux-saga/effects'
import countTask from './counterTask'
import studentTask from './studentTask'

export default function *() {
    yield all([counterTask(), studentTask()])
    console.log("saga完成") // 等两个函数运行完成才会结束这里
}
```

```
// takeEvery put delay指令
import {takeEvery} from 'redux-saga/effects'
import {actionTypes} from '../action/counter'

function * counterTak() {
    yield delay(2000)      //延迟2000毫秒
    yield put(increase())  //触发increase这个action
}
functin * fetchStudents() {
    
    // 当saga发现得到的结果是一个promise对象，他会自动等待promise完成
    // 完成之后，会把完成的结果作为值传递到下一次next
    // 如果promise对象被拒绝，saga会使用generator.throw抛出一个错误
    try{
        // 设置正在加载中
        yield put(setIsLoading(true))
        // const resp = yield searchStudents()    // 异步promise  跟async await一样用
        // 为了统一yield 后面是指令，写成下面这种形式更好，call指令
        // 如果需要参数yield call(searchStudents, {status:1}), 
        // 也可以绑定this{context:"对应的this", fn:searchStudents}
        const state = yield select()
        console.log(state)    // 得到整个仓库的数据
        const resp = yield call(searchStudents)
        yield put(setStudentAndTotal(resp.datas, resp.count))
        yield put(setIsLoading(true))
    }
    catch(err) {
        // err表示reject的内容
        console.log(err)
    }
    
}
export default function *() {
    yield takeEvery(actionTypes.asyncIncrease, counterTask)
    yield takeEvery(actionTypes.fetchStudents, fetchStudents)
    console.log("正在监听asyncIncrease")
}
```

#### react-redux

把react和redux联系起来，在根部提供provider把，在里面的组件通过connect，把

**provider**
没有任何ui界面，该组件的使用，时将redux的仓库放到一个上下文中

```
//app.js
import React from 'react'
import {Provider} from 'react-redux'
import store from './store'
import Counter form './comopnents/counter'

export default function App() {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    )
}

```

**connect**
高阶组件，用于链接仓库和组件的
细节一：如果对返回的容器组件加上额外的水性，则这些属性会直接传递到展示组件
第一个参数：mapStateToProps
    - 参数1： 整个仓库的状态
    - 参数2： 使用者传递的属性对象
第二个参数：mapDiapatchToProps
    - 参数1：dispatch函数
    - 参数2： 使用者传递的属性对象
    - 函数返回的对象会作为属性传递到展示组件中

```
// counter.js
function Counter(props) {
    const input = useRef()
    return (
        <div>
            <h1>{props.number}</h1>
             
            <button onClick={props.onAsyncIncrease}>异步加一</button>
            <button onClick={props.onIncrease}>加一</button>

            <button onClick={props.onDecrease}>减一</button>
            <button onClick={props.onAsyncDecrease}>异步减一</button>

            <p>
                <input type="number" ref={input}></input>
                <button onClick={() => {
                    const n = parseInt(input.current.value)
                    props.onAdd(n)
                }}>加上</button>
            </p>
        </div>
    )
}

const mapStateToprops = state => ({
    number: state.counter
})

const mapDispatchToProps = dispatch => ({
    onIncrease:() => {
        dispatch({
            type:"counter/increase"
        })
    },
    onDecrease:() => {
        dispatch({
            type:"counter/decrease"
        })
    },
    onAdd:(number) => {
        dispatch({
            type:"counter/add",
            payload:number
        })
    },
    onAsyncIncrease:() => {
        dispatch({
            type:'counter/asyncIncrease'
        })
    },
    onAsyncDecrease:() => {
        dispatch({
            type:'counter/asyncDecrease'
        })
    }
})

export default connect(mapStateToprops, mapDispatchToProps)(Counter)
```

#### connected-react-router 

用于将redux和react-router进行结合，本质上，router中的某些数据可能会跟数据仓库中的数据进行联动
将redux和路由链接起来用，也就是让redux能够监听到路由的变化，从而做一些操作，dva只需要配置ConnectedRouter，不用配置前两个

**connectRouter**

reducer->index.js

参数  import history from 'history' 直接安装
传入一个history对象，得到一个reducer

**routerMiddleware**

该函数会返回一个redux中间件，用于拦截一些特殊的action
传入history对象，得到一个redux中间件

**ConnectedRouter**

传入一个history对象，提供路由上下文
这是一个组件，用于向上下文提供一个history对象和其他的路由信息（与react-router提供的信息一致）
之所以需要新制作一个组就按，是因为该库必须保证整个过程使用的是同一个history对象


**一些action创建函数**

- replace
- push


#### react-actions

> 该库用于简化action-types action-creator以及reducer

1. createAction

该函数用于帮助你创建一个action创建函数

2. createActions

该函数用于帮助你创建多个action创建函数

3. handleAction 

简化针对单个action类型的reducer处理，当他匹配到对应的action类型后，会执行对应的函数

4. handleActions

简化针对多个action类型的reducer处理

5. combineActions

createActions和handleActions两个函数，用于处理多个action-type对应同一个reducer处理函数
