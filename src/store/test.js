import {store} from './index'
import { fetchUsers } from './action/userAction'
import axios from 'axios'

setTimeout(() => {
    store.dispatch(fetchUsers())
})
// 下面这种写法可以写道action，通过引入中间件thunk，然后像上面那样直接触发相应的action即可
// axios.get('/api/list')
// .then(resp => {
//     console.log(resp)
//     store.dispatch(createSetUserAction(resp.data))
// })
// .finally(e => {
//     store.dispatch(createSetLoadingAction(false))
// })