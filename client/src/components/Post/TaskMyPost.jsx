import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loadable from 'react-loading-overlay';
// import Markdown from 'grommet/components/Markdown';
// import TextareaAutosize from 'react-textarea-autosize';
// import Form from 'grommet/components/Form';
// import FormFields from 'grommet/components/FormFields';
// import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import Card from 'grommet/components/Card';
// import AddIcon from 'grommet/components/icons/base/Add';
import { list as taskList, add as taskAdd } from './../../models/task';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isShowTaskHistory: false,
      isShowTodaySignList: false,
      todaySignList: [],
      list: [],
      form: { content: null },
      error: { content: null },
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
    };
    this.onDOMChange = this.onDOMChange.bind(this);
    this.showTaskHistory = this.showTaskHistory.bind(this);
    this.hideTaskHistory = this.hideTaskHistory.bind(this);
    this.getTaskList = this.getTaskList.bind(this);
    this.hideToast = this.hideToast.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }


  componentWillMount() {
    this.getTaskList();
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
        this.setState({ list: res.list });
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

  showTaskHistory() {
    this.setState({ isShowTaskHistory: true });
  }

  hideTaskHistory() {
    this.setState({ isShowTaskHistory: false });
  }


  /**
   * add task
   * @param {number|string} id post id
   */
  async handleAddTask() {
    const { id } = this.props; // post id
    // console.log('id: ', id);
    const { form, toast } = this.state;
    if (!form.content) {
      const { error } = this.state;
      error.content = '任务描述不能为空';
      this.setState({ error });
      return false;
    }
    const data = { ...form, pid: id };
    this.setState({ loading: true });
    try {
      const res = await taskAdd({ values: data });
      if (res.success) {
        toast.show = true;
        toast.message = '发布成功';
        toast.status = 'ok';
        this.setState({ toast, loading: false }, () => {
          // get task list again
          this.getTaskList();
        });
      } else {
        toast.show = true;
        toast.message = '发布失败，请重试';
        toast.status = 'critical';
        this.setState({ toast, loading: false });
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      toast.show = true;
      toast.message = '发布失败，请重试';
      toast.status = 'critical';
      this.setState({ toast, loading: false });
    }
    return true;
  }


  // /**
  //  * get sign list of task
  //  * @param {number|string} id task id
  //  */
  // async handleGetSignList(id) {
  //   console.log('id: ', id);
  //   const { toast } = this.state;
  //   this.setState({ loading: true });
  //   try {
  //     const res = await signList(id);
  //     if (res.success) {
  // eslint-disable-next-line
  //       this.setState({ todaySignList: res.signList, loading: false, isShowTodaySignList: true });
  //     } else {
  //       toast.show = true;
  //       toast.message = '获取打卡列表失败，请重试';
  //       toast.status = 'critical';
  //       this.setState({ toast, loading: false });
  //     }
  //   } catch (exception) {
  //     console.log('exception: ', exception);
  //     toast.show = true;
  //     toast.message = '获取打卡列表失败，请重试';
  //     toast.status = 'critical';
  //     this.setState({ toast, loading: false });
  //   }
  //   this.setState({ });
  // }


  hideToast() {
    const { toast } = this.state;
    toast.show = false;
    this.setState({ toast });
  }

  render() {
    const { loading, toast, list,
      isShowTaskHistory, isShowTodaySignList, todaySignList }
      = this.state;
    console.log('todaySignList: ', todaySignList);
    let taskToday = null;
    const taskHistory = list.filter((item) => {
      if (new Date(item.datetime).toLocaleDateString() === new Date().toLocaleDateString()) {
        taskToday = item;
        return false;
      }
      return true;
    });
    console.log('isShowTaskHistory: ', isShowTaskHistory);
    console.log('taskToday: ', taskToday);
    console.log('taskHistory: ', taskHistory);
    return (
      <Loadable
        active={loading}
        spinner
        animate
        style={loading ? { height: '100%', width: '100%', position: 'fixed' } : { width: '100%' }}
      >
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
          taskToday && (
            <div style={{ border: '1px solid #eee', margin: '20px auto' }}>
              <Card
                label="今日任务"
                description={(
                  <div>
                    <div style={{ margin: 10 }}>
                      <pre>{taskToday.content}</pre>
                    </div>
                    <span style={{ fontSize: '.8em' }}>
                      发布于{moment(taskToday.datetime).format('MM/DD/YYYY h:mm:ss')}
                    </span>
                  </div>
                )}
              />
              <Link
                to={`/signList/${taskToday.id}`}
                style={{ margin: '20px 10px' }}
              >
                 打卡列表
               </Link>
              { isShowTodaySignList && (todaySignList.length === 0 ?
                <p style={{ width: '100%', margin: 10 }}>暂无打卡记录</p>
                :
                todaySignList.map(itemSign => (
                  <div key={itemSign.id} style={{ width: '100%', margin: 10 }}>
                    <Card
                      thumbnail={itemSign.picture && `/upload/album/${itemSign.picture}`}
                      label={`${itemSign.name ? itemSign.name : '匿名'} ${moment(itemSign.date).format('YYYY/M/D h:mm:ss')}`}
                      description={(
                        <pre>{itemSign.description}</pre>
                      )}
                      style={{ border: '1px solid #eee' }}
                    />
                  </div>
                )))}
            </div>
          )
        }

        {
          isShowTaskHistory && (taskHistory.length === 0 ?
            '暂无历史任务'
            :
            taskHistory.map(item => (
              <div key={item.id} style={{ border: '1px solid #eee', margin: '20px auto' }}>
                <Card
                  label={(
                    <p>{moment(item.datetime).format('MM/DD/YYYY h:mm:ss')}</p>
                  )}
                  description={(
                    <div>
                      <div style={{ margin: 10 }}>
                        <pre>{item.content}</pre>
                      </div>
                    </div>
                  )}
                />
                <Link to={`/signList/${item.id}`} style={{ margin: '20px 10px' }}>打卡列表</Link>
              </div>
            ),
          ))
        }
        {
          isShowTaskHistory ?
            <Button
              label="收起历史任务"
              onClick={() => this.hideTaskHistory()}
              primary={false}
              secondary={false}
              accent={false}
              critical
              plain
              style={{ fontSize: '.8em', width: '100%', textAlign: 'right', color: 'rgb(142, 142, 142)' }}
            />
            :
            <Button
              label="显示历史任务"
              onClick={() => this.showTaskHistory()}
              primary={false}
              secondary={false}
              accent={false}
              critical
              plain
              style={{ fontSize: '.8em', width: '100%', textAlign: 'right', color: 'rgb(142, 142, 142)' }}
            />
        }
      </Loadable>
    );
  }
}


App.propTypes = {
};


export default App;
