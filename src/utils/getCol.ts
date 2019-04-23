import { keepTwo } from './index';

// 详情页
const profitCol = () => {
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

export {
  profitCol
};
