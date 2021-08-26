import ActionTypes from './utils/ActionTypes'
import isPlainObject from './utils/isPlainObject'
//--------------------------------------------createStore源码--------------------------------------------------

/**
 * 得到一个指定长度的随机字符串
 * @params {*} length
 */
function getRandomString(length) {
    return Math.random().toString(36).substr(2, 7).split('').join('.')
}

/**
 * 实现createStore功能
 * @params {function} reducer reducer
 * @params {any} defaultState 默认的状态值
 * @params {any} enhanced 默认的状态值
 */
export default function createStore(reducer, defaultState, enhanced) {
    // enhanced 表示applymiddleware返回的函数
    if(typeof defaultState === 'function'){
        // 第二个参数是应用中间件的函数返回值
        enhanced = defaultState
        defaultState = undefined
    }
    if(typeof enhanced === 'function'){
        // 进入applyMiddleware的处理逻辑
        return enhanced(createStore)(reducer, defaultState)
    }

    const currentReducer = reducer;       //当前使用的reducer
    let currentState = defaultState     //当前仓库中的状态

    const listeners = []    //记录所有的监听器（订阅器）

    function dispatch(action) {
        // 验证action
        if(!isPlainObject(action)){
            throw new TypeError("action must be a plain Object")
        }
        // 验证action的type属性是否存在
        if(action.type === undefined){
            throw new TypeError("action must has a property of type")
        }
        currentState = currentReducer(currentState, action)

        //运行所有的监听器（订阅器）
        for(const listener of listeners){
            listener()
        }
    }
    function getState() {
        return currentState
    }

    // 添加一个监听器（订阅器）    发布订阅模式
    function subscribe(listener) {
        listeners.push(listener)
        let isRemove = false //是否已经移除掉了
        return function () {
            if(isRemove) {
                return
            }
            //将listener从数组中一处
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
            isRemove = true
        }
    }
    dispatch({
        type: ActionTypes.INIT()
    })
    return {
        dispatch,
        getState,
        subscribe
    }
}

