import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Select from 'grommet/components/Select';
import Toast from 'grommet/components/Toast';
import { update } from './../../models/user';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: this.props.info,
      error: {
        phone: null,
        name: null,
        school: null,
        major: null,
        introduce: null,
      },
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
      loading: false,
    };
    this.onDOMChange = this.onDOMChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  /**
   * 监听日期点击事件
   * @param {string} value 日期
   * @param {string} key startDate/endDate
   */
  onSelectChange(event, key) {
    console.log('value: ', event.value);
    const { form, error } = this.state;
    form[key] = event.value;
    error[key] = null;
    this.setState({ form });
  }

  async handleSubmit() {
    const { form, toast } = this.state;
    try {
      console.log('form: ', form);
      delete form.datetime;
      delete form.id;
      console.log('form: ', form);
      const res = await update({ values: form });
      if (res.success) {
        toast.status = 'ok';
        toast.message = '更新个人信息成功';
        toast.show = true;
        this.setState({ toast }, () => {
          this.props.hideEdit();
        });
      } else {
        toast.status = 'critical';
        toast.message = res.message;
        toast.show = true;
        this.setState({ toast });
      }
    } catch (exception) {
      console.log('exception: ', exception);
      toast.status = 'critical';
      toast.message = exception.message || '更新个人信息失败';
      toast.show = true;
      this.setState({ toast });
    }
  }

  hideToast() {
    const { toast } = this.state;
    toast.show = false;
    this.setState({ toast });
  }

  render() {
    const { form, error, toast } = this.state;
    return (
      <Form>
        <FormFields>
          <FormField label="姓名" error={error.name}>
            <TextInput
              placeHolder="请填写您的姓名"
              value={form.name}
              onDOMChange={event => this.onDOMChange(event, 'name')}
            />
          </FormField>
          <FormField label="性别" error={error.major}>
            <Select
              placeHolder="请选择您的性别"
              multiple={false}
              inline={false}
              options={['男', '女']}
              value={form.gender}
              onChange={event => this.onSelectChange(event, 'gender')}
            />
          </FormField>
          <FormField label="学校" error={error.school}>
            <TextInput
              placeHolder="请填写您的学校" value={form.school}
              onDOMChange={event => this.onDOMChange(event, 'school')}
            />
          </FormField>
          <FormField label="专业" error={error.major}>
            <Select
              placeHolder="请选择您的专业"
              multiple={false}
              inline={false}
              options={['理', '工', '农', '医', '商']}
              value={form.major}
              onChange={event => this.onSelectChange(event, 'major')}
            />
          </FormField>
          <FormField label="个人简介" error={error.introduce} className="FixItem">
            <TextareaAutosize
              style={{ marginTop: 20 }}
              useCacheForDOMMeasurements
              minRows={3}
              maxRows={6}
              value={form.introduce}
              onChange={event => this.onDOMChange(event, 'introduce')}
            />
          </FormField>
        </FormFields>
        <Footer pad={{ vertical: 'medium' }}>
          <Button
            label="更新"
            type="button"
            primary
            onClick={this.handleSubmit}
          />
        </Footer>

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
      </Form>
    );
  }
}


App.propTypes = {
  hideEdit: PropTypes.func.isRequired,
  // eslint-disable-next-line
  info: PropTypes.object.isRequired,
};


export default App;
