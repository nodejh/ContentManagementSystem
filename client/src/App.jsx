import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import MenuIcon from 'grommet/components/icons/base/Menu';
import { title } from './utils/constants';
import Sidebar from './components/Sidebar/Sidebar';
import Index from './routes/Index';
import Login from './routes/Login';
import Sign from './routes/Sign';
import Post from './routes/Post';
import User from './routes/User';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
    };
    this.onMenuIconClick = this.onMenuIconClick.bind(this);
    this.onSidebarBackClick = this.onSidebarBackClick.bind(this);
  }


  /**
   * 点击菜单按钮
   * 隐藏 Header，显示 Sidebar
   */
  onMenuIconClick() {
    this.setState({
      showSidebar: true,
    });
  }


  /**
   * 点击 Sidebar 中的返回按钮
   * 隐藏 Sidebar，显示 Header
   */
  onSidebarBackClick() {
    this.setState({
      showSidebar: false,
    });
  }

  render() {
    const { showSidebar } = this.state;
    return (
      <div>
        {
          showSidebar ?
            <Sidebar onSidebarBackClick={this.onSidebarBackClick} /> :
            (
              <div style={{ backgroundColor: '#eee' }}>
                <Header
                  fixed
                  float={false}
                  splash={false}
                >
                  <MenuIcon
                    style={{ cursor: 'pointer', marginLeft: 20 }}
                    onClick={this.onMenuIconClick}
                  />
                  <Title>
                    {title}
                  </Title>
                  <Box
                    flex
                    justify="end"
                    direction="row"
                    responsive={false}
                    style={{ marginRight: 20 }}
                  >
                    <Search
                      inline
                      fill
                      size="medium"
                      placeHolder="请输入您要搜索的内容"
                    />
                  </Box>
                </Header>
                <div style={{ margin: '20px 0 50px 0' }}>
                  <Route exact path="/" component={Index} />
                  <Route path="/login" component={Login} />
                  <Route path="/sign" component={Sign} />
                  <Route path="/post" component={Post} />
                  <Route path="/user" component={User} />
                </div>
              </div>
            )
        }
      </div>
    );
  }
}


export default App;
