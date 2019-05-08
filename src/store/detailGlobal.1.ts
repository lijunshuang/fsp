const global = {
    "code": "",
    "risk_score":0,
    "full_name": "",
    "sector": "",
    "list_date": "",
    "risk_count": 0,
    "prospectus_url": "",
    "description": "",
    "risk_detail": {
        "盈利能力": [
            { "date": "", "value": 0},
        ],
        "偿债能力": [
            { "date": "", "value": 0},
        ],
        "运营能力": [
            { "date": "", "value": 0},
        ],
        "成长能力": [
            { "date": "", "value": 0},
        ],
        "现金流": [
            { "date": "", "value": 0},
        ]
    }
}

const profit = {
    "global_score": {
        "rank": "",
        "score": 0,
        "analysis": ""
    },
    "index_score": [
        {
            "index": "",
            "weight": "",
            "status": "",
            "history_score": {
                "name": "",
                "data":[
                    { "date": "", "value": 0},
                ],
            },
            "industry_score": {
                "name": "行业均值",
                "data":[
                    { "date": "", "value": 0},
                ],
            },
            "all_score": {
                "name": "所有均值",
                "data":[
                    { "date": "", "value": 0},
                ],
            }
        },
    ]
}


const solvency = {
    "global_score": {
        "rank": "",
        "score":0,
        "analysis": ""
    },
    "index_score": [
        {
            "index": "",
            "weight": "",
            "status": "",
            "history_score": {
                "name": "",
                "data":[
                    { "date": "", "value": 0},
                ],
            },
            "industry_score": {
                "name": "行业均值",
                "data":[
                    { "date": "", "value": 0},
                ],
            },
            "all_score": {
                "name": "所有均值",
                "data":[
                    { "date": "", "value": 0},
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