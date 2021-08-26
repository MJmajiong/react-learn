react         ui解决方案
react-router  解决路由问题
redux         数据的解决方案
antd-design   UI库

## redux 核心概念

action reducer store

## mvc

他是一个ui的解决方案，用于降低UI,以及ui关联的数据的复杂度

## 传统的服务端的mvc**

环境：

1.服务器需要相应一个完成的html
2.该html中包含页面需要的数据
3.浏览器仅承担渲染页面的作用

https://www.sina.com.cn/

以上的这种方式叫做**服务端渲染**，即服务端将完整的页面组装好之后，一起发送给客户端

服务器端需要处理ui中要用到的数据，并且要将数据嵌入到页面中，最终生成一个完整的html页面相应

为了降低处理这个过程的复杂度，出现了mvc模式

**controller** 处理请求，组装这次请求需要的数据 （只处理比如/api/login 这个链接的匹配和逻辑）
**model** 需要用于ui渲染的数据模型   （比如经过一些列的逻辑后，产生的对象 {code:'success', msg:'登录成功'} ）
**view** 视图，用于将模型组装到界面中  (生成整个需要的html)

控制器（controller）是为了降低复杂度，但是前端的这些点击事件没有降低复杂度

**前端mvc模式的困难**

react 从没说过提供了一个mvc的视图，mv是有的
vue 可以说是mvvm，因为有数据双向绑定

react解决了  数据（props） =》 视图（return后面的元素）  的问题
               
function MyCom(props) {
    return (
        <div>
            {props.title}
        </div>
    )
}

问题（controller和数据非常复杂，引出redux，降低数据复杂度）

1.前端的controller要比服务器复杂很多，因为前端中的controller处理的是用户的操作，而用户的操作场景是复杂的

2.对于那些组件化的矿建（比如vue react）,他们使用的是单向数据流，vue的数据双向绑定也是语法糖来的。如若需要共享数据，则必须将数据提升到顶层组件，然后数据再一层一层传递，极其繁琐。
    1. 虽然可以提供上下文来提供共享数据，但对数据的操作难以监控，容易到值调试错误的困难，以及数据还原的困难。并且，若开发一个大中型项目，共享的数据很多，回导致上下文的数据变得非常复杂。


## 前端需要一个独立的数据解决方案

**flux**

facebook提出的数据解决方案，他的最大的历史意义，在于他引入了action的概念
action是一个普通的对象，用于描述他是干什么的（相当于服务器中的url和请求方式，告诉controller要干什么）  **action** 是触发数据变化的唯一原因
store表示数据仓库，用于存储共享数据，还可以根据不同的action更改仓库中的数据

示例
....js
var loginAction = {
    type:'login',
    payload:{
        logined:'admin',
        loginPwd: '123456'
    }
}

var deleteAction = {
    type：'delete'
    payload: 1,  //用户1
}

**redux**

在flux的基础上，引入了reducer的概念

reducer： 处理器，用于根据action来处理数据，处理后的数据会被仓库重新保存

（图片看手机）

涉及到store的数据变化的，都在reducer这里完成，相当于mvc中的c（controller）
reducer实际就是一个函数

# Action(就是得到一个普通对象)

1. action是一个plain-object（平面对象）
    1. 他的__proto__指向Object.prototype
2. action中必须有type属性，type属性用于描述操作的类型，type可以是任何类型，不一定要是字符串
3. action中paload表示附加数据，没有强制要求
4. 在大型项目中，由于操作类型非常多，为了避免硬编码（hard code），会将action的类型存放在一个或一些单独的文件中
5. 为了方便传递action，通常会使用action创建函数(action creator)来创建action
    1. action创建函数应为无副作用的**纯函数**
        1. 不能以任何形式改动参数
        2. 不可以有异步
        3. 不可以对外部环境中的数据造成影响
6. 为了方便利用actioni创建函数来分发action，redux提供了一个函数```bindActionCreators```
    该函数用于增强action创建函数的功能,使他不仅可以创建action,并且创建后自动完成分发


# Reducer

Reducer 是用于改变数据的函数

1. 一个数据仓库,有且仅有一个reducer,并且通常情况下,一个工程只有一个数据仓库,
    因此一个系统,只有一个reducer
2. 为了方便管理,同城会将reducer放到单独的文件中
3. reducer被调用的时机
    1. 通过store.dispatch, 分发了一个action,此时,会调用reducer
    2. 当创建一个store的时候,会调用一次reducer
        1. 可以李用者一点,用reducer初始化状态
        2. 创建仓库是,不传递任何状态
        3. 将reducer的参数state设置一个默认值
4. reducer内部通常使用switch来判断type值
5. **reducer必须是一个没有副作用的纯函数**
    1. 为什么需要纯函数
        1. 纯函数有利于测试和调试
        2. 有利于还原数据
        3. 有利于将来和react结合时的优化
    2. 具体要求
        1. 不能改变参数,因此若要让状态变化,必须得到一个新的状态 比如: return {...state, age:3} 或者 Object.assign({}, state, {age:3})
        2. 不能有异步
        3. 不能对外部环境造成影响
6. 由于在大中型项目中,操作比较复杂,数据结构也比较复杂,因为需要对reducer进行细分
    1. redux提供了一个方法,可以帮助我们更加方便的合并reducer
    2. combineReducers: 合并reducer,得到一个新的reducer,该新的reducer管理一个对象,该对象中的每一个属性交给对应的reducer管理


# store

store: 用于保存数据
通过createStore方法创建一个对象

该对象的成员

-dispatch: 分发一个action
-getState: 得到仓库中当前的状态
-replaceReducer: 替换当前的reducer
subscribe: 注册一个监听器,监听器是一个无参函数,当分发一个action之后,会运行注册的监听器. 该函数会返回一个函数,用于取消监听
Symbol("observable"): rxjs

# createStore 源码

# bindActionCreators 源码

# combineReducers 源码

组装reducers，返回一个reducer，数据使用一个对象表示，对象的属性名与传递的参数对象保持一致

# redux 中间件

中间件：类似于插件，可以在不影响原本功能，并且不改动原本代码的基础上，对其功能进行增强
        在redux中，中间件主要用于增强dispatch函数

实现redux中间件的基本原理，是更改仓库中的dispatch函数

redux中间件书写：
 - 中间件本身是一个函数，该函数接受一个store参数，表示创建的仓库，该仓库并非一个完整的仓库对象，
仅包含getState， dispatch。该函数运行的时间，实在仓库创建之后运行
  - 由于创建仓库后，需要自动运行设置的中间件函数，因此，需要在创建仓库时，告诉仓库有哪些中间件
  - 需要调用applyMiddlewre函数，将函数的返回结果作为createStore作为第二或者第三个参数
  - 中间件函数必须返回一个dispatch创建函数
    - 返回的函数需要有一个参数dispatch

- applyMiddleware函数，用于记录有哪些中间件，他会返回一个函数
 - 该函数用于记录创建仓库的方法，然后又返回一个函数

# 手写applyMiddleware

middleware的本质，是一个调用后可以得到dispatch创建函数的函数

compose: 函数式编程，函数组合，将一个数组中的函数进行组合，形成一个新的函数，该函数调用时，实际上是反向调用之前组合的函数(具体看static的compose流程图)