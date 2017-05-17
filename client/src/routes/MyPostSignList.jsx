import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loading-overlay';
import TextareaAutosize from 'react-textarea-autosize';
import Toast from 'grommet/components/Toast';
import Card from 'grommet/components/Card';
import Image from 'grommet/components/Image';
// import Markdown from 'grommet/components/Markdown';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import moment from 'moment';
import { comment, signListOfMyTask } from './../models/task';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
      error: { // 表单数据错误消息
        comment: null,
      },
      form: {
        id: null,
        comment: null,
      },
      list: [], // 打卡列表
    };
    this.hideToast = this.hideToast.bind(this);
    this.onDOMChange = this.onDOMChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getSignList = this.getSignList.bind(this);
  }


  componentWillMount() {
    this.getSignList();
  }

  /**
   * form data change
   * @param event
   * @param key
   */
  onDOMChange(event, id, key) {
    const { form } = this.state;
    form[key] = event.target.value;
    form.id = id;
    this.setState({ form });
  }

  /**
   * 评论打卡
   */
  async onSubmit() {
    // console.log('this.state: ', this.state);
    const { form: values, toast } = this.state;
    if (!values.comment) {
      const { error } = this.state;
      error.title = '评论内容不能为空';
      this.setState({ error });
      return false;
    }
    const data = {
      id: values.id,
      comment: values.comment,
    };
    try {
      console.log('data: ', data);
      // return false;
      // eslint-disable-next-line
      this.setState({ loading: true });
      const res = await comment({ values: data });
      if (res.success) {
        toast.show = true;
        toast.message = '评论成功';
        toast.status = 'ok';
        this.setState({ toast, loading: false, isPostSuccess: true }, () => {
          this.getSignList();
        });
      } else {
        toast.show = true;
        toast.status = 'critical';
        toast.message = '评论失败，请重试';
        this.setState({ toast, loading: false });
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '评论失败，请重试';
      this.setState({ toast, loading: false });
    }
    return true;
  }

  async getSignList() {
    const { toast } = this.state;
    const { taskId } = this.props.match.params;
    try {
      const res = await signListOfMyTask(taskId);
      console.log('res: ', res);
      if (res.success) {
        this.setState({ list: res.signList || [] });
      } else {
        toast.show = true;
        toast.status = 'critical';
        toast.message = res.message || '获取打卡列表失败，请重试';
        this.setState({ toast });
      }
    } catch (exception) {
      console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '获取打卡列表失败，请重试';
      this.setState({ toast });
    }
  }

  hideToast() {
    const { toast } = this.state;
    toast.show = false;
    this.setState({ toast });
  }

  render() {
    const { toast, list, loading, error } = this.state;
    console.log('list: ', list);
    return (
      <Loadable
        active={loading}
        spinner
        animate
        style={loading ? { height: '100%', width: '100%', position: 'fixed' } : { width: '100%' }}
      >
        <div style={{ textAlign: 'center', maxWidth: 600 }}>
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
            // eslint-disable-next-line
            list.length === 0 ? <h3 style={{ textAlign: 'center' }}>暂无打卡记录</h3> : list.map((item) => {
              console.log('item: ', item);
              return (
                <div key={item.id} style={{ border: '1px solid #eee', margin: '30px 20px' }}>
                  {
                    item.picture && item.picture.split(',').map(picture => (
                      <Image src={`/upload/album/${picture}`} />
                    ))
                  }
                  <Card
                    label={`${item.name ? item.name : '匿名'} ${moment(item.datetime).format('YYYY/M/D HH:mm:ss')}`}
                    description={
                      (
                        <pre>
                          {item.description}
                        </pre>
                      )
                    }
                    style={{ border: '1px solid #eee' }}
                  />
                  {
                    item.comment ?
                      (
                        <div style={{ marginTop: 20 }}>
                          评论:
                          <p style={{ fontWeight: 900 }}>
                            {item.comment}
                          </p>
                        </div>
                      )
                      :
                      (
                        <div style={{ margin: 20 }}>
                          <Form>
                            <FormFields>
                              <FormField
                                label="评论"
                                error={error.comment}
                              >
                                <TextareaAutosize
                                  style={{ marginTop: 20 }}
                                  useCacheForDOMMeasurements
                                  minRows={5}
                                  maxRows={10}
                                  onChange={event => this.onDOMChange(event, item.id, 'comment')}
                                />
                              </FormField>
                            </FormFields>
                            <Footer pad={{ vertical: 'medium' }}>
                              <Button
                                label="发表评论"
                                type="button"
                                primary
                                onClick={this.onSubmit}
                              />
                            </Footer>
                          </Form>
                        </div>
                      )
                  }
                </div>
              );
            })
          }
        </div>
      </Loadable>
    );
  }
}


App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      taskId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default App;
