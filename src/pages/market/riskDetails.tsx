import {
    Button, Card, Col, Divider, Form, Icon, Input, Row, Select, Table, Tabs, Tooltip, Typography
} from 'antd';
import * as echarts from 'echarts';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EchartsWrapper from '../../components/EchartsWrapper';
import Icons from '../../components/Icons';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { Paragraph,Title } = Typography;

//财务风险变化趋势
const trendOption = (value: any) => {
  const option = {
    title: {
      text: value.name,
      textStyle: {
        fontSize: "14px",
        color: "#6B798E"
      },
      top: "10px",
      left:"2%"
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
      top: "60px",
      left: "2%",
      right: "0",
      bottom: "30px",
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
        show:false,
        lineStyle: {
          color: "#6B798E",
          fontSize: "12px"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#fff",
          // type: "dashed"
        }
      }
    },
    //渐变背景色
    backgroundColor:new echarts.graphic.LinearGradient(
      0, 0, 0, 1,
      [
        {offset: 0, color: 'rgba(26,197,150,0.2)'},
        {offset: 0.5, color: 'rgba(250,196,97,0.2)'},
        {offset: 1, color: 'rgba(247,49,28,.3)'}
      ] 
    ),
    series: [{
      name:value.name,
      data: value.data,
      type: 'line',
      smooth: true,
      symbolSize: 8,
      itemStyle: {
        normal: {
            lineStyle: {
              width:3
            }
        },
      },
    }]
  };
  return option;
};

//echart 配置项

