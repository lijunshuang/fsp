import './style.scss';
import 'moment/locale/zh-cn';

import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Path from '../../components/Path';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
//公告列表页
const listCol = [
  {
    title: "风险级别",
    dataIndex: "risk_level",
    key: "risk_level",
    width: 90
  },
  {
    title: "公司名称",
    dataIndex: "full_name",
    key: "full_name",
    width: 260,
    render: (text: any, record: any) => (
      <Link
        to={{ pathname: `/market/riskProfile`, query: { id: record.code } }}
      >
        {text}
      </Link>
    )
  },
  {
    title: "代码",
    dataIndex: "code",
    key: "code"
  },
  {
    title: "风险类别",
    dataIndex: "risk_category",
    key: "risk_category",
    width: 90
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    render: (text: any, record: any) => (
      <Link
        to={{
          pathname: `/list/details/${record.id}`,
          query: { id: record.id }
        }}
      >
        {text}
      </Link>
    )
  },
  {
    title: "时间",
    dataIndex: "date",
    key: "date",
    width: 120
  }
];

const listData = [
  {
    id: "1223434343",
    risk_level: "高风险",
    full_name: "中信证券（香港）有限公司",
    code: "000001",
    risk_category: "财务",
    title: "早盘内参：深交所总经理表示要提高犯罪成本 优先把违法所得还给投资者1",
    date: "2019-03-20"
  },
  {
    id: "q8948988",
    risk_level: "无风险",
    full_name: "证券公司名字很长换行显示每行最多 显示十六个字",
    code: "6300302",
    risk_category: "法律",
    title:
      "早盘内参：深交所总经理表示要提高犯罪成本 优先把违法所得还给投资者换行 深交所总经理表示要提高犯罪成本 优先把违法所得还给投资者",
    date: "2019-04-20"
  },
  {
    id: "119089823",
    risk_level: "高风险",
    full_name: "金证股份",
    code: "000232",
    risk_category: "经营",
    title: "早盘内参：深交所总经理表示要提高犯罪成本 优先把违法所得还给投资者2",
    date: "2019-05-20"
  },
  {
    id: "2323232343",
    risk_level: "低风险",
    full_name: "中信证券（香港）有限公司1",
    code: "000005",
    risk_category: "市场",
    title: "早盘内参：深交所总经理表示要提高犯罪成本 优先把违法所得还给投资者3",
    date: "2018-03-20"
  }
];

// 风险等级
const risk_level = ["无风险", "低风险", "高风险"];

const risk_category = ["法律", "财务", "运营"];

class List extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.props.form.validateFields((err: any, fieldsValue: any) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const rangeValue = fieldsValue["range-picker"];
      const values = {
        ...fieldsValue,
        "range-picker": [
          rangeValue[0].format("YYYY-MM-DD"),
          rangeValue[1].format("YYYY-MM-DD")
        ]
      };
      console.log("Received values of form: ", values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 16 }
      }
    };
    const config = {
      rules: [{ required: true, message: "请选择时间范围" }]
    };
    const inputConfig = {
      rules: [{ required: true, message: "输入公司名、代码或简称" }]
    };
    const selectConfig = {
      initialValue:"全部",
      rules: [{ required: true, message: "输入公司名、代码或简称" }]
    };
    const rangeConfig = {
      rules: [{ type: "array", required: true, message: "请选择时间范围" }]
    };
    return (
      <div className="list-box">
        <Path path={this.props.history} />
        <Row>
          <Card className="list-top" title="筛选条件" bordered={false}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Col lg={12} sm={24}>
                <Form.Item label="公司名称：">
                  {getFieldDecorator("code", inputConfig)(
                    <Input placeholder="输入公司名、代码或简称" />
                  )}
                </Form.Item>
              </Col>
              <Col lg={12} sm={24}>
                <Form.Item label="时间范围：" className="range-picker">
                  {getFieldDecorator("range-picker", rangeConfig)(
                      <RangePicker
                          locale={locale}
                          getCalendarContainer={(trigger: any) => trigger.parentNode}
                      /> //antd官网提供的定义浮层的容器的方法 
                  )}
                </Form.Item>
              </Col>
              <Col lg={12} sm={24}>
                <Form.Item label="风险等级：">
                  {getFieldDecorator("risk_level", selectConfig)(
                    <Select>
                      {risk_level.map((item: any) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col lg={12} sm={24}>
                <Form.Item label="风险类别：">
                  {getFieldDecorator("risk_category", selectConfig)(
                    <Select>
                      {risk_category.map((item: any) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    点击查询
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </Card>

          <Col lg={24}>
            <Card className="list-bottom" title="公告列表" bordered={false}>
              <Table
                rowKey={(record, index) => `${index}`}
                dataSource={listData}
                columns={listCol}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const WrappedTimeRelatedForm = Form.create({ name: "time_related_controls" })(
  List
);

export default WrappedTimeRelatedForm;
