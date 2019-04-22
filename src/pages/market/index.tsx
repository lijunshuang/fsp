import { Card, Col, Divider, Form, Icon, Input, Row, Select, Statistic, Tabs } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getData } from '../../actions';
import EchartsWrapper from '../../components/EchartsWrapper';
import Icons from '../../components/Icons';

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const Option = Select.Option;
const TabPane = Tabs.TabPane;

// const trade = ["所有","房地产","金融","餐饮","环保","地产","科技","农林牧渔"]//行业选项

const oneYear = {
  text: '指标：风险企业数',
  date: ['2017-01-01 至 2017-03-31', '2017-04-01 至 2017-06-30', '2017-07-01 至 2017-09-30', '2017-10-01 至 2017-12-31'],
  name: "风险",
  data: [20, 52, 76, 84],
}
const threeYear = {
  text: '指标：风险企业数',
  date: ['2016', '2017', '2018'],
  name: "风险",
  data: [50, 152, 76],
}
const fiveYear = {
  text: '指标：风险企业数',
  date: ['2014','2015', '2016', '2017', '2018'],
  name: "风险",
  data: [120, 252, 176, 184,69],
}
//echart 配置项
const getOption = (val: any) => {
  const date = val.map((item:any)=>item.date)
  const value = val.map((item:any)=>item.value)
  const option = {
    title: {
      text: '指标：风险企业数',
      textStyle: {
        fontSize: "14px",
        color: '#6B798E',
      },
      top:'20px'
    },
    tooltip : {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          label: {
              backgroundColor: '#6a7985'
          }
      }
    },
    grid: {
      top:'80px',
      left: '0%',
      right: '0',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: "#7D92A7",
          fontSize:"12px",
        },
      },
      data: date,
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,//不显示Y轴的竖线
        lineStyle: {
          color: "#7D92A7",
          fontSize:"12px",
        },
      },
      splitLine: {
        show: true,
        lineStyle:{
            type:'dashed'
        }
      }
    },
      series: [{
        name:"风险",
        type: 'line',
        symbolSize: 8,   //折线点的大小
        label: { //线上的文字
          normal: {
            show: true,
            position: 'top'
          }
        },
        // 折线颜色
        itemStyle: {
          normal: {
              color: '#3D659A',
              lineStyle: {
                color: '#3D659A',
                width:4
              }
          },
        },
        data: value,
    }]
  };
  return option
}

//本页用到图片
const img = {
  company_logo:"/images/zhongxin_logo.png"
}
class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {},
      currentTrade: '所有',
      currentYear: 'this_year'
    }
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    this.setState({
      data:this.props.riskHistoty['所有']
    })
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("formValues: ", values);
        // this.props.history.push(`/search_list?q=${values.search}`)
      }
    });
  };
  /******* Select 的function************ */
  handleChange = (value:any)=> {
    console.log(`selected ${value}`);
    this.setState({
      currentTrade: value,
      data:this.props.riskHistoty[value]
    })
  }
  handleBlur=()=> {
    console.log('blur');
  }
  
  handleFocus=()=> {
    console.log('focus');
  }
