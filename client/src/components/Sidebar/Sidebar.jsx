import React, { Component } from 'react';
import PropTypes from 'prop-types';
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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // eslint-disable-next-line
    console.log(' this.context: ', this.context);
    // eslint-disable-next-line
    const pathname = window.location.pathname;
    return (
      <Sidebar
        colorIndex="neutral-1" size="small"
        fixed
        full
      >
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
              所有任务
            </Anchor>
            <Anchor href="/post" className={pathname === '/post' && 'active'}>
              发布任务
            </Anchor>
            <Anchor href="/mime" className={pathname === '/mime' && 'active'}>
              我的发布
            </Anchor>
            <Anchor href="/join" className={pathname === '/join' && 'active'}>
              我的参与
            </Anchor>
            <Anchor href="/user" className={pathname === '/user' && 'active'}>
              个人中心
            </Anchor>
          </Menu>
        </Box>
        <Footer pad="medium">
          <Anchor href="/login">
            登录
            <LogoutIcon colorIndex="light-1" style={{ cursor: 'pointer' }} />
          </Anchor>
        </Footer>
      </Sidebar>
    );
  }
}


App.propTypes = {
  onSidebarBackClick: PropTypes.func.isRequired,
};


export default App;
