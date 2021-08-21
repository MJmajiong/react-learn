/**
 * 判断某个对象是否是一个plain-object
 * @params {*} obj
 * @params {any} defaultState 默认的状态值
 */
function isPlainObject(obj) {
    if(typeof obj !== "object"){
        return false
    }
    return Object.getPrototypeOf(obj) == Object.prototype
}



/**
 * 实现createStore功能
 * @params {function} reducer reducer
 * @params {any} defaultState 默认的状态值
 */
export default function (reducer, defaultState) {

    const currentReducer = reducer;       //当前使用的reducer
    const currentState = defaultState     //当前仓库中的状态

    function dispatch() {
        // 验证action
    }
    function getState() {

    }
    function subscribe() {

    }
    return {
        dispatch,
        getState,
        subscribe
    }
}

