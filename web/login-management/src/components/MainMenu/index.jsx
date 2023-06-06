import { TeamOutlined,DesktopOutlined,FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu} from 'antd';
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

// function getItem(label, key, icon, children) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//     };
//   }
//   const items = [
//     getItem('Option 1', '/page1', <PieChartOutlined />),
//     getItem('Option 2', '/page2', <DesktopOutlined />),
//     getItem('User', 'page3', <UserOutlined />, [
//       getItem('Tom', '3'),
//       getItem('Bill', '4'),
//       getItem('Alex', '5'),
//     ]),
//     getItem('Team', 'page4', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//     getItem('Files', '9', <FileOutlined />),
//   ];

const items=[
    {
        label:'栏目1',
        key:'/page1',
        icon:<PieChartOutlined />
    },
    {
        label:'栏目2',
        key:'/page2',
        icon:<DesktopOutlined />
    },
    {
        label:'栏目3',
        key:'page3',
        icon:<UserOutlined />,
        children:[
            {
                label:'栏目301',
                key:'/page3/page301',
                
            },
            {
                label:'栏目302',
                key:'/page3/page302',
            },
            {
                label:'栏目303',
                key:'/page3/page303',
            },
        ]
    },
    {
        label:'栏目4',
        key:'page4',
        icon:<TeamOutlined />,
        children:[
            {
                label:'栏目401',
                key:'/page4/page401',
                
            },
            {
                label:'栏目402',
                key:'/page4/page402',
            },         
        ]
    },
    {
        label:'上传文件',
        key:'/page5',
        icon: <FileOutlined />
    },

]
  const Comp = () => {
  const navigateTo=useNavigate()
  const currentRoute=useLocation();
  console.log("-------",currentRoute.pathname);
  const menuClick = (e) => {
    //点击跳转到对应的路由
    console.log("点击了菜单", e.key);
    navigateTo(e.key)
  };

  let firstOpenKey="";

  function findKey(obj){
    return obj.key===currentRoute.pathname
  }

  for(let i=0;i<items.length;i++){
    if(items[i]['children']&&items[i]['children'].length>0&&items[i]['children'].find(findKey)){
        firstOpenKey=items[i].key;
        break;
    }
  }

  const [openKeys,setOpenKeys] = useState([firstOpenKey]);

  const handleOpenChange=(keys)=>{
    //展开和回收某项菜单的时候执行这里的代码
    console.log(keys)

    setOpenKeys([keys[keys.length-1]])
  }

  return(
    <Menu theme="dark" 
        //表示当前样式所在的选中项key
        defaultSelectedKeys={[currentRoute.pathname]}
         mode="inline" 
         items={items} 
         onClick={menuClick}
         onOpenChange={handleOpenChange}
         //当前菜单展开项的key数组
         openKeys={openKeys}
         />
  )
  }
  export default Comp;