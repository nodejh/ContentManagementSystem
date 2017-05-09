import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Toast from 'grommet/components/Toast';
import UserInfo from './../components/User/Info';
import UserEdit from './../components/User/Edit';
import { getInfo, isLogin } from './../models/user';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        phone: '',
        name: '',
        school: '',
        major: '',
        introduce: '',
      },
      error: {
        phone: null,
        name: null,
        school: null,
        major: null,
        introduce: null,
      },
      info: {},
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
      loading: false,
      editable: false,
      isNotLogin: false,
    };
    this.checkIsLogin = this.checkIsLogin.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.hideEdit = this.hideEdit.bind(this);
    this.hideToast = this.hideToast.bind(this);
    this.handleGetInfo = this.handleGetInfo.bind(this);
  }


  componentWillMount() {
    this.checkIsLogin();
  }

  componentDidMount() {
    this.handleGetInfo();
  }

  async checkIsLogin() {
    const res = await isLogin();
    if (!res.isLogin) {
      this.setState({ isNotLogin: true });
    }
  }

  async handleGetInfo() {
    const { toast } = this.state;
    let { info } = this.state;
    try {
      const res = await getInfo();
      if (res.success) {
        info = res.info;
      } else if (!res.auth) {
        toast.status = 'critical';
        toast.message = res.message;
        toast.show = true;
      } else {
        toast.status = 'critical';
        toast.message = res.message || '获取个人信息失败，请重试';
        toast.show = true;
      }
    } catch (exception) {
      toast.status = 'critical';
      toast.show = true;
      toast.message = exception.message || '获取个人信息失败，请重试';
    } finally {
      this.setState({ toast, loading: false, info });
    }
  }

  hideToast() {
    const { toast } = this.state;
    toast.show = false;
    this.setState({ toast });
  }

  showEdit() {
    this.setState({ editable: true });
  }

  hideEdit() {
    this.setState({ editable: false });
  }

  render() {
    const { editable, toast, info, isNotLogin } = this.state;
    return (
      <Box justify="center" align="center" wrap style={{ margin: 20 }}>
        { isNotLogin && <Redirect to="/login" /> }
        <Header>
          <Heading>
            个人中心
          </Heading>
        </Header>
        {
          editable ?
            <UserEdit hideEdit={this.hideEdit} info={info} />
            :
            <UserInfo showEdit={this.showEdit} info={info} />
        }

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
      </Box>
    );
  }
}


export default App;
