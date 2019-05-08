
const initState = {
    results: {},
    currentTrade: '所有',
    currentYear: 'this_year',
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'GETRISKHISTORY':
            // throw new Error('error in INCREASE')
            return {
                ...state,
                results: action.results,
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