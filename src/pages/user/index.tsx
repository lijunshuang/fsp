import {
    Avatar, Button, Card, Col, Form, Icon, Input, Menu, message, Row, Tooltip, Upload
} from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Captcha from '../../components/Captcha';
import Loading from '../../components/Loading';
import history from '../../history';

const img = {
  avatar: "/images/avatar_l.png",
  login: "/images/login_illu.png"
};

function getBase64(img:any, callback:any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file:any) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class UserSettings extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
        username: 'admin',
        oldPassword:"abc123",
        newPassword: '',
        loading: false,
        confirmDirty: false,
        autoCompleteResult: [],
        imageUrl:img.avatar,
        passwordRule:"1. 密码长度 8-64 位 2. 须同时包含大写字母、小写字母、数字、特殊字符中的任意三种 3. 密码不能包含邮箱账号"
    }
  }
    // 提交按钮
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

/*
密码校验
    1. 密码长度 8-64 位 
    2. 须同时包含大写字母、小写字母、数字、特殊字符中的任意三种 
    3. 密码不能包含邮箱账号
*/
    validateToNextPassword = (rule:any, value:any, callback:any) => {
        // if (!val) {
        //     callback();
        // }
        let validateResult = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z\d]{8,64}$/;  // 自定义规则
        if (!validateResult.test(value)) {
            callback('请输入正确的内容！');
        }
        // callback();
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    //确认密码
    compareToFirstPassword = (rule:any, value:any, callback:any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
        callback('您输入的两个密码不一致！');
        } else {
        callback();
        }
    }
    // 确认密码 校验
    handleConfirmBlur = (e:any) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    //
    handleChange = (info:any) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (imageUrl:any) => this.setState({
            imageUrl,
            loading: false,
          }));
        }
      }
    render() {
    const { getFieldDecorator } = this.props.form;
    const { username, oldPassword, newPassword, loading, passwordRule,imageUrl} = this.state
    
    const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
      );
      const loginForm = (
          <Form onSubmit={this.handleSubmit} className="userSet-form">
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                >
            </Upload>
                <p>图片仅支持 JPG 和 PNG 格式，大小不超过2M</p>
            <Form.Item label="用户名">
                <Input placeholder="" value={username} disabled />
                </Form.Item>
                <Form.Item label="当前密码">
                    {getFieldDecorator("密码错误", {
                        rules: [
                        { required: true, message: "请输入当前密码!" }
                        ]
                    })(
                        <Input type="password" placeholder="输入当前密码" />
                    )}
                </Form.Item>
                <Form.Item label="新密码">
                    {getFieldDecorator("输入新密码", {
                        rules: [
                        { required: true, message: " " },
                        { validator: this.validateToNextPassword }
                        ]
                    })(
                        <div className="password">
                            <Input type="password" placeholder="设置新密码" />
                            <Tooltip placement="right" title={passwordRule}>
                                <Icon type="info-circle" theme="filled" />
                            </Tooltip>
                        </div>
                    )}
                </Form.Item>
                <Form.Item label="确认密码">
                    {getFieldDecorator("两次密码输入不一致", {
                        rules: [
                            { required: true, message: "请输入确认密码!" },
                            { validator: this.compareToFirstPassword,}
                        ]
                    })(
                        <Input type="password" placeholder="再次输入密码"  onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                
                <Form.Item className="foot-btn">
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
        <div className="user-box">
            {loginForm}
        </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(UserSettings);

export default WrappedNormalLoginForm;
