import axios from 'axios';

const GETDATA = "GETDATA"
const POSTCLASSIFY = "POSTCLASSIFY"
const POSTABNORMAL = "POSTABNORMAL"
const GETABNORMALALL = "GETABNORMALALL"
const POSTFRAUD = "POSTFRAUD"
const POSTRISK = "POSTRISK"
const PSOTOVERALL = 'PSOTOVERALL'
const CHANGEPAGE = "CHANGEPAGE"
const CHANGEPAGESIZE = "CHANGEPAGESIZE"
const CODELIST = "CODELIST"
const CLEARCLASSIFY = "CLEARCLASSIFY"

const headers = {'Content-Type': 'application/x-www-form-urlencoded'}

const getData = (url:any, value:any) => async (dispatch:any) => {
    let results = await axios.post(url, value, {headers})
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    if (results.success) { 
        results = results.data
        dispatch(fetchData(results));
    }
}
//公司分组详情
const postClassify = (url:any, value:any) => async (dispatch:any) => {
    let classify = await axios.post(url, value, {headers})
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    if (classify.success) { 
        classify = classify.data
        dispatch(fetchClassify(classify));
    }
}
// 异常挖掘详情
const postAbnormal= (url:any, value:any) => async (dispatch:any) => {
    let abnormal = await axios.post(url, value, {headers})
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    if (abnormal.success) { 
        abnormal = abnormal.data
        dispatch(fetchAbnormal(abnormal));
    }
}
//所有公司异常展示界面
const getAbnormalAll= (url:any, value:any) => async (dispatch:any) => {
    let abnormalAll = await axios.get(url, {headers})
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    if (abnormalAll.success) { 
        abnormalAll = abnormalAll.data
        dispatch(fetchAbnormalAll(abnormalAll));
    }
}
// 财务舞弊详情
const postFraud = (url: any, value: any) => async (dispatch: any) => {
    let fraud = await axios.post(url, value, {headers})
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    if (fraud.success) { 
        fraud = fraud.data
        dispatch(fetchFraud(fraud));
    }
}
// 财务风险详情
const postRisk = (url: any, value: any) => async (dispatch: any) => {
    let risk = await axios.post(url, value, {headers})
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    if (risk.success) { 
        risk = risk.data
        dispatch(fetchRisk(risk));
    }
}
// 异常挖掘整体界面
const postOverAll= (url:any, value:any) => async (dispatch:any) => {
    const {page,pagesize} = value
    let overall = await axios.post(url, value)
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    console.log(value)

    if (overall.success) {
        const overalls = overall.data
        dispatch(fetchOverAll(overalls,page,pagesize));
    }
}

const ChangePage = (url: any, value: any) => async (dispatch: any) => { 
    const {page,pagesize} = value    
    let overall = await axios.post(url, value)
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    if (overall.success) {
        const overalls = overall.data
        dispatch(changePage(overalls,page));
    }
}
const changeCodeList = (value: any) => (dispatch: any) => { 
    dispatch({type: CODELIST,value})
}

const clearClassify = (classify: any) => (dispatch: any) => { 
    console.log(classify)
    dispatch({type: CLEARCLASSIFY,classify})
}

const fetchData = (results: any) => ({ type: GETDATA, results })
const fetchClassify = (classify: any) => ({ type: POSTCLASSIFY, classify })
const fetchAbnormal = (abnormal: any) => ({ type: POSTABNORMAL, abnormal })
const fetchAbnormalAll = (abnormalAll: any) => ({ type: GETABNORMALALL, abnormalAll })
const fetchFraud = (fraud: any) => ({ type: POSTFRAUD, fraud })
const fetchRisk = (risk: any) => ({ type: POSTRISK, risk })
const fetchOverAll = (overall: any,page:number,pagesize:number) => ({ type: PSOTOVERALL,overall,page,pagesize})
const changePage = (overall: any,page: number) => ({ type: CHANGEPAGE,overall,page})
// const clearClassify = (classify: any) => ({ type: CLEARCLASSIFY, classify })


export {
    getData,
    postClassify,
    postAbnormal,
    getAbnormalAll,
    postFraud,
    postOverAll,
    postRisk,
    ChangePage,
    changeCodeList,
    clearClassify
}
