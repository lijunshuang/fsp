
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Card, Row, Col} from 'antd'
import Clock from '../../components/Clock'


export default class Home extends Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                一个空的首页
                <Clock />
            </div>
        )
    }
}
