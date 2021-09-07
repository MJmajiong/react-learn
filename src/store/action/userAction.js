import ActionTypes from '../../redux/utils/ActionTypes'
import {getAllStudents} from '../../services/index'

export const ADDUSER = Symbol('add-user')
export const DELETEUSER = Symbol('delete-user')
export const UPDATEUSER  = Symbol('update-user')
export const SETUSER = Symbol('set-users')
export const SETLOGDING = Symbol('set-loading')


export const createAddUserAction = (user) => ({
    type: ADDUSER,
    payload: user
})

export const delteAddUserAction = (id) => ({
    type: DELETEUSER,
    payload: id
})

export const updateUserAction = (id, newUserData) => ({
    type: UPDATEUSER,
    payload: {
        ...newUserData,
        id
    }
})

export const createSetUserAction = (users) => ({
    type: SETUSER,
    payload: users
})

export const createSetLoadingAction = (isLoading) => ({
    type: SETLOGDING,
    payload: isLoading
})

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

// 由于使用了redux-promise中间件，因此，允许action是一个promise,在promise中，如果要触发action，则使用resolve
// export function featchStudent() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             const action = setStudentAndTotal([{id:1, name:'aaa'}, {id:2, name:'bbb'}])
//             resolve(action)
//         }, 1000)
//     })
// }

// export async function featchStudent(condition) {
//     return {
//         type: ActionTypes.setStudentAndTotal,
//         payload: new Promise(resolve => {
//             saerchStudent(condition).then(resp => {
//                 data:resp.data,
//                 total: resp.total
//             })
//         })
//     }
// }



