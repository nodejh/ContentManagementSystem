import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import Card from 'grommet/components/Card';
import Toast from 'grommet/components/Toast';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';
import { list } from './../models/post';
import { isLogin } from './../models/user';

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
      list: [],
      isNotLogin: false,
    };

    this.getList = this.getList.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
  }


  componentWillMount() {
    this.checkIsLogin();
  }


  componentDidMount() {
    this.getList();
  }

  async getList() {
    const { toast } = this.state;
    try {
      const res = await list();
      if (res.success) {
        this.setState({ list: res.list });
      } else {
        toast.status = 'critical';
        toast.show = true;
        toast.message = '获取任务列表失败，请重试';
        this.setState({ toast });
      }
    } catch (exception) {
      console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '发布失败，请重试';
      this.setState({ toast });
    }
  }

  async checkIsLogin() {
    const res = await isLogin();
    if (!res.isLogin) {
      this.setState({ isNotLogin: true });
    }
  }

  render() {
    const { toast, list: postList, isNotLogin } = this.state;
    return (
      <Box
        direction="row"
        align="center"
        alignContent="center"
        justify="center"
        wrap
      >
        { isNotLogin && <Redirect to="/login" /> }
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
          postList.map((item) => {
            console.log('item: ', item);
            console.log(moment(new Date(item.start_date)).format('MMMM DD YYYY h:mm:ss'));
            return (
              <Card
                key={item.id}
                thumbnail={item.picture && `/upload/album/${item.picture}`}
                label={
                  (
                    <p>
                      {moment(item.start_date).format('YYYY/M/D h:mm:ss')}
                      <span style={{ fontSize: '.7em', fontWeight: 100, marginRight: 3, marginLeft: 3 }}>至</span>
                      {moment(item.end_date).format('YYYY/M/D h:mm:ss')}
                    </p>
                  )
                }
                heading={item.title}
                description={
                  <Markdown
                    // eslint-disable-next-line
                    content={item.description ?
                      item.description.length > 100 ?
                        `${item.description.substring(0, 100)}...` : item.description
                      : ''}
                  />
                }
                headingStrong={false}
                link={<Link to="#">查看详情</Link>}
                style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
              />
            );
          })
        }
      </Box>
    );
  }
}


export default App;
