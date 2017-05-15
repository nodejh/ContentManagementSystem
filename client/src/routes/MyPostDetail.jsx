import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Card from 'grommet/components/Card';
import Toast from 'grommet/components/Toast';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import UserIcon from 'grommet/components/icons/base/User';
import Markdown from 'grommet/components/Markdown';
import TaskList from './../components/MyPost/TaskList';
import { detailById, users } from './../models/post';
import { isLogin } from './../models/user';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJoin: false,
      users: [], // joined user's list of this post
      getTaskList: [], // task list for this post
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
      post: {},
      isNotLogin: false,
    };

    this.getPostDetailById = this.getPostDetailById.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.hideToast = this.hideToast.bind(this);
  }


  componentWillMount() {
    this.checkIsLogin();
    this.getUsers();
  }


  componentDidMount() {
    this.getPostDetailById();
  }


  /**
   * get post details by post id
   * @return {Promise.<boolean>}
   */
  async getPostDetailById() {
    const { toast } = this.state;
    const { id } = this.props.match.params;
    if (!id) {
      toast.status = 'critical';
      toast.show = true;
      toast.message = '参数错误，请重新进入该页面';
      this.setState({ toast });
      return false;
    }
    try {
      const res = await detailById(id);
      if (res.success) {
        this.setState({ post: res.post || {} });
      } else {
        toast.status = 'critical';
        toast.show = true;
        toast.message = '获取活动详情失败，请重试';
        this.setState({ toast });
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '获取活动详情失败，请重试';
      this.setState({ toast });
    }
    return true;
  }


  /**
   * get joined users by post id (id from router)
   * @return {Promise.<void>}
   */
  async getUsers() {
    const { toast } = this.state;
    const { id } = this.props.match.params;
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
      // console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '获取加入该活动的用户失败，请刷新重试';
      this.setState({ toast });
    }
  }


  async checkIsLogin() {
    const res = await isLogin();
    if (!res.isLogin) {
      this.setState({ isNotLogin: true });
    }
  }


  hideToast() {
    const { toast } = this.state;
    toast.show = false;
    this.setState({ toast });
  }

  render() {
    const {
      toast,
      post,
      isNotLogin,
      users: stateUsers,
    } = this.state;
    const { id } = this.props.match.params;
    return (
      <div>
        <Box
          direction="column"
          align="center"
          alignContent="center"
          justify="center"
          wrap
        >
          { isNotLogin && <Redirect to="/login" /> }
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

          <Image src={post.picture && `/upload/album/${post.picture}`} />
          <Card
            // thumbnail={post.picture && `/upload/album/${post.picture}`}
            label={
              (
                <p>
                  {moment(post.start_date).format('YYYY/M/D')}
                  <span style={{ fontSize: '.7em', fontWeight: 100, marginRight: 3, marginLeft: 3 }}>至</span>
                  {moment(post.end_date).format('YYYY/M/D')}
                </p>
              )
            }
            heading={post.title}
            description={
              <Markdown
                content={post.description}
              />
            }
            headingStrong
            style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
          />
          <div style={{ marginTop: 10, marginBottom: 20, textAlign: 'left' }}>
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
          <div style={{ width: '90%', maxWidth: 500 }}>
            <TaskList id={id} />
          </div>
        </Box>
      </div>
    );
  }
}


App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


export default App;
