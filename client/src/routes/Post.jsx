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
import DateTime from 'grommet/components/DateTime';
import Anchor from 'grommet/components/Anchor';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        startDate: null,
        endDate: null,
      },
    };
    this.onDateChange = this.onDateChange.bind(this);
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

  render() {
    const { form } = this.state;
    return (
      <Box justify="center" align="center" wrap style={{ margin: 20 }}>
        <Form>
          <Header>
            <Heading>
              发布任务
            </Heading>
          </Header>
          <FormFields>
            <FormField label="任务标题">
              <TextInput placeHolder="请填写任务标题" />
            </FormField>
            <FormField
              label="任务描述"
              help={
                <p>支持 <Anchor href="http://wowubuntu.com/markdown/basic.html" target="_blank">Markdown 语法</Anchor></p>
              }
            >
              <textarea placeholder="请填写任务描述" rows="5" />
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
