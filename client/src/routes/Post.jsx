import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import Anchor from 'grommet/components/Anchor';
import Toast from 'grommet/components/Toast';
import { isLogin } from './../models/user';
import { insert } from './../models/post';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotLogin: false,
      form: {
        title: null,
        description: null,
        startDate: null,
        endDate: null,
      },
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hideToast = this.hideToast.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
  }


  componentWillMount() {
    this.checkIsLogin();
  }

  onDOMChange(event, key) {
    const { form } = this.state;
    form[key] = event.target.value;
    this.setState({ form });
  }

  /**
   * 监听日期点击事件
   * @param {string} value 日期
   * @param {string} key startDate/endDate
   */
  onDateChange(value, key) {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
  }


  /**
   * 发布任务
   */
  async onSubmit() {
    // console.log('this.state: ', this.state);
    const { form: values, toast } = this.state;
    try {
      console.log('values: ', values);
      values.startDate = moment(values.startDate).format();
      values.startDate = moment(values.startDate).format();
      console.log('values: ', values);
      const res = await insert({ values });
      if (res.success) {
        toast.show = true;
        toast.message = '发布成功';
        toast.status = 'ok';
        this.setState({ toast });
      } else {
        toast.show = true;
        toast.status = 'critical';
        toast.message = '发布失败，请重试';
        this.setState({ toast });
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '发布失败，请重试';
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
    const { form, toast, isNotLogin } = this.state;
    return (
      <Box justify="center" align="center" wrap style={{ margin: 20 }}>
        { isNotLogin ? <Redirect to="/login" />
          : (
            <Form>
              <Header>
                <Heading>
                  发布任务
                </Heading>
              </Header>
              <FormFields>
                <FormField label="任务标题">
                  <TextInput
                    placeHolder="请填写任务标题"
                    onDOMChange={event => this.onDOMChange(event, 'title')}
                  />
                </FormField>
                <FormField
                  label="任务描述"
                  help={
                    <p>支持 <Anchor href="http://wowubuntu.com/markdown/basic.html" target="_blank">Markdown 语法</Anchor></p>
                  }
                >
                  <TextInput
                    placeHolder="请填写任务标题"
                    onDOMChange={event => this.onDOMChange(event, 'description')}
                  />
                </FormField>
                <FormField label="开始日期">
                  <DateTime
                    id="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={value => this.onDateChange(value, 'startDate')}
                  />
                </FormField>
                <FormField label="结束日期">
                  <DateTime
                    id="id"
                    name="endDate"
                    value={form.endDate}
                    onChange={value => this.onDateChange(value, 'endDate')}
                  />
                </FormField>
              </FormFields>
              <Footer pad={{ vertical: 'medium' }}>
                <Button
                  label="发布"
                  type="button"
                  primary
                  onClick={this.onSubmit}
                />
              </Footer>
            </Form>
          )
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