/******* Select 的function************ */
  
  callback=(key:any)=> {
    console.log(key);
    this.setState({
      ...this.state,
      currentYear: key
    })
  }
  //公告数量
  count = () => (
    [
      {
        title: "今日财务风险事件",
        number: this.props.results.today_event_count || 0,
        icon:"iconhome_today_finance"
      },
      {
        title: "今日风险企业数",
        number: this.props.results.today_company_count || 0,
        icon:"iconhome_today_company"
      },
      {
        title: "今日订阅企业财务风险数",
        number: this.props.results.today_subscribed_event || 0,
        icon:"iconhome_today_subscribe"
      }
    ]
  )
  getIcon = (value: any) => { 
    let icon ='iconhome_environment'
    if (value == '房地产') { 
      icon = 'iconhome_estate'
    }else if (value == '金融') { 
      icon = 'iconhome_finance'
    }
    return icon
  }
  render() {
    const {getFieldDecorator,isFieldTouched,getFieldError,getFieldsError} = this.props.form;
    const searchError = isFieldTouched("search") && getFieldError("search");
    const {data} = this.state
    if (JSON.stringify(data) !== "{}") { 
      const { results: { company_risk_rank, industry_risk_rank }, riskHistoty } = this.props
      const trade = Object.keys(riskHistoty) //获取所有行业名称

      console.log(riskHistoty)
      return (
        <div className="market">
          <div className="search">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item
                // validateStatus={searchError ? 'error' : ''}
                help={searchError || ""}
              >
                {getFieldDecorator("search", {
                  rules: [
                    {
                      required: false,
                      message: "请输入公司名字，代码或简称"
                    }
                  ]
                })(<Input placeholder="请输入公司名字，代码或简称" />)}
                <button className="btn-default">搜索</button>
              </Form.Item>
            </Form>
          </div>
          <Row gutter={20}>
            <Col md={15} lg={16} xl={17}>
              <Row className="count">
                {this.count().map((item: any, idx: any) => (
                  <Col span={8} key={idx}>
                    <Row gutter={0}>
                      <Col span={8}><Icons type={item.icon} /></Col>
                      <Col span={16}>
                        <span className="title">{item.title}</span>
                        <span className="number">{item.number}</span>
                      </Col>
                    </Row>
                    <Divider type="vertical" />
                  </Col>
                ))}
              </Row>
  
              <Card
                className="history-box"
                title="历史走势"
                bordered={false}
              >
                <Select
                  showSearch
                  defaultValue="所有"
                  style={{ width: 120 }} 
                  onChange={this.handleChange}
                  // onFocus={this.handleFocus}
                  // onBlur={this.handleBlur}
                  filterOption={(input:any, option:any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    trade.map((item: any, idx: any) => <Option key={idx} value={item}>{item}</Option>)
                  }
                </Select>
                
                <Tabs defaultActiveKey="this_year" onChange={this.callback}>
                  <TabPane tab="近 1 年" key="this_year">
                    <EchartsWrapper option={getOption(riskHistoty[this.state.currentTrade].this_year)} style={{height:450}} />
                  </TabPane>
  
                  <TabPane tab="近 3 年" key="last_3_year">
                    <EchartsWrapper option={getOption(riskHistoty[this.state.currentTrade].last_3_year)} style={{height:450}} />
                  </TabPane>
  
                  <TabPane tab="近 5 年" key="last_5_year">
                    <EchartsWrapper option={getOption(riskHistoty[this.state.currentTrade].last_5_year)} style={{height:450}} />
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
  
            <Col md={9} lg={8} xl={7}>
              <Card
                title="本报告期行业风险榜"
                bordered={false}
                className="risk-list"
              >
                <ul>
                  {industry_risk_rank.map((item: any, idx: any) => (
                    <li key={idx}>
                      <span className="id">{idx + 1}. </span>
                      <Icons type={this.getIcon(item.name)} />
                      <span className="title">{item.name}</span>
                      <span className="number">{item.score}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card
                title="本报告期财务异动榜"
                bordered={false}
                className="risk-list fchange-list"
              >
                <ul>
                  {company_risk_rank.map((item: any, idx: any) => (
                    <li key={idx}>
                      <span className="id">{idx + 1}. </span>
                      <img src={img.company_logo} />
                      <span className="title">{item.name}</span>
                      <span className="number">
                        <Icons type="iconhome_rank_increase" />
                        {item.score}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else {
      return <div>loading</div>
    }
    
  }
}
const WrapSearch = Form.create()(Home);
const mapStateProps = (state: any) => {
  return {
    results: state.riskEvents.results,
    riskHistoty: state.riskHistory.results,
  }
}
const mapDispatchToProps = {getData}
export default connect(mapStateProps,mapDispatchToProps)(WrapSearch)

