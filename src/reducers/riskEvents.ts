import { session } from '../utils';

let localResults: any = session.get('results')
let results = localResults ? localResults : ""


const initState = {
    results: {
        "today_event_count": "60",
        "today_company_count": "50",
        "today_subscribed_event": "20",
        "industry_risk_rank": [
            {"房地产": "75"},
            {"计算机": "56"},
            {"农业": "38"},
            {"机械制造": "26"},
            {"通信工程": "18"},
            {"水泥": "23"}   
        ],
        "company_risk_rank": [
            {"金证股份": "89%"},
            {"乐视": "86%"},
            {"华夏幸福": "79%"},
            {"平安银行": "76%"},
            {"恒生电子": "73%"},
            {"中国平安": "68%"}
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