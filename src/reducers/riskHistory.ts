import { session } from '../utils';

let localResults: any = session.get('results')
let results = localResults ? localResults : ""


const initState = {
    results: {
        "所有":{
            "this_year": [
                { "date": "2019-03-31", "value": "12" },
                { "date": "2019-06-30", "value": "11" },
                { "date": "2019-09-30", "value": "23" },
                { "date": "2019-12-31", "value": "12" }
            ],
            "last_3_year": [
                { "date": "2019-03-31", "value": "12" },
                { "date": "2019-06-30", "value": "31" },
                { "date": "2019-09-30", "value": "63" },
                { "date": "2019-12-31", "value": "32" }
            ],
            "last_5_year": [
                { "date": "2019-03-31", "value": "12" },
                { "date": "2019-06-30", "value": "11" },
                { "date": "2019-09-30", "value": "23" },
                { "date": "2019-12-31", "value": "12" },
                { "date": "2019-12-31", "value": "12" }
            ]
         },
         "房地产": {
            "this_year": [
                { "date": "2019-03-31", "value": "33" },
                { "date": "2019-06-30", "value": "12" },
                { "date": "2019-09-30", "value": "45" },
                { "date": "2019-12-31", "value": "76" }
            ],
            "last_3_year": [
                { "date": "2019-03-31", "value": "12" },
                { "date": "2019-06-30", "value": "11" },
                { "date": "2019-09-30", "value": "23" },
                { "date": "2019-12-31", "value": "12" }
            ],
            "last_5_year": [
                { "date": "2019-03-31", "value": "12" },
                { "date": "2019-06-30", "value": "11" },
                { "date": "2019-09-30", "value": "23" },
                { "date": "2019-12-31", "value": "12" },
                { "date": "2019-12-31", "value": "12" }
            ]
         },
         "计算机": {
            "this_year": [
                { "date": "2019-03-31", "value": "42" },
                { "date": "2019-06-30", "value": "21" },
                { "date": "2019-09-30", "value": "63" },
                { "date": "2019-12-31", "value": "122" }
            ],
            "last_3_year": [
                { "date": "2019-03-31", "value": "12" },
                { "date": "2019-06-30", "value": "11" },
                { "date": "2019-09-30", "value": "23" },
                { "date": "2019-12-31", "value": "12" }
            ],
            "last_5_year": [
                { "date": "2019-03-31", "value": "12" },
                { "date": "2019-06-30", "value": "11" },
                { "date": "2019-09-30", "value": "23" },
                { "date": "2019-12-31", "value": "12" },
                { "date": "2019-12-31", "value": "12" }
            ]
         },
         "农业": {
            "this_year": [
                { "date": "2019-03-31", "value": "45" },
                { "date": "2019-06-30", "value": "12" },
                { "date": "2019-09-30", "value": "56" },
                { "date": "2019-12-31", "value": "66" }
            ],
            "last_3_year": [
                { "date": "2019-03-31", "value": "12" },
                { "date": "2019-06-30", "value": "11" },
                { "date": "2019-09-30", "value": "23" },
                { "date": "2019-12-31", "value": "12" }
            ],
            "last_5_year": [
                { "date": "2019-03-31", "value": "12" },
                { "date": "2019-06-30", "value": "11" },
                { "date": "2019-09-30", "value": "23" },
                { "date": "2019-12-31", "value": "12" },
                { "date": "2019-12-31", "value": "12" }
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