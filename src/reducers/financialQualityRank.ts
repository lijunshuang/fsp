import { session } from '../utils';

const initState = {
    results: {
        "short_name": "金证优智",
        "history_score": [
            {"date":"2016-12-31","value":73},
            {"date":"2017-03-31","value":43},
            {"date":"2017-06-30","value":23},
            {"date":"2017-09-30","value":63},
            {"date":"2017-12-31","value":83}
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