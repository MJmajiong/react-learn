import * as userAction from '../action/userAction'
import {v4 as uuid} from 'uuid'
const initialState = {
    // {
    //     id: uuid(),
    //     name: '用户1',
    //     age: 11
    // },
    // {
    //     id: uuid(),
    //     name: '用户二',
    //     age: 12
    // }
    loading: false,
    datas:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case userAction.ADDUSER:
        return {
            ...state,
            datas:[state.datas, payload]
        }

    case userAction.DELETEUSER:
        return {
            ...state,
            datas:state.datas.filter(item => item.id !== payload)
        }
    
    case userAction.UPDATEUSER:
        return {
            ...state,
            datas:state.datas.map(item => item.id === payload.id ? payload : item)
        }
    
    case userAction.SETUSER:
        return {
            ...state,
            datas:payload
        }
    
    case userAction.SETLOGDING:
        return {
            ...state,
            loading:payload
        }
    default:
        return {
            ...state
        }
    }
}
