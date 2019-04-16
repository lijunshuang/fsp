
const ipaddress = "127.0.0.1"
// const ipaddress = "192.168.5.216"
const port = "5001"
// 服务器端调试
const financial_analysis = `http://${ipaddress}:${port}/financial_analysis`
const analysis_all = `http://${ipaddress}:${port}/financial/analysis_all`             // post,所有数据
const classifyApi = `http://${ipaddress}:${port}/financial/company_classify`         // post,公司分组
const fraudApi = `http://${ipaddress}:${port}/financial/fraud`                       // post,财务舞弊
const abnormalApi = `http://${ipaddress}:${port}/financial/detection/multi_method`   // post,异常挖掘多种
const abnormalAll = `http://${ipaddress}:${port}/financial/outlier_detection`        //get,公司异常展示界面
const overallApi = `http://${ipaddress}:${port}/financial/detection/overall`         // post,异常挖掘整体界面
const basicInfoApi = `http://${ipaddress}:${port}/company/basic_info`                // post,公司基本信息
const riskApi = `http://${ipaddress}:${port}/financial/risk`                         // post,财务风险
const ruledApi = `http://${ipaddress}:${port}/financial/detection/overall/ruled`    // post,异常挖掘列表页--规则方法
const unsupervisedApi = `http://${ipaddress}:${port}/financial/detection/overall/unsupervised` // post,异常挖掘列表页--无监督方法异常挖掘
const violencedApi = `http://${ipaddress}:${port}/financial/detection/overall/violence`        // post,异常挖掘列表页--暴力方法异常挖掘
const revenuedApi = `http://${ipaddress}:${port}/financial/detection/overall/revenue`        // post,异常挖掘列表页--收入/成本异常


export {
    financial_analysis,
    analysis_all,
    classifyApi,
    fraudApi,
    abnormalApi,
    abnormalAll,
    overallApi,
    riskApi,
    basicInfoApi,
    ruledApi,
    unsupervisedApi,
    violencedApi,
    revenuedApi
}