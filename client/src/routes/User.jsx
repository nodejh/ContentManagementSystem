import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Select from 'grommet/components/Select';


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
    };
    this.onDOMChange = this.onDOMChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
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

  render() {
    const { form, error } = this.state;
    return (
      <Box justify="center" align="center" wrap style={{ margin: 20 }}>
        <Form>
          <Header>
            <Heading>
              个人中心
            </Heading>
          </Header>
          <FormFields>
            <FormField label="手机号" error={error.phone}>
              <TextInput placeHolder="请填写您的手机号" value={form.phone} onDOMChange={event => this.onDOMChange(event, 'phone')} />
            </FormField>
            <FormField label="名字" error={error.name}>
              <TextInput placeHolder="请填写您的名字" value={form.name} onDOMChange={event => this.onDOMChange(event, 'name')} />
            </FormField>
            <FormField label="学校" error={error.school}>
              <TextInput placeHolder="请填写您的学校" value={form.school}onDOMChange={event => this.onDOMChange(event, 'school')} />
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
            <FormField label="个人简介" error={error.introduce}>
              <TextInput placeHolder="请填写您的个人简介" value={form.introduce}onDOMChange={event => this.onDOMChange(event, 'introduce')} />
            </FormField>
          </FormFields>
          <Footer pad={{ vertical: 'medium' }}>
            <Button
              label="更新"
              type="submit"
              primary
              // onClick={...}
            />
          </Footer>
        </Form>
      </Box>
    );
  }
}


export default App;
