import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Card from 'grommet/components/Card';
import Toast from 'grommet/components/Toast';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
// import Markdown from 'grommet/components/Markdown';
import Status from 'grommet/components/icons/Status';
import { myList, deletePost } from './../models/post';
import { isLogin } from './../models/user';
import { postStatus as constantsPostStatus } from './../utils/constants';

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

    this.getMyPostList = this.getMyPostList.bind(this);
    this.checkIsLogin = this.checkIsLogin.bind(this);
    this.hideToast = this.hideToast.bind(this);
  }


  componentWillMount() {
    this.checkIsLogin();
  }


  componentDidMount() {
    this.getMyPostList();
  }

  async getMyPostList() {
    const { toast } = this.state;
    try {
      const res = await myList();
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

  async handleDelete(id) {
    const { toast } = this.state;
    try {
      const res = await deletePost(id);
      // console.log('res: ', res);
      if (res.success) {
        // rerender post list
        this.getMyPostList();
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
              我的发布
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
                        {moment(item.start_date).format('YYYY/M/D')}-{moment(item.end_date).format('YYYY/M/D')}
                      </p>
                    )
                  }
                  heading={(
                    <div>
                      <p style={{ fontSize: '2em', fontWeight: 400, marginBottom: 0 }}>{item.title}</p>
                      <div>
                        {
                          item.status === 0 ?
                            (
                              <span>
                                <Status value="ok" />
                                {constantsPostStatus[item.status]}
                              </span>
                            )
                            :
                            (
                              <span>
                                <Status value="warning" />
                                {constantsPostStatus[item.status]}
                              </span>
                            )
                        }

                        <Button
                          label="删除"
                          onClick={() => this.handleDelete(item.id)}
                          href="#"
                          style={{
                            border: '2px solid red',
                            padding: '3px',
                            fontSize: '1rem',
                            marginLeft: '2rem',
                          }}
                        />
                      </div>
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
                  link={<Link to={`/myPostDetail/${item.id}`}>查看详情</Link>}
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
