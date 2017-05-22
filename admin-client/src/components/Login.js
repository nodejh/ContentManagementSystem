import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';
import {login} from './../models/login';

const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isLoginSuccess: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.handleLogin(values);
      }
    });
  };

  async handleLogin(payload) {
    try {
      const res = await login(payload);
      if (res.success) {
        message.success('登陆成功');
        this.setState({ isLoginSuccess: true });
      } else {
        message.error(res.message);
      }
    } catch (exception) {
      console.log('exception: ', exception.message);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoginSuccess } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
            登陆
          </Button>
        </FormItem>

        {
          isLoginSuccess ? <Redirect to="/"/> : ''
        }
      </Form>
    );
  }
}


export default  Form.create()(NormalLoginForm);
