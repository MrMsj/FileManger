import request from "./index"

// 请求中： 请求参数和返回值的类型都需要进行约束

// 验证码请求
// export const CaptchaAPI = () =>request.get("/prod-api/captchaImage");

// 登录请求
export const LoginAPI = (params) =>request.post("/api/v1/auth/login",params);

// 注册请求
export const RegisterAPI = (params)=>request.post("/api/v1/users",params);