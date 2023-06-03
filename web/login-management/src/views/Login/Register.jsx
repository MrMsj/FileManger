import styles from "./login.module.scss"
import { Input,Space,Button,message, Divider } from 'antd';
import { useEffect , useState} from "react"
import initLoginBg from "./init"
import './login.less'
import {RegisterAPI} from "@/request/api"
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

  const usernameChange = (e)=>{
    // 获取用户输入的用户名
    // console.log(e.target.value);
    // 修改usernameVal这个变量为用户输入的那个值。 以后拿到usernameVal这个变量就相当于拿到用户输入的信息。
    setUsernameVal(e.target.value);
  }
  const passwordChange = (e)=>{
    setPasswordVal(e.target.value);
  }

  const gotoRegister=async()=>{
    if(!usernameVal.trim() || !passwordVal.trim()){
      message.warning("请完整输入信息！");
      return
    }
    let registerAPIRes=await RegisterAPI({
      username:usernameVal,
      password:passwordVal,
      uuid:localStorage.getItem("uuid")
    });

    if(registerAPIRes.code==200){
      message.success("注册成功！");
      localStorage.setItem("login-react-management-token", registerAPIRes.token);
      navigateTo("/page1");
      localStorage.removeItem("uuid");
    }
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