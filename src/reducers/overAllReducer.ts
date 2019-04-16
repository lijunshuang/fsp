import { session } from '../utils';

let localoverall: any = session.get('overall')
let overall = localoverall ? localoverall : ""
const initState = {
    page : 1,           //页码
    pagesize : 20, 
    overall,
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'PSOTOVERALL':
            session.set('overall', action.overall);
            return {
                ...state,
                overall: action.overall,
                page: action.page,
                pagesize:action.pagesize
            }
        case 'CHANGEPAGE':
            return {
                ...state,
                page: action.page
            }
        case 'CHANGEPAGESIZE':
            return {
                ...state,
                page: action.page,
                pagesize: action.pagesize
            }
        default:
            return state;
    }
};