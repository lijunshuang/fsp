import { session } from '../utils';

let localResults: any = session.get('results')
let results = localResults ? localResults : ""
let localCodelist: any = session.get('codelist')
let codelist = localCodelist ? localCodelist :[]

const initState = {
    results,
    codelist,
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
        case 'CODELIST':
            // throw new Error('error in INCREASE')
            session.set('codelist', [...action.codelist]);
            return {
                ...state,
                codelist:[...action.codelist]
            }
        default:
            return state;
    }
};