//毛利率 
const grossOption = (value: any) => {
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
    grid: {
      top: "40px",
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
//盈利能力 评分
const scoreOption = (value: any) => { 
  const option = {
    text:"评分",
    tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
    },
    grid: {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      containLabel: true
    },
    series: [
      {
        name: '检测结果',
        type: 'gauge',
        detail: { formatter: '{value}' },
        data: [{ value: value.score, name: value.name }],
        axisTick:{
          show:false,//不显示刻度线
        },
        splitLine: {           // 分隔线
          length: 11,         // 属性length控制线长
          show:false,         //不显示分割线
        },
        axisLine: {
          lineStyle: {
            width:10,
            color: [
              [
                1, new echarts.graphic.LinearGradient(0, 1, 1, 1, [
                {
                  offset: 0,
                  color: "rgba(245,67,0,1)",// 0% 处的颜色
                },{
                  offset: 0.6,
                  color: "rgba(248,202,0,1)" // 50% 处的颜色
                },{
                  offset: 1,
                  color: "rgba(0,200,140,1)" // 100% 处的颜色
                }
              ],false)
              ], 
            ]
          },
          splitLine:{
            //分割线样式相关
            show:false,
            length:15,
          },
        },
      }
    ]
  };
  return option
}
//他比中 的 毛利率
const differRateOption = (value: any) => {

  let data = value.dataArr
  const color = ["#1890FF","#B53ECE","#6B798E"]
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
    legend: {
      bottom:'10px'
    },
    grid: {
      top: "40px",
      left: "0%",
      right: "0",
      bottom: "60px",
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
    color:color,//线的颜色
    series: (function () { 
      let arr:any = []
      data.forEach((item:any,idx:any) => {
        arr.push({
          ...item,
          symbolSize: 8,
          // 折线样式
          itemStyle: {
            normal: {
              lineStyle: {
                width:3
              }
            },
          },
        })
      });
      return arr
    })(),
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

//判断指标
function getIdx(value: any) { 
  let idx
  if (value > 0 && value <= 40) {
    idx = '一般'
  } else if (value > 40 && value <= 70) {
    idx = '重要'
  } else if (value > 70 && value <= 100) { 
    idx = '核心'
  }
  return idx
}

const columns = [
  {
    title: '',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: '利润率',
    dataIndex: 'profit',
    key: 'profit',
  },
  {
    title: '销售毛利率',
    dataIndex: 'gross',
    key: 'gross',
  },
  {
    title: '销售期间费用率',
    dataIndex: 'sales_period',
    key: 'sales_period',
  },
  {
    title: '增长率',
    dataIndex: 'growth_rate',
    key: 'growth_rate',
  },
];


class riskDetails extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {
        company: {
          logo: "/images/zhongxin_logo_l.png",
          name: "深圳市金证科技股份有限公司",
          info:"公司简介基本内容文字基本内容文字基本内容文字基本内容文字基本内容文字基本内容文字…",
          code: "630128",
          plate: "金融",
          date: "2000.01.01",
          score:41,
          count: 124
        },
        trend: {
          one: {
            yl: {
              name: "评分",
              date: ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              data: [82, 32, 51, 94],
            },
            cz: {
              name: "评分",
              date: ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              data: [32, 52, 11, 54],
            },
            ch: {
              name: "评分",
              date: ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              data: [12, 62, 21, 74],
            },
            yy: {
              name: "评分",
              date: ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              data: [82, 32, 71, 34],
            },
            xjl: {
              name: "评分",
              date: ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              data: [12, 62, 51, 94],
            },
          },
          three: {
            yl: {
              name: "评分",
              date: ["2015","2016", "2017"],
              data: [82, 32, 51],
            },
            cz: {
              name: "评分",
              date: ["2015","2016", "2017"],
              data: [ 52, 11, 54],
            },
            ch: {
              name: "评分",
              date: ["2015","2016", "2017"],
              data: [12, 62, 74],
            },
            yy: {
              name: "评分",
              date: ["2015","2016", "2017"],              
              data: [82, 71, 34],
            },
            xjl: {
              name: "评分",
              date: ["2015","2016", "2017"],
              data: [12, 62, 94],
            },
          },
        },
        ysnl: {
          title:"盈利能力分析",
          name:"盈利能力评分",
          score: 87.5,
          info: "该公司与去年第三季报相比，金证股份盈利能力有所增强，处于一年内得高位，其中，主营获利能力大幅增强，总资产收益能力大幅提升。该公司与去年第三季报相比，金证股份盈利能力有所增强，处于一年内得高位，其中，主营获利能力大幅增强，总资产收益能力大幅提升",
          resolve: [
            {
              idx: 30,
              title: '净利润收益率',
              status:1
            },
            {
              idx: 70,
              title: '净利润收益率',
              status:0
            },
            {
              idx: 30,
              title: '销售毛利率',
              status:0
            },
            {
              idx: 90,
              title: '销售毛利率',
              status:1
            },
            {
              idx: 30,
              title: '销售期间费用率',
              status:0
            },
            {
              idx: 90,
              title: '销售期间费用率',
              status:1
            },
          ],
          some: [
            {
              key: 1,
              year: 2017,
              profit: 13.56,//利润率
              gross: 3.56,//销售毛利率
              sales_period: 5.22,//销售期间费用率
              growth_rate: 45.66//增长率
            },
            {
              key: 2,
              year: 2018,
              profit: 13.56,//利润率
              gross: 3.56,//销售毛利率
              sales_period: 5.22,//销售期间费用率
              growth_rate: 45.66//增长率
            },
            {
              key: 3,
              year: 2019,
              profit: 13.56,//利润率
              gross: 3.56,//销售毛利率
              sales_period: 5.22,//销售期间费用率
              growth_rate: 45.66//增长率
            },
            {
              key: 4,
              year: 2017,
              profit: 13.56,//利润率
              gross: 3.56,//销售毛利率
              sales_period: 5.22,//销售期间费用率
              growth_rate: 45.66//增长率
            },
          ],
          rate: {
            gross: {
              name: "毛利率",
              date: ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              data: [2.5,-2,1.5,0.5]
            },
            profit: {
              date: ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              name: "利润率",
              data: [1.6,0.5,-1.5,-2]
            },
            expense: {
              date: ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              name: "费用率",
              data: [1.5,-1,1.6,2.6]
            },
          },
          differRate: {
            gross: {
              date:  ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              dataArr:[
                {
                  name:'中信股份',
                  type:'line',
                  stack: '总量',
                  data:[20, -34, 9, 23]
                },
                {
                    name:'行业平均',
                    type:'line',
                    stack: '总量',
                    data:[22, 48, 11, 2]
                },
                {
                    name:'所有平均',
                    type:'line',
                    stack: '总量',
                    data:[15, 23, -10, 54]
                }
              ],
            },
            profit: {
              date:  ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              dataArr:[
                {
                  name:'中信股份',
                  type:'line',
                  stack: '总量',
                  data:[-12, 13, 11, 14]
                },
                {
                    name:'行业平均',
                    type:'line',
                    stack: '总量',
                    data:[23, 18, -11, 34]
                },
                {
                    name:'所有平均',
                    type:'line',
                    stack: '总量',
                    data:[10, 2, 21, 54]
                }
              ],
            },
            expense: {
              date:  ["2017第一季度","2017中报", "2017第三季度","2017年报"],
              dataArr:[
                {
                  name:'中信股份',
                  type:'line',
                  stack: '总量',
                  data:[20, 32, -11, 14]
                },
                {
                    name:'行业平均',
                    type:'line',
                    stack: '总量',
                    data:[20, 12, 19, 14]
                },
                {
                    name:'所有平均',
                    type:'line',
                    stack: '总量',
                    data:[-10, 23, 1, 31]
                }
              ],
            }  
          }
        },
       
      }
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("formValues: ", values);
      }
    });
  };
  // 根据状态判断显示什么图标
  tips = (value: any) => { 
    if (value) {
      return <div className="aaa"><Tooltip placement="topLeft" overlayClassName="tips-bg" title="1.利润结构不合理，经营性利润低，投资性利润高 2.利润同比大幅下滑">
      <Icon type="exclamation-circle" className='red' />
    </Tooltip></div>
    } else { 
      return <Tooltip placement="topLeft" overlayClassName="tips-bg" title="1.利润同比大幅上升">
      <Icon type="check-circle" className='green' />
    </Tooltip>
    }
  }

  render() {
    const { company, ysnl, trend } = this.state.data;

    return (
      <div className="risk-container risk-details">
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
                  <h4>{company.score}</h4>
                  <h5>财务总分</h5>
                </li>
                <li>
                  <h4 className="red">{company.count}</h4>
                  <h5>
                    <Link to="">全年财务风险数量</Link>
                  </h5>
                </li>
              </ul>
              <div className="download">
                <button className="btn-default">下载招股书</button>
              </div>
            </Card>
          </Col>
          <Col span={18}>
            <Card className="risk-gk" title="财务风险变化趋势" bordered={false}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="近 1 年" key="1">
                  <div className="tab_box-absolute">
                    <Tabs onChange={callback} type="card">
                      <TabPane tab="盈利能力" key="1">
                        <EchartsWrapper
                          option={trendOption(trend.one.yl)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="成长能力" key="2">
                        <EchartsWrapper
                          option={trendOption(trend.one.cz)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="偿债能力" key="3">
                        <EchartsWrapper
                          option={trendOption(trend.one.ch)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="运营能力" key="4">
                        <EchartsWrapper
                          option={trendOption(trend.one.yy)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="现金流" key="5">
                        <EchartsWrapper
                          option={trendOption(trend.one.xjl)}
                          style={{ height:420}}
                        />
                      </TabPane>
                    </Tabs>
                  </div>
                </TabPane>

                <TabPane tab="近 3 年" key="2">
                  <div className="tab_box-absolute">
                    <Tabs onChange={callback} type="card">
                      <TabPane tab="盈利能力" key="1">
                        <EchartsWrapper
                          option={trendOption(trend.three.yl)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="成长能力" key="2">
                        <EchartsWrapper
                          option={trendOption(trend.three.cz)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="偿债能力" key="3">
                        <EchartsWrapper
                          option={trendOption(trend.three.ch)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="运营能力" key="4">
                        <EchartsWrapper
                          option={trendOption(trend.three.yy)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="现金流" key="5">
                        <EchartsWrapper
                          option={trendOption(trend.three.xjl)}
                          style={{ height:420}}
                        />
                      </TabPane>
                    </Tabs>
                  </div>
                </TabPane>

                <TabPane tab="近 5 年" key="3">
                  <div className="tab_box-absolute">
                    <Tabs onChange={callback} type="card">
                      <TabPane tab="盈利能力" key="1">
                        <EchartsWrapper
                          option={trendOption(trend.one.yl)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="成长能力" key="2">
                        <EchartsWrapper
                          option={trendOption(trend.one.cz)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="偿债能力" key="3">
                        <EchartsWrapper
                          option={trendOption(trend.one.ch)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="运营能力" key="4">
                        <EchartsWrapper
                          option={trendOption(trend.one.yy)}
                          style={{ height:420}}
                        />
                      </TabPane>
                      <TabPane tab="现金流" key="5">
                        <EchartsWrapper
                          option={trendOption(trend.one.xjl)}
                          style={{ height:420}}
                        />
                      </TabPane>
                    </Tabs>
                  </div>
                  
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              className="risk-ysnl"
              title="盈利能力"
              bordered={false}
            >
              <Row gutter={0} className="risk-ysnl_box">
                <Col span={6} className="risk-ysnl_gauge">
                  <EchartsWrapper
                    option={scoreOption(ysnl)}
                    style={{ }}
                  />
                </Col>
                <Col span={6} className="risk-ysnl_fx">
                  <h3>{ysnl.title}</h3>
                  <Paragraph className="info" ellipsis={{ rows: 5, expandable: false }}>{ysnl.info}</Paragraph>
                </Col>
                <Col span={12} className="box-shadow">
                  <h4>风险指标解析 <a>更换指标</a></h4>
                  <ul className="resolve-list clearfloat">
                    {
                      ysnl.resolve.map((item: any, idx: any) => <li key={idx}>
                        <span className="idx">{getIdx(item.idx)}</span>
                        <span className="title oneEllipsis">{item.title}</span>
                        <span className="status">
                          {
                            this.tips(item.status)
                          }
                        </span>
                      </li>)
                    }
                  </ul>
                </Col>
              </Row>
              
              <Title level={2} className="title-lev">
                一、同比
                <Divider type="vertical" />
                <span>您可以选择四项指标对比，当前选择如下，</span>
                <a href="#">点此更换指标</a>
              </Title>
              <Table className="some-table" dataSource={ysnl.some} columns={columns} size="small" pagination={false} />

              <Tabs onChange={callback} type="card" className="some-table">
                <TabPane tab="毛利率" key="1">
                  <EchartsWrapper
                    option={grossOption(ysnl.rate.gross)}
                  />
                </TabPane>

                <TabPane tab="利润率" key="2">
                  <EchartsWrapper
                    option={grossOption(ysnl.rate.profit)}
                  />
                </TabPane>

                <TabPane tab="费用率" key="3">
                  <EchartsWrapper
                    option={grossOption(ysnl.rate.expense)}
                  />
                </TabPane>
                <TabPane tab="增长率" key="4">
                  <EchartsWrapper
                    option={grossOption(ysnl.rate.gross)}
                  />
                </TabPane>
              </Tabs>

              <Title level={2} className="title-lev">
                二、他比
                <Divider type="vertical" />
                <span>您可以选择四项指标对比，当前选择如下，</span>
                <a href="#">点此更换指标</a>
              </Title>
              <Table className="some-table" dataSource={ysnl.some} columns={columns} size="small" pagination={false} />

              <Tabs onChange={callback} type="card" className="some-table">
                <TabPane tab="毛利率" key="1">
                  <EchartsWrapper
                    option={differRateOption(ysnl.differRate.gross)}
                    style={{height:360}}
                  />
                </TabPane>

                <TabPane tab="利润率" key="2">
                  <EchartsWrapper
                    option={differRateOption(ysnl.differRate.profit)}
                    style={{height:360}}
                  />
                </TabPane>

                <TabPane tab="费用率" key="3">
                  <EchartsWrapper
                    option={differRateOption(ysnl.differRate.expense)}
                    style={{height:360}}
                  />
                </TabPane>
                <TabPane tab="增长率" key="4">
                  <EchartsWrapper
                    option={differRateOption(ysnl.differRate.gross)}
                    style={{height:360}}
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Col>

        </Row>
      </div>
    );
  }
}
export default riskDetails;
