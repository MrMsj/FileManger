import handleNum from "./index"
const defaultState ={
    ...handleNum.state,
}

let reducer=(state=defaultState,action)=>{
    let newState=JSON.parse(JSON.stringify(state))
    // switch(action.type){
    //     case handleNum.add1:
    //         handleNum.actions[handleNum.add1](newState,action)
    //         break;
    //     case handleNum.add2:
    //         handleNum.actions[handleNum.add2](newState,action)
    //         break;
    //     default:
    //         break;
    // }
    // 【优化】上面这样写，我们没添加一个方法，都要在这里多写一句case

    // 拿着action.type和actionNames进行每一项的对比，如果是相等，就调用 模块名.actions[下标](newState,action)
    for(let key in handleNum.actionNames){
        // key是每一个键
        // 判断是不是相等
        // if(action.type==="add1"){
        if(action.type===handleNum.actionNames[key]){
          handleNum.actions[handleNum.actionNames[key]](newState,action);
          break;
        }
      }
      // 这样写就达到每一次写一个方法都不需要再手动来添加这几case，终于可以解放双手了！

    return newState
}

export default reducer
