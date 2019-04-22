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
      title: "状态",
      dataIndex: "weight",
    },
    {
      key: "2",
      title: "净利润收益率",
      dataIndex: "index",
    },
    {
      key: "3",
      title: "status",
      dataIndex: "status",
    },

  ];
}

export {
  profitCol
};
