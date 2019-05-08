// import { session } from '../utils';
// let localResults: any = session.get('results')
// let results = localResults ? localResults : ""
import mock from 'mockjs';

let integer = mock.Random.integer

const results = {
    "today_event_count": integer(1,99),
    "today_company_count": integer(1,99),
    "today_subscribed_event": integer(1,99),
    "industry_risk_rank": [
        {"name":"农业","score": integer(1,99)},
    ],
    "company_risk_rank": [
        {"name":"金证股份","score": integer(1,99)},
    ]
}
const riskHistory = {
    "所有":{
        "this_year": [
            { "date": "2019-03-31", "value":integer(1,99)},
            { "date": "2019-06-30", "value": integer(1,99) },
            { "date": "2019-09-30", "value":integer(1,99)},
            { "date": "2019-12-31", "value": integer(1,99) }
        ],
        "last_3_year": [
            { "date": "2019-03-31", "value": integer(1,99) },
            { "date": "2019-06-30", "value": integer(1,99) },
            { "date": "2019-09-30", "value": integer(1,99) },
            { "date": "2019-12-31", "value": integer(1,99) }
        ],
        "last_5_year": [
            { "date": "2019-03-31", "value": integer(1,99) },
            { "date": "2019-06-30", "value": integer(1,99) },
            { "date": "2019-09-30", "value": integer(1,99) },
            { "date": "2019-12-31", "value":integer(1,99) },
            { "date": "2019-12-31", "value":integer(1,99)}
        ]
     }
 }


const initState = {
    results,
    riskHistory,
    currentTrade: '所有',
    currentYear: 'this_year',
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'GETRISKEVENTS':
            // throw new Error('error in INCREASE')
            // session.set('payload', action.payload);
            return {
                ...state,
                results: action.results ? action.results : results,
            }
        case 'GETRISKHISTORY':
            return {
                ...state,
                riskHistory: action.riskHistory,
            }
        case 'CHANGEYEAR':
            return {
                ...state,
                currentYear: action.year,
            }
        case 'CHANGETRADE':
            return {
                ...state,
                currentTrade: action.trade,
            }
        
        default:
            return state;
    }
};