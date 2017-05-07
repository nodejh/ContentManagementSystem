import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import LoginIcon from 'grommet/components/icons/base/Login';
import { regexpPhone } from './../utils/constants';
import { login } from '../models/user';


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
      },
    };
    this.onDOMChange = this.onDOMChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { phone, password } = this.state.form;
    if (!regexpPhone.test(phone)) {
      const { error } = this.state;
      error.phone = '手机号格式错误';
      this.setState({ error });
      return false;
    }
    if (password.length < 6) {
      const { error } = this.state;
      error.password = '密码不小于 6 位';
      this.setState({ error });
      return false;
    }
    this.handleLogin({ phone, password });
    return true;
  }

  /**
   * 登录操作
   * @param {object} payload { phone, password }
   * @return {Promise.<void>} null
   */
  async handleLogin(payload) {
    this.setState({ loading: true });
    try {
      const res = await login(payload);
      console.log('res: ', res);
      this.setState({ loading: false });
    } catch (e) {
      console.log('e: ', e);
      this.setState({ loading: false });
    }
  }


  render() {
    const { error } = this.state;
    return (
      <Box justify="center" align="center" wrap style={{ margin: 20 }}>
        <Form>
          <Header>
            <Heading>
              登录
            </Heading>
          </Header>
          <FormField label="手机号" error={error.phone}>
            <TextInput
              placeHolder="请输入您的手机号"
              onDOMChange={event => this.onDOMChange(event, 'phone')}
            />
          </FormField>
          <FormField label="密码" error={error.password}>
            <TextInput
              type="password"
              onDOMChange={event => this.onDOMChange(event, 'password')}
              placeHolder="请输入您的密码"
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
        <Link to="/sign" style={{ marginTop: 20 }}>没有账号？注册</Link>
      </Box>
    );
  }
}


export default App;
