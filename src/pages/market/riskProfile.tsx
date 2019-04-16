import {
    Button, Card, Col, Divider, Form, Icon, Input, Row, Select, Table, Tabs, Tooltip, Typography
} from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EchartsWrapper from '../../components/EchartsWrapper';
import Icons from '../../components/Icons';

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { Paragraph } = Typography;

//echart 配置项
//财务整体概况--数据
const OverviewOption = (value: any) => {
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
      indicator: [
          { name: '盈利能力',max: 80},
          { name: '偿债能力', max: 80},
          { name: '现金流', max: 80},
          { name: '运营能力', max: 80},
          { name: '成长能力', max: 80},
      ],
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
                value : value.data,
                name : '中信股份',
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
                value : [50, 34, 50, 31, 42],
                name : '行业平均',
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
  const option = {
    title: {
      text: value.text,
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
      data: value.date
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
        name: value.name,
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
        data: value.data
      },
      {
        name: "",
        type: "bar",
        barWidth: "40",
        itemStyle: {
          //柱状图的样式
          color: "#BEC8D3"
        },
        data: value.data
      }
    ]
  };
  return option;
};
//总排名
const rankOption = (value: any) => {
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
      data: value.date
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
        name: value.name,
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
        data: value.data
      }
    ]
  };
  return option;
};
// 业绩收益
const incomeOption = (value: any) => {
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
      data: value.date,
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
        name: value.incomeData[0].name,
        type: "bar",
        barWidth: "24",
        data: value.incomeData[0].data,
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
        // label: {
        //   normal: {
        //     show: true,
        //     position: "top", //---数据显示在上方
        //   }
        // }
      },
      {
        name: value.incomeData[1].name,
        type: "bar",
        barWidth: "24",
        data: value.incomeData[1].data,
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
        // label: {
        //   normal: {
        //     show: true,
        //     position: "top", //---数据显示在上方
        //   }
        // }
      }
    ]
  };
  return option;
};
//select change
function handleChange(value: any) {
  console.log(`selected ${value}`);
}
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
    dataIndex: 'norm',
    key: 'norm',
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
        !text ?
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

