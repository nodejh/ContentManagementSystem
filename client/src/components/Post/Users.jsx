import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toast from 'grommet/components/Toast';
import UserIcon from 'grommet/components/icons/base/User';
import Anchor from 'grommet/components/Anchor';
import { users } from './../../models/post';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], // joined user's list of this post
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
    };
    this.getUsers = this.getUsers.bind(this);
  }

  componentWillMount() {
    this.getUsers();
  }

  async getUsers() {
    const { toast } = this.state;
    const { id } = this.props;
    try {
      const res = await users(id);
      if (res.success) {
        this.setState({ users: res.users });
      } else {
        toast.status = 'critical';
        toast.show = true;
        toast.message = res.message || '获取加入该活动的用户失败，请刷新重试';
        this.setState({ toast });
      }
    } catch (exception) {
      console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '获取加入该活动的用户失败，请刷新重试';
      this.setState({ toast });
    }
  }


  render() {
    const { users: stateUsers, toast } = this.state;
    return (
      <div>
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
        <div style={{ display: 'inline', margin: '3px 7px' }}>
          <UserIcon size="xsmall" /><span>{stateUsers.length}人</span>
        </div>
        {stateUsers.map((item, index) => {
          console.log('item: ', item);
          return (
            // eslint-disable-next-line
            <div style={{ display: 'inline' }} key={index}>
              <Anchor
                label={item.name ? item.name : '无名'}
                href="#"
                style={{ margin: 3 }}
              />
              {index === stateUsers.length - 1 ? '' : '、'}
            </div>
          );
        })}
      </div>
    );
  }
}


App.propTypes = {
  id: PropTypes.string.isRequired,
};


export default App;
