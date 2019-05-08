import { Card, Col, Row, Table } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icons from '../../components/Icons';
import Path from '../../components/Path';
import { tipRisk } from '../../utils';

const details = {
    'id': "121233433",
    'full_name': "中信证券（香港）有限公司",
    'code': "639274",
    'risk_level': "高风险",
    'risk_category': "法律",
    'date': '2019-03-20',
    'source': "证监会",
    'sourceTo':"http://www.csrc.gov.cn/pub/newsite/",
    'download': "http://localhost:5009/list/details/119089823",
    'title': "内幕交易中信被证监会处罚3.12亿元",
    'info': [
        " 一年一度的“3.15国际消费者权益日”又来了！每年这一天，各行业及各类型媒体都会积极为消费者发声，形成一股舆论监督热潮。实体经济如此，金融行业也是如此。伴随经济的快速成长，老百姓对金融消费的相关产品、服务质量要求越来越高。近两年在监管大洗牌下，金融行业规范发展成效渐趋明显，但还是不乏一些机构“小打小闹”触碰监管红线，损害金融消费者的权益。",
        "2015年11月13日， 国务院首次从国家层面对金融消费者权益保护进行具体规定，强调保障金融消费者的八项权利。要求金融机构充分尊重并自觉保障金融消费者的财产权、知情权、自主选择权、公平交易权、受教育权、信息安全权等基本权利，依法、合规开展经营活动。 ",
        "时值315国际消费者权益日到来之际，为了更好地维护金融消费者的合法权益，推动金融机构提升服务质量和服务效率，和讯网特以证券、基金、期货行业为例，梳理近一年来金融机构违法违规情况，帮助投资者进一步增强风险识别能力、自我保护意识和责任承担意识，也希望金融行业生态愈加良性发展。一年一度的“3.15国际消费者权益日”又来了！每年这一天，各行业及各类型媒体都会积极为消费者发声，形成一股舆论监督热潮。实体经济如此，金融行业也是如此。伴随经济的快速成长，老百姓(603883)对金融消费的相关产品、服务质量要求越来越高。近两年在监管大洗牌下，金融行业规范发展成效渐趋明显，但还是不乏一些机构“小打小闹”触碰监管红线，损害金融消费者的权益。 ",
        "2015年11月13日， 国务院首次从国家层面对金融消费者权益保护进行具体规定，强调保障金融消费者的八项权利。要求金融机构充分尊重并自觉保障金融消费者的财产权、知情权、自主选择权、公平交易权、受教育权、信息安全权等基本权利，依法、合规开展经营活动。",
        "时值315国际消费者权益日到来之际，为了更好地维护金融消费者的合法权益，推动金融机构提升服务质量和服务效率，和讯网特以证券、基金、期货行业为例，梳理近一年来金融机构违法违规情况，帮助投资者进一步增强风险识别能力、自我保护意识和责任承担意识，也希望金融行业生态愈加良性发展。时值315国际消费者权益日到来之际，为了更好地维护金融消费者的合法权益，推动金融机构提升服务质量和服务效率，和讯网特以证券、基金、期货行业为例，梳理近一年来金融机构违法违规情况，帮助投资者进一步增强风险识别能力、自我保护意识和责任承担意识，也希望金融行业生态愈加良性发展。"
    ]
    
}
export default class List extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div className="details-box">
                <Path path={this.props.history}/>   
                <Row className="details-container">
                    <Col span={20} offset={2}>
                        <div className="title-top">
                            <h2>{details.full_name}({details.code}){tipRisk(details.risk_level)}</h2>
                            <h4>
                                <span><Icons type="iconrisk_classify_law" className="classify_law" />{details.risk_category}</span>
                                <span><Icons type="iconselect_date" className="iconselect_date" />{details.date}</span>
                                <span><Icons type="iconannounce_detail_sourceweb" className="sourceweb" /><a href={details.sourceTo}>{details.source}</a></span>
                            </h4>
                        </div>
                        <div className="details-info">
                            <h2>{details.title}</h2>
                            {
                                details.info.map((item: any, idx: any) => <p key={idx}>{item}}</p>)
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
