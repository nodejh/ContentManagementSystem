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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
            <FormField label="任务描述">
              <textarea placeholder="请填写任务描述，支持 Markdown 语法" rows="5" />
            </FormField>
            <FormField label="开始日期">
              <DateTime
                id="date"
                name="startDate"
              />
            </FormField>
            <FormField label="开始日期">
              <DateTime
                id="id"
                name="endDate"
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
