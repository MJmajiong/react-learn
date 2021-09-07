
// thunk中间件源码
function createThunkMiddleware(extra) {
    return store => next => action => {
        if(typeof action === 'function'){
           return action(store.dispatch, store.getState, extra)
        }else{
            next(action)
        }
    }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddlewarea
export default thunk