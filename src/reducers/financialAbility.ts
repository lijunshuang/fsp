import { session } from '../utils';

const initState = {
    results: {
        "profitability": {
            "score": "77.8",
            "index": [
                { "name": "净利润收益率", "rank": "23/165", "status": "risk" },
                { "name": "总资产报酬率", "rank": "21/165", "status": "risk" },
                { "name": "资本收益率", "rank": "25/165", "status": "normal" },
            ]
        },
        "solvency": {
            "score": "80",
            "index": [
                { "name": "流动比率", "rank": "23/165", "status": "normal" },
                { "name": "速动比率", "rank": "21/165", "status": "risk" },
                { "name": "现金比率", "rank": "25/165", "status": "normal" },
            ]
        },
        "operating": {
            "score": "76",
            "index": [
                { "name": "流动资产周转率", "rank": "48/165", "status": "normal" },
                { "name": "存货周转率", "rank": "49/165", "status": "risk" },
                { "name": "应收账款周转率", "rank": "51/165", "status": "normal" },
            ]
        },
        "currency": {
            "score": "75",
            "index": [
                { "name": "销售现金比率", "rank": "48/165", "status": "normal" },
                { "name": "现金流量充足率", "rank": "49/165", "status": "risk" },
                { "name": "经营性现金流对资本支出比率", "rank": "51/165", "status": "normal" }
            ]
        },
        "growth": {
            "score": "75",
            "index": [
                { "name": "总资产增长率", "rank": "48/165", "status": "normal" },
                { "name": "资本累积率", "rank": "49/165", "status": "risk" },
                { "name": "技术投入比率", "rank": "51/165", "status": "normal" }
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