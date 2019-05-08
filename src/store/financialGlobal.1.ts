const temp = { "date": "", "value": 0 }
const nameTemp = { "name": "", "score": 0 }
const abilityTemp = {"name": "", "rank": "", "status": ""}
const levelTemp = { "risk_level": "", "risk_type": "", "date": "" }
const reportTemp = {"pub_date": "", "title": ""}
const global = {
        "code": "",
        "sector": "",
        "list_date": "",
        "risk_count": "0",
        "shor_name": "",
        "description": "",
        "industry": [nameTemp],
        "company": {
            "company_score": [nameTemp],
            "risk_score": 0,
            "risk_level": "",
            "risk_diagnosis": ""
        },
        "risk_trend": [temp]
}
const financialReturn = {
    "short_name": "",
    "history_score": [temp],
    "industry_score": {
        "所有": [temp],
    }
  }

const rank = { 
    "short_name": "金证优智1",
    "history_score": [temp]
}

const ability = {
    "profitability": {
        "score": 0,
        "index": [abilityTemp]
    },
    "solvency": {
        "score": 0,
        "index":  [abilityTemp]
    },
    "operating": {
        "score": 0,
        "index":  [abilityTemp]
    },
    "currency": {
        "score": 0,
        "index":  [abilityTemp]
   },
   "growth": {
       "score": 0,
       "index":  [abilityTemp]
   }
}

const event = {
    "risk_event":[levelTemp],
    "report":  [reportTemp]

}

const initState = {
    global,
    rank,
    financialReturn,
    ability,
    event,
    // changeArr:[]
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case 'FINANCIALGLOBAL':
            // throw new Error('error in INCREASE')
            // session.set('results', action.global);
            return {
                ...state,
                global: action.global,
            }
        case 'FINANCIALRANK':
            return {
                ...state,
                rank: action.rank,
            }
        case 'FINANCIALRETURN':
            return {
                ...state,
                financialReturn: action.financialReturn,
                // changeArr:[...action.financialReturn]
            }

        case 'FINANCIALABILITY':
            return {
                ...state,
                ability: action.ability,
            }
        case 'FINANCIALEVENT':
            return {
                ...state,
                event: action.event,
            }
        
        default:
            return state;
    }
};

