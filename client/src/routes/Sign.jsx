import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
import { sign } from '../models/user';


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
    };
    this.onDOMChange = this.onDOMChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onGetCode = this.onGetCode.bind(this);
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

  onSubmit() {
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
    if (code.length !== 4) {
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
    this.handleSign({ phone, password, code });
    return true;
  }


  /**
   * 获取短信验证码
   */
  onGetCode(event) {
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
    const { toast } = this.state;
    toast.message = '验证码已发送至您的手机，请注意查收';
    toast.show = true;
    this.setState({ toast });
    return true;
  }

  /**
   * 登录操作
   * @param {object} payload { phone, password }
   * @return {Promise.<void>} null
   */
  async handleSign(payload) {
    this.setState({ loading: true });
    try {
      const res = await sign(payload);
      console.log('res: ', res);
      this.setState({ loading: false });
    } catch (e) {
      console.log('e: ', e);
      this.setState({ loading: false });
    }
  }


  render() {
    const { error, toast } = this.state;
    return (
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
              secondary={false}
              accent={false}
              critical={false}
              plain={false}
            />
          </Footer>
        </Form>
        <Link to="/sign" style={{ marginTop: 20 }}>已有账号？登录</Link>
        {
          toast.show ? (
            <Toast
              status={toast.status}
            >
              {toast.message}
            </Toast>
          ) : null
        }
      </Box>
    );
  }
}


export default App;
