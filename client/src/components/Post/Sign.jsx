/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import FileUpload from 'react-fileupload';
import TextareaAutosize from 'react-textarea-autosize';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
import Anchor from 'grommet/components/Anchor';
import LikeIcon from 'grommet/components/icons/base/Like';
import UploadIcon from 'grommet/components/icons/base/Upload';
import { sign } from './../../models/post';
import { checkIsImage, checkSize } from './../../utils/file';


class App extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      loading: false,
      isShowSign: false,
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
      error: { // 表单数据错误消息
        description: null,
      },
      form: {
        picture: null,
        description: null,
      },
    };
    this.hideToast = this.hideToast.bind(this);
    this.handleShowSign = this.handleShowSign.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hideToast = this.hideToast.bind(this);
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
   * 打卡任务
   */
  async onSubmit() {
    // console.log('this.state: ', this.state);
    const { form: values, toast, loading } = this.state;
    if (loading) {
      return false;
    }
    const { id } = this.props;
    if (!values.description) {
      const { error } = this.state;
      error.description = '描述不能为空';
      this.setState({ error });
      return false;
    }
    const data = {
      description: values.description,
      picture: values.picture,
      pid: id,
    };
    try {
      console.log('data: ', data);
      this.setState({ loading: true });
      const res = await sign({ values: data });
      if (res.success) {
        toast.show = true;
        toast.message = '打卡成功';
        toast.status = 'ok';
        this.setState({ toast, loading: false, isShowSign: false });
      } else {
        toast.show = true;
        toast.status = 'critical';
        toast.message = '打卡失败，请重试';
        this.setState({ toast, loading: false });
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '打卡失败，请重试';
      this.setState({ toast, loading: false });
    }
    return true;
  }


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
    toast.message = '上传打卡图片成功';
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

  handleShowSign() {
    this.setState({ isShowSign: true });
  }

  hideToast() {
    const { toast } = this.state;
    toast.show = false;
    this.setState({ toast });
  }

  render() {
    const { toast, isShowSign, form, error } = this.state;

    return (
      <div>
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
          !isShowSign && (
            <Button
              icon={<LikeIcon />}
              label="打卡"
              onClick={() => this.handleShowSign()}
              primary
              secondary={false}
              plain={false}
            />
          )
        }

        {
          isShowSign && (
            <Form style={{ width: '100%' }}>
              <FormField label="上传图片">
                <FileUpload options={this.uploadOptions} ref="fileUpload" style={{ padding: 20 }}>
                  <div ref="chooseAndUpload">
                    <Button icon={<UploadIcon />} label="点击上传" />
                    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '80%', position: 'absolute' }}>
                      { form.picture && form.pictureName }
                      </div>
                  </div>
                </FileUpload>
              </FormField>
              <FormField
                label="描述"
                help={
                  <p>支持 <Anchor href="http://wowubuntu.com/markdown/basic.html" target="_blank">Markdown 语法</Anchor>
                  </p>
                }
                error={error.description}
              >
                <TextareaAutosize
                  style={{ marginTop: 20 }}
                  useCacheForDOMMeasurements
                  minRows={5}
                  maxRows={10}
                  onChange={event => this.onDOMChange(event, 'description')}
                />
              </FormField>
              <Footer pad={{ vertical: 'medium' }}>
                <Button
                  label="提交"
                  type="button"
                  primary
                  onClick={this.onSubmit}
                />
              </Footer>
            </Form>
          )
        }
      </div>
    );
  }
}

App.propTypes = {
  id: PropTypes.string.isRequired,
};


export default App;
