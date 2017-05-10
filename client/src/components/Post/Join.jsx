import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import IconSpinning from 'grommet/components/icons/Spinning';
import IconLink from 'grommet/components/icons/base/Link';
import { join } from './../../models/post';


class App extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      loading: false,
      toast: {
        size: 'medium', // small|medium|large
        status: 'ok', // toast 类型 critical|warning|ok|disabled|unknown
        message: null,
        show: false, // 是否显示 toast
      },
    };
    this.handleJoin = this.handleJoin.bind(this);
    this.hideToast = this.hideToast.bind(this);
  }

  componentWillMount() {
  }

  /**
   * join
   * @return {Promise.<boolean>}
   */
  async handleJoin() {
    const { id, handleJoinSuccess } = this.props;
    const { loading, toast } = this.state;
    if (loading) {
      return false;
    }
    this.setState({ loading: true });
    try {
      const res = await join(id);
      if (res.success) {
        // join success
        toast.show = true;
        toast.status = 'ok';
        toast.message = res.message;
        this.setState({ toast, loading: false }, () => {
          handleJoinSuccess();
        });
      } else {
        toast.show = true;
        toast.status = 'critical';
        toast.message = res.message;
        this.setState({ toast, loading: false });
      }
    } catch (exception) {
      // console.log('exception: ', exception);
      toast.show = true;
      toast.status = 'critical';
      toast.message = exception.message || '加入失败，请重试';
      this.setState({ toast, loading: false });
    }
    return true;
  }

  hideToast() {
    const { toast } = this.state;
    toast.show = false;
    this.setState({ toast });
  }

  render() {
    const { loading, toast } = this.state;
    return (
      <div>
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
        <Button
          icon={loading ? <IconSpinning colorIndex="light-1" /> : <IconLink />}
          label="加入"
          onClick={() => this.handleJoin()}
          primary
          secondary={false}
          plain={false}
        />
      </div>
    );
  }
}

App.propTypes = {
  id: PropTypes.string.isRequired,
  handleJoinSuccess: PropTypes.func.isRequired,
};


export default App;
