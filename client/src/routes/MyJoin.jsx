import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Card from 'grommet/components/Card';
import Toast from 'grommet/components/Toast';
import Box from 'grommet/components/Box';
// import Markdown from 'grommet/components/Markdown';
import { myJoin } from './../models/post';
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

    this.getMyJoinList = this.getMyJoinList.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
    this.hideToast = this.hideToast.bind(this);
  }


  componentWillMount() {
    this.checkIsLogin();
  }


  componentDidMount() {
    this.getMyJoinList();
  }

  async getMyJoinList() {
    const { toast } = this.state;
    try {
      const res = await myJoin();
      // console.log('res: ', res);
      if (res.success) {
        this.setState({ list: res.list });
      } else {
        toast.status = 'critical';
        toast.show = true;
        toast.message = '获取活动列表失败，请重试';
        this.setState({ toast });
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '获取活动列表失败，请重试';
      this.setState({ toast });
    }
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
    const { toast, list: postList, isNotLogin } = this.state;
    return (
      <div>
        <Box
          direction="row"
          align="center"
          alignContent="center"
          justify="center"
          wrap
        >
          <Header>
            <Heading align="center">
              我的参与
            </Heading>
          </Header>
        </Box>

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
                  heading={(
                    <div>
                      <p style={{ fontSize: '2em', fontWeight: 400, marginBottom: 0 }}>{item.title}</p>
                    </div>
                  )}
                  description={(
                    <pre>
                      {item.description ?
                        item.description.length > 100 ?
                          `${item.description.substring(0, 100)}...` : item.description
                        : ''}
                    </pre>
                  )}
                  headingStrong={false}
                  link={<Link to={`/detail/${item.id}`}>查看详情</Link>}
                  style={{ margin: '10px 10px 20px 10px', backgroundColor: '#fff', width: '90%', maxWidth: 400 }}
                />
              );
            })
          }
        </Box>
      </div>
    );
  }
}


export default App;
