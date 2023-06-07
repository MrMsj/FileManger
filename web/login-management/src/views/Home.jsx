import { Breadcrumb, Layout,theme } from 'antd';
import { useState } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import MainMenu from "@/components/MainMenu"
const { Header, Content, Footer, Sider } = Layout;

const View = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //const navigateTo=useNavigate()
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <MainMenu></MainMenu>
      </Sider>
      <Layout className="site-layout">
       
        <Content
          style={{
            margin: '16px 16px 0',
          }}
          className="site-layout-background"
        >
            <Outlet/>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            padding:0,
            lineHeight:"48px",
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
};
export default View;