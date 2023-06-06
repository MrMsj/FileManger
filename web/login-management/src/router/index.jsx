import React,{lazy} from "react"
import Home from "../views/Home"
import {Navigate} from "react-router-dom"
//import About from "../views/About"
//import User from "../views/User"
import Login from "../views/Login"
import Register from "../views/Login/Register"
const About =lazy(()=>import("../views/About"))
const User =lazy(()=>import("../views/User"))

const Page1 =lazy(()=>import("../views/Page1"))
const Page2 =lazy(()=>import("../views/Page2"))
const Page301 =lazy(()=>import("../views/Page301"))
const PageUpLoad=lazy(()=>import("../views/UpLoad"))

//懒加载模式需要我们给他添加一个Loading组件

/*const withLoadingComponent=(comp:JSX.Element)=>(
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)*/

const withLoadingComponent = (comp) => (
    React.createElement(React.Suspense, { fallback: React.createElement("div", null, "Loading...") }, comp)
  );
  

//Navigate重定向组件
const routes=[
    {
        path:"/",
        element:<Navigate to="/page1"/>
    },
    {
        path:"/",
        element:<Home />,
        children:[
            {
                path:"/page1",
                element: withLoadingComponent(<Page1/>)

            },
            {
                path:"/page2",
                element: withLoadingComponent(<Page2/>)

            },
            {
                path:"/page3/page301",
                element: withLoadingComponent(<Page301/>)

            },
            {
                path:"/page5",
                element: withLoadingComponent(<PageUpLoad/>)

            }
        ]
    },
    {
        path:"/login",
        element: <Login />

    },
    {
        path:"/register",
        element: <Register />
    },
    //访问其他路径的时候直接跳转到首页
    {
        path:"*",
        element:<Navigate to="/page1"/>
    },

    // {
    //     path:"/home",
    //     element:<Home />
    // },
    // {
    //     path:"/about",
    //    // element:<About />
    //    element: withLoadingComponent(<About/>)
    //    //<React.Suspense fallback={<div>Loading...</div>}>
    //     //<About />
    //    //</React.Suspense>
       
    // },
    // {
    //     path:"/user",
    //     //element:<User />
    //     element: withLoadingComponent(<User/>)
    //    //<React.Suspense fallback={<div>Loading...</div>}>
    //     //<User />
    //    //</React.Suspense>
    // },
]
export default routes