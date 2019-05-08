import Mock from 'mockjs';

import { session } from '../utils';

let integer = Mock.Random.integer

const global = {
    "code": "600446",
    "risk_score":integer(1,99),
    "full_name": "深圳市金证股份有限公司",
    "sector": "金融",
    "list_date": "2000-01-01",
    "risk_count": integer(1,99),
    "prospectus_url": "www.baidu.com",
    "description": "金证股份是一家XXX公司",
    "risk_detail": {
        "盈利能力": [
            { "date": "2016-12-31", "value": integer(1,99) },
            { "date": "2017-03-31", "value": integer(1,99) },
            { "date": "2017-06-30", "value": integer(1,99) },
            { "date": "2017-09-30", "value": integer(1,99) },
            { "date": "2017-12-31", "value": integer(1,99) }
        ],
        "偿债能力": [
            { "date": "2016-12-31", "value": integer(1,99) },
            { "date": "2017-03-31", "value":integer(1,99) },
            { "date": "2017-06-30", "value": integer(1,99)},
            { "date": "2017-09-30", "value": integer(1,99) },
            { "date": "2017-12-31", "value": integer(1,99) }
        ],
        "运营能力": [
            { "date": "2016-12-31", "value": integer(1,99) },
            { "date": "2017-03-31", "value":integer(1,99)},
            { "date": "2017-06-30", "value": integer(1,99) },
            { "date": "2017-09-30", "value": integer(1,99) },
            { "date": "2017-12-31", "value": integer(1,99) }
        ],
        "成长能力": [
            { "date": "2016-12-31", "value": integer(1,99) },
            { "date": "2017-03-31", "value": integer(1,99) },
            { "date": "2017-06-30", "value": integer(1,99) },
            { "date": "2017-09-30", "value": integer(1,99) },
            { "date": "2017-12-31", "value": integer(1,99) }
        ],
        "现金流": [
            { "date": "2016-12-31", "value": integer(1,99) },
            { "date": "2017-03-31", "value": integer(1,99) },
            { "date": "2017-06-30", "value": integer(1,99) },
            { "date": "2017-09-30", "value": integer(1,99) },
            { "date": "2017-12-31", "value": integer(1,99) }
        ]
    }
}

