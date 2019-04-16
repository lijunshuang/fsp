import { combineReducers } from 'redux';

import abnormalReducer from './abnormalReducer';
import classifyReducer from './classifyReducer';
import fraudReducer from './fraudReducer';
import getDataReducer from './getDataReducer';
import overAllReducer from './overAllReducer';
import riskReducer from './riskReducer';

export default combineReducers({
    getDataReducer,
    classifyReducer,
    abnormalReducer,
    fraudReducer,
    overAllReducer,
    riskReducer
});