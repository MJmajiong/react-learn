import { action } from 'commander'
import * as actionTypes from '../action/action-type'
import loginUser from './loginUser'
import users from './users'
import { combineReducers } from 'redux'
/*
 *reducer本质上就是一个普通函数
 *@param state 之前仓库的状态（数据）
 *@param action 描述要做什么的对象
 *return 返回一个新的状态（state）
 */

// 这里的state可以直接赋值,比如赋值20,但是这里的赋值级别不够createStore那里的级别高,如果是createStore(reducer, 10),那么初始化的值就是10
// 单个reducer,不需要合并的时候可以这样写,如果需要用到combineReducers的时候用下面的写法
//  export default function reducer(state, action) {
//      switch(action.type){
//         case actionTypes.INCREASE:
//             return state + 1
//         case actionTypes.DECREASE:
//             return state + 1
//         case actionTypes.SET:
//             return action.payload
//         default:
//             return state
//      }
// }

// const initialState = {
//     loginUser:null,
//     users:null
// }

//这种方法是我们自己写的合并的方法,下面是redux官方提供的合并reducer的方法
// export default (state = {}, action) => {
//     const newState = {
//         loginUser:loginUser(state.loginUser, action),
//         users:users(state.users, action)
//     }

//     return newState
// }

//这个方法就等同于上面的那个合并方法
//如果需要自定义属性名,那就写成{loginUserReducer:loginUser, userReducer:users},也就是普通的对象的那种赋值方法,没什么区别
export default combineReducers({
    loginUser,
    users
})