const profit = {
    "global_score": {
        "rank": "13/254",
        "score": integer(1,99),
        "analysis": "盈利能力分析：该公与去年第三季报相比，金证股份盈利能力有所增强，处于一年内得高位，其中，主营获利能力大幅增强，总资产收益能力大幅提升。"
    },
    "index_score": [
    {
        "index": "净利润收益率",
        "weight": "核心",
        "status": "normal",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
    {
        "index": "总资产报酬率",
        "weight": "核心",
        "status": "risk",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
    {
        "index": "资本收益率",
        "weight": "重要",
        "status": "normal",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
    {
        "index": "销售利润率",
        "weight": "重要",
        "status": "normal",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
    {
        "index": "成本费用利润率",
        "weight": "一般",
        "status": "normal",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
]
}


const solvency = {
    "global_score": {
        "rank": "13/254",
        "score": integer(1,99),
        "analysis": "偿债能力分析：该公与去年第三季报相比，金证股份盈利能力有所增强，处于一年内得高位，其中，主营获利能力大幅增强，总资产收益能力大幅提升。"
    },
    "index_score": [
    {
        "index": "资产负债率",
        "weight": "核心",
        "status": "normal",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
    {
        "index": "带息负债比率",
        "weight": "核心",
        "status": "risk",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
    {
        "index": "短期偿债能力",
        "weight": "重要",
        "status": "normal",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
    {
        "index": "流动比率",
        "weight": "重要",
        "status": "normal",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
    {
        "index": "速动比率",
        "weight": "一般",
        "status": "normal",
        "history_score": {
            "name": "金证股份",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "industry_score": {
            "name": "行业均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        },
        "all_score": {
            "name": "所有均值",
            "data":[
                { "date": "2016-12-31", "value": integer(1,99) },
                { "date": "2017-03-31", "value": integer(1,99) },
                { "date": "2017-06-30", "value": integer(1,99) },
                { "date": "2017-09-30", "value": integer(1,99) },
                { "date": "2017-12-31", "value": integer(1,99) }
            ],
        }
    },
]
}


const limit = 6
const initState = {
    global,
    profit,
    solvency,
    // checkboxNum: 0,
    profit_norms: profit.index_score.slice(0, limit), //默认指标 6 个
    profitCheckedVal: [], //盈利能力
    solvency_norms:solvency.index_score.slice(0, limit),//偿债能力指标
    solvencyCheckedVal:[],//偿债能力
        // profit: profit.payload, // 返回的所有指标
        // profit_norms: profit.payload.index_score.slice(0, limit), // 设置在页面上显示的指标  6个
        // solvency: solvency.payload,
        // solvency_norms: solvency.payload.index_score.slice(0, limit),
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'GETDETAILGLOBAL':
            return {
                ...state,
                global: action.global,
            }
        case 'GETDETAILPROFIT':
            return {
                ...state,
                profit: action.profit,
                profit_norms:action.profit.index_score.slice(0, limit)
            }
        case 'GETDETAILSOLVENCY':
            return {
                ...state,
                solvency: action.solvency,
                solvency_norms: action.solvency.index_score.slice(0, limit),
            }
        case 'CHANGEPROFITCHECKEDVAL':
            return {
                ...state,
                profitCheckedVal: action.profitCheckedVal,
            }
        case 'CHANGEPROFITNORMS':
            return {
                ...state,
                profit_norms: action.profitNorms,
            }
        case 'CHANGESOLVENCYCHECKEDVAL':
            return {
                ...state,
                solvencyCheckedVal: action.solvencyCheckedVal,
            }
        case 'CHANGESOLVENCYNORMS':
            return {
                ...state,
                solvency_norms: action.solvencyNorms,
            }
        
        default:
        return state;
    }
};
    // results: {
    //     "payload": {
    //         "code": "600446",
    //         "risk_score": 41,
    //         "full_name": "深圳市金证股份有限公司",
    //         "sector": "金融",
    //         "list_date": "2000-01-01",
    //         "risk_count": "15",
    //         "prospectus_url": "www.baidu.com",
    //         "description": "金证股份是一家XXX公司"
    //     },
    //     "risk_detail": {
    //         "盈利能力": [
    //             { "date": "2016-12-31", "value": 83 },
    //             { "date": "2017-03-31", "value": 43 },
    //             { "date": "2017-06-30", "value": 73 },
    //             { "date": "2017-09-30", "value": 63 },
    //             { "date": "2017-12-31", "value": 53 }
    //         ],
    //         "偿债能力": [
    //             { "date": "2016-12-31", "value": 53 },
    //             { "date": "2017-03-31", "value": 43 },
    //             { "date": "2017-06-30", "value": 73 },
    //             { "date": "2017-09-30", "value": 63 },
    //             { "date": "2017-12-31", "value": 53 }
    //         ],
    //         "运营能力": [
    //             { "date": "2016-12-31", "value": 33 },
    //             { "date": "2017-03-31", "value": 43 },
    //             { "date": "2017-06-30", "value": 73 },
    //             { "date": "2017-09-30", "value": 63 },
    //             { "date": "2017-12-31", "value": 53 }
    //         ],
    //         "成长能力": [
    //             { "date": "2016-12-31", "value": 73 },
    //             { "date": "2017-03-31", "value": 43 },
    //             { "date": "2017-06-30", "value": 33 },
    //             { "date": "2017-09-30", "value": 63 },
    //             { "date": "2017-12-31", "value": 83 }
    //         ],
    //         "现金流": [
    //             { "date": "2016-12-31", "value": 23 },
    //             { "date": "2017-03-31", "value": 13 },
    //             { "date": "2017-06-30", "value": 43 },
    //             { "date": "2017-09-30", "value": 33 },
    //             { "date": "2017-12-31", "value": 53 }
    //         ]
    //     }
    // }