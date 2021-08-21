//最基本的redux写法  从store 到  reducer 和 action
import { bindActionCreators, createStore } from 'redux'
import * as actionTypes from './action/action-type'
import * as numberActions from './action/number-action'
import { createAddUserAction, delteAddUserAction } from './action/userAction'
import reducer from './reducer/index'
import {v4 as uuid} from 'uuid'
// 约定action的格式：{type:"操作类型"， payload:"附加状态"}

//---------------------------------------------------这是单个action和单个reducer的写法,比较简单,下面是多个action和多个reducer合并的写法----------------------------------------------------

/*
 *@param reducer 之前仓库的状态（数据）
 *@param state 描述要做什么的对象
 */

// const store = createStore(reducer, 10)

// 不允许这种构造对象的方法来做action的对象，必须是一个plain objects（原始的对象）const action = {} 这种形式
// class Action {
//     constructor(type) {
//         this.type = type
//     }
// }
// const action = new Action(actionTypes.DECREASE)

// console.log(store.getState())

//第一个参数，是action创建函数合并的对象，第二个参数是仓库的dispatch函数
//得到一个新的对象，新对象的属性名于第一个参数的属性名一致
// const boundActioins = bindActionCreators(numberActions, store.dispatch)

// console.log(boundActioins) //得到仓库中当前的数据

// 当有了上面的boundActioins后，store.dispatch(numberActions.getDecreaseAction())可以被boundActions.getDecreaseAction()替代
// store.dispatch(numberActions.getDecreaseAction())   //向仓库分发action

// store.dispatch(numberActions.getSetActioin(3))

// console.log(store.getState())

// boundActioins.getSetActioin(5)

// console.log(store.getState())

//------------------------------------------------------------------------分界线-------------------------------------------------------------------------------

const store = createStore(reducer)

//当调用action后的第一时间触发这个监听器
//可以注册多个监听器
const unListen = store.subscribe(() => {
    console.log(store.getState())
})

store.subscribe(() => {
    console.log('状态改变了')
})

console.log(store.getState())

store.dispatch(
    createAddUserAction({
        id: 3,
        name:'abc',
        age:10
    })
)

// 取消监听
unListen()
store.dispatch(delteAddUserAction(3))

console.log(store.getState())
