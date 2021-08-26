import compose from './compose'
/**
 * 注册中间件
 * @params {...any} middlewares 不知道有多少个中间件，所以将他展开
 */
export default function (...middlewares) {
    return function(createStore) {    // 给我创建仓库的函数
        // 下面的函数用于创建仓库
        return function(reducer, defaultState) {
            const store = createStore(reducer, defaultState)
            let dispatch = () => {
                throw new Error('目前还不能使用dispatch')
            }
            const simpleStore = {
                getState: store.getState,
                dispatch: store.dispatch
            }
            // 给dispatch赋值
            // 根据中间件数组，得到一个dispatch数组
            const dispatchProducers = middlewares.map(mid => mid(simpleStore))
            // 这两句话的逻辑就在static的中间件调用顺序中
            const dispatchProducer = compose(...dispatchProducers)
            dispatch = dispatchProducer(store.dispatch)
            return {
                ...store, 
                dispatch
            }
        }
    }
}