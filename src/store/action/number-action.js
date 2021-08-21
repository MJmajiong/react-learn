import * as actionTypes from './action-type'
/*
 * 得到一个用于增加数字操作的action
 */
export function getIncreaseAction() {
    return {
        type: actionTypes.INCREASE
    }
}

/*
 * 得到一个用于减少数字操作的action
 */
export function getDecreaseAction() {
    return {
        type: actionTypes.DECREASE
    }
}

export function getSetActioin(value) {
    return {
        type:actionTypes.SET,
        payload:value
    }
}