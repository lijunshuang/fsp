import { session } from '../utils';

let localRisk: any = session.get('risk')
let risk = localRisk ? localRisk : ""
const initState = {
    risk
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'POSTRISK':
            // throw new Error('error in INCREASE')
            session.set('risk', action.risk);
            return {
                ...state,
                ...{risk: action.risk}
            }

        default:
            return state;
    }
};