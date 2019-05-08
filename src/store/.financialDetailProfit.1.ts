import { session } from '../utils';

const initState = {
    results: {
        "global_score": {
            "rank": "13/254",
            "score": 77.5,
            "analysis": "盈利能力分析：该公与去年第三季报相比，金证股份盈利能力有所增强，处于一年内得高位，其中，主营获利能力大幅增强，总资产收益能力大幅提升。"
        },
        "index_score": [
            {
                "index": "净利润收益率",
                "weight": "核心",
                "status": "normal",
                "date":["2017-03-31","2017-06-30","2017-09-30","2017-12-31"],
                "history_score": {
                    "name": "中信股份",
                    "data":[33,43,73,63,53]
                },
                "industry_score": {
                    "name": "行业均值",
                    "data":[53,23,44,66,23]
                },
                "all_score": {
                    "name": "所有均值",
                    "data":[13,23,55,46,73]
                }, 
            },
            {
                "index": "总资产报酬率",
                "weight": "核心",
                "status": "risk",
                "date":["2017-03-31","2017-06-30","2017-09-30","2017-12-31"],
                "history_score": {
                    "name": "中信股份",
                    "data":[13,23,29,51,66]
                },
                "industry_score": {
                    "name": "行业均值",
                    "data":[63,34,55,76,45]
                },
                "all_score": {
                    "name": "所有均值",
                    "data":[83,45,75,36,13]
                }, 
            },
            // {
            //     "index": "总资产报酬率",
            //     "weight": "核心",
            //     "status": "risk",
            //     "history_score": [
            //         {"date":"2016-12-31","value":23},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "industry_score": [
            //         {"date":"2016-12-31","value":83},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":23},
            //         {"date":"2017-09-30","value":43},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "all_score": [
            //         {"date":"2016-12-31","value":53},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ]
            // },
            // {
            //     "index": "资本收益率",
            //     "weight": "重要",
            //     "status": "normal",
            //     "history_score": [
            //         {"date":"2016-12-31","value":53},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "industry_score": [
            //         {"date":"2016-12-31","value":53},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "all_score": [
            //         {"date":"2016-12-31","value":53},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ]
            // },
            // {
            //     "index": "销售利润率",
            //     "weight": "重要",
            //     "status": "normal",
            //     "history_score": [
            //         {"date":"2016-12-31","value":53},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "industry_score": [
            //         {"date":"2016-12-31","value":53},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "all_score": [
            //         {"date":"2016-12-31","value":53},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ]
            // },
            // {
            //     "index": "成本费用利润率",
            //     "weight": "一般",
            //     "status": "normal",
            //     "history_score": [
            //         {"date":"2016-12-31","value":23},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "industry_score": [
            //         {"date":"2016-12-31","value":83},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":23},
            //         {"date":"2017-09-30","value":43},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "all_score": [
            //         {"date":"2016-12-31","value":53},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ]
            // },
            // {
            //     "index": "资本收益率",
            //     "weight": "一般",
            //     "status": "normal",
            //     "history_score": [
            //         {"date":"2016-12-31","value":63},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "industry_score": [
            //         {"date":"2016-12-31","value":23},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":23},
            //         {"date":"2017-09-30","value":43},
            //         {"date":"2017-12-31","value":53}
            //     ],
            //     "all_score": [
            //         {"date":"2016-12-31","value":53},
            //         {"date":"2017-03-31","value":43},
            //         {"date":"2017-06-30","value":73},
            //         {"date":"2017-09-30","value":63},
            //         {"date":"2017-12-31","value":53}
            //     ]
            // }
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