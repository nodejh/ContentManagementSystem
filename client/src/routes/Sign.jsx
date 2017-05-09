import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loadable from 'react-loading-overlay';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Toast from 'grommet/components/Toast';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import LoginIcon from 'grommet/components/icons/base/Login';
import { regexpPhone } from './../utils/constants';
import { getCode, sign } from './../models/user';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: { // 表单数据
        phone: '', // 用户输入的电话号码
        password: '', // 用户输入的密码
      },
      error: { // 表单数据错误消息
        phone: null,
        password: null,
        code: null,
      },
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
      loading: false,
      isSignSuccess: false,
    };
    this.onDOMChange = this.onDOMChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onGetCode = this.onGetCode.bind(this);
    this.hideToast = this.hideToast.bind(this);
  }


  /**
   * 监听输入框 DOM 改变事件，并获取输入框的值，更新 state
   * @param {object} event DOM 事件
   * @param {string} key  需要更新的 state 的 key
   */
  onDOMChange(event, key) {
    const { value } = event.target;
    const { form, error } = this.state;
    form[key] = value;
    error[key] = null;
    this.setState({ form });
  }

  async onSubmit() {
    const { phone, password, code } = this.state.form;
    if (!regexpPhone.test(phone)) {
      const { error } = this.state;
      error.phone = '手机号格式错误';
      this.setState({ error });
      return false;
    }
    if (!code) {
      const { error } = this.state;
      error.code = '请填写验证码';
      this.setState({ error });
      return false;
    }
    if (code.length !== 6) {
      const { error } = this.state;
      error.code = '请填写正确的验证码';
      this.setState({ error });
      return false;
    }
    if (password.length < 6) {
      const { error } = this.state;
      error.password = '密码不小于 6 位';
      this.setState({ error });
      return false;
    }
    const { toast } = this.state;
    let isSignSuccess = this.state;
    this.setState({ loading: true });
    try {
      const res = await sign({ phone, password, code });
      // console.log('res: ', res);
      if (res.success) {
        toast.status = 'ok';
        toast.message = '注册成功';
        isSignSuccess = true;
      } else {
        isSignSuccess = false;
        toast.status = 'critical';
        toast.message = res.message;
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      isSignSuccess = false;
      toast.status = 'critical';
      toast.message = exception.message || '注册失败，请重试';
    } finally {
      toast.show = true;
      this.setState({ toast, loading: false, isSignSuccess });
    }
    return true;
  }


  /**
   * 获取短信验证码
   */
  async onGetCode(event) {
    // 阻止默认事件和冒泡
    event.preventDefault();
    event.stopPropagation();
    const { phone } = this.state.form;
    if (!phone) {
      const { error } = this.state;
      error.phone = '请填写手机号';
      this.setState({ error });
      return false;
    }
    if (!regexpPhone.test(phone)) {
      const { error } = this.state;
      error.phone = '手机号格式错误';
      this.setState({ error });
      return false;
    }

    this.setState({ loading: true });
    const { toast } = this.state;
    try {
      const res = await getCode(phone);
      if (res.success) {
        toast.status = 'ok';
        toast.message = '验证码已发送至您的手机，请注意查收';
      } else {
        toast.status = 'critical';
        toast.message = res.message;
      }
    } catch (exception) {
      toast.status = 'critical';
      toast.message = exception.message || '验证码发送失败，请重试';
    } finally {
      toast.show = true;
      this.setState({ toast, loading: false });
    }
    return true;
  }


  hideToast() {
    const { toast } = this.state;
    toast.show = false;
    this.setState({ toast });
  }


  render() {
    const { error, toast, loading, isSignSuccess } = this.state;
    // console.log('toast: ', toast);
    return (
      <Loadable
        active={loading}
        spinner
        animate
        style={{ height: '100%', width: '100%', position: 'fixed' }}
      >
        <Box justify="center" align="center" wrap style={{ margin: 20 }}>
          <Form>
            <Header>
              <Heading>
                注册
              </Heading>
            </Header>
            <FormField label="手机号" error={error.phone}>
              <TextInput
                placeHolder="请输入您的手机号"
                onDOMChange={event => this.onDOMChange(event, 'phone')}
              />
            </FormField>
            <FormField label="验证码" error={error.code}>
              <Box
                direction="row"
                justify="between"
                align="center"
                margin="medium"
                wrap={false}
                reverse={false}
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                  display: 'flex',
                  flexWrap: 'nowrap',
                  flexDirection: 'row',
                }}
              >
                <TextInput
                  type="password"
                  onDOMChange={event => this.onDOMChange(event, 'code')}
                  style={{ display: 'flex', flex: 1 }}
                />
                <Button
                  label="获取验证码"
                  onClick={this.onGetCode}
                  primary={false}
                  accent={false}
                  secondary={false}
                  plain
                  style={{
                    display: 'flex', flex: 1, fontSize: '.8em',
                  }}
                />
              </Box>
            </FormField>
            <FormField label="设置密码" error={error.password}>
              <TextInput
                type="password"
                onDOMChange={event => this.onDOMChange(event, 'password')}
                placeHolder="请设置您的密码"
              />
            </FormField>
            <Footer pad={{ vertical: 'medium' }}>
              <Button
                icon={<LoginIcon />}
                label="注册"
                onClick={this.onSubmit}
                primary
                type="button"
                secondary={false}
                accent={false}
                critical={false}
                plain={false}
              />
            </Footer>
          </Form>
          <Link to="/login" style={{ marginTop: 20 }}>已有账号？登录 {toast.show}</Link>
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

          {
            isSignSuccess && <Redirect to="/user" />
          }
        </Box>
      </Loadable>
    );
  }
}


export default App;
