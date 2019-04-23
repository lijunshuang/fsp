import { session } from '../utils';

const initState = {
    results: {
        "global_score": {
            "rank": "13/254",
            "score": 57.5,
            "analysis": "盈利能力分析：该公与去年第三季报相比，金证股份盈利能力有所增强，处于一年内得高位，其中，主营获利能力大幅增强，总资产收益能力大幅提升。"
        },
        "dataSource": [
            {
                "key": Math.random(),
                "date":2018,
                "净利润收益率": 12,
                "总资产报酬率": 15,
                "资本收益率": 42.2,
                "销售利润率": 34.5,
                "成本费用利润率": 67.4,
                "资本收益率2": 23,
            },
            {
                "key": Math.random(),
                "date":2017,
                "净利润收益率": 45,
                "总资产报酬率": 23,
                "资本收益率": 56,
                "销售利润率": 32,
                "成本费用利润率": 76,
                "资本收益率2": 3,
            },
            {
                "key": Math.random(),
                "date":2016,
                "净利润收益率": 34,
                "总资产报酬率": 3.1,
                "资本收益率": 12.4,
                "销售利润率": 35,
                "成本费用利润率": 12,
                "资本收益率2": 55,
            },
        ],
        "index_score": [
            {
                "index": "净利润收益率",
                "weight": "核心",
                "status": "normal",
                "history_score": {
                    "name": "金证股份",
                    "data":[
                        {"date":"2016-12-31","value":33},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":73},
                        {"date":"2017-09-30","value":23},
                        {"date":"2017-12-31","value":30}
                    ],
                },
                "industry_score": {
                    "name": "行业均值",
                    "data":[
                        {"date":"2016-12-31","value":13},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":43},
                        {"date":"2017-09-30","value":63},
                        {"date":"2017-12-31","value":53}
                    ],
                },
                "all_score": {
                    "name": "所有均值",
                    "data":[
                        {"date":"2016-12-31","value":63},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":23},
                        {"date":"2017-09-30","value":53},
                        {"date":"2017-12-31","value":33}
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
                        {"date":"2016-12-31","value":13},
                        {"date":"2017-03-31","value":23},
                        {"date":"2017-06-30","value":33},
                        {"date":"2017-09-30","value":53},
                        {"date":"2017-12-31","value":63}
                    ],
                },
                "industry_score": {
                    "name": "行业均值",
                    "data":[
                        {"date":"2016-12-31","value":83},
                        {"date":"2017-03-31","value":63},
                        {"date":"2017-06-30","value":55},
                        {"date":"2017-09-30","value":44},
                        {"date":"2017-12-31","value":33}
                    ],
                },
                "all_score": {
                    "name": "所有均值",
                    "data":[
                        {"date":"2016-12-31","value":23},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":53},
                        {"date":"2017-09-30","value":33},
                        {"date":"2017-12-31","value":13}
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
                        {"date":"2016-12-31","value":33},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":73},
                        {"date":"2017-09-30","value":63},
                        {"date":"2017-12-31","value":53}
                    ],
                },
                "industry_score": {
                    "name": "行业均值",
                    "data":[
                        {"date":"2016-12-31","value":13},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":43},
                        {"date":"2017-09-30","value":63},
                        {"date":"2017-12-31","value":53}
                    ],
                },
                "all_score": {
                    "name": "所有均值",
                    "data":[
                        {"date":"2016-12-31","value":63},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":23},
                        {"date":"2017-09-30","value":53},
                        {"date":"2017-12-31","value":33}
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
                        {"date":"2016-12-31","value":33},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":73},
                        {"date":"2017-09-30","value":63},
                        {"date":"2017-12-31","value":53}
                    ],
                },
                "industry_score": {
                    "name": "行业均值",
                    "data":[
                        {"date":"2016-12-31","value":13},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":43},
                        {"date":"2017-09-30","value":63},
                        {"date":"2017-12-31","value":53}
                    ],
                },
                "all_score": {
                    "name": "所有均值",
                    "data":[
                        {"date":"2016-12-31","value":63},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":23},
                        {"date":"2017-09-30","value":53},
                        {"date":"2017-12-31","value":33}
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
                        {"date":"2016-12-31","value":33},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":73},
                        {"date":"2017-09-30","value":63},
                        {"date":"2017-12-31","value":53}
                    ],
                },
                "industry_score": {
                    "name": "行业均值",
                    "data":[
                        {"date":"2016-12-31","value":13},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":43},
                        {"date":"2017-09-30","value":63},
                        {"date":"2017-12-31","value":53}
                    ],
                },
                "all_score": {
                    "name": "所有均值",
                    "data":[
                        {"date":"2016-12-31","value":63},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":23},
                        {"date":"2017-09-30","value":53},
                        {"date":"2017-12-31","value":33}
                    ],
                }
            },
            {
                "index": "资本收益率2",
                "weight": "一般",
                "status": "normal",
                "history_score": {
                    "name": "金证股份",
                    "data":[
                        {"date":"2016-12-31","value":33},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":73},
                        {"date":"2017-09-30","value":63},
                        {"date":"2017-12-31","value":53}
                    ],
                },
                "industry_score": {
                    "name": "行业均值",
                    "data":[
                        {"date":"2016-12-31","value":13},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":43},
                        {"date":"2017-09-30","value":63},
                        {"date":"2017-12-31","value":53}
                    ],
                },
                "all_score": {
                    "name": "所有均值",
                    "data":[
                        {"date":"2016-12-31","value":63},
                        {"date":"2017-03-31","value":43},
                        {"date":"2017-06-30","value":23},
                        {"date":"2017-09-30","value":53},
                        {"date":"2017-12-31","value":33}
                    ],
                }
            }
        ]
    }
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'GETDATA':
            // throw new Error('error in INCREASE')
            session.set('results', action.results);
            return {
                ...state,
                ...{ results: action.results },
            }
        
        default:
            return state;
    }
};