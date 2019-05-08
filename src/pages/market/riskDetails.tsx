import {
    Alert, Button, Card, Checkbox, Col, Divider, Form, Icon, Input, message, Modal, Row, Select,
    Table, Tabs, Tag, Tooltip, Typography
} from 'antd';
import axios from 'axios';
import * as echarts from 'echarts';
import { func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailGlobal, detailProfitability, detailSolvency } from '../../api';
import EchartsWrapper from '../../components/EchartsWrapper';
import Icons from '../../components/Icons';
import Loading from '../../components/Loading';
import Path from '../../components/Path';
import { session } from '../../utils';
import { profitCol, solvencyCol } from '../../utils/getCol';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { Paragraph,Title } = Typography;
const CheckboxGroup = Checkbox.Group;
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
const scoreOption = (value: any,name:string) => { 
  let score = value ? value.score : 0
  let rank = value.rank ? value.rank : 0
  console.log(typeof rank)
  const color = [
    [
      1, new echarts.graphic.LinearGradient(0, 1, 1, 1, [
      {
        offset: 0,
        color: "rgba(245,67,0,1)",// 0% 处的颜色
      },{
        offset: 0.4,
        color: "rgba(248,202,0,1)" // 50% 处的颜色
      },{
        offset: 0.6,
        color: "rgba(248,202,0,1)" // 50% 处的颜色
      },{
        offset: 1,
        color: "rgba(0,200,140,1)" // 100% 处的颜色
      }
    ],false)
    ]
  ]
  
  const objStyle = {
    type: 'gauge',
    //不显示刻度线
    axisTick: { show: false },
    splitLine: {           // 分隔线
      // length: 11,         // 属性length控制线长
      show:false,         //不显示分割线
    },
  }
  
  const option = {
    text:name,
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
        ...objStyle,
        detail: {formatter:" "},
        radius:"69%",
        axisLabel:{ color:"#A1A6AB" },
        splitLine:{
          //分割线样式相关
          show:false,
          length:2,
        },
        axisLine: {
          lineStyle: {
            width:2,
            color
          },
        }
      },
      {
        ...objStyle,
        title:{
          offsetCenter: [0, '-45%'],
          color:"#BEC8D3",
          fontSize:12,
        },
        radius:"80%",
        detail: {
          offsetCenter:[0,"20%"],
          formatter:['{a|{value}}'].join('\n'),
          rich: {
            a: {
              color: "#00C88C",
              lineHeight:20,
              fontSize:30,
            }
          }
        },
        data: [{ value: score, name }],
        axisLabel:{
          show:false,//不显示刻度标签
        },
        axisLine: {
          lineStyle: {
            width:9,
            color
          },
        },
        pointer:{
          length:"60%",
          width:5
        }
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
let limit = 6 // 显示指标 的最大数量
class riskDetails extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      title: {
        profitability:"盈利能力",
        solvency:"偿债能力",
      },
      data: "",
      checkboxNum: 0,
      profit_norms: [], //默认指标 6 个
      profitCheckedVal: [], //盈利能力
      solvency_norms:[],//偿债能力指标
      solvencyCheckedVal:[],//偿债能力
    };
  }
  async componentDidMount() {
    let global = await axios.get(detailGlobal).then((res)=> res.data).catch((error:any)=> {
      　　alert(error);
      });
    let profit = await axios.get(detailProfitability).then((res)=> res.data).catch((error:any)=> {
      　　alert(error);
      });
    let solvency = await axios.get(detailSolvency).then((res)=> res.data).catch((error:any)=> {
      　　alert(error);
    });
    this.setState({
      global: global.payload,
      profit: profit.payload, // 返回的所有指标
      profit_norms:profit.payload.index_score.slice(0,limit), // 设置在页面上显示的指标  6个
      solvency: solvency.payload,
      solvency_norms:solvency.payload.index_score.slice(0,limit),
      data: global.payload.code
    })
  }
  // 在弹窗内设置 要显示的 指标
  profitOnChange = (checkedValues: any) => {
    // console.log(`checked = ${checkedValues}`);
    this.setState({
      profitCheckedVal: checkedValues,
      checkboxNum: checkedValues.length,
    })
    if (checkedValues.length>limit) {
      this.setState({
        profitCheckedVal: checkedValues.slice(0,limit),
        visible:true,
      })
    }
  }
  // 在弹窗内设置 要显示的 指标
  solvencyOnChange=(checkedValues:any)=> {
    // console.log(`checked = ${checkedValues}`);
    this.setState({
      solvencyCheckedVal: checkedValues,
    })
    if (checkedValues.length>limit) { 
      this.setState({
        solvencyCheckedVal: checkedValues.slice(0,limit),
        visible:true,
      })
    }
  }
 //更换盈利能力指标
  profitNorm = () => {
    const { profit: { index_score }, profit_norms,visible} = this.state
    let indexScoreTitle = index_score.map((item: any, idx: any) => item.index) // 返回的所有指标
    let normsTitle = profit_norms.map((item: any, idx: any) => item.index)
    let crossChecked = indexScoreTitle.filter((i: any) => normsTitle.includes(i)) //重叠的指标，设为选中状态
    Modal.info({
      width: 840,
      visible: true,
      icon: "",
      className: "addContrast profitNorm",
      okText:"确定",
      content: (
        <div>
          <h2>更换指标</h2>
          <Tag color="blue"><Icon type="info-circle" theme="filled" />提示：可以同时选择 6 项指标 </Tag>
          <Checkbox.Group onChange={this.profitOnChange} defaultValue={crossChecked} disabled={visible}>
            <Row>
              {
                indexScoreTitle.map((i: any, idx: any) =>
                  <Col key={idx} xl={6} lg={6} md={6}>
                    <Checkbox value={i}>{i}</Checkbox>
                  </Col>)
              }
            </Row>
          </Checkbox.Group> 
        </div>
      ),
      onOk: () => { 
        const { profitCheckedVal, profit: { index_score } } = this.state
        let inter = index_score.filter((i: any) => profitCheckedVal.includes(i.index))
        this.setState({
          profit_norms:inter
        })
      }
    });
  }
  //更换偿债能力指标
  solvencyNorm = () => {
    const { solvency: { index_score }, solvency_norms} = this.state
    let indexScoreTitle = index_score.map((item: any, idx: any) => item.index) // 返回的所有指标
    let normsTitle = solvency_norms.map((item: any, idx: any) => item.index)
    let crossChecked = indexScoreTitle.filter((i: any) => normsTitle.includes(i)) //重叠的指标，设为选中状态

    Modal.info({
      width: 840,
      visible: true,
      icon: "",
      className: "addContrast profitNorm",
      okText:"确定",
      content: (
        <div>
          <h2>更换指标</h2>
          <Tag color="blue"><Icon type="info-circle" theme="filled" />提示：可以同时选择 6 项指标 </Tag>
          <Checkbox.Group onChange={this.solvencyOnChange} defaultValue={crossChecked}>
            <Row>
              {
                indexScoreTitle.map((i: any, idx: any) =>
                  <Col key={idx} xl={6} lg={6} md={6}>
                    <Checkbox value={i}>{i}</Checkbox>
                  </Col>)
              }
            </Row>
          </Checkbox.Group> 
        </div>
      ),
      onOk: () => { 
        const { solvencyCheckedVal, solvency: { index_score } } = this.state
        let inter = index_score.filter((i: any) => solvencyCheckedVal.includes(i.index))
        this.setState({
          solvency_norms:inter
        })
      }
    });
  }
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
  handleCancel = (e:any) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { data, title, } = this.state
    if (data) {
      const { global, profit, profit_norms, solvency, solvency_norms, visible} = this.state;
      const titleArr = Object.keys(global.risk_detail) // 获取五种能力的标题
console.log(profit)
      let dataSource = (function () { 
        let arr: any = [],
            name: any = [],
            date: any = []

        profit_norms.forEach((i: any,idx:any) => {
          name.push(i.index)
          date.push(i.history_score.data[idx])
          arr.push({
            key: Math.random(),
            name: name[idx],
            date: date[idx]
          })
        })
        return arr
      })()
      //table的title
      let columns = (function () { 
        let arr:any = []
        profit_norms.forEach((i:any) => {
          arr.push({
            title: i.index,
            name:i.history_score.name,
            date: i.history_score.data.map((j: any) => j.date)
          })
        });
        return arr
      })()

      return (
        <div className="risk-container risk-details">
          <Path path={this.props.history}/>          
          {
            visible ?
            <Modal
            maskClosable={false}
            footer={null}
            visible={visible}
            onCancel={this.handleCancel}
            >
              <p>只能选择6项</p>
            </Modal>
            : null
          }
          
          <Row gutter={20}>
            <Col span={6}>
              <Card bordered={false} className="risk-info">
                <div className="logo">
                  {/* <img src={company.logo} /> */}
                  <h4>{global.full_name}</h4>
                </div>
                <div className="risk-info_inner">
                  <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                    {global.description}
                  </Paragraph>
                </div>
                <ul className="risk-info_plate clearfloat">
                  <li>
                    <h4>{global.code}</h4>
                    <h5>股票代码</h5>
                  </li>
                  <li>
                    <h4>{global.sector}</h4>
                    <h5>所属板块</h5>
                  </li>
                  <li>
                    <h4>{global.risk_score}</h4>
                    <h5>财务总分</h5>
                  </li>
                  <li>
                    <h4 className="red">{global.risk_count}</h4>
                    <h5>
                      <Link to="">全年财务风险数量</Link>
                    </h5>
                  </li>
                </ul>
                <div className="download">
                  <a className="btn-default" href={global.prospectus_url} download="" target="_blank">下载招股书</a>
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
                    <span className="risk-ysnl_rank">排名 {profit.global_score.rank}</span>
                    <EchartsWrapper
                      option={scoreOption(profit.global_score,"盈利能力评分")}
                      style={{}}
                    />
                  </Col>
                  <Col span={6} className="risk-ysnl_fx">
                    <h3>盈利能力分析</h3>
                    <Paragraph className="info" ellipsis={{ rows: 5, expandable: false }}>{profit.global_score.analysis}</Paragraph>
                  </Col>
                  <Col span={12} className="box-shadow">
                    <h4>风险指标解析 <a onClick={this.profitNorm}>更换指标</a></h4>
                    <ul className="resolve-list clearfloat">
                      {
                        profit_norms.map((item: any, idx: any) => <li key={idx}>
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
                  <a onClick={this.profitNorm}>点此更换指标</a>
                </Title>
                {/* <Table
                  className="some-table"
                  rowKey={(record, index) => `${index}`}
                  dataSource={dataSource}
                  columns={profitCol(columns)}
                  size="small"
                  pagination={false} /> */}

                <Tabs onChange={callback} type="card" className="some-table">
                  {
                    profit_norms.map((item: any, key: any) => <TabPane tab={item.index} key={item.index}>
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
                  <a onClick={this.profitNorm}>点此更换指标</a>
                </Title>
                {/* <Table
                  className="some-table"
                  // dataSource={solvency.dataSource}
                  dataSource={[]}
                  columns={solvencyCol()}
                  size="small"
                  pagination={false} /> */}

                <Tabs onChange={callback} type="card" className="some-table">
                  {
                    profit_norms.map((item: any, key: any) => <TabPane tab={item.index} key={item.index}>
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
                    <span className="risk-ysnl_rank">排名 {solvency.global_score.rank}</span>
                    <EchartsWrapper
                      option={scoreOption(solvency.global_score,"偿债能力评分")}
                      style={{}}
                    />
                  </Col>
                  <Col span={6} className="risk-ysnl_fx">
                    <h3>偿债能力分析</h3>
                    <Paragraph className="info" ellipsis={{ rows: 5, expandable: false }}>{solvency.global_score.analysis}</Paragraph>
                  </Col>
                  <Col span={12} className="box-shadow">
                    <h4>风险指标解析 <a onClick={this.solvencyNorm}>更换指标</a></h4>
                    <ul className="resolve-list clearfloat">
                      {
                        solvency_norms.map((item: any, idx: any) => <li key={idx}>
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
                  <a onClick={this.solvencyNorm}>点此更换指标</a>
                </Title>
                {/* <Table
                  className="some-table"
                  rowKey={(record, index) => `${index}`}
                  dataSource={[]}
                  columns={profitCol()} size="small"
                  pagination={false} /> */}

                <Tabs onChange={callback} type="card" className="some-table">
                  {
                    solvency_norms.map((item: any, key: any) => <TabPane tab={item.index} key={item.index}>
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
                  <a onClick={this.solvencyNorm}>点此更换指标</a>
                </Title>
                {/* <Table className="some-table" dataSource={ysnl.some} columns={columns} size="small" pagination={false} /> */}

                <Tabs onChange={callback} type="card" className="some-table">
                  {
                    solvency_norms.map((item: any, key: any) => <TabPane tab={item.index} key={item.index}>
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
// const mapStateProps = (state: any) => {
//   return {
//     financialDetailGlobal: state.financialDetailGlobal.results,
//     financialDetailProfit: state.financialDetailProfit.results,
//     financialDetailSolvency: state.financialDetailSolvency.results,

//   }
// }
// const mapDispatchToProps = {}
// export default connect(mapStateProps)(riskDetails)
export default riskDetails

