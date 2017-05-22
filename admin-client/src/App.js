import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import Home from './components/Home';
import Login from './components/Login';
import Task from './components/Task';
import Sign from './components/Sign';
import './App.css';


const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout style={{ height: '100vh' }}>
          <Sider style={{ overflow: 'auto' }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/" style={{ color: '#fff' }}>
                  <Icon type="home" />
                  <span className="nav-text"> 活动管理</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>后台</Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 350 }}>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/task/:postId" component={Task} />
                <Route exact path="/sign/:taskId" component={Sign} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              ©2016 Created
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
