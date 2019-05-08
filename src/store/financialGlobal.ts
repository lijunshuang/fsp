import Mock from 'mockjs';

import { session } from '../utils';

let integer = Mock.Random.integer

const global = {
        "code": "600446",
        "sector": "金融",
        "list_date": "2000-01-01",
        "risk_count": "15",
        "shor_name": "金证股份",
        "description": "金证股份是一家XXX公司",
        "industry": [
            { "name": "盈利能力", "score": integer(1,99)},
            { "name": "偿债能力", "score": integer(1,99)},
            { "name": "运营能力", "score":integer(1,99)},
            { "name": "成长能力", "score":integer(1,99)},
            { "name": "现金流", "score":integer(1,99)}
        ],
        "company": {
            "company_score": [
                { "name": "盈利能力", "score": integer(1,99)},
                { "name": "偿债能力", "score": integer(1,99)},
                { "name": "运营能力", "score": integer(1,99)},
                { "name": "成长能力", "score": integer(1,99)},
                { "name": "现金流", "score": integer(1,99)}
            ],
            "risk_score": "80",
            "risk_level": "无风险",
            "risk_diagnosis": "blah blah..."
        },
        "risk_trend": [
            { "date": "2016-12-31", "value":integer(1,99)},
            { "date": "2016-12-31", "value": integer(1,99)},
            { "date": "2016-12-31", "value":integer(1,99)},
            { "date": "2016-12-31", "value":integer(1,99)}
        ]
}
const financialReturn = {
    "short_name": "优智",
    "history_score": [
        {"date":"2016-12-31","value":integer(1,99)},
        {"date":"2017-03-31","value":integer(1,99)},
        {"date":"2017-06-30","value":integer(1,99)},
        {"date":"2017-09-30","value":integer(1,99)},
    ],
    "industry_score": {
        "所有": [
          {"date": "2016-12-31","value": integer(1,99)},
          {"date": "2017-03-31","value":integer(1,99)},
          {"date": "2017-06-30","value": integer(1,99)},
        ],
        "房地产": [
          {"date": "2016-12-31","value":integer(1,99)},
          {"date": "2017-03-31","value": integer(1,99)},
        ],
        "计算机": [
          {"date": "2016-12-31","value":integer(1,99)},
          {"date": "2017-03-31","value":integer(1,99)},
          {"date": "2017-06-30","value":integer(1,99)},
          {"date": "2017-06-30","value":integer(1,99)},
        ]
    }
  }

const rank = { 
    "short_name": "金证优智1",
    "history_score": [
        {"date":"2016-12-31","value":integer(1,99)},
        {"date":"2017-03-31","value":integer(1,99)},
        {"date":"2017-06-30","value":integer(1,99)},
        {"date":"2017-09-30","value":integer(1,99)},
        {"date":"2017-12-31","value":integer(1,99)}
    ]
}

const ability = {
    "profitability": {
        "score": "77.8",
        "index": [
            {"name": "净利润收益率", "rank": "23/165", "status": "normal"},
            {"name": "总资产报酬率", "rank": "21/165", "status": "risk"},
            {"name": "资本收益率", "rank": "25/165", "status": "normal"}
        ]
    },
    "solvency": {
        "score": "80",
        "index":  [
            {"name": "流动比率", "rank": "23/165", "status": "normal"},
            {"name": "速动比率", "rank": "21/165", "status": "risk"},
            {"name": "现金比率", "rank": "25/165", "status": "normal"}
        ]
    },
    "operating": {
        "score": "76",
        "index":  [
            {"name": "流动资产周转率", "rank": "48/165", "status": "normal"},
            {"name": "存货周转率", "rank": "49/165", "status": "risk"},
            {"name": "应收账款周转率", "rank": "51/165", "status": "normal"}
        ]
    },
    "currency": {
        "score": "75",
        "index":  [
            {"name": "销售现金比率", "rank": "48/165", "status": "normal"},
            {"name": "现金流量充足率", "rank": "49/165", "status": "risk"},
            {"name": "经营性现金流对资本支出比率", "rank": "51/165", "status": "normal"}
        ]
   },
   "growth": {
       "score": "75",
       "index":  [
           {"name": "总资产增长率", "rank": "48/165", "status": "normal"},
           {"name": "资本累积率", "rank": "49/165", "status": "risk"},
           {"name": "技术投入比率", "rank": "51/165", "status": "normal"}
       ]
   }
}

const event = {
    "risk_event":[
        {"risk_level": Mock.Random.pick(['高风险','低风险','无风险']), "risk_type":Mock.Random.cword(4,12), "date": "2019-03-12"},
        {"risk_level": Mock.Random.pick(['高风险','低风险','无风险']), "risk_type":Mock.Random.cword(4,12), "date": "2018-03-12"},
        {"risk_level": Mock.Random.pick(['高风险','低风险','无风险']) ,"risk_type":Mock.Random.cword(4,12), "date": "2017-03-12"}
    ],
    "report":  [
        {"pub_date": "2017-03-29", "title": "2016年年报"},
        {"pub_date": "2017-04-25", "title": "2017年第一季度报"},
        {"pub_date": "2017-06-28", "title": "2017年半年度报"},
        {"pub_date": "2017-09-26", "title": "2017年第三季度报"},
        {"pub_date": "2018-03-28", "title": "2017年年度报告"}
    ]

}

const initState = {
    global,
    rank,
    financialReturn,
    ability,
    event,
    // changeArr:[]
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'FINANCIALGLOBAL':
            // throw new Error('error in INCREASE')
            // session.set('results', action.global);
            return {
                ...state,
                global: action.global,
            }
        case 'FINANCIALRANK':
            return {
                ...state,
                rank: action.rank,
            }
        case 'FINANCIALRETURN':
            return {
                ...state,
                financialReturn: action.financialReturn,
                // changeArr:[...action.financialReturn]
            }

        case 'FINANCIALABILITY':
            return {
                ...state,
                ability: action.ability,
            }
        case 'FINANCIALEVENT':
            return {
                ...state,
                event: action.event,
            }
        
        default:
            return state;
    }
};

