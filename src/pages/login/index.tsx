import {
    Button, Card, Checkbox, Col, Dropdown, Form, Icon, Input, Menu, message, Row, Typography
} from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Captcha from '../../components/Captcha';
import Loading from '../../components/Loading';
import history from '../../history';


const { Title } = Typography;

const img = {
  logo: "/images/logo.png",
  login: "/images/login_illu.png"
};

interface IProps {
  match: any,
}
interface IState {
  login_type_list: string[],
  login_type: number,
  username: string,
  password: string,
  captcha: string,
  loading: boolean,
  captcha_path: string
}

class Login extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      login_type: 1,
      username: '',
      password: '',
      captcha: '',
      loading: false,
    }
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  public async login() {
    // this.setState({ loading: true })
    // const { username, password, captcha, login_type } = this.state
    // const ret: any = await requestPost('/api/login', {
    //     username, password, captcha, login_type
    // }, false).catch(res=> {
    //     this.setState({ loading: false })
    //     message.error('Unknown error, login failed')
    // })
    // console.log('ret', ret)
    // // ret = await ret.json()
    // if (ret.success) {
    //     message.success('Login success')
    //     loginSuccess(username, ret.role, ret.access_token)
    //     if (this.props.match.params.lastPage) {
    //         setTimeout(() => {
    //             history.push(decodeURIComponent(
    //                 this.props.match.params.lastPage,
    //             ))
    //         }, 100)
    //     } else {
    //         setTimeout(() => history.push('/'), 100)
    //     }
    // } else {
    //     this.setState({ loading: false })
    //     message.error(ret.message || 'Unknown error, login failed')
    // }
}
  render() {
    const { getFieldDecorator } = this.props.form;
    const { username, password, captcha, loading, login_type, captcha_path } = this.state

    const loginForm = (
        <Form onSubmit={this.handleSubmit} className="login-form">
            <Title level={3}>欢迎登录</Title>
            <Form.Item label="用户名">
                {getFieldDecorator("输入用户名", {
                    rules: [
                        { required: true, message: "请输入用户名!" }
                    ]
                })(
                    <Input placeholder="输入用户名"/>
                )}
                </Form.Item>
                <Form.Item label="密码">
                {getFieldDecorator("输入密码", {
                    rules: [
                    { required: true, message: "请输入密码!" }
                    ]
                })(
                    <Input type="password" placeholder="输入密码" />
                )}
                </Form.Item>
                <Form.Item label="验证码">
                {getFieldDecorator("输入验证码", {
                    rules: [
                    { required: true, message: "请输入验证码!" }
                    ]
                })(
                    <div className="vcode">
                        <Input type="password" placeholder="输入验证码" />
                        <Captcha color="red" bgImage={img.login} captchaType="Normal" size={4} />
                    </div>
                )}
                </Form.Item>
                <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-btn"
                >
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
    return (
      <div className="login-box">
            <div className="logo">
                <img src={img.logo} alt="" />
            </div>
            <div className="login-center">
                <img src={img.login} alt="" />
                {loginForm}
            </div>
        </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;
