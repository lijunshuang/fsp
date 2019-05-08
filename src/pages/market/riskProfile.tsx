import {
    Button, Card, Checkbox, Col, Divider, Form, Icon, Input, message, Modal, Row, Select, Spin,
    Table, Tabs, Tooltip, Typography
} from 'antd';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { func } from 'prop-types';
import qs from 'querystring';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    companySearch, financialAbility, financialEvent, financialGlobal, financialQualityRank,
    financialReturn
} from '../../api';
import EchartsWrapper from '../../components/EchartsWrapper';
import Icons from '../../components/Icons';
import Path from '../../components/Path';
import { keepTwo, tipRisk } from '../../utils';

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { Paragraph } = Typography;
const CheckboxGroup = Checkbox.Group;
//echart 配置项
//财务整体概况--数据
const OverviewOption = (value: any) => {
  const name = [value.shor_name, '行业平均'] //获取 对比的名称
  const indicator = value.company.company_score.map((item:any)=>item.name)              // 获取各个维度的name
  const company_data = value.company.company_score.map((item:any)=>Number(item.score))  //获取公司score 值
  const industry_data = value.industry.map((item:any)=>Number(item.score))              //获取行业平均score 值
  // const max = Math.max.apply(null, company_data);                                       //获取数组中的最大值
  const option = {
    tooltip: {},
    legend: {
      bottom: 10,
      borderRadius: '50%'
    },
    grid: {
      top: "10px",
      left: "0%",
      right: "0",
      bottom: "3%",
      containLabel: true
    },
    radar: {
      name: {
          textStyle: {
              color: '#3A3B46',
              borderRadius: 3,
              padding: [3, 5]
          }
      },
      indicator: (function () { 
        let arr:any = []
        indicator.forEach((element:any) => {
          arr.push({
            name: element,
            max:100
          })
        });
        return arr
      })()
    },
    series: [{
        name: '',
        type: 'radar',
        areaStyle: {
            normal: {
                opacity:0.4
            }
        },
        data : [
          {
            // name : name[0],
            value : company_data,
            itemStyle: {
              normal: {
                color: "#1890FF",
              }
            },
            label: {
                normal: {
                    show: true,
                    formatter:(params:any)=>{
                        return params.value;
                    }
                }
            }
          },
          {
            value : industry_data,
            name : name[1],
            itemStyle: {
              normal: {
                color: "#B53ECE",
              }
            },
            label: {
                normal: {
                    show: true,
                    formatter:(params:any)=>{
                        return params.value;
                    }
                }
            }
          }
        ]
    }]
};
  return option;
};
//近期风险走势
const historyOption = (value: any) => {
  const date = value.map((item:any)=>item.date) //时间
  const data = value.map((item:any)=>item.value) // 获取数据
  const option = {
    title: {
      text: "指标：风险数",
      textStyle: {
        fontSize: "14px",
        color: "#6B798E"
      },
      top: "20px"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    grid: {
      top: "80px",
      left: "0%",
      right: "0",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#6B798E",
          fontSize: "12px"
        }
      },
      data: date
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#6B798E",
          fontSize: "12px"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed"
        }
      }
    },
    series: [
      {
        name: "风险",
        type: "line",
        symbolSize: 8,   //折线点的大小
        lineStyle: {
          //线的样式
          color: "#53A0FD",
          // width: "3"
        },
        // 折线颜色
        itemStyle: {
          normal: {
              color: '#53A0FD',
              lineStyle: {
                color: '#53A0FD',
                width:3
              }
          },
          borderWidth: "4",
          borderColor: "#2075F7",
        },
        label: {
          //折线上的文字
          normal: {
            show: true,
            position: "top"
          }
        },
        data:data
      },
      {
        name: "",
        type: "bar",
        barWidth: "40",
        itemStyle: {
          //柱状图的样式
          color: "#BEC8D3"
        },
        data:data
      }
    ]
  };
  return option;
};
//总排名
const rankOption = (value: any) => {
  const date = value[0].history_score.map((item:any)=>item.date) //时间
  // const data = value.history_score.map((item:any)=>item.value) // 获取数据
  const color = ["#1890FF", "#B53ECE", "#6B798E"]
  const lineStyle = {
    type: "line",
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
          color: '#53A0FD',
          lineStyle: {
            color: '#53A0FD',
            width:3
          }
      },
    },
  }
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {},
    grid: {
      top: "45px",
      left: "0%",
      right: "0px",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#6B798E",
          fontSize: "12px"
        }
      },
      data: date
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#6B798E",
          fontSize: "12px"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed"
        }
      }
    },
    color,//线的颜色
    series: (function () { 
      let arr:any = []
        value.forEach((i:any) => {
          arr.push({
            ...lineStyle,
            name: i.short_name,
            data: i.history_score.map((item:any)=>item.value.toFixed(0))
          })
        });
      return arr
    })()
  };
  return option;
};
// 业绩收益
const incomeOption = (value: any,trade:any) => {
  const name = [value.short_name, trade] //获取 对比的名称
  const date = value.history_score.map((item:any)=>item.date) //时间
  const data = value.history_score.map((item:any)=>item.value) // 获取数据
  // const industry_data = value.industry_score.map((item:any)=>item.value) // 获取数据
  const industry_data = value.industry_score[trade].map((item:any)=>item.value) // 获取数据
  const option = {
    grid: {
      top: "45px",
      left: "0%",
      right: "0px",
      bottom: "3%",
      containLabel: true
    },
    legend: {
      
    },
    tooltip: {
      tigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#6B798E",
          fontSize: "12px"
        }
      },
      data: date,
    },
    yAxis: {
      type: "value",
      show: true,
      axisLine: {
        lineStyle: {
          color: "#6B798E",
          fontSize: "12px"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed"
        }
      }
    },
    series: [
      {
        name: name[0],
        type: "bar",
        barWidth: "24",
        data: data,
        marginBottom: -20,
        textAlign: "left",
        itemStyle: {
          normal: {
            color: "#1890FF",
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "black",
                fontSize: 14
              }
            }
          }
        },
      },
      {
        name: name[1],
        type: "bar",
        barWidth: "24",
        data: industry_data,
        marginBottom: -20,
        textAlign: "left",
        itemStyle: {
          normal: {
            color: "#B53ECE",
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "black",
                fontSize: 14
              }
            }
          }
        },
      }
    ]
  };
  return option;
};

