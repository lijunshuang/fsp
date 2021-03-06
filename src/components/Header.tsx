import './style.scss';

import { Avatar, Icon, Layout, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import Icons from '../components/Icons';

const { Sider } = Layout
const { Item } = Menu
const logo = '/logo.png'

export default class Header extends React.Component<any, any> {
    public inter: any

    constructor(props: any) {
        super(props)
        this.state = {
            breadcrumb: document.title === '财务分析系统' ? '<a href="/">首页</a>' : `首页 > ${document.title}`,
            username: "Admin",
            pathSnippets: null,
            extraBreadcrumbItems: null,
        }
    }
    
    componentDidMount () {
        this.inter = setInterval(() => {
            const newBreadcrumb = document.title === '财务分析系统' ? '<a href="/">首页</a>' : `首页 > ${document.title}`
            if (newBreadcrumb !== this.state.breadcrumb) {
                this.setState({
                    breadcrumb: newBreadcrumb,
                })
            }
        }, 100)
    }
    
    componentWillUnmount () {
        if (this.inter) {
            clearInterval(this.inter)
            this.inter = null
        }
    }

    public render() {
        const _date = new Date();
        const { username} = this.state
        return (
            <div className="header">
                <header>
                    <div className="header_right">
                        <span className="avatar">
                            <Avatar>USER</Avatar>
                            Hello, {username}
                        </span>
                        <a href="javascript:;"><Icons type='iconlogout' /> 退出</a>
                    </div>
                </header>
                {/* <div className="nav_path">
                    <span>当前位置：</span>{this.state.breadcrumb}
                </div> */}
            </div>
        )
    }
}
