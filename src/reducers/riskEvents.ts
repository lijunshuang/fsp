import { session } from '../utils';

let localResults: any = session.get('results')
let results = localResults ? localResults : ""


const initState = {
    results: {
        "today_event_count": "60",
        "today_company_count": "50",
        "today_subscribed_event": "20",
        "industry_risk_rank": [
            {"name":"房地产","score": "75"},
            {"name":"计算机","score": "56"},
            {"name":"农业","score": "38"},
            {"name":"机械制造","score": "26"},
            {"name":"通信工程","score": "18"},
            {"name":"水泥","score": "23"}   
        ],
        "company_risk_rank": [
            {"name":"金证股份","score": "89%"},
            {"name":"乐视","score": "86%"},
            {"name":"华夏幸福","score": "79%"},
            {"name":"平安银行","score": "76%"},
            {"name":"恒生电子","score": "73%"},
            {"name":"中国平安","score": "68%"}
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