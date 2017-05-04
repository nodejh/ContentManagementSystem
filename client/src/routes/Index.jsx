import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Timestamp from 'grommet/components/Timestamp';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box
        direction="row"
        align="center"
        alignContent="center"
        justify="center"
        wrap
      >
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
      </Box>
    );
  }
}


export default App;
