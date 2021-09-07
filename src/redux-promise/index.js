import {isPlainObject, isString} from 'lodash'
import isPromise from 'is-promise'

export default store => next => action => {
    //action是不是标准的flux的action
    if(!isFAS(action)){
        isPromise(action) ? action.then(ac => dispatch(ac)) : next(action)
    }
    return isPromise(action.payload) ? 
            action.payload
                .then(payload => dispatch({...action, payload}))
                .catch(error => dispatch({...action, payload: error, error:true})) :
            next(action)
}

// 判断一个action是不是标准的flux的action
function isFAS(action) {
    // action必须是一个平面对象plain-object
    // action.type必须是一个字符串
    // action的属性不能包含其他非标准属性  标准属性["type", "payload", "error", "meta"]
    return isPlainObject(action) && isString(actioni.type) && Object.keys(action).every(key => ["type", "payload", "error", "meta"].indexOf(key) > -1)

}