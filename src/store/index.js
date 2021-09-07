//最基本的redux写法  从store 到  reducer 和 action
import { bindActionCreators, createStore, applyMiddleware } from 'redux'
// import { createStore, bindActionCreators, applyMiddleware } from '../redux/index'
import * as actionTypes from './action/action-type'
import * as numberActions from './action/number-action'
import { createAddUserAction, delteAddUserAction } from './action/userAction'
import reducer from './reducer/index'
import {v4 as uuid} from 'uuid'
import '../redux/compose'
import reduxLogger, {createLogger} from 'redux-logger'
import reduxThunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

const sagaMid = createSagaMiddleware()
// 约定action的格式：{type:"操作类型"， payload:"附加状态"}

//---------------------------------------------------这是单个action和单个reducer的写法,比较简单,下面是多个action和多个reducer合并的写法----------------------------------------------------

/*
 *@param reducer 之前仓库的状态（数据）
 *@param state 描述要做什么的对象
 */

// const store = createStore(reducer, 10)

// 不允许这种构造对象的方法来做action的对象，必须是一个plain objects（原始的对象）const action = {} 这种形式
// class Action {
//     constructor(type) {
//         this.type = type
//     }
// }
// const action = new Action(actionTypes.DECREASE)

// console.log(store.getState())

//第一个参数，是action创建函数合并的对象，第二个参数是仓库的dispatch函数
//得到一个新的对象，新对象的属性名于第一个参数的属性名一致
// const boundActioins = bindActionCreators(numberActions, store.dispatch)

// console.log(boundActioins) //得到仓库中当前的数据

// 当有了上面的boundActioins后，store.dispatch(numberActions.getDecreaseAction())可以被boundActions.getDecreaseAction()替代
// store.dispatch(numberActions.getDecreaseAction())   //向仓库分发action

// store.dispatch(numberActions.getSetActioin(3))

// console.log(store.getState())

// boundActioins.getSetActioin(5)

// console.log(store.getState())

//------------------------------------------------------------------------分界线-------------------------------------------------------------------------------

/**
 *  一个中间件函数
 *  主要的代码跟下面的一样，这里只是写的更规范一点而已
 * @param {*} store
 */
function logger1(store) {
    console.log("logger1")
    return function (next) {
        //下面返回的函数，是最终要应用的dispatch
        return function dispatch(action) {
            console.log("中间件1")
            console.log("旧数据", store.getState())
            console.log("action", action)
            // oldDispatch(action)
            next(action)
            // 如果这里把next(action)写成store.dispatch(action),就会变成无线递归
            console.log("新数据", store.getState())
            console.log("")
        }
    }
}

function logger2(store) {
    console.log("logger2")
    return function (next) {
        //下面返回的函数，是最终要应用的dispatch
        return function dispatch(action) {
            console.log("中间件2")
            console.log("旧数据", store.getState())
            console.log("action", action)
            // oldDispatch(action)
            next(action)
            console.log("新数据", store.getState())
            console.log("")
        }
    }
}

// 中间件  洋葱模型

// 应用中间件，方式1
// const store = createStore(reducer, applyMiddleware(logger1, logger2))
// 上面这个logger1  logger2是自己写的，有写好的第三方库，redux-logger,直接引用即可,里面有一些配置项可以选，如果不需要直接applyMiddleware(reduxLogger)
//  redux-logger 要放到最后一个，其他的中间件会影响到他
const logger = createLogger({
    duration:true
})
export const store = createStore(reducer, applyMiddleware(reduxThunk, logger))

//应用中间件，方式2 效果等同于方式一，这种方式类似柯里化
// const store = applyMiddleware(logger1, logger2)(createStore)(reducer)

// 中间件的实现原理，就是更改dispatch的功能
// let oldDispatch = store.dispatch  //保留原来的dispatch函数
// store.dispatch = function (action) { // 更改store中的disaptch
//     console.log("中间件1")
//     console.log("旧数据", store.getState())
//     console.log("action", action)
//     oldDispatch(action)
//     console.log("新数据", store.getState())
//     console.log("")
// }


// oldDispatch = store.dispatch  //保留原来的dispatch函数
// store.dispatch = function (action) { // 更改store中的disaptch
//     console.log("中间件2")
//     console.log("旧数据", store.getState())
//     console.log("action", action)
//     oldDispatch(action)
//     console.log("新数据", store.getState())
//     console.log("")
// }



//当调用action后的第一时间触发这个监听器
//可以注册多个监听器
const unListen = store.subscribe(() => {
    // console.log(store.getState())
    console.log('有取消监听的地方')
})

store.subscribe(() => {
    console.log('状态改变了')
})

console.log(store.getState())

store.dispatch(
    createAddUserAction({
        id: 3,
        name:'abc',
        age:10
    })
)

// 取消监听
unListen()

store.dispatch(delteAddUserAction(3))

console.log(store.getState())

const actionCreators = {
    addUser: createAddUserAction,
    deleteUser: delteAddUserAction
}


// bindActionCreators 第一个参数，传入一个对象就返回一个对象，传入一个函数就返回一个函数
// 如果 bindFun = bindActionCreators(createAddUserAction, store.dispatch)
// 那么 直接执行bindFun({id: 4, name: '用户4', age: 33}),就相当于调用了store.dispatch(createAddUserAction)
const bindAction = bindActionCreators(actionCreators, store.dispatch)

bindAction.addUser({
    id: 3,
    name: '用户3',
    age: 23
})

bindAction.addUser({
    id: 4,
    name: '用户4',
    age: 44
})

console.log(store.getState())
