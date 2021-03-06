import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';

moment.locale('zh-cn');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }


  onClick() {
    this.props.showEdit();
  }


  render() {
    const { info } = this.props;
    return (
      <div>
        <Card
          thumbnail={info.avatar}
          label={`[${info.gender ? info.gender : '性别:暂无'}] ${info.phone}`}
          heading={info.name}
          description={
            <div>
              <p>{`学校:${info.school ? info.school : '暂无'}  专业:${info.major ? info.major : '暂无'}`}</p>
              <p>{info.introduce ? info.introduce : '个人简介:暂无'}</p>
              <p>{`注册时间:${moment(info.datetime).format('MMMM Do YYYY, h:mm:ss a')}`}</p>
            </div>
          }
          headingStrong={false}
          link={<Anchor href="#" label="编辑" onClick={this.onClick} />}
        />
      </div>
    );
  }
}


App.propTypes = {
  showEdit: PropTypes.func.isRequired,
  // eslint-disable-next-line
  info: PropTypes.object.isRequired,
};


export default App;
