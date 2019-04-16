import { session } from '../utils';

let localAbnormal: any = session.get('abnormal')
let localabnormalAll: any = session.get('abnormalAll')

let abnormal = localAbnormal ? localAbnormal : ""
let abnormalAll = localabnormalAll ? localabnormalAll : ""

const initState = {
    abnormal,
    abnormalAll,
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'POSTABNORMAL':
            // throw new Error('error in INCREASE')
            session.set('abnormal', action.abnormal);
            return {
                ...state,
                abnormal: action.abnormal
            }
        case 'GETABNORMALALL':
            session.set('abnormalAll', action.abnormalAll);
            return {
                ...state,
                abnormalAll: action.abnormalAll
            }
        default:
            return state;
    }
};