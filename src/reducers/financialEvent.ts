import { session } from '../utils';

const initState = {
    results: {
        "risk_event": [
            {"risk_level": "高风险", "title":"内幕交易", "date": "2019-03-12"},
            {"risk_level": "低风险", "title":"内幕交易", "date": "2018-03-12"},
            {"risk_level": "无风险", "title":"内幕交易", "date": "2017-03-12"}
        ],
        "report": [
            {"pub_date": "2017-03-29", "title": "2016年年报"},
            {"pub_date": "2017-04-25", "title": "2017年第一季度报"},
            {"pub_date": "2017-06-28", "title": "2017年半年度报"},
            {"pub_date": "2017-09-26", "title": "2017年第三季度报"},
            {"pub_date": "2018-03-28", "title": "2017年年度报告"}
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