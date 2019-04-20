//验证码组件
import { Button, Card, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Captcha extends React.Component<any, any> {
    static propTypes ={
        bgImage: PropTypes.string,
        size: PropTypes.number,
        captchaType: PropTypes.oneOf(['Calculation', 'Normal']),
        color: PropTypes.string
    }

    constructor(props: any) {
        super(props)
        this.state = {
            expression: '',
            validate: '',
            validateInput: ''
        }
        
    }
    componentDidMount() {
        this.renderCode();
    }

    renderCode = () => {
        const { color, captchaType, size} = this.props
        console.log(this.props.size)
        //定义expression和result，expression是字符串，result可能是字符串也可能是数字
        var expression = '', result;
        //判断验证码类型    
        if (this.props.captchaType == 'Calculation') {
            result = 0;//计算类型则result为数字，初始化为0
            //获取随机的两个两位数
            var Calpre = Math.round(Math.random()*100);
            var Calafter = Math.round(Math.random()*100);
    
            var codeCal = ['-','+','x'];//运算符
            var i = Math.round(Math.random()*2);//获得随机运算符
    
            switch (codeCal[i]) {//判断运算符并计算
                case '-': 
                    expression = Calpre + '-' + Calafter;
                    result = Calpre - Calafter;
                    break;
                case '+': 
                    expression = Calpre + '+' + Calafter;
                    result = Calpre + Calafter;
                    break;
                case 'x': 
                    expression = Calpre + 'x' + Calafter;
                    result = Calpre * Calafter;
                    break;
            }
        } else if (captchaType == 'Normal'){
            result = '';
            var codeNormal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';//字母库
            for (let i =0; i < size; i ++) {
                result = result + codeNormal[Math.round(Math.random()*(codeNormal.length-1))];
            }//随机获取字母四个
    
            expression = result.toLowerCase();//忽略大小写
        }
    
        this.setState({//设置更新状态
            expression: expression,
            validate: result
        });
    }
    validate() {
        var thisInput = this.state.validateInput;
        var validateCode = this.state.validate;
        if (thisInput.toLowerCase() == validateCode.toString().toLowerCase()) {
            return 'success';
        } else if (thisInput != ''){
            return 'error';
        }
    }
    handleChange=(e:any)=> {
        this.setState({
            validateInput: e.target.value
        });
        this.validate()
    }
    render() {
        const inlineStyle = {
            color: this.props.color,
            backgroundImage: 'url(' + this.props.bgImage + ')'
        };
        return (
            <div>
            {/* <Input
                value={this.state.validateInput}
                placeholder="请输入验证码"
                ref="field"
                onChange={this.handleChange}
            /> */}
                
            <Button style={inlineStyle} 
                className="am-btn" 
                onClick={this.renderCode}>
                {this.state.expression}
            </Button>
        </div>
        )
    }
}
export default Captcha