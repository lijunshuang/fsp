/**
* 系统左边栏菜单栏
*/
import './SiteSider.scss';

import { Icon, Layout, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import Icons from './Icons';

const { Sider } = Layout
const { Item, SubMenu } = Menu
const logo = '/images/logo.png'
/**
* 系统全局侧边栏
*/
export default class SiteSider extends React.Component<any, any> {
    public inter: any
    constructor(props: any) {
        super(props)
        this.state = {
            active: '',
            mouseCover: true, 
            openKeys: [],
        }
    }

    public componentDidMount() {
        this.inter = setInterval(() => {
           let active = ''
            if (document.location.pathname === '/') {
                active = 'market'
            }
            if (document.location.pathname === '/market') {
                active = 'market'
            }
            if (document.location.pathname === '/knowledge') {
                active = 'knowledge'
            }
            if (document.location.pathname === '/enterprise') {
                active = 'enterprise'
            }
            if (document.location.pathname === '/market/riskProfile') {
                active = 'riskProfile'
            }
            if (document.location.pathname === '/market/riskDetails') {
                active = 'riskDetails'
            }
            if (active !== this.state.active) {
                this.setState({ active })
            }

        }, 10)
    }

    public componentWillUnmount() {
        clearInterval(this.inter)
    }

    public render() {
        const { active, mouseCover, openKeys,} = this.state

        return (
            <Sider
                width={mouseCover ? 264 : 50}
            >
                <div className="logo">
                    <img src={logo} />
                </div>
                <Menu
                    selectable={false}
                    mode='inline'
                    openKeys={openKeys}
                    onOpenChange={(openKeys: any) => this.setState({ openKeys })}
                >

                    <Item key='home' className={ active === 'home' ? "active" : ''}>
                        <Link to='/'>
                            <Icons type="iconmenu_home" className="iconmenu_home" />  
                            {mouseCover ? <span>首页</span> : ''}
                        </Link>
                    </Item>
                    <Item key='market' className={ active === 'market' ? "active" : ''}>
                        <Link to='/market'>
                            <Icons type="iconmenu_finance" className="iconmenu_finance" />   
                            {mouseCover ? <span>大盘财务行情</span> : ''}
                        </Link>
                    </Item>
                    <Item key='riskProfile' className={ active === 'riskProfile' ? "active" : ''}>
                        <Link to='/market/riskProfile'>
                            {mouseCover ? <span>财务风险概况</span> : ''}
                        </Link>
                    </Item>
                    <Item key='riskDetails' className={ active === 'riskDetails' ? "active" : ''}>
                        <Link to='/market/riskDetails'>
                            {mouseCover ? <span>风险详情</span> : ''}
                        </Link>
                    </Item>
                    <Item key='knowledge' className={ active === 'knowledge' ? "active" : ''}>
                        <Link to='/knowledge'>
                            <Icons type="iconmenu_map" className="iconmenu_map" />  
                            {mouseCover ? <span>知识图谱</span> : ''}
                        </Link>
                    </Item>
                    <Item key='enterprise' className={ active === 'enterprise' ? "active" : ''}>
                        <Link to='/enterprise'>
                            <Icons type="iconmenu_monitor" className="iconmenu_monitor" />  
                            {mouseCover ? <span>企业监控</span> : ''}
                        </Link>
                    </Item>
                </Menu>
            </Sider>
        )
    }
}