function callback(key: any) {
  console.log(key);
}

//判断评分的颜色
function getColor(value: any) { 
  let color
  if (value > 0 && value <= 50) {
    color = 'red'
  } else if (value > 50 && value <= 70) {
    color = 'orange'
  } else if (value > 70 && value <= 100) { 
    color = 'green'
  }
  return color
}

const columns = [
  {
    title: '指标',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '行业排名',
    dataIndex: 'rank',
    key: 'rank',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text:any) =>
      <span>{
        text == 'risk' ?
          <Tooltip placement="topLeft" overlayClassName="tips-bg" title="1.利润结构不合理，经营性利润低，投资性利润高 2.利润同比大幅下滑">
          <Icon type="exclamation-circle" className='red' />
        </Tooltip>
        :
        <Tooltip placement="topLeft" overlayClassName="tips-bg" title="1.利润同比大幅上升">
          <Icon type="check-circle" className='green' />
        </Tooltip>
      }
      </span>,
  }
];
const score_icon = ["icongeneral_score_profit", "icongeneral_score_debt", "icongeneral_score_operate", "icongeneral_score_grow", "icongeneral_score_cash"]


class riskProfile extends Component<any, any> {
  constructor(props: any) {
    super(props);
    let lastFetchId,fetchUser
    lastFetchId = 0;
    // fetchUser = debounce(this.fetchUser, 800);
    this.state = {
      // visible:true,
      scoreTitle: "评分",
      trade: ["所有","金融","科技"],
      more:"查看详情",
      compare: "财务状况好于67%的企业",
      company_logo: "/images/zhongxin_logo_l.png",
      data: {},
      changeArr: [],//增加行业 默认数据
      checkedVal: [],
      selectArr: [],
      selectVal: "所有", //更改行业 选择的值
      fetching: false,
      checkBoxNum:1,
    };
  }
  componentWillMount() { 
    
  }
  async componentDidMount() {
    // To disabled submit button at the beginning.
    console.log(this.props.history.location.state)
    this.props.form.validateFields();
      // let risk_events = await axios.post(companySearch, qs.stringify({"company":"000001"})).then((res)=> res.data).catch((error:any)=> {
      // 　　alert(error);
      // });
      let financial_global = await axios.get(financialGlobal).then((res)=> res.data).catch((error:any)=> {
      　　alert(error);
      });
      let quality_rank = await axios.get(financialQualityRank).then((res)=> res.data).catch((error:any)=> {
      　　alert(error);
      });
      let financial_return = await axios.get(financialReturn).then((res)=> res.data).catch((error:any)=> {
      　　alert(error);
      });
      let financial_ability = await axios.get(financialAbility).then((res)=> res.data).catch((error:any)=> {
      　　alert(error);
      });
      let financial_event = await axios.get(financialEvent).then((res)=> res.data).catch((error:any)=> {
      　　alert(error);
      });

    this.setState({
      ...this.state,
      data: {
        financial_global: financial_global.payload,
        quality_rank: quality_rank.payload,
        financial_return: financial_return.payload,
        financial_ability: financial_ability.payload,
        financial_event: financial_event.payload,
      },
      changeArr : [financial_return.payload]
    })
  }
  //顶部搜索功能
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("formValues: ", values);
        this.props.history.push(`/market/riskProfile`)
      }
    });
  };
 
    // 实时校验
  checkConfirm = async (rule:any,value: any, callback: any) =>{
    let req:any = qs.stringify({
      "name_prefix": value
    })
    if (value) { 
      // let results = await axios.post(existApi, req, {headers})
      // .then(res => res.data)
      // .catch(error => {
      //     console.log(error);
      // });

      // if (results.success) {
      //   results = results.data.response
      //   if(results.prefix_match)
      //   this.setState({
      //     prefix_match: results.prefix_match,
      //     // exact_match: results.exact_match
      //   })
      // }
    }
    callback();
  }
