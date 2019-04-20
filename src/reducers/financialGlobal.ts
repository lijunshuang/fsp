import { session } from '../utils';

const initState = {
    results: {
        "code": "600446",
        "sector": "金融",
        "list_date": "2000-01-01",
        "risk_count": "15",
        "shor_name": "金证股份",
        "description": "金证股份是一家XXX公司",
        "industry": [
            {"name":"盈利能力", "score":"60"},
            {"name":"偿债能力", "score":"36"},
            {"name":"运营能力", "score":"60"},
            {"name":"成长能力", "score":"79"},
            {"name":"现金流", "score":"40"}
        ],
        "company": {
           "company_score":[
                {"name":"盈利能力", "score":"80"},
                {"name":"偿债能力", "score":"66"},
                {"name":"运营能力", "score":"40"},
                {"name":"成长能力", "score":"35"},
                {"name":"现金流", "score":"56"}
            ],
            "risk_score": "80",
            "risk_level": "无风险",
            "risk_diagnosis": "blah blah..."
        },
        "risk_trend": [
            {"date":"2016-12-31","value": "15"},
            {"date":"2016-12-31","value": "20"},
            {"date":"2016-12-31","value": "17"},
            {"date":"2016-12-31","value": "12"}
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