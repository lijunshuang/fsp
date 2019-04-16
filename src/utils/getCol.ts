import { keepTwo } from './index';

// 舞弊详情页
const fraudCol=() => [
  // {
  //   key: "1",
  //   title: "序号",
  //   dataIndex: "序号",
  // },
  {
    key: "2",
    title: "公告日期",
    dataIndex: "公告日期",
    width:140,
  },
  {
    key: "3",
    title: "股票代码",
    dataIndex: "股票代码",
    width:120,

  },
  {
    key: "4",
    title: "行业名称",
    dataIndex: "行业名称"
  },
  {
    key: "5",
    title: "是否舞弊",
    dataIndex: "是否舞弊",
    render: (text: any, record: any) => `${keepTwo(text)}%`
  },
  {
    key: "6",
    title: "短期借款(元)",
    dataIndex: "短期借款"
  },
  {
    key: "7",
    title: "盈余公积",
    dataIndex: "盈余公积"
  },
  {
    key: "8",
    title: "非流动资产合计(元)",
    dataIndex: "非流动资产合计"
  },
  {
    key: "9",
    title: "营业税金及附加(元)",
    dataIndex: "营业税金及附加"
  },
  {
    key: "10",
    title: "支付的各项税费(元)",
    dataIndex: "支付的各项税费"
  },
  {
    key: "11",
    title: "预收款项(元)",
    dataIndex: "预收款项"
  },
  {
    key: "12",
    title: "应收账款周转率",
    dataIndex: "应收账款周转率"
  },
  {
    key: "13",
    title: "固定资产(元)",
    dataIndex: "固定资产"
  },
  {
    key: "14",
    title: "支付给职工的现金(元)",
    dataIndex: "支付给职工以及为职工支付的现金"
  },
  {
    key: "15",
    title: "实收资本(元)",
    dataIndex: "实收资本"
  },
  {
    key: "16",
    title: "预付款项(元)",
    dataIndex: "预付款项"
  },
  {
    key: "17",
    title: "存货(元)",
    dataIndex: "存货"
  },
  {
    key: "18",
    title: "商誉",
    dataIndex: "商誉"
  },
  {
    key: "19",
    title: "少数股东权益",
    dataIndex: "少数股东权益"
  },
  {
    key: "20",
    title: "应付账款(元)",
    dataIndex: "应付账款"
  },
  {
    key: "21",
    title: "货币资金(元)",
    dataIndex: "货币资金"
  },
  {
    key: "22",
    title: "长期待摊费用(元)",
    dataIndex: "长期待摊费用"
  },
  {
    key: "23",
    title: "应付职工薪酬(元)",
    dataIndex: "应付职工薪酬"
  },
  {
    key: "24",
    title: "应付账款周转率",
    dataIndex: "应付账款周转率",
  },
];

// 异常列表页----所有公司异常展示
const allData = () => {
  return [
    // {
    //   key: "1",
    //   title: "序号",
    //   dataIndex: "序号",
    // },
    {
      key: "4",
      title: "公告日期",
      dataIndex: "公告日期",
      width:180,
    },
    {
      key: "3",
      title: "股票代码",
      dataIndex: "股票代码",
      width:180,
    },
    // {
    //   key: "是否舞弊",
    //   title: "是否舞弊",
    //   dataIndex: "是否舞弊",
    //   render: (text: any, record: any) => {
    //     if (text === "0") {
    //       return "是";
    //     } else {
    //       return "否";
    //     }
    //   }
    // },
    
    {
      key: "2",
      title: "行业名称",
      dataIndex: "行业名称",
      width: "30%",
    },
    {
      key: "5",
      title: "需要关注的指标",
      dataIndex: "需要关注的指标"
    },
    {
      key: "6",
      title: "异常度",
      dataIndex: "异常度"
    }
  ];
};
// 异常列表页----规则方法异常挖掘
const ruledCol = () => {
  return [
    {
      key: "4",
      title: "公告日期",
      dataIndex: "公告日期",
      width:180,
    },
    {
      key: "3",
      title: "股票代码",
      dataIndex: "股票代码",
      width:180,
    },
    {
      key: "2",
      title: "行业名称",
      dataIndex: "行业名称",
      width: "30%"
    },
    {
      key: "5",
      title: "需要关注的指标",
      dataIndex: "需要关注的指标",
    },
  ];
}

// 异常列表页----无监督方法异常挖掘
const unsupervisedCol = () => {
  return [
    {
      key: "4",
      title: "公告日期",
      dataIndex: "公告日期",
      width:180,
    },
    {
      key: "3",
      title: "股票代码",
      dataIndex: "股票代码",
      width:180,
    },
    {
      key: "2",
      title: "行业名称",
      dataIndex: "行业名称",
      width: "30%"
    },
    {
      key: "6",
      title: "异常度",
      dataIndex: "异常度",
    },
  ];
}

