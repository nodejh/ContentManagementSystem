import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Toast from 'grommet/components/Toast';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import { title } from './../../utils/constants';
import { logout, isLogin } from './../../models/user';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      redirectToLogin: false,
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.hideToast = this.hideToast.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
  }

  componentWillMount() {
    this.checkIsLogin();
  }

  async handleLogout() {
    const { toast } = this.state;
    try {
      const res = await logout();
      if (res.success) {
        console.log('res: ', res);
        this.setState({ redirectToLogin: true });
      } else {
        toast.show = true;
        toast.status = 'critical';
        toast.message = res.message || '退出登录失败，请重试';
        this.setState({ toast });
      }
    } catch (exception) {
      console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '退出登录失败，请重试';
      this.setState({ toast });
    }
  }


  hideToast() {
    const { toast } = this.state;
    toast.show = false;
    this.setState({ toast });
  }


  async checkIsLogin() {
    const res = await isLogin();
    if (res.isLogin) {
      this.setState({ isLogin: true });
    }
  }

  render() {
    // eslint-disable-next-line
    console.log(' this.context: ', this.context);
    // eslint-disable-next-line
    const pathname = window.location.pathname;
    const { isLogin: stateIsLogin, redirectToLogin, toast } = this.state;
    return (
      <Sidebar
        colorIndex="neutral-1" size="small"
        fixed
        full
      >
        {
          toast.show && (
            <Toast
              status={toast.status}
              onClose={this.hideToast}
            >
              {toast.message}
            </Toast>
          )
        }
        <Header
          pad="medium"
          justify="between"
        >
          <Title
            responsive={false}
            onClick={this.props.onSidebarBackClick}
          >
            <LinkPreviousIcon colorIndex="light-1" />
            {title}
          </Title>
        </Header>
        <Box flex="grow" justify="start">
          <Menu primary>
            <Anchor href="/" className={pathname === '/' && 'active'}>
              所有活动
            </Anchor>
            <Anchor href="/post" className={pathname === '/post' && 'active'}>
              发布活动
            </Anchor>
            <Anchor href="/myPost" className={pathname === '/myPost' && 'active'}>
              我的发布
            </Anchor>
            <Anchor href="/myJoin" className={pathname === '/join' && 'active'}>
              我的参与
            </Anchor>
            <Anchor href="/user" className={pathname === '/user' && 'active'}>
              个人中心
            </Anchor>
          </Menu>
        </Box>
        <Footer pad="medium">
          {
            stateIsLogin ?
              (
                <LogoutIcon
                  colorIndex="light-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handleLogout()}
                />
              )
              :
              (
                <Anchor href="/login">
                  登录
                </Anchor>
              )
          }
          {
            redirectToLogin && <Redirect to="/login" />
          }
        </Footer>
      </Sidebar>
    );
  }
}


App.propTypes = {
  onSidebarBackClick: PropTypes.func.isRequired,
};


export default App;
