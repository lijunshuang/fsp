
// const ipaddress = "127.0.0.1"
const ipaddress = "192.168.5.161"
const port = "5001"
// 服务器端调试
const riskEvents = `http://${ipaddress}:${port}/api/v1/risk_events`        // get 首页数据
const riskHistory = `http://${ipaddress}:${port}/api/v1/risk_history`      // get 首页 历史走势
const financialGlobal = `http://${ipaddress}:${port}/api/v1/financial_global`      // get 概况页
const financialQualityRank = `http://${ipaddress}:${port}/api/v1/financial_quality_rank`      // get / post 总排名
const financialReturn = `http://${ipaddress}:${port}/api/v1/financial_return`      // get / post 业绩收益
const financialAbility = `http://${ipaddress}:${port}/api/v1/financial_ability`      // get 概况页  盈利、偿债等五种能力
const financialEvent = `http://${ipaddress}:${port}/api/v1/financial_event`      // get 概况页  近期风险事件 和 企业财报 
const detailGlobal = `http://${ipaddress}:${port}/api/v1/financial_detail_global`      // get 财务风险详情页
const detailProfitability = `http://${ipaddress}:${port}/api/v1/financial_detail_profitability`      // get 财务风险详情页  盈利能力
const detailSolvency = `http://${ipaddress}:${port}/api/v1/financial_detail_solvency`      // get 财务风险详情页    偿债能力


export {
    riskEvents,
    riskHistory,
    financialGlobal,
    financialQualityRank,
    financialReturn,
    financialAbility,
    financialEvent,
    detailGlobal,
    detailProfitability,
    detailSolvency
}