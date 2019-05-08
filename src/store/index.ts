import { combineReducers } from 'redux';

import detailGlobal from './detailGlobal'; // 详情页  风险变化趋势
import financialGlobal from './financialGlobal'; // 概况页 公司基本信息、财务整体状况、近期风险走势
import riskEvents from './riskEvents'; //财务分析首页  事件数量和 风险排行榜

// import financialAbility from './financialAbility'; // 概况页 五种能力
// import detailProfit from './financialDetailProfit'; // 概况页  盈收能力
// import detailSolvency from './financialDetailSolvency'; // 概况页  偿债能力
// import financialEvent from './financialEvent'; // 概况页 近期风险事件 和 企业财报
// import financialQualityRank from './financialQualityRank'; // 概况页  总排名
// import financialReturn from './financialReturn'; // 概况页  业绩收益
// import riskHistory from './.riskHistory'; // 财务分析首页  历史走势

// const companySearch = `http://${host}:${port}/api/v1/company_search`      // post 搜索接口
// const existApi = `http://${host}:${port}/api/v1/company_exist`      // post 搜索接口


export default combineReducers({
    riskEvents,
    financialGlobal,
    detailGlobal,
});