import { combineReducers } from 'redux';

import financialAbility from './financialAbility'; // 概况页 五种能力
import financialEvent from './financialEvent'; // 概况页 近期风险事件 和 企业财报
import financialGlobal from './financialGlobal'; // 概况页 公司基本信息、财务整体状况、近期风险走势
import riskEvents from './riskEvents'; //财务分析首页  事件数量和 风险排行榜
import riskHistory from './riskHistory'; // 财务分析首页  历史走势

export default combineReducers({
    riskEvents,
    riskHistory,
    financialGlobal,
    financialAbility,
    financialEvent,
});