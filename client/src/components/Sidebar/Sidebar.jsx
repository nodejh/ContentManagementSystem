import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import UserIcon from 'grommet/components/icons/base/User';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import { title } from './../../utils/constants';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Sidebar colorIndex="neutral-1" size="small" style={{ width: '80%', maxWidth: 300 }}>
        <Header
          pad="medium"
          justify="between"
        >
          <Title
            responsive={false}
            style={{ width: '80%', maxWidth: 280 }}
            onClick={this.props.onSidebarBackClick}
          >
            <LinkPreviousIcon colorIndex="light-1" />
            {title}
          </Title>
        </Header>
        <Box flex="grow" justify="start">
          <Menu primary>
            <Anchor href="#" className="active">
              所有活动
            </Anchor>
            <Anchor href="#">
              我的发布
            </Anchor>
            <Anchor href="#">
              发布活动
            </Anchor>
          </Menu>
        </Box>
        <Footer pad="medium">
          <Button icon={<UserIcon colorIndex="light-1" />} />
        </Footer>
      </Sidebar>
    );
  }
}


App.propTypes = {
  onSidebarBackClick: PropTypes.func.isRequired,
};


export default App;
