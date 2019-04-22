import { session } from '../utils';

const initState = {
    results: {
        "payload": {
            "code": "600446",
            "risk_score": 41,
            "full_name": "深圳市金证股份有限公司",
            "sector": "金融",
            "list_date": "2000-01-01",
            "risk_count": "15",
            "prospectus_url": "www.baidu.com",
            "description": "金证股份是一家XXX公司"
        },
        "risk_detail": {
            "盈利能力": [
                { "date": "2016-12-31", "value": 83 },
                { "date": "2017-03-31", "value": 43 },
                { "date": "2017-06-30", "value": 73 },
                { "date": "2017-09-30", "value": 63 },
                { "date": "2017-12-31", "value": 53 }
            ],
            "偿债能力": [
                { "date": "2016-12-31", "value": 53 },
                { "date": "2017-03-31", "value": 43 },
                { "date": "2017-06-30", "value": 73 },
                { "date": "2017-09-30", "value": 63 },
                { "date": "2017-12-31", "value": 53 }
            ],
            "运营能力": [
                { "date": "2016-12-31", "value": 33 },
                { "date": "2017-03-31", "value": 43 },
                { "date": "2017-06-30", "value": 73 },
                { "date": "2017-09-30", "value": 63 },
                { "date": "2017-12-31", "value": 53 }
            ],
            "成长能力": [
                { "date": "2016-12-31", "value": 73 },
                { "date": "2017-03-31", "value": 43 },
                { "date": "2017-06-30", "value": 33 },
                { "date": "2017-09-30", "value": 63 },
                { "date": "2017-12-31", "value": 83 }
            ],
            "现金流": [
                { "date": "2016-12-31", "value": 23 },
                { "date": "2017-03-31", "value": 13 },
                { "date": "2017-06-30", "value": 43 },
                { "date": "2017-09-30", "value": 33 },
                { "date": "2017-12-31", "value": 53 }
            ]
        }
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