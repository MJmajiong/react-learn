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

export default isPlainObject