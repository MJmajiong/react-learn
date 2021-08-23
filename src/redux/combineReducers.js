import isPlainObject from "./utils/isPlainObject"
import ActionTypes from './utils/ActionTypes'
function validateReducers(reducers) {
    if(typeof reducers !== 'object'){
        throw new TypeError('reducer must be an object')
    }
    if(!isPlainObject(reducers)) {
        throw new TypeError("reducer must be a plain object")
    }
    // 验证reducer的返回结果是不是undefined
    for(const key in reducers) {
        if(reducers.hasOwnProperty(key)){
            const reducer = reducers[key];
            let state = reducer(undefined, {
                type: ActionTypes.INIT()
            })
            if(state === undefined){
                throw new TypeError("reducers must not return undefined")
            }
            state = reducer(undefined, {
                type: ActionTypes.UNKNOWN()
            })
            if(state === undefined) {
                throw new TypeError("reducers must not return undefined")
            }
        }
    }
}
export default function (reducers) {
    validateReducers(reducers)
    /** 
     * 返回的是一个reducer函数
     */
    return function (state = {}, action) {
        const newState = {}    //要返回的新的状态
        for(const key in reducers) {
            if(reducers.hasOwnProperty(key)){
                const reducer = reducers[key]
                newState[key] = reducer(state[key], action)
            }
        }
        return newState
    }
}