// 异常列表页----暴力方法异常挖掘
const violencedCol = () => {
  return [
    {
      key: "1",
      title: "公告日期",
      dataIndex: "公告日期",
      width:180,
    },
    {
      key: "2",
      title: "股票代码",
      dataIndex: "股票代码",
      width:180,
    },
    {
      key: "3",
      title: "行业名称",
      dataIndex: "行业名称",
    },
    {
      key: "4",
      title: "异常度",
      dataIndex: "异常度",
    },
  ];
}

// 异常挖掘详情页----规则方法异常挖掘
const ruleCol = () => {
  return [
    // {
    //   key: "1",
    //   title: "序号",
    //   dataIndex: "序号",
    // },
    {
      key: "公告日期",
      title: "公告日期",
      dataIndex: "公告日期",
      width:180,
    },
    {
      key: "股票代码",
      title: "股票代码",
      dataIndex: "股票代码",
      width:180,
    },
    {
      key: "行业名称",
      title: "行业名称",
      dataIndex: "行业名称",
      width: "30%"
    },
    {
      key: "需要关注的指标",
      title: "需要关注的指标",
      dataIndex: "需要关注的指标",
    },
  ];
} 
// 异常挖掘详情页----无监督方法异常挖掘
const unsuperviseCol = () => {
  return [
    {
      key: "4",
      title: "公告日期",
      dataIndex: "公告日期",
      width:180,
    },
    {
      key: "3",
      title: "股票代码",
      dataIndex: "股票代码",
      width:180,
    },
    {
      key: "2",
      title: "行业名称",
      dataIndex: "行业名称",
      width: "30%"
    },
    {
      key: "6",
      title: "异常度",
      dataIndex: "异常度",
    },
  ];
}
// 异常挖掘详情页----规则方法异常挖掘
const violenceCol = () => {
  return [
    {
      key: "3",
      title: "公告日期",
      dataIndex: "公告日期",
      width:180,
    },
    {
      key: "2",
      title: "股票代码",
      dataIndex: "股票代码",
      width:180,
    },
    {
      key: "4",
      title: "异常度",
      dataIndex: "异常度",
    },
  ];
}
// 异常列表页----收入/成本异常
const revenuedCol = () => {
  return [
    {
      key: "1",
      title: "公告日期",
      dataIndex: "公告日期",
      width:130,
    },
    {
      key: "2",
      title: "股票代码",
      dataIndex: "股票代码",
      width:90,
    },
    {
      key: "3",
      title: "公司简称",
      dataIndex: "公司简称",
    },
    {
      key: "4",
      title: "行业分类",
      dataIndex: "行业分类",
    },
    {
      key: "5",
      title: "主营行业收入占比",
      dataIndex: "主营行业收入占比",
      render: (text: any, record: any) => `${keepTwo(text)}%`
    },
    {
      key: "6",
      title: "主营行业收入占比-行业平均",
      dataIndex: "主营行业收入占比-行业平均",
      render: (text: any, record: any) => `${keepTwo(text)}%`
    },
    {
      key: "7",
      title: "主营行业成本占比",
      dataIndex: "主营行业成本占比",
      render: (text: any, record: any) => `${keepTwo(text)}%`
    },
    {
      key: "8",
      title: "主营行业成本占比-行业平均",
      dataIndex: "主营行业成本占比-行业平均",
      render: (text: any, record: any) => `${keepTwo(text)}%`
    },
    {
      key: "9",
      title: "主营行业毛利率",
      dataIndex: "主营行业毛利率",
      render: (text: any, record: any) => `${keepTwo(text)}%`
    },
    {
      key: "10",
      title: "主营行业毛利率-行业平均",
      dataIndex: "主营行业毛利率-行业平均",
      render: (text: any, record: any) => `${keepTwo(text)}%`
    },
    {
      key: "11",
      title: "异常度",
      dataIndex: "异常度",
    },
  ];
}
// 风险详情页
const riskCol = () => {
  return [
    {
      key: "2",
      title: "公告日期",
      dataIndex: "公告日期",
      width:180,
    },
    {
      key: "1",
      title: "股票代码",
      dataIndex: "股票代码",
      width:180,
    },
    {
      key: "3",
      title: "行业名称",
      dataIndex: "行业名称",
    },
    // {
    //   key: "4",
    //   title: "是否有亏损风险",
    //   dataIndex: "是否有亏损风险",
    //   render: (text: any, record: any) => `${keepTwo(text)}%`
    // },
  ];
}

export {
  fraudCol,
  allData,
  ruledCol,
  unsupervisedCol,
  violencedCol,
  ruleCol,
  unsuperviseCol,
  violenceCol,
  riskCol,
  revenuedCol
};
