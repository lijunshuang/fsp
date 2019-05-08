/**
 * 伪标签：icons
 */
import { Breadcrumb, Icon } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1137351_kwbv4fen7fe.js',
});
//具体导航的名称
const breadcrumbNameMap:any = {
  '/':'首页',
  '/market':'大盘财务行情',
  '/market/riskProfile':'财务风险概况',
  '/market/riskDetails':'风险详情',
  '/list':'公告列表',
  '/list/details':'公告详情',
  '/list/details/':'公告详情',
}
export default class Path extends React.Component<any, any>  {
  static propTypes = {
    className: PropTypes.string,
    path:PropTypes.any.isRequired
  }
  componentWillMount() {
    this.getPath();
  }
  getPath = () => {
    //对路径进行切分，存放到this.state.pathSnippets中
    let pathSnippets = this.props.path.location.pathname.split('/').filter((i: any) => i);

    this.setState({
        pathSnippets
    })
    // let arr=this.state.pathSnippets;
    // let pathname=this.context.router.history.location.pathname;
    //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
    let  extraBreadcrumbItems = pathSnippets.map((_:any, index:any) => {
        let url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>
                    {breadcrumbNameMap[url]}
                </Link>
            </Breadcrumb.Item>
        );
    });
    this.setState({
        extraBreadcrumbItems
    })
}
  render() {
    const class_name = this.props.className
    const type = this.props.type

    return (
      <div className="path-box">
        <div className="path-left">
          <span>当前位置：</span>
          <a href="/">首页</a>
          <span className="ant-breadcrumb-separator">&gt;</span>
        </div>
        <Breadcrumb separator=">">{this.state.extraBreadcrumbItems}</Breadcrumb>
      </div>
      
    )
  }
}