//select change
  handleChange = (e: any) => {
    console.log(`selected ${e.target.value}`);
    this.setState({
      inputVal: e.target.value
    });
  }
  
  
  
 //增加对比
  addContrast = () => {
    let shortName:any = this.state.changeArr.map((item: any) => item.short_name)
    Modal.info({
      width: 540,
      visible: false,
      icon: "",
      className: "addContrast",
      okText:"确定",
      content: (
        <div>
          <h2>增加对比</h2>
          <h5>搜索公司进行对比</h5>
          <div className="content">
            <p>已对比的公司</p>
            <Checkbox.Group onChange={this.onChange} defaultValue={shortName}>
              {
                shortName.map((i: any,idx:any) => <Checkbox key={idx} disabled={idx == 0? true:false} value={i} checked>{i}</Checkbox>)
              }
            </Checkbox.Group> 
            <div className="item">
              <Input
                placeholder='请输入公司名字，代码或简称'
                onChange={this.handleChange}
              />
              <Button onClick={this.onAdd}>增加</Button>
            </div>
          </div>
        </div>
      ),
      onOk: ()=>{ }
    });
  }
  //按增加 / Modal 确定的回调
  onAdd = async () => {
    let { inputVal } = this.state
    console.log("inputVal",inputVal == "")
    let req = qs.stringify({
      "code": inputVal,
      "short_name": "万科A"
    })
    if (inputVal == "") {
      alert('请输入公司名字，代码或简称')
      message.info('请输入公司名字，代码或简称');
    } else if (inputVal.length > 2) { 
      let quality_rank = await axios.post(financialQualityRank,req).then((res)=> res.data).catch((error:any)=> {
        　alert(error);
      });
      this.setState({
        changeArr : [...this.state.changeArr,quality_rank.payload]
      });
    }
  }
  
