import { Card, Col, Form, Icon, Input, Row, Select, Tabs } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EchartsWrapper from '../../components/EchartsWrapper';
import Icons from '../../components/Icons';

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const Option = Select.Option;
const TabPane = Tabs.TabPane;

const trade = ["所有","金融","地产","科技","农林牧渔"]//行业选项

//公告数量
const count = [
  {
    icon: "icon",
    title: "今日财务风险事件",
    number: 60
  },
  {
    icon: "icon",
    title: "今日风险企业数",
    number: 50
  },
  {
    icon: "icon",
    title: "今日风险企业数",
    number: 20
  }
];

//本报告期行业风险榜
const riskList = [
  {
    id: 1,
    icon: "home",
    title: "房地产",
    number: 23
  },
  {
    id: 2,
    icon: "home",
    title: "金融",
    number: 45
  },
  {
    id: 3,
    icon: "home",
    title: "餐饮",
    number: 23
  },
  {
    id: 4,
    icon: "home",
    title: "房地产",
    number: 23
  },
  {
    id: 5,
    icon: "home",
    title: "科技",
    number: 23
  },
  {
    id: 6,
    icon: "home",
    title: "房地产",
    number: 23
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
          color: "#6B798E",
          fontSize:"12px",
        },
      },
      data: value.date,
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#6B798E",
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
        lineStyle: { //线的样式
          color: "#3D659A",
          width: "4",
        },
        itemStyle: { //折线拐点处的样式
          borderWidth: "4",
          borderColor: "#3D659A",
          shadowColor: '#F1F2FC',
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
                  <Icon type="smile" theme="twoTone" />
                  <span className="title">{item.title}</span>
                  <span className="number">{item.number}</span>
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
                    <Icon type={item.icon} />
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
                {riskList.map((item: any, idx: any) => (
                  <li key={idx}>
                    <span className="id">{idx + 1}. </span>
                    <Icon type={item.icon} />
                    <span className="title">{item.title}</span>
                    <span className="number">
                      <Icon type="arrow-up" />
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
