import {
    Button, Card, Col, Divider, Form, Icon, Input, Row, Select, Table, Tabs, Tooltip, Typography
} from 'antd';
import * as echarts from 'echarts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import EchartsWrapper from '../../components/EchartsWrapper';
import Icons from '../../components/Icons';
import Loading from '../../components/Loading';
import { profitCol } from '../../utils/getCol';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { Paragraph,Title } = Typography;

//财务风险变化趋势
const trendOption = (value: any) => {
  const date = value.map((item:any)=>item.date) //时间
  const data = value.map((item:any)=>item.value) // 获取数据
  const option = {
    title: {
      // text: value.name,
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
      data: date
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
      data: data,
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

//盈利能力 评分
const scoreOption = (value: any) => { 
  const option = {
    text:"评分",
    tooltip: {
        // formatter: "{a} <br/>{b} : {c}%"
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
        data: [{ value: value.score, name: '评分' }],
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

//毛利率 
const grossOption = (value: any) => {
  const date = value.data.map((item:any)=>item.date)
  const data = value.data.map((item:any)=>item.value)

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
        data: data
      },
      {
        name: "",
        type: "bar",
        barWidth: "40",
        itemStyle: {
          //柱状图的样式
          color: "#BEC8D3"
        },
        data: data
      }
    ]
  };
  return option;
};
//他比中 的 毛利率
const differRateOption = (value: any) => {
  const { history_score,industry_score,all_score} = value
  const date = history_score.data.map((item:any)=>item.date)

  const color = ["#1890FF", "#B53ECE", "#6B798E"]
  const lineStyle = {
    type: "line",
    symbolSize: 8,
    // 折线样式
    itemStyle: {
      normal: {
        lineStyle: {
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
    color: color,//线的颜色
    series: [
      {
        name: history_score.name,
        data:history_score.data.map((item:any)=>item.value),
        ...lineStyle
      },
      {
        name: industry_score.name,
        data:industry_score.data.map((item:any)=>item.value),
        ...lineStyle
      },
      {
        name: all_score.name,
        data:all_score.data.map((item:any)=>item.value),
        ...lineStyle
      },

    ]
    // series: (function () { 
    //   let arr:any = []
    //   data.forEach((item:any,idx:any) => {
    //     arr.push({
    //       ...item,
    //       symbolSize: 8,
    //       // 折线样式
    //       itemStyle: {
    //         normal: {
    //           lineStyle: {
    //             width:3
    //           }
    //         },
    //       },
    //     })
    //   });
    //   return arr
    // })(),
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


class riskDetails extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: {
        profitability:"盈利能力",
        solvency:"偿债能力",
      },
      data: {},
    };
  }
  componentDidMount() {
    this.setState({
      data: {
        global: this.props.financialDetailGlobal,
        profit: this.props.financialDetailProfit,
        solvency: this.props.financialDetailSolvency,
      }
    })
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
    if (value == 'risk') {
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
    const {data,title}= this.state
    if (JSON.stringify(data) !== "{}") {
      const { data:{global, profit, solvency} } = this.state;
      // const historyArr = profit.index_score.map((item: any) => item.history_score)
      // const source = historyArr.map((item: any) => item.data)
      console.log(profit.index_score)
      const titleArr = Object.keys(global.risk_detail) // 获取五种能力的标题

      let source = (function () { 
        let arr:any = []
        profit.index_score.forEach((i:any) => {
          arr.push({
            title: i.index,
            name:i.history_score.name,
            date: i.history_score.data.map((j: any) => j.date)
          })
        });
        return arr
      })()
      console.log(source)
      return (
        <div className="risk-container risk-details">
          <Row gutter={20}>
            <Col span={6}>
              <Card bordered={false} className="risk-info">
                <div className="logo">
                  {/* <img src={company.logo} /> */}
                  <h4>{global.payload.full_name}</h4>
                </div>
                <div className="risk-info_inner">
                  <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                    {global.payload.description}
                  </Paragraph>
                </div>
                <ul className="risk-info_plate clearfloat">
                  <li>
                    <h4>{global.payload.code}</h4>
                    <h5>股票代码</h5>
                  </li>
                  <li>
                    <h4>{global.payload.sector}</h4>
                    <h5>所属板块</h5>
                  </li>
                  <li>
                    <h4>{global.payload.risk_score}</h4>
                    <h5>财务总分</h5>
                  </li>
                  <li>
                    <h4 className="red">{global.payload.risk_count}</h4>
                    <h5>
                      <Link to="">全年财务风险数量</Link>
                    </h5>
                  </li>
                </ul>
                <div className="download">
                  <a className="btn-default" href={global.payload.prospectus_url} download="" target="_blank">下载招股书</a>
                </div>
              </Card>
            </Col>
            <Col span={18}>
              <Card className="risk-gk" title="财务风险变化趋势" bordered={false}>
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="近 1 年" key="1"></TabPane>

                  <TabPane tab="近 3 年" key="2"></TabPane>

                  <TabPane tab="近 5 年" key="3"></TabPane>
                </Tabs>
                <div className="tab_box-absolute">
                  <Tabs onChange={callback} type="card">
                    {
                      titleArr.map((item: any, key: any) => <TabPane tab={item} key={item}>
                        <EchartsWrapper
                          option={trendOption(global.risk_detail[titleArr[key]])}
                          style={{ height: 420 }}
                        />
                      </TabPane>)
                    }
                  </Tabs>
                </div>
              </Card>
            </Col>

            <Col span={24}>
              <Card
                className="risk-ysnl"
                title={title.profitability}
                bordered={false}
              >
                <Row gutter={0} className="risk-ysnl_box">
                  <Col span={6} className="risk-ysnl_gauge">
                    <EchartsWrapper
                      option={scoreOption(profit.global_score)}
                      style={{}}
                    />
                  </Col>
                  <Col span={6} className="risk-ysnl_fx">
                    <h3>盈利能力分析</h3>
                    <Paragraph className="info" ellipsis={{ rows: 5, expandable: false }}>{profit.global_score.analysis}</Paragraph>
                  </Col>
                  <Col span={12} className="box-shadow">
                    <h4>风险指标解析 <a>更换指标</a></h4>
                    <ul className="resolve-list clearfloat">
                      {
                        profit.index_score.map((item: any, idx: any) => <li key={idx}>
                          <span className="idx">{item.weight}</span>
                          <span className="title oneEllipsis">{item.index}</span>
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
                <Table
                  className="some-table"
                  rowKey={(record, index) => `${index}`}
                  dataSource={[]}
                  columns={profitCol()} size="small"
                  pagination={false} />

                <Tabs onChange={callback} type="card" className="some-table">
                  {
                    profit.index_score.map((item: any, key: any) => <TabPane tab={item.index} key={item.index}>
                      <EchartsWrapper
                        option={grossOption(item.history_score)}
                      />
                    </TabPane>)
                  }
                </Tabs>

                <Title level={2} className="title-lev">
                  二、他比
                  <Divider type="vertical" />
                  <span>您可以选择四项指标对比，当前选择如下，</span>
                  <a href="#">点此更换指标</a>
                </Title>
                {/* <Table className="some-table" dataSource={ysnl.some} columns={columns} size="small" pagination={false} /> */}

                <Tabs onChange={callback} type="card" className="some-table">
                  {
                    profit.index_score.map((item: any, key: any) => <TabPane tab={item.index} key={item.index}>
                      <EchartsWrapper
                        option={differRateOption(item)}
                        style={{ height: 360 }}
                      />
                    </TabPane>)
                  }
                </Tabs>
              </Card>
            </Col>
            
            <Col span={24}>
              <Card
                className="risk-ysnl"
                title={title.solvency}
                bordered={false}
              >
                <Row gutter={0} className="risk-ysnl_box">
                  <Col span={6} className="risk-ysnl_gauge">
                    <EchartsWrapper
                      option={scoreOption(solvency.global_score)}
                      style={{}}
                    />
                  </Col>
                  <Col span={6} className="risk-ysnl_fx">
                    <h3>偿债能力分析</h3>
                    <Paragraph className="info" ellipsis={{ rows: 5, expandable: false }}>{solvency.global_score.analysis}</Paragraph>
                  </Col>
                  <Col span={12} className="box-shadow">
                    <h4>风险指标解析 <a>更换指标</a></h4>
                    <ul className="resolve-list clearfloat">
                      {
                        solvency.index_score.map((item: any, idx: any) => <li key={idx}>
                          <span className="idx">{item.weight}</span>
                          <span className="title oneEllipsis">{item.index}</span>
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
                {/* <Table
                  className="some-table"
                  rowKey={(record, index) => `${index}`}
                  dataSource={[]}
                  columns={profitCol()} size="small"
                  pagination={false} /> */}

                <Tabs onChange={callback} type="card" className="some-table">
                  {
                    solvency.index_score.map((item: any, key: any) => <TabPane tab={item.index} key={item.index}>
                      <EchartsWrapper
                        option={grossOption(item.history_score)}
                      />
                    </TabPane>)
                  }
                </Tabs>

                <Title level={2} className="title-lev">
                  二、他比
                  <Divider type="vertical" />
                  <span>您可以选择四项指标对比，当前选择如下，</span>
                  <a href="#">点此更换指标</a>
                </Title>
                {/* <Table className="some-table" dataSource={ysnl.some} columns={columns} size="small" pagination={false} /> */}

                <Tabs onChange={callback} type="card" className="some-table">
                  {
                    solvency.index_score.map((item: any, key: any) => <TabPane tab={item.index} key={item.index}>
                      <EchartsWrapper
                        option={differRateOption(item)}
                        style={{ height: 360 }}
                      />
                    </TabPane>)
                  }
                </Tabs>
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
const mapStateProps = (state: any) => {
  return {
    financialDetailGlobal: state.financialDetailGlobal.results,
    financialDetailProfit: state.financialDetailProfit.results,
    financialDetailSolvency: state.financialDetailSolvency.results,

  }
}
const mapDispatchToProps = {}
export default connect(mapStateProps)(riskDetails)

