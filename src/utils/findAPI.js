import server from './server'; //请求发出文件
import querystring from 'querystring';
const Mock = require('mockjs');
import dailypurchase from './dailypurchase.json';

// 用法
// const {results,total} = yield findDailyprocurement(queryObj);

export const findDailyprocurement = (qsObj) => {
    //真实接口

    // return server({
    //     method: 'get',
    //     url: '/findDailyprocurement?'+ querystring.stringify(qsObj)
    // })

    // 模拟接口
    //假模假式的筛选一下
    var results = dailypurchase.filter(item => {
        var flag = true;
        if (qsObj.type && !qsObj.type.split('v').includes(item.type)) {
            flag = false;
        }
        if (qsObj.level && !qsObj.level.split('v').includes(item.level)) {
            flag = false;
        }
        if (qsObj.region && !qsObj.region.split('v').includes(item.region)) {
            flag = false;
        }
        if (qsObj.price) {
            if (!(item.price > +qsObj.price.split('to')[0] && item.price < +qsObj.price.split('to')[1])) {
                flag = false;
            }
        }
        if (qsObj.amount) {
            if (!(item.amount > +qsObj.amount.split('to')[0] && item.amount < +qsObj.amount.split('to')[1])) {
                flag = false;
            }
        }
        if (qsObj.date) {
            if (!(item.date > +qsObj.date.split('to')[0] && item.date < +qsObj.date.split('to')[1])) {
                flag = false;
            }
        }
        if (qsObj.isPay) {
            if (qsObj.isPay == 'y' && item.isPay == false) {
                flag = false;
            } else if (qsObj.isPay == 'n' && item.isPay == true) {
                flag = false
            }
        }
        if (qsObj.keyword) {
            if (!(new RegExp(qsObj.keyword).test(item.title))) {
                flag = false;
            }
        }
        return flag
    })

    return {
        'total': results.length,
        'results': results.sort((a, b) => qsObj.sortdirection * (a[qsObj.sortby] - b * [qsObj.sortby])).slice((qsObj.page - 1) * qsObj.pagesize, qsObj.page * qsObj.pagesize)
        // (function dd(){
        //     var arr = [];
        //     for (let i = 1; i <= qsObj.pagesize; i++) {
        //         arr.push({
        //             'id': 100000+i,
        //             'title': Mock.Random.cword(5,12),
        //             'price': Mock.Random.integer(1,100000),
        //             'amount': Mock.Random.integer(1,10000),
        //             'staff': Mock.Random.cname(),
        //             'mark': Mock.Random.cparagraph(2),//    随机2段话
        //             'type': Mock.Random.pick(['办公用品','文具','耗材']),
        //             'level': Mock.Random.pick(['一级经销商','二级经销商','三级经销商','四级经销商','五级经销商'])
        //         })
        //     }
        //     return arr
        // })()
    }
}