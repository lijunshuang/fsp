import { session } from '../utils';

let localClassify: any = session.get('classify')
let classify = localClassify ? localClassify : ""
const initState = {
    classify
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'POSTCLASSIFY':
            // throw new Error('error in INCREASE')
            session.set('classify', action.classify);
            return {
                ...state,
                ...{classify: action.classify}
            }
        case "CLEARCLASSIFY":
            session.remove('classify');
            return {
                ...state,
                ...{ classify:action.classify}
            }
        default:
            return state;
    }
};