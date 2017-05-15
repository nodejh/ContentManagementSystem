import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
// import { Link } from 'react-router-dom';
// import Card from 'grommet/components/Card';
// import Markdown from 'grommet/components/Markdown';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import FileUpload from 'react-fileupload';
import TextareaAutosize from 'react-textarea-autosize';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import FormField from 'grommet/components/FormField';
// import Anchor from 'grommet/components/Anchor';
import LikeIcon from 'grommet/components/icons/base/Like';
import UploadIcon from 'grommet/components/icons/base/Upload';
import Task from './Task';
import { isTodayTaskSigned, list as taskList, sign as taskSign } from './../../models/task';
import { checkIsImage, checkSize } from './../../utils/file';


class App extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      loading: false,
      isShowSign: false,
      isSigned: false,
      taskTodayId: null,
      // isShowTaskHistory: false,
      list: [],
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
        pictureName: [],
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
    this.getTaskList = this.getTaskList.bind(this);
    this.handleIsSigned = this.handleIsSigned.bind(this);
    // this.showTaskHistory = this.showTaskHistory.bind(this);
    // this.hideTaskHistory = this.hideTaskHistory.bind(this);
    // this.handleGetTodayTask = this.handleGetTodayTask.bind(this);
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
      uploadSuccess: this.handleUploadSuccess,
      uploadFail: this.handleUploadFailed,
      uploadError: this.handleUploadFailed,
    };
  }

  componentWillMount() {
    // this.getTaskList();
    this.getTaskList();
    // this.handleGetTodayTask();
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
   * 打卡活动
   */
  async onSubmit() {
    // console.log('this.state: ', this.state);
    const { form: values, toast, loading, taskTodayId } = this.state;
    if (loading) {
      return false;
    }
    console.log('values.pictureName: ', values.pictureName);
    if (!values.description) {
      const { error } = this.state;
      error.description = '描述不能为空';
      this.setState({ error });
      return false;
    }
    const data = {
      description: values.description,
      picture: values.pictureName.join(','),
      tid: taskTodayId,
    };
    try {
      console.log('data: ', data);
      this.setState({ loading: true });
      const res = await taskSign({ values: data });
      if (res.success) {
        toast.show = true;
        toast.message = '打卡成功';
        toast.status = 'ok';
        this.setState({ toast, loading: false, isShowSign: false }, () => {
          this.getTaskList();
        });
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


  /**
   * get post task list by post id
   * @return {Promise.<void>}
   */
  async getTaskList() {
    const { toast } = this.state;
    const { id } = this.props;
    try {
      // console.log('taskList: ', taskList);
      const res = await taskList(id);
      // console.log('res: ', res);
      if (res.success) {
        const taskToday = res.list.filter((item) => {
          console.log('item: ', item);
          return new Date(item.datetime).toLocaleDateString() === new Date().toLocaleDateString();
        });
        let taskTodayId = null;
        if (taskToday.length > 0) {
          taskTodayId = taskToday[0].id;
        }
        this.setState({ list: res.list, taskTodayId }, () => {
          this.handleIsSigned(taskTodayId);
        });
      } else {
        toast.show = true;
        toast.status = 'critical';
        toast.message = res.message || '获取任务表失败，请重新进入该页面';
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '获取任务表失败，请重新进入该页面';
      this.setState({ toast });
    }
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
    // form.pictureName = form.pictureName.push(name);
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
    form.pictureName.push(respArr.fileName);
    toast.show = true;
    toast.message = '上传打卡图片成功';
    toast.status = 'ok';
    this.setState({ loading: false, toast, form });
  }


  // showTaskHistory() {
  //   this.setState({ isShowTaskHistory: true });
  // }
  //
  // hideTaskHistory() {
  //   this.setState({ isShowTaskHistory: false });
  // }

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
   * check if is sign
   * @param {string|number} todayTaskId
   * @return {Promise.<boolean>}
   */
  async handleIsSigned(todayTaskId) {
    const { toast } = this.state;
    try {
      const res = await isTodayTaskSigned(todayTaskId);
      console.log('res: ', res);
      if (res.success) {
        if (res.isTodayTaskSigned) {
          this.setState({ isSigned: true });
        } else {
          this.setState({ isSigned: false });
        }
      } else {
        toast.status = 'critical';
        toast.show = true;
        toast.message = res.message || '获取今日任务失败，请刷新重试';
        this.setState({ toast });
      }
    } catch (exception) {
      console.log('exception: ', exception);
      toast.status = 'critical';
      toast.show = true;
      toast.message = exception.message || '获取今日任务失败，请刷新重试';
      this.setState({ toast });
    }
    return true;
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
    const { toast, isShowSign, form, error, taskTodayId, list, isSigned } = this.state;
    console.log('form: ', form);
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
          !taskTodayId && <p>今日任务暂未发布</p>
        }

        {
          !isShowSign && taskTodayId && (
            isSigned ?
              <Button
                icon={<LikeIcon />}
                label="已打卡"
                primary
                secondary={false}
                plain={false}
              />
              :
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
          isShowSign && taskTodayId && (
            <Form style={{ width: '100%' }}>
              <FormField label="上传图片(可上传多张)">
                <FileUpload options={this.uploadOptions} ref="fileUpload" style={{ padding: 20 }}>
                  <div ref="chooseAndUpload">
                    <Button icon={<UploadIcon />} label="点击上传" />
                    <div
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        width: '80%',
                        position: 'absolute',
                      }}
                    >
                      { form.picture && form.pictureName.join('\n') }
                    </div>
                  </div>
                </FileUpload>
              </FormField>
              <FormField
                label="描述"
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

        <Task list={list} id={this.props.id} />
      </div>
    );
  }
}

App.propTypes = {
  id: PropTypes.string.isRequired,
};


export default App;