class riskProfile extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {
        company: {
          logo: "/images/zhongxin_logo_l.png",
          name: "中信股份",
          info:
            "公司简介基本内容文字基本内容文字基本内容文字基本内容文字基本内容文字基本内容文字…",
          code: "630011",
          plate: "金融",
          date: "2000.01.01",
          count: 124
        },
        oneYear: {
          text: "指标：风险数",
          date: [
            "2017-01-01 至 2017-03-31",
            "2017-04-01 至 2017-06-30",
            "2017-07-01 至 2017-09-30",
            "2017-10-01 至 2017-12-31"
          ],
          name: "风险",
          data: [86, 52, 76, 34]
        },
        Overview: {
          oneYear: {
            name : '中信股份',
            data : [63, 70, 68, 75, 60],
            diag: "经分析，该企业存在如下问题，综合评定结果为无风险文字内容文字内",
            grade: 30,
            abilityList: [
              {
                title: "盈利能力",
                value: 78,
                icon_name:"icongeneral_score_profit"
              },
              {
                title: "现金流",
                value:65,
                icon_name:"icongeneral_score_cash"
              },
              {
                title: "成长能力",
                value:34,
                icon_name:"icongeneral_score_grow"
              },
              {
                title: "偿债能力",
                value:45,
                icon_name:"icongeneral_score_debt"
              },
              {
                title: "运营能力",
                value:98,
                icon_name:"icongeneral_score_operate"
              },
            ]
          },
          threeYear: {
            name : '中信股份',
            data : [53, 40, 38, 55, 70],
            diag: "经分析，该企业存在如下问题，综合评定结果为无风险文字内容文字内",
            grade: 70,
            abilityList: [
              {
                title: "盈利能力",
                value: 78,
                icon_name:"icongeneral_score_profit"
              },
              {
                title: "现金流",
                value:65,
                icon_name:"icongeneral_score_cash"
              },
              {
                title: "成长能力",
                value:34,
                icon_name:"icongeneral_score_grow"
              },
              {
                title: "偿债能力",
                value:45,
                icon_name:"icongeneral_score_debt"
              },
              {
                title: "运营能力",
                value:98,
                icon_name:"icongeneral_score_operate"
              },
            ]
          },
          fiveYear: {
            name : '中信股份',
            data : [58, 65, 54, 35, 78],
            diag: "经分析，该企业存在如下问题，综合评定结果为无风险文字内容文字内",
            grade: 80,
            abilityList: [
              {
                title: "盈利能力",
                value: 58,
                icon_name:"icongeneral_score_profit"
              },
              {
                title: "现金流",
                value:65,
                icon_name:"icongeneral_score_cash"
              },
              {
                title: "成长能力",
                value:54,
                icon_name:"icongeneral_score_grow"
              },
              {
                title: "偿债能力",
                value:35,
                icon_name:"icongeneral_score_debt"
              },
              {
                title: "运营能力",
                value:78,
                icon_name:"icongeneral_score_operate"
              },
            ]
          },
        },
        rank: {
          compare: "财务状况好于67%的企业",
          date: ["2017第一季度", "2017中报", "2017第三季度", "2017年报"],
          name: "中信股份",
          data: [66, 52, 96, 34]
        },
        income: {
          compare: "业绩收益好于67%的企业",
          date: ["2017第一季度", "2017中报", "2017第三季度", "2017年报"],
          incomeData: [
            {
              name: "中信股份",
              data: [2.5, 1.8, -2.1, 1.5]
            },
            {
              name: "平均行业",
              data: [-0.6, 1.3, 2.5, 1.7]
            }
          ]
        },
        ysnl: { //盈利能力
          score: 77.9,
          dataSource: [
            {
              key: '1',
              norm: '流动比率',
              rank: '22/165',
              status: 0
            }, {
              key: '2',
              norm: '现金比例',
              rank: '42/165',
              status: 1
            },{
              key: '3',
              norm: '已获利息倍数',
              rank: '52/165',
              status: 0
            },
          ]
        },
        cznl: { //偿债能力
          score: 30.9,
          dataSource: [
            {
              key: '1',
              norm: '流动比率',
              rank: '22/165',
              status: 0
            }, {
              key: '2',
              norm: '现金比例',
              rank: '42/165',
              status: 1
            },{
              key: '3',
              norm: '已获利息倍数',
              rank: '52/165',
              status: 0
            },
          ]
        },
        czx: { //成长性
          score: 60.9,
          dataSource: [
            {
              key: '1',
              norm: '流动比率',
              rank: '22/165',
              status: 1
            }, {
              key: '2',
              norm: '现金比例',
              rank: '42/165',
              status: 1
            },{
              key: '3',
              norm: '已获利息倍数',
              rank: '52/165',
              status: 0
            },
          ]
        },
        sjlist: [ //近期风险事件
          {
            title: "内幕交易中信被证监会处罚3.12亿元",
            date: "2019.03.12",
            score:30
          },
          {
            title: "内幕交易中信被证监会处罚3.12亿元",
            date:"2019.03.12",
            score:60
          },
          {
            title: "内幕交易中信被证监会处罚3.12亿元内幕交易中信被证监会处罚",
            date:"2019.03.12",
            score:90
          },
          {
            title: "内幕交易中信被证监会处罚3.12亿元",
            date:"2019.03.12",
            score:30
          },
          {
            title: "内幕交易中信被证监会处罚3.12亿元",
            date:"2019.03.12",
            score:90
          },
        ],
        qycb: [//企业财报
          {
            img: "/images/caibao.png",
            title: "1中信股份公布2018年第三季度财报",
            date:"2019.03.12"
          },
          {
            img: "/images/caibao.png",
            title: "2中信股份公布2018年第三季度财报",
            date:"2019.03.12"
          },
          {
            img: "/images/caibao.png",
            title: "3中信股份公布2018年第三季度财报,中信股份公布2018年第三季度财报",
            date:"2019.03.12"
          },
          {
            img: "/images/caibao.png",
            title: "4中信股份公布2018年第三季度财报",
            date:"2019.03.12"
          },
          {
            img: "/images/caibao.png",
            title: "5中信股份公布2018年第三季度财报",
            date:"2019.03.12"
          },
          {
            img: "/images/caibao.png",
            title: "6中信股份公布2018年第三季度财报",
            date:"2019.03.12"
          },
        ]
      }
    };
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
      }
    });
  };
  //根据分数 判断显示什么风险的图标
  tipRisk = (value: any) => { 
    console.log(value)
    let str
    if (value>0 && value<=33) { 
      str = <Icons type='iconannoucement_risk_n' className='iconannoucement_risk_n' />
    }else if (value>33 && value<=66) { 
      str = <Icons type='iconannoucement_risk_l' className='iconannoucement_risk_l' />
    }else if (value>66 && value<=100) { 
      str = <Icons type='iconannoucement_risk_h' className='iconannoucement_risk_h' />
    }
    return str
  }

  render() {
    const {getFieldDecorator,isFieldTouched,getFieldError,getFieldsError} = this.props.form;
    const searchError = isFieldTouched("search") && getFieldError("search");
    const { company, oneYear, Overview, rank, income, ysnl, cznl, czx, sjlist, qycb } = this.state.data;
    return (
      <div className="risk-container">
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
                <img src={company.logo} />
                <h4>{company.name}</h4>
              </div>
              <div className="risk-info_inner">
                <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                  {company.info}
                </Paragraph>
              </div>
              <ul className="risk-info_plate clearfloat">
                <li>
                  <h4>{company.code}</h4>
                  <h5>股票代码</h5>
                </li>
                <li>
                  <h4>{company.plate}</h4>
                  <h5>所属板块</h5>
                </li>
                <li>
                  <h4>{company.date}</h4>
                  <h5>上市日期</h5>
                </li>
                <li>
                  <h4 className="red">{company.count}</h4>
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
                <TabPane tab="近 1 年" key="1">
                  <div className="radar">
                    <EchartsWrapper
                      option={OverviewOption(Overview.oneYear)}
                      style={{ height: 360 }}
                    />
                  </div>
                  <div className="radar-right">
                    <div className="top clearfloat">
                      <div className="top-item">
                        <span>财务风险等级：</span>
                        <span className="em-list">
                          <em>{Overview.oneYear.grade <= 35 ? <i>无风险</i> : null}</em>
                          <em>{Overview.oneYear.grade > 35 && Overview.oneYear.grade <= 70 ? <i>低风险</i> : null}</em>
                          <em>{Overview.oneYear.grade > 70 ? <i>高风险</i> : null}</em>
                        </span>
                      </div>
                      <div className="top-item">
                        <span>风险诊断：</span>
                        <span className="oneEllipsis">{Overview.oneYear.diag}</span>
                      </div>
                      <div className="top-item">
                        <span>财务综合评分：</span>
                        <span>{80}</span>
                      </div>
                    </div>
                    <ul className="abilityList clearfloat">
                      {
                        Overview.oneYear.abilityList.map((item: any, key: any) => <li key={key}>
                          <Icons type={item.icon_name} className={item.icon_name} />
                          <span className="title">{item.title}: </span>
                          <span className="value">{item.value}</span>
                        </li>)
                      }
                    </ul>
                    <div className="foot">
                      <a href="#" className="btn-more">查看详情</a>
                    </div>
                  </div>
                </TabPane>

                <TabPane tab="近 3 年" key="2">
                <div className="radar">
                    <EchartsWrapper
                      option={OverviewOption(Overview.threeYear)}
                      style={{ height: 360 }}
                    />
                  </div>
                  <div className="radar-right">
                    <div className="top clearfloat">
                      <div className="top-item">
                        <span>财务风险等级：</span>
                        <span className="em-list">
                          <em>{Overview.threeYear.grade <= 35 ? <i>无风险</i> : null}</em>
                          <em>{Overview.threeYear.grade > 35 && Overview.threeYear.grade <= 70 ? <i>低风险</i> : null}</em>
                          <em>{Overview.threeYear.grade > 70 ? <i>高风险</i> : null}</em>
                        </span>
                      </div>
                      <div className="top-item">
                        <span>风险诊断：</span>
                        <span className="oneEllipsis">{Overview.threeYear.diag}</span>
                      </div>
                      <div className="top-item">
                        <span>财务综合评分：</span>
                        <span>{80}</span>
                      </div>
                    </div>
                    <ul className="abilityList clearfloat">
                      {
                        Overview.threeYear.abilityList.map((item: any, key: any) => <li key={key}>
                          <Icons type={item.icon_name} className={item.icon_name} />
                          <span className="title">{item.title}: </span>
                          <span className="value">{item.value}</span>
                        </li>)
                      }
                    </ul>
                    <div className="foot">
                      <a href="#" className="btn-more">查看详情</a>
                    </div>
                  </div>
                </TabPane>

                <TabPane tab="近 5 年" key="3">
                <div className="radar">
                    <EchartsWrapper
                      option={OverviewOption(Overview.fiveYear)}
                      style={{ height: 360 }}
                    />
                  </div>
                  <div className="radar-right">
                    <div className="top clearfloat">
                      <div className="top-item">
                        <span>财务风险等级：</span>
                        <span className="em-list">
                          <em>{Overview.fiveYear.grade <= 35 ? <i>无风险</i> : null}</em>
                          <em>{Overview.fiveYear.grade > 35 && Overview.fiveYear.grade <= 70 ? <i>低风险</i> : null}</em>
                          <em>{Overview.fiveYear.grade > 70 ? <i>高风险</i> : null}</em>
                        </span>
                      </div>
                      <div className="top-item">
                        <span>风险诊断：</span>
                        <span className="oneEllipsis">{Overview.fiveYear.diag}</span>
                      </div>
                      <div className="top-item">
                        <span>财务综合评分：</span>
                        <span>{80}</span>
                      </div>
                    </div>
                    <ul className="abilityList clearfloat">
                      {
                        Overview.fiveYear.abilityList.map((item: any, key: any) => <li key={key}>
                          <Icons type={item.icon_name} className={item.icon_name} />
                          <span className="title">{item.title}: </span>
                          <span className="value">{item.value}</span>
                        </li>)
                      }
                    </ul>
                    <div className="foot">
                      <a href="#" className="btn-more">查看详情</a>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              className="risk-history"
              title="近期风险走势"
              bordered={false}
            >
              <EchartsWrapper
                option={historyOption(oneYear)}
                style={{ height: 330 }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              className="risk-zpm"
              title="总排名"
              bordered={false}
              extra={<button className="btn-default"><Icons type='iconbtn_add' className='iconbtn_add' />增加对比</button>}
            >
              <div className="tip">{rank.compare}</div>
              <EchartsWrapper
                option={rankOption(rank)}
                style={{ height: 360 }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              className="risk-yjsy"
              title="业绩收益"
              bordered={false}
              extra={<button className="btn-default"><Icons type='iconbtn_edit' className='iconbtn_edit' />更改行业</button>}
            >
              <div className="tip">{income.compare}</div>
              <EchartsWrapper
                option={incomeOption(income)}
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
                  <span className={getColor(ysnl.score)}>{ysnl.score}</span>
                </span>
              }
            >
              <Table dataSource={ysnl.dataSource} columns={columns} pagination={false} />
            </Card>
          </Col>
          <Col span={12}>
            <Card className="risk-cznl" title="偿债能力"
              bordered={false}
              extra={
                <span className="score">
                  <Icons type="icongeneral_score" className="icongeneral_score" />
                  <em>评分：</em>
                  <span className={getColor(cznl.score)}>{cznl.score}</span>
                </span>
              }
            >
              <Table dataSource={cznl.dataSource} columns={columns} pagination={false} />
            </Card>
          </Col>

          <Col span={12}>
            <Card className="risk-yynl" title="营运能力" bordered={false}
            extra={
              <span className="score">
                <Icons type="icongeneral_score" className="icongeneral_score" />
                <em>评分：</em>
                <span className={getColor(ysnl.score)}>{ysnl.score}</span>
              </span>
            }
            >
              <Table dataSource={ysnl.dataSource} columns={columns} pagination={false} />
            </Card>
          </Col>
          <Col span={12}>
            <Card className="risk-xjzl" title="现金质量"
              bordered={false}
              extra={
                <span className="score">
                  <Icons type="icongeneral_score" className="icongeneral_score" />
                  <em>评分：</em>
                  <span className={getColor(cznl.score)}>{cznl.score}</span>
                </span>
              }
            >
              <Table dataSource={cznl.dataSource} columns={columns} pagination={false} />
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
                  <em>评分：</em>
                  <span className={getColor(czx.score)}>{czx.score}</span>
                </span>
              }
            >
              <Table dataSource={czx.dataSource} columns={columns} pagination={false} />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              className="risk-sj"
              title="近期风险事件"
              bordered={false}
              extra={<a href="#">查看更多</a>}
            >
              <ul className="ul-list">
              {
                  sjlist.slice(0, 4).map((item: any, idx: any) => <li key={idx}>{this.tipRisk(item.score)}<a href="#">{item.title}</a><time>{item.date}</time></li> )
              }
              </ul>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              className="risk-report"
              title="企业财报"
              bordered={false}
              extra={<a href="#">查看更多</a>}
            >
              <ul className="img-list">
              {
                  qycb.slice(0,5).map((item: any, idx: any) => <li key={idx}><a href="#"><img src={item.img} /></a><a href="#">{item.title}</a><time>{item.date}</time></li> )
              }
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const WrapSearch = Form.create()(riskProfile);
export default WrapSearch;
