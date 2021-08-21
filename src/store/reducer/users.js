import * as userAction from '../action/userAction'
import {v4 as uuid} from 'uuid'
const initialState = [
    {
        id: uuid(),
        name: '用户1',
        age: 11
    },
    {
        id: uuid(),
        name: '用户二',
        age: 12
    }
]

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case userAction.ADDUSER:
        return [...state, payload]

    case userAction.DELETEUSER:
        return state.filter(item => item.id !== payload)
    
    case userAction.UPDATEUSER:
        return state.map(item => item.id === payload.id ? payload : item)

    default:
        return state
    }
}
