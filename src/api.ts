
// localhost
const host = "127.0.0.1"
const port = "5001"

// server
// const host = "192.168.5.80"
// const port = "5010"

// 服务器端调试
const riskEvents = `http://${host}:${port}/api/v1/risk_events`        // get 首页数据
const riskHistory = `http://${host}:${port}/api/v1/risk_history`      // get 首页 历史走势
const financialGlobal = `http://${host}:${port}/api/v1/financial_global`      // get 概况页
const financialQualityRank = `http://${host}:${port}/api/v1/financial_quality_rank`      // get / post 总排名
const financialReturn = `http://${host}:${port}/api/v1/financial_return`      // get / post 业绩收益
const financialAbility = `http://${host}:${port}/api/v1/financial_ability`      // get 概况页  盈利、偿债等五种能力
const financialEvent = `http://${host}:${port}/api/v1/financial_event`      // get 概况页  近期风险事件 和 企业财报 
const detailGlobal = `http://${host}:${port}/api/v1/financial_detail_global`      // get 财务风险详情页
const detailProfitability = `http://${host}:${port}/api/v1/financial_detail_profitability`      // get 财务风险详情页  盈利能力
const detailSolvency = `http://${host}:${port}/api/v1/financial_detail_solvency`      // get 财务风险详情页    偿债能力
const companySearch = `http://${host}:${port}/api/v1/company_search`      // post 搜索接口
const existApi = `http://${host}:${port}/api/v1/company_exist`      // post 搜索接口


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
    detailSolvency,
    companySearch,
    existApi
}