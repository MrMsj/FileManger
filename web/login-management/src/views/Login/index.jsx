import styles from "./login.module.scss"
import { Input,Space,Button,message, Divider } from 'antd';
import { useEffect , useState} from "react"
import initLoginBg from "./init"
import './login.less'
import {LoginAPI,RegisterAPI} from "@/request/api"
import { useNavigate } from "react-router-dom"

const View= () =>{
  let navigateTo = useNavigate();

  useEffect(()=>{
    initLoginBg();
    window.onresize = function(){initLoginBg()};
  },[]);

  // 获取用户输入的信息
  const [usernameVal,setUsernameVal] = useState(""); // 定义用户输入用户名这个变量
  const [passwordVal,setPasswordVal] = useState(""); // 定义用户输入密码这个变量
  // 定义一个变量保存验证码图片信息

  const usernameChange = (e)=>{
    // 获取用户输入的用户名
    // console.log(e.target.value);
    // 修改usernameVal这个变量为用户输入的那个值。 以后拿到usernameVal这个变量就相当于拿到用户输入的信息。
    setUsernameVal(e.target.value);
  }
  const passwordChange = (e)=>{
    setPasswordVal(e.target.value);
  }

  // 点击登录按钮的事件函数
  const gotoLogin = async ()=>{
    console.log("用户输入的用户名，密码，验证码分别是：",usernameVal,passwordVal);
    // 验证是否有空值
    if(!usernameVal.trim() || !passwordVal.trim()){
      message.warning("请完整输入信息！")
      return
    }
    // 发起登录请求
    let loginAPIRes = await LoginAPI({
      username:usernameVal,
      password:passwordVal, 
      uuid:localStorage.getItem("uuid")})

      console.log(loginAPIRes);
      if(loginAPIRes.code===200){
        // 1、提示登录成功
        message.success("登录成功！")
        // 2、保存token
        localStorage.setItem("lege-react-management-token",loginAPIRes.token)
        // 3、跳转到/page1
        navigateTo("/page1")
        // 4、删除本地保存中的uuid
        localStorage.removeItem("uuid")
      }
  }

  const gotoRegister=()=>{
    navigateTo("/register");
  }


    return(
        <div className={styles.loginPage} >
          {/*存放背景*/}  
          <canvas id="canvas" style={{display:"block"}}></canvas>

          {/*登录盒子*/}
          <div className={styles.loginBox+ " loginbox"}>
              {/*标题部分*/}
              <div className={styles.title}>
                  <h1>文件在线管理系统</h1>
                  <p>Strive Everyday</p>
              </div>
              {/*表单部分*/}
              <div className="form">
              <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Input placeholder="用户名" onChange={usernameChange}/>
                <Input.Password placeholder="密码" onChange={passwordChange}/>

                <Divider style={{borderColor:"#1890ff",color:"#1890ff"}} />
                <div style={{display:"flex",justifyContent:"center"}}>
                  <Space size={100}>
                    <Button type="primary" onClick={gotoLogin}>登录</Button>
                    <Button type="primary" onClick={gotoRegister}>注册</Button>
                  </Space>
                </div>
              </Space>
              </div>
          </div>
        </div>
    )
}

export default View