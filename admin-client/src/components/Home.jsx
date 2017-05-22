import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {Button, Table, Popconfirm, message, Card} from 'antd';
import {getPosts, deletePost} from '../models/posts';
import { prefixPicture } from './../config';


class App extends Component {
  constructor(props) {
    super(props);
    this.message = {
      error: '获取活动列表失败，请重试!',
    };
    this.columns = [{
      title: '标题',
      dataIndex: 'title',
      width: '25%',
      render: (text) => {
        if (text.length > 30) {
          return text.substr(0, 30) + '...';
        }
        return text;
      },
    }, {
      title: '起始时间',
      dataIndex: 'start_date',
      width: '18%',
      render: (text) => moment(new Date(text)).format('MM/DD/YY HH:mm:ss'),
    }, {
      title: '结束时间',
      dataIndex: 'end_date',
      width: '18%',
      render: (text) => moment(new Date(text)).format('MM/DD/YY HH:mm:ss'),
    }, {
      title: '发布者',
      dataIndex: 'name',
      width: '18%',
      render: (text) => {
        return <Link to="#">{text}</Link>
      },
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div className="editable-row-operations">
            <span>
              <Link to={`/task/${record.id}`}>查看任务列表</Link>
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
      const res = await getPosts();
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
      const res = await deletePost(id);
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
                <p>活动时间: {moment(new Date(record.start_date)).format('MM/DD/YY')}-{moment(new Date(record.end_date)).format('MM/DD/YY')}</p>
                <e>发布者: {record.name}</e>
                <br/>
                <pre>{record.title}</pre>
              </div>
            </Card>
          )
        }}
      />
    );
  }
}


export default App;