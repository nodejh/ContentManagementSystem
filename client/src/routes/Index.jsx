import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import Card from 'grommet/components/Card';
import Toast from 'grommet/components/Toast';
import Box from 'grommet/components/Box';
import Timestamp from 'grommet/components/Timestamp';
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
          // eslint-disable-next-line
          postList.map((item, index) => {
            console.log('item: ', item);
            return (
              <Card
                // eslint-disable-next-line
                key={index}
                // thumbnail="http://cdn.huodongxing.com/Content/app/appom/762680785432170.jpg"
                label={<Timestamp value={moment(new Date(item.start_date)).format('MMMM Do YYYY, h:mm:ss a')} />}
                heading={item.title}
                description={item.description}
                headingStrong={false}
                link={<Link to="#">查看详情</Link>}
                style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
              />
            );
          })
        }
        <Card
          thumbnail="http://cdn.huodongxing.com/Content/app/appom/762680785432170.jpg"
          label={<Timestamp value="2017-05-04T22:29:18.124Z" />}
          heading="任务内容"
          description="任务描述"
          headingStrong={false}
          link={<Link to="#">查看详情</Link>}
          style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
        />
        <Card
          label={<Timestamp value="2017-05-04T22:50:18.124Z" />}
          heading="任务内容"
          description="任务描述"
          headingStrong={false}
          link={<Link to="#">查看详情</Link>}
          style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
        />
        <Card
          thumbnail="http://cdn.huodongxing.com/Content/app/appom/302673478827376.jpg"
          label={<Timestamp value="2017-05-04T22:50:18.124Z" />}
          heading="任务内容"
          description="任务描述"
          headingStrong={false}
          link={<Link to="#">查看详情</Link>}
          video={{ source: 'http://v.youku.com/v_show/id_XMjc0MzQyMDMwOA==.html', type: 'mp4' }}
          style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
        />
        <Card
          thumbnail="http://cdn.huodongxing.com/Content/app/appom/762680785432170.jpg"
          label={<Timestamp value="2017-05-04T22:29:18.124Z" />}
          heading="任务内容"
          description="任务描述"
          headingStrong={false}
          link={<Link to="#">查看详情</Link>}
          style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
        />
        <Card
          label={<Timestamp value="2017-05-04T22:50:18.124Z" />}
          heading="任务内容"
          description="任务描述"
          headingStrong={false}
          link={<Link to="#">查看详情</Link>}
          style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
        />
        <Card
          thumbnail="http://cdn.huodongxing.com/Content/app/appom/302673478827376.jpg"
          label={<Timestamp value="2017-05-04T22:50:18.124Z" />}
          heading="任务内容"
          description="任务描述"
          headingStrong={false}
          link={<Link to="#">查看详情</Link>}
          video={{ source: 'http://v.youku.com/v_show/id_XMjc0MzQyMDMwOA==.html', type: 'mp4' }}
          style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
        />
        <Card
          thumbnail="http://cdn.huodongxing.com/Content/app/appom/302673478827376.jpg"
          label={<Timestamp value="2017-05-04T22:50:18.124Z" />}
          heading="任务内容"
          description="任务描述"
          headingStrong={false}
          link={<Link to="#">查看详情</Link>}
          video={{ source: 'http://v.youku.com/v_show/id_XMjc0MzQyMDMwOA==.html', type: 'mp4' }}
          style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
        />


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
      </Box>
    );
  }
}


export default App;
