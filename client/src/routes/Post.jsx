/* eslint-disable */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loadable from 'react-loading-overlay';
import FileUpload from 'react-fileupload';
import TextareaAutosize from 'react-textarea-autosize';
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
import UploadIcon from 'grommet/components/icons/base/Upload';
import { checkSize, checkIsImage } from './../utils/file';
import { isLogin } from './../models/user';
import { insert } from './../models/post';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isNotLogin: false,
      isPostSuccess: false, // 发布成功，跳转到我的发布列表
      form: {
        picture: null,
        pictureName: null,
        title: null,
        description: null,
        startDate: new Date(),
        endDate: null,
      },
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
      error: { // 表单数据错误消息
        title: null,
        startDate: null,
        endDate: null,
        description: null,
      },
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hideToast = this.hideToast.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
    this.checkUploadImg = this.checkUploadImg.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadFailed = this.handleUploadFailed.bind(this);
    this.uploadOptions = {
      baseUrl: '/api/v0.1/upload',
      multiple: true,
      numberLimit: 1,
      accept: 'image/*',
      chooseAndUpload: true,
      withCredentials: true,
      credentials: 'include',
      wrapperDisplay: 'inline-block',
      beforeUpload: this.checkUploadImg,
      uploading: this.handleUploading,
      uploadSuccess: this.handleUploadSuccess,
      uploadFail: this.handleUploadFailed,
      uploadError: this.handleUploadFailed,
    };
  }


  componentWillMount() {
    this.checkIsLogin();
  }

  /*上传前的信息保存的验证*/
  checkUploadImg(files) {
    const file = files[0];
    const { size, name } = file;
    const { toast, form } = this.state;
    if (!checkIsImage(name)) {
      console.log('toast: ', toast);
      toast.show = true;
      toast.status = 'critical';
      toast.message = '仅支持图片上传';
      this.setState({ toast, loading: false });
      return false;
    }
    if (!checkSize(size)) {
      console.log('toast: ', toast);
      toast.show = true;
      toast.status = 'critical';
      toast.message = '暂不支持上传大于 20M 的文件';
      this.setState({ toast, loading: false });
      return false;
    }
    form.pictureName = name;
    this.setState({ loading: true, form });
    return true;
  }


  /**
   * upload success
   * @param {object} respArr { success, formData, fileType, fileName, message }
   */
  handleUploadSuccess(respArr) {
    console.log('respArr: ', respArr);
    const { toast, form } = this.state;
    form.picture = respArr.fileName;
    toast.show = true;
    toast.message = '上传封面图成功';
    toast.status = 'ok';
    this.setState({ loading: false, toast, form });
  }

  /**
   * upload failed
   * @param err
   */
  handleUploadFailed(err) {
    const { toast } = this.state;
    toast.show = true;
    toast.status = 'critical';
    toast.message = err.message || '上传文件失败，请重试';
    this.setState({ toast, loading: false });
  }


  /**
   * form data change
   * @param event
   * @param key
   */
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
    console.log('value: ', value);
    const { form } = this.state;
    form[key] = new Date(value);
    this.setState({ form });
  }


  /**
   * 发布任务
   */
  async onSubmit() {
    // console.log('this.state: ', this.state);
    const { form: values, toast } = this.state;
    if (!values.title) {
      const { error } = this.state;
      error.title = '标题不能为空';
      this.setState({ error });
      return false;
    }
    if (!values.startDate) {
      const { error } = this.state;
      error.startDate = '开始时间不能为空';
      this.setState({ error });
      return false;
    }
    if (!values.endDate) {
      const { error } = this.state;
      error.endDate = '结束时间不能为空';
      this.setState({ error });
      return false;
    }
    if (!values.description) {
      const { error } = this.state;
      error.description = '描述不能为空';
      this.setState({ error });
      return false;
    }
    const data = {
      title: values.title,
      startDate: values.startDate,
      endDate: values.endDate,
      description: values.description,
    };
    try {
      console.log('data: ', data);
      this.setState({ loading: true });
      const res = await insert({ values: data });
      if (res.success) {
        toast.show = true;
        toast.message = '发布成功';
        toast.status = 'ok';
        this.setState({ toast, loading: false, isPostSuccess: true });
      } else {
        toast.show = true;
        toast.status = 'critical';
        toast.message = '发布失败，请重试';
        this.setState({ toast, loading: false });
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '发布失败，请重试';
      this.setState({ toast, loading: false });
    }
    return true;
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
    const { loading, form, toast, error, isNotLogin, isPostSuccess } = this.state;
    return (
      <Loadable
        active={loading}
        spinner
        animate
        style={loading ? { height: '100%', width: '100%', position: 'fixed' } : { width: '100%' }}
      >
        {isPostSuccess && <Redirect to="/mime" />}
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
        <Box justify="center" align="center" wrap style={{ margin: 20 }}>
          { isNotLogin ? <Redirect to="/login" />
            : (
              <Form>
                <Header>
                  <Heading>
                    发布任务
                  </Heading>
                </Header>
                <FormField label="上传封面图">
                  <FileUpload options={this.uploadOptions} ref="fileUpload" style={{ padding: 20 }}>
                    <div ref="chooseAndUpload">
                      <Button icon={<UploadIcon />} label="点击上传"/>
                      { form.picture && form.pictureName }
                    </div>
                  </FileUpload>
                </FormField>
                <FormFields>
                  <FormField label="任务标题" error={error.title}>
                    <TextInput
                      placeHolder="请填写任务标题"
                      onDOMChange={event => this.onDOMChange(event, 'title')}
                    />
                  </FormField>
                  <FormField label="开始日期" error={error.startDate}>
                    <DateTime
                      id="date"
                      name="startDate"
                      format="MM/DD/YYYY HH:mm:ss"
                      value={form.startDate}
                      onChange={value => this.onDateChange(value, 'startDate')}
                    />
                  </FormField>
                  <FormField label="结束日期" error={error.endDate}>
                    <DateTime
                      id="id"
                      name="endDate"
                      format="MM/DD/YYYY HH:mm:ss"
                      value={form.endDate}
                      onChange={value => this.onDateChange(value, 'endDate')}
                    />
                  </FormField>
                </FormFields>
                <FormField
                  label="任务描述"
                  help={
                    <p>支持 <Anchor href="http://wowubuntu.com/markdown/basic.html" target="_blank">Markdown 语法</Anchor>
                    </p>
                  }
                  error={error.description}
                >
                  <TextareaAutosize
                    style={{ marginTop: 20 }}
                    useCacheForDOMMeasurements
                    minRows={3}
                    maxRows={6}
                    onChange={event => this.onDOMChange(event, 'description')}
                  />
                </FormField>
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
        </Box>
      </Loadable>
    );
  }
}


export default App;
