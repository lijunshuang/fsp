import { Button, Card, Col, Divider, Form, Icon, Input, Row, Select, Statistic, Tabs } from 'antd';
import axios from 'axios';
import qs from 'querystring';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { getData } from '../../actions';
import { companySearch, existApi, riskEvents, riskHistory } from '../../api';
import EchartsWrapper from '../../components/EchartsWrapper';
import Icons from '../../components/Icons';
import Path from '../../components/Path';
import { session } from '../../utils';

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const Option = Select.Option;
const TabPane = Tabs.TabPane;

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
      top:'20px',
      left:"-5px",
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
const headers = {'Content-Type': 'application/x-www-form-urlencoded'}

class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {},
      currentTrade: '所有',
      currentYear: 'this_year',
      risk_events: {},
      risk_history: {},
      prefix_match: [],
      isExist: false, 
    }
  }
  async componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    let risk_events = await axios.get(riskEvents).then((res)=> res.data).catch((error:any)=> {
    　　alert(error);
    });
    let risk_history = await axios.get(riskHistory).then((res)=> res.data).catch((error:any)=> {
    　　alert(error);
    });

    this.setState({
      risk_events: risk_events.payload,
      risk_history: risk_history.payload,
      data:risk_history.payload['所有']
    })
  }
  // 实时校验
  checkConfirm = async (rule:any,value: any, callback: any) =>{
    let req:any = qs.stringify({
      "company": value
    })
  if (value) { 
    let results = await axios.post(existApi, req, {headers})
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    console.log(results)
    if (results.success) {
      results = results.payload
      if(results.prefix_match)
      this.setState({
        prefix_match: results.prefix_match,
        // exact_match: results.exact_match
      })
    }
  }
  callback();
  }
  //输入公司名称 触发
  inputChange = (e:any) => { 
    session.removeAll()
    this.setState({
      ...this.state,
      isExist:false
    })
  }
  handleSubmit =  (e: any) => {
    e.preventDefault();
    this.props.form.validateFields( async (err: any, values: any) => {
      if (!err) {
        const { stk_code } = values
        const { prefix_match,isExist } = this.state
        if (prefix_match.indexOf(stk_code)) {
          this.setState({
            ...this.state,
            isExist: true,
          });
        } else { 
          session.set("codeAndYear", {stk_code:values.stk_code,year:values.year})
          const req = qs.stringify(values)        
          if (!err) {
            // this.props.getData(analysis_all, req)
            this.props.history.push({ pathname: "/risk_monitor", state:values})
          }
        }

        console.log("formValues: ", values);
        let risk_events = await axios.post(companySearch, qs.stringify(values)).then((res)=> res.data).catch((error:any)=> {
          　　alert(error);
          });
        this.props.history.push({ pathname: `/market/riskProfile`, state: values })
      }
    });
  };
  /******* Select 的function************ */
  handleChange = (value:any)=> {
    console.log(`selected ${value}`);
    this.setState({
      currentTrade: value,
      data:this.state.risk_history[value]
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
        number: this.state.risk_events.today_event_count || 0,
        icon:"iconhome_today_finance"
      },
      {
        title: "今日风险企业数",
        number: this.state.risk_events.today_company_count || 0,
        icon:"iconhome_today_company"
      },
      {
        title: "今日订阅企业财务风险数",
        number: this.state.risk_events.today_subscribed_event || 0,
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
    const {data,risk_events: { company_risk_rank, industry_risk_rank },risk_history,prefix_match,isExist} = this.state
    if (JSON.stringify(data) !== "{}") { 
      const trade = Object.keys(risk_history) //获取所有行业名称
      return (
        <div className="market">
          <Path path={this.props.history}/>
          <div className="search">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item
                // validateStatus={searchError ? 'error' : ''}
                help={searchError || ""}
              >
                {getFieldDecorator("company", {
                  rules: [
                    {required: false,message: "请输入公司名字，代码或简称"},
                    { validator: this.checkConfirm },
                  ]
                })(
                  <div className={isExist ? 'exact_match' : ''}>
                    <Input list="lists" allowClear placeholder="请输入公司名字，代码或简称" onChange={this.inputChange} />
                    {
                      prefix_match.length > 0
                      ?
                      <datalist id="lists">
                        {
                          prefix_match.map((item:any,idx:any)=><option key={idx} value={item} />)
                        }
                      </datalist>
                      : null
                    }
                    {
                      isExist ? <div className="ant-form-explain">请输入正确的公司名称／股票代码／简称</div> : null
                    }
                  </div>
                )}
                <Button className="btn-default">搜索</Button>
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
                    <EchartsWrapper option={getOption(risk_history[this.state.currentTrade].this_year)} style={{height:450}} />
                  </TabPane>
  
                  <TabPane tab="近 3 年" key="last_3_year">
                    <EchartsWrapper option={getOption(risk_history[this.state.currentTrade].last_3_year)} style={{height:450}} />
                  </TabPane>
  
                  <TabPane tab="近 5 年" key="last_5_year">
                    <EchartsWrapper option={getOption(risk_history[this.state.currentTrade].last_5_year)} style={{height:450}} />
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
                      {/* <img src={img.company_logo} /> */}
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
// const mapStateProps = (state: any) => {
//   return {
//     results: state.riskEvents.results,
//     riskHistoty: state.riskHistory.results,
//   }
// }
// const mapDispatchToProps = {getData}
// export default connect(mapStateProps)(WrapSearch)
export default WrapSearch

