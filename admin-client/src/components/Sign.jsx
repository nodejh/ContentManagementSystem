import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {Button, Table, Popconfirm, message, Card} from 'antd';
import {getSign,deleteSign} from '../models/sign';
import { prefixPicture } from './../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.message = {
      error: '获取打卡列表失败，请重试!',
    };
    this.columns = [{
      title: '打卡内容',
      dataIndex: 'description',
      width: '30%',
      render: (text) => {
        if (text.length > 30) {
          return text.substr(0, 30) + '...';
        }
        return text;
      },
    }, {
      title: '打卡时间',
      dataIndex: 'datetime',
      width: '15%',
      render: (text) => moment(new Date(text)).format('MM/DD/YY HH:mm:ss'),
    }, {
      title: '打卡用户',
      dataIndex: 'name',
      width: '15%',
    }, {
      title: '评论',
      dataIndex: 'comment',
      width: '20%',
      render: (text) => moment(new Date(text)).format('MM/DD/YY HH:mm:ss'),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div className="editable-row-operations">
            <span>
              <Popconfirm title="确认删除?" onConfirm={() => this.handleDeleteOne(record.id)}>
                <a style={{marginLeft: 15}}>删除</a>
              </Popconfirm>
            </span>
          </div>
        );
      },
    }];
    this.state = {
      data: [],
    };
    this.requestData = this.requestData.bind(this);
    this.handleDeleteOne = this.handleDeleteOne.bind(this);
  }

  componentWillMount() {
    this.requestData();
  }

  async requestData() {
    try {
      const { taskId } = this.props.match.params;
      console.log('taskId: ', taskId);
      const res = await getSign(taskId);
      console.log('res: ', res);
      if (res.success) {
        this.setState({ data: res.list });
      } else {
        message.error(res.message, 5)
      }
    } catch (exception) {
      console.log('exception: ', exception.message);
      message.error(exception.message, 5)
    }
  }


  async handleDeleteOne(id) {
    console.log('id: ', id);
    try {
      const res = await deleteSign(id);
      if (res.success) {
        this.requestData();
        message.success('删除成功');
        return true;
      }
      message.error('删除失败，请重试', 5);
    } catch (exception) {
      console.log('exception: ', exception.message);
    }
  }


  render() {
    const {data} = this.state;
    const dataSource = data.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
    // console.log('dataSource: ', dataSource);
    const columns = this.columns;
    return (
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 20,
        }}
        expandedRowRender={(record) => {
          console.log('expandedRowRender: ', record);
          return (
            <Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
              {
                record.picture ? (
                  <div className="custom-image">
                    <img alt="example" width="100%" src={`${prefixPicture}/${record.picture}`} style={{ maxWidth: '500' }} />
                  </div>
                ) : ''
              }
              <div className="custom-card">
                <pre>{record.description}</pre>
              </div>
            </Card>
          )
        }}
      />
    );
  }
}


export default App;