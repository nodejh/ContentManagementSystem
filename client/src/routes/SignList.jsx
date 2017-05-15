import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toast from 'grommet/components/Toast';
import Card from 'grommet/components/Card';
import Image from 'grommet/components/Image';
import Markdown from 'grommet/components/Markdown';
import moment from 'moment';
import { signList } from './../models/task';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
      list: [], // 打卡列表
    };
    this.hideToast = this.hideToast.bind(this);
  }


  componentWillMount() {
    this.getSignList();
  }


  async getSignList() {
    const { toast } = this.state;
    const { taskId } = this.props.match.params;
    try {
      const res = await signList(taskId);
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
    const { toast, list } = this.state;
    console.log('list: ', list);
    return (
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
            console.log('item: ', item.datetime);
            return (
              <div key={item.id} style={{ border: '1px solid #eee', margin: '20px' }}>
                {
                  item.picture && item.picture.split(',').map(picture => (
                    <Image src={`/upload/album/${picture}`} />
                  ))
                }
                <Card
                  label={`${item.name ? item.name : '匿名'} ${moment(item.datetime).format('YYYY/M/D HH:mm:ss')}`}
                  description={
                    <Markdown content={item.description} />
                  }
                  style={{ border: '1px solid #eee' }}
                />
                <div style={{ marginTop: 20 }}>
                  评论:
                  <p style={{ fontWeight: 900 }}>
                    {item.comment ? item.comment : '暂无'}
                  </p>
                </div>
              </div>
            );
          })
        }

      </div>
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
