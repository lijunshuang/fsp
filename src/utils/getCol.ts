import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { keepTwo } from './index';

// 详情页
const profitCol = (val:any) => {
  // console.log(val)
  // let arr:any = []
  // val.forEach((i:any) => {
  //   arr.push({
  //     key: i + 1,
  //     title: i.title,
  //     dataIndex:i.title,
  //   })
  // });

  // return arr
  return [
    {
      key: "1",
      title: "",
      dataIndex: "date",
    },
    {
      key: "2",
      title: "净利润收益率",
      dataIndex: "净利润收益率",
    },
    {
      key: "3",
      title: "总资产报酬率",
      dataIndex: "总资产报酬率",
    },
    {
      key: "4",
      title: "资本收益率",
      dataIndex: "资本收益率",
    },
    {
      key: "5",
      title: "销售利润率",
      dataIndex: "销售利润率",
    },
    {
      key: "6",
      title: "成本费用利润率",
      dataIndex: "成本费用利润率",
    },
    {
      key: "7",
      title: "资本收益率2",
      dataIndex: "资本收益率2",
    },
  ];
}

const solvencyCol = () =>{
  return [
    {
      key: "1",
      title: "",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "资产负债率",
      dataIndex: "资产负债率",
    },
    {
      key: "3",
      title: "带息负债比率",
      dataIndex: "带息负债比率",
    },
    {
      key: "4",
      title: "短期偿债能力",
      dataIndex: "短期偿债能力",
    },
    {
      key: "5",
      title: "流动比率",
      dataIndex: "流动比率",
    },
    {
      key: "6",
      title: "成本费用利润率",
      dataIndex: "成本费用利润率",
    },
    {
      key: "7",
      title: "现金比率",
      dataIndex: "现金比率",
    },
  ];
}

//公告列表页
const listCol = [
  {
    title: '风险级别',
    dataIndex: 'risk_level',
    key: 'risk_level',
    width:90,
  },
  {
    title: '公司名称',
    dataIndex: 'full_name',
    key: 'full_name',
    width: 260,
    render: (text: any, record: any) => text
  },
  {
    title: '代码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '风险类别',
    dataIndex: 'risk_category',
    key: 'risk_category',
    width:90
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '时间',
    dataIndex: 'date',
    key: 'date',
    width:120
  },
];

export {
  profitCol,
  solvencyCol,
  listCol
};
