/**
 * Created by lijunshuang on 2018/3/25.
 */

// 本地存储封装，项目中其他地方不要直接使用localStorage和sessionStorage，统一使用封装。
// const SALT = '_ffa_';

// 本地存储
const local = {
    get:(key:string)=>{
        let strValue:any = localStorage.getItem(key)
        return JSON.parse(strValue)
    },
    set: (key:string, jsonValue:any)=>{
        var strValue = JSON.stringify(jsonValue)
        localStorage.setItem(key, strValue)
    },
    remove: (key:string)=>{
        localStorage.removeItem(key)
    },
    removeAll: ()=>{
        localStorage.clear()
    }
};

// session存储
const session = {
    get:(key:string)=> {
        let strValue:any = sessionStorage.getItem(key)
        return JSON.parse(strValue)
    },
    set:(key:string, jsonValue:any)=> {
        var strValue = JSON.stringify(jsonValue)
        sessionStorage.setItem(key, strValue)
    },
    remove:(key:string)=> {
        sessionStorage.removeItem(key)
    },
    removeAll:()=> {
        sessionStorage.clear()
    }
};

//求数组的平均值
const arrAverage = (arr: any) => arr.reduce((a: number, b: number) => a + b, 0) / arr.length

// 保留2位小数 的百分数
const keepTwo = (value: number) => Number((value*100).toFixed(2))

export { 
    local,
    session,
    arrAverage,
    keepTwo
}
