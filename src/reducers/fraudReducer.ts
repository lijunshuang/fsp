import { session } from '../utils';

let localFraud: any = session.get('fraud')
let fraud = localFraud ? localFraud : ""
const initState = {
    fraud
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'POSTFRAUD':
            // throw new Error('error in INCREASE')
            session.set('fraud', action.fraud);
            return {
                ...state,
                ...{fraud: action.fraud}
            }

        default:
            return state;
    }
};