onChange = (checkedVal: any) => {
  let { changeArr } = this.state
  let b = this.state.checkedVal
  let intersection = changeArr.filter((v:any) => checkedVal.includes(v.short_name))
  console.log("intersection",intersection,"checkedVal",checkedVal)
  this.setState({
    checkedVal,
    changeArr:intersection
  })
}
 //更改行业
  editContrast = () => {
    const {data: { financial_return},selectVal} = this.state
    let trade = Object.keys(financial_return.industry_score)
    Modal.info({
      width: 540,
      visible: true,
      icon: "",
      className: "addContrast",
      okText:"确定",
      content: (
        <div>
          <h2>更改行业</h2>
          <h5>重新选择行业进行对比</h5>
          <Select
            showSearch
            optionFilterProp="children"
            onChange={this.changeContrast}
            defaultValue={trade[0]}
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            filterOption={(input:any, option:any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              trade.map((item: any, idx: any) => <Option key={idx} value={item}>{item}</Option>)
            }
          </Select>
        </div>
      ),
      onOk() { }
    });
  }
  changeContrast = (e: any) => {
    console.log(`selected ${e}`);
    this.setState({
      selectVal: e,
    });
  }

  render() {
    const {getFieldDecorator,isFieldTouched,getFieldError,getFieldsError} = this.props.form;
    const searchError = isFieldTouched("search") && getFieldError("search");
    const { scoreTitle, more, company_logo, compare, data,changeArr,selectVal} = this.state
    if (JSON.stringify(data) !== "{}") {
      const { financial_global, quality_rank, financial_return, financial_ability: { profitability, solvency, operating, currency, growth }, financial_event } = data
      return (
        
        <div className="risk-container">
          <Path path={this.props.history}/>
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
            <Col span={6}>
              <Card bordered={false} className="risk-info">
                <div className="logo">
                  {/* <img src={company_logo} /> */}
                  <h4>{financial_global.shor_name}</h4>
                </div>
                <div className="risk-info_inner">
                  <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                    {financial_global.description}
                  </Paragraph>
                </div>
                <ul className="risk-info_plate clearfloat">
                  <li>
                    <h4>{financial_global.code}</h4>
                    <h5>股票代码</h5>
                  </li>
                  <li>
                    <h4>{financial_global.sector}</h4>
                    <h5>所属板块</h5>
                  </li>
                  <li>
                    <h4>{financial_global.list_date}</h4>
                    <h5>上市日期</h5>
                  </li>
                  <li>
                    <h4 className="red">{financial_global.risk_count}</h4>
                    <h5>
                      <Link to="">全年财务风险数量</Link>
                    </h5>
                  </li>
                </ul>
              </Card>
            </Col>
            <Col span={18}>
              <Card className="risk-gk" title="财务整体状况" bordered={false}>
                
                <Tabs defaultActiveKey="1" onChange={callback} className="tabs-car-absolute">
                  <TabPane tab="近 1 年" key="1"></TabPane>
                  <TabPane tab="近 3 年" key="2"></TabPane>
                  <TabPane tab="近 5 年" key="3"></TabPane>
                </Tabs>
                
                <Row>
                  <Col md={12} lg={12} xl={10} className="radar">
                    <EchartsWrapper
                      option={OverviewOption(financial_global)}
                      style={{ height: 330 }}
                    />
                  </Col>
                  <Col md={12} lg={12} xl={14} className="radar-right">
                    <div className="top clearfloat">
                      <div className="top-item">
                        <span>财务风险等级：</span>
                        <span className="em-list">
                          <em>{financial_global.company.risk_level == '无风险' ? <i>无风险</i> : null}</em>
                          <em>{financial_global.company.risk_level == '低风险' ? <i>低风险</i> : null}</em>
                          <em>{financial_global.company.risk_level == '高风险' ? <i>高风险</i> : null}</em>
                        </span>
                      </div>
                      <div className="top-item">
                        <span>风险诊断：</span>
                        <span className="oneEllipsis">{financial_global.company.risk_diagnosis}</span>
                      </div>
                      <div className="top-item">
                        <span>财务综合评分：</span>
                        <span>{financial_global.company.risk_score}</span>
                      </div>
                    </div>
                    <ul className="abilityList clearfloat">
                      {
                        financial_global.company.company_score.map((item: any, key: any) => <li key={key}>
                          <Icons type={score_icon[key]} className={score_icon[key]} />
                          <span className="title">{item.name}: </span>
                          <span className="value">{item.score}</span>
                        </li>)
                      }
                    </ul>
                    <div className="foot">
                      <Link to="/market/riskDetails" className="btn-more">{more}</Link>
                    </div>
                  </Col>
                </Row>
  
              </Card>
            </Col>
            <Col span={24}>
              <Card
                className="risk-history"
                title="近期风险走势"
                bordered={false}
              >
                <EchartsWrapper
                  option={historyOption(financial_global.risk_trend)}
                  style={{ height: 330 }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="risk-zpm"
                title="总排名"
                bordered={false}
                extra={<Button className="btn-default" onClick={this.addContrast}><Icons type='iconbtn_add' className='iconbtn_add' />增加对比</Button>}
              >
                <div className="tip">{compare}</div>
                {
                  changeArr.length>0 ? 
                    <EchartsWrapper
                    option={rankOption(changeArr)}
                    style={{ height: 360 }}
                    />
                    : 
                    <EchartsWrapper
                    // option={rankOption(changeArr)}
                    style={{ height: 360 }}
                    />
                }
                
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="risk-yjsy"
                title="业绩收益"
                bordered={false}
                extra={<Button className="btn-default"
                  onClick={this.editContrast}
                ><Icons type='iconbtn_edit' className='iconbtn_edit' />更改行业</Button>}
              >
                <div className="tip">{compare}</div>
                {/* 待接口增加返回的数据 后再显示 */}
                <EchartsWrapper
                  option={incomeOption(financial_return,selectVal)}
                  style={{ height: 360 }}
                />
              </Card>
            </Col>
  
            <Col span={12}>
              <Card
                className="risk-ylnl"
                title="盈利能力"
                bordered={false}
                extra={
                  <span className="score">
                    <Icons type="icongeneral_score" className="icongeneral_score" />
                    <em>评分：</em>
                    <span className={getColor(profitability.score)}>{profitability.score}</span>
                  </span>
                }
              >
                <Table
                  rowKey={(record, index) => `${index}`}
                  dataSource={profitability.index}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="risk-cznl" title="偿债能力"
                bordered={false}
                extra={
                  <span className="score">
                    <Icons type="icongeneral_score" className="icongeneral_score" />
                    <em>{scoreTitle}: </em>
                    <span className={getColor(solvency.score)}>{solvency.score}</span>
                  </span>
                }
              >
                <Table
                  rowKey={(record, index) => `${index}`}
                  dataSource={solvency.index}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            </Col>
  
            <Col span={12}>
              <Card className="risk-yynl" title="营运能力" bordered={false}
                extra={
                  <span className="score">
                    <Icons type="icongeneral_score" className="icongeneral_score" />
                    <em>{scoreTitle}: </em>
                    <span className={getColor(operating.score)}>{operating.score}</span>
                  </span>
                }
              >
                <Table
                  rowKey={(record, index) => `${index}`}
                  dataSource={operating.index}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="risk-xjzl" title="现金质量"
                bordered={false}
                extra={
                  <span className="score">
                    <Icons type="icongeneral_score" className="icongeneral_score" />
                    <em>{scoreTitle}: </em>
                    <span className={getColor(currency.score)}>{currency.score}</span>
                  </span>
                }
              >
                <Table
                  rowKey={(record, index) => `${index}`}
                  dataSource={currency.index}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            </Col>
  
            <Col span={12}>
              <Card
                className="risk-czx"
                title="成长性"
                bordered={false}
                extra={
                  <span className="score">
                    <Icons type="icongeneral_score" className="icongeneral_score" />
                    <em>{scoreTitle}: </em>
                    <span className={getColor(growth.score)}>{growth.score}</span>
                  </span>
                }
              >
                <Table
                  rowKey={(record, index) => `${index}`}
                  dataSource={growth.index}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            </Col>
            
            <Col span={12}>
              <Card
                className="risk-sj"
                title="近期风险事件"
                bordered={false}
                extra={<Link to="/list">查看更多</Link>}
              >
                <ul className="ul-list">
                  {
                    financial_event.risk_event.slice(0, 4).map((item: any, idx: any) => <li key={idx}>{tipRisk(item.risk_level)}<a href="#">{item.title}</a><time>{item.date}</time></li>)
                  }
                </ul>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                className="risk-report"
                title="企业财报"
                bordered={false}
                extra={<Link to="/list">查看更多</Link>}
              >
                <ul className="img-list">
                  {
                    financial_event.report.slice(0, 5).map((item: any, idx: any) => <li key={idx}><a href="#" className="img_caibao">{item.title.slice(0, 8)}</a><a href="#">{item.title}</a><time>{item.pub_date}</time></li>)
                  }
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
const WrapSearch = Form.create()(riskProfile);
// const mapStateProps = (state: any) => {
//   return {
//     financial_global: state.financialGlobal.results,
//     financialQualityRank: state.financialQualityRank.results,
//     financialReturn: state.financialReturn.results,
//     financialAbility: state.financialAbility.results,
//     financialEvent: state.financialEvent.results,
//   }
// }
// const mapDispatchToProps = {}
// export default connect(mapStateProps)(WrapSearch)

export default WrapSearch;
