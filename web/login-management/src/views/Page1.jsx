import { useSelector,useDispatch} from "react-redux"
import numStatus from "@/store/NumStatus"
import axios from "axios";
const View= () =>{
    const {num, sarr}=useSelector((state)=>({
        num:state.handleNum.num,
        sarr:state.handleArr.sarr
    }))
    const dispatch = useDispatch();

    let token = localStorage.getItem("login-react-management-token");

    // 通过useDispatch修改仓库数据
    const changeNum = () =>{
    // dispatch({type:"字符串(认为是一个记号)",val:3})   type是固定的  val是自定义的
    // dispatch({type:"add1"})
    dispatch({type:"add3",val:300})   // 触发了reducer函数的执行
  }

  const changeNum2 = () =>{
    // 最开始的写法-同步的写法
    //dispatch({type:"add1"})

     // 异步的写法- redux-thunk的用法  基本格式：  dispatch(异步执行的函数)
    //  dispatch((dis)=>{
    //  setTimeout(()=>{
    //     dis({type:"add1"})
    //    },1000)
    //  })

    // 优化redux-thunk的异步写法  `
    // dispatch(调用状态管理中的asyncAdd1)
    dispatch(numStatus.asyncActions.asyncAdd1)

}

  // 对sarr的操作
//    const {sarr} = useSelector((state)=>({
//    sarr:state.handleArr.sarr
//    }));

  const changeArr = () =>{
    dispatch({type:"sarrpush",val:100}) 
  }
  const sendRequest = async () => {
    const url = 'http://localhost:3000/api/v1/folders/3';
    const data = {
      folder: {
        name: 'BBA',
        path: '/3/Test',
        user_id: 3
      },
      user: {
        id: 3
      }
    };
    const config = {
      headers: {

        'Authorization': 'Bearer '+token,
      }
    };

    try {
      const response = await axios.get(url,  config);
      console.log(response.data);
      // 处理响应数据
    } catch (error) {
      console.error(error);
      // 处理错误情况
    }
  };



    return(
        <div className='home'>
            <p>这是Page1页面内容</p>
            <p>{num}</p>
            <button onClick={changeNum}>同步按钮</button>
            <button onClick={changeNum2}>异步按钮</button>
            <p>{sarr}</p>
            <button onClick={changeArr}>同步按钮</button>
            <button onClick={sendRequest}>按钮</button>
        </div>
    )
}

export default View