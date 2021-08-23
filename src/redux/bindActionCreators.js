export default function (actionCreators, dispatch) {
    if(typeof actionCreators === 'function'){
        return getAutoDispatchActionCreator(actionCreators, dispatch)
    }
    else if(typeof actionCreators === 'object'){
        const result = {}
        for (const key in actionCreators) {
            if (actionCreators.hasOwnProperty(key)) {
                const actionCreator = actionCreators[key]    // 取出对应的属性值
                if(typeof actionCreators !== "function"){
                    result[key] = getAutoDispatchActionCreator(actionCreator, dispatch)
                }
            }
        }
        return result
    }   
    else {
        throw new TypeError('actionCreators must be an object or funciton which mean action creator')
    }
}

/**
 * 得到一个自动分发的action创建函数
 */
function getAutoDispatchActionCreator(actionCreators, dispatch) {
    return function(...args) {
        const action = actionCreators(...args)
        dispatch(action)
    }
}