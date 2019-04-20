import { Card, Col, Divider, Form, Icon, Input, Row, Select, Statistic, Tabs } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EchartsWrapper from '../../components/EchartsWrapper';
import Icons from '../../components/Icons';

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const Option = Select.Option;
const TabPane = Tabs.TabPane;

const trade = ["所有","房地产","金融","餐饮","环保","地产","科技","农林牧渔"]//行业选项
const countIcon=['iconhome_today_finance','iconhome_today_company','iconhome_today_subscribe']
//公告数量
const count = [
  {
    title: "今日财务风险事件",
    number: 60
  },
  {
    title: "今日风险企业数",
    number: 50
  },
  {
    title: "今日订阅企业财务风险数",
    number: 20
  }
];



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
const getOption = (value: any) => {
  // console.log(value)
  const option = {
    title: {
      text: value.text,
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
      data: value.date,
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
        name:value.name,
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
        data: value.data,
    }]
  };
  return option
}
 //select change
function handleChange(value:any) {
  console.log(`selected ${value}`);
}
function callback(key:any) {
  console.log(key);
  getOption(key)
}


class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {
        //本报告期行业风险榜
        riskList: [
          {
            id: 1,
            title: "房地产",
            icon:"iconhome_estate",
            number: 23,
          },
          {
            id: 2,
            title: "金融",
            icon:"iconhome_finance",
            number: 45,
          },
          {
            id: 3,
            title: "餐饮",
            icon:"iconhome_food",
            number: 23,
          },
          {
            id: 4,
            title: "房地产",
            icon:"iconhome_environment",
            number: 23,
          },
          {
            id: 5,
            title: "科技",
            icon:"iconhome_technique",
            number: 23,
          }
        ],
        financeList: [
          {
            id: 1,
            title: "中信证券",
            logo:"/images/zhongxin_logo.png",
            number: 23,
          },
          {
            id: 2,
            title: "海通证券",
            logo:"/images/pingan_logo.png",
            number: 45,
          },
          {
            id: 3,
            title: "平安证券",
            logo:"/images/haitong_logo.png",
            number: 23,
          },
          {
            id: 4,
            title: "平安证券",
            logo:"/images/zhongxin_logo.png",
            number: 23,
          },
          {
            id: 5,
            title: "默认logo",
            logo:"/images/default_logo.png",
            number: 23,
          }
        ],
      }
    }
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
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
 
  render() {
    const {
      getFieldDecorator,
      isFieldTouched,
      getFieldError,
      getFieldsError
    } = this.props.form;
    const searchError = isFieldTouched("search") && getFieldError("search");
    const {riskList, financeList} = this.state.data
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
          <Col span={18}>
            <Row className="count">
              {count.map((item: any, idx: any) => (
                <Col span={8} key={idx}>
                  <Row gutter={0}>
                    <Col span={8}><Icons type={countIcon[idx]} /></Col>
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
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="近 1 年" key="1">
                  <Select defaultValue="所有" style={{ width: 120 }} onChange={handleChange}>
                    {
                      trade.map((item: any, idx: any) => <Option key={idx} value={item}>{item}</Option>)
                    }
                  </Select>
                  <EchartsWrapper option={getOption(oneYear)} style={{height:450}} />
                </TabPane>

                <TabPane tab="近 3 年" key="2">
                  <Select defaultValue="所有" style={{ width: 120 }} onChange={handleChange}>
                    {
                      trade.map((item: any, idx: any) => <Option key={idx} value={item}>{item}</Option>)
                    }
                  </Select>
                  <EchartsWrapper option={getOption(threeYear)} style={{height:450}} />
                </TabPane>

                <TabPane tab="近 5 年" key="3">
                  <Select defaultValue="所有" style={{ width: 120 }} onChange={handleChange}>
                    {
                      trade.map((item: any, idx: any) => <Option key={idx} value={item}>{item}</Option>)
                    }
                  </Select>
                  <EchartsWrapper option={getOption(fiveYear)} style={{height:450}} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>

          <Col span={6}>
            <Card
              title="本报告期行业风险榜"
              bordered={false}
              className="risk-list"
            >
              <ul>
                {riskList.map((item: any, idx: any) => (
                  <li key={idx}>
                    <span className="id">{idx + 1}. </span>
                    <Icons type={item.icon} />
                    <span className="title">{item.title}</span>
                    <span className="number">{item.number}</span>
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
                {financeList.map((item: any, idx: any) => (
                  <li key={idx}>
                    <span className="id">{idx + 1}. </span>
                    <img src={item.logo} />
                    <span className="title">{item.title}</span>
                    
                    <span className="number">
                      <Icons type="iconhome_rank_increase" />
                      {item.number}%
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const WrapSearch = Form.create()(Home);
export default WrapSearch;
