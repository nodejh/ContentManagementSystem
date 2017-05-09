import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Card from 'grommet/components/Card';
import Toast from 'grommet/components/Toast';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';
import { detailById } from './../models/post';
import { isLogin } from './../models/user';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }


  componentWillMount() {
    this.checkIsLogin();
  }


  componentDidMount() {
    this.getPostDetailById();
  }

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
        toast.message = '获取任务详情失败，请重试';
        this.setState({ toast });
      }
    } catch (exception) {
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '获取任务详情失败，请重试';
      this.setState({ toast });
    }
    return true;
  }

  async checkIsLogin() {
    const res = await isLogin();
    if (!res.isLogin) {
      this.setState({ isNotLogin: true });
    }
  }

  render() {
    const { toast, post, isNotLogin } = this.state;
    return (
      <Box
        direction="row"
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

        <Card
          thumbnail={post.picture && `/upload/album/${post.picture}`}
          label={
            (
              <p>
                {moment(post.start_date).format('YYYY/M/D h:mm:ss')}
                <span style={{ fontSize: '.7em', fontWeight: 100, marginRight: 3, marginLeft: 3 }}>至</span>
                {moment(post.end_date).format('YYYY/M/D h:mm:ss')}
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
      </Box>
    );
  }
}


export default App;
