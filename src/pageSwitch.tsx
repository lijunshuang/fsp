import * as React from 'react';

interface IState {
    c: any
}

class AsyncComponent extends React.Component<any, IState> {
    
    constructor(props: any) {
        super(props)
        this.state = {
            c: null,
        }
    }

    public componentDidUpdate() {
        const {title} = this.props
        if (title) {
            document.title = title
        } else {
            document.title = '财务分析系统'
        }
    }

    public componentDidMount() {
        if (this.props.needLogin) {
            this.props.require(this)
        }
    } 

    public render() {
       if (this.state.c) {
           const Component = this.state.c
           const otherProps = this.props.otherProps
           return (
               <Component {...otherProps} />
           )
       }
       return (
           <div>
               Loading
           </div>
       )
    }
}

const b = (requireFunc: any, title: string, needLogin: boolean=false) => {
    const b = (props: any) => {
        return (
            <AsyncComponent title={title} otherProps={props} require={requireFunc} needLogin={needLogin} />
        ) 
    }
    return b
}

const l = (s: any) => {
    const load = (m: any) => {
        s.setState({c: m.default})
    }
    return load
}

const Pages: any[] = [
    // {
    //     path: '/',
    //     component: b((s: any) => import('./pages/home').then(l(s)), '财务分析系统', true),
    // },
    {
        path: '/',
        component: b((s: any) => import('./pages/market/').then(l(s)), '大盘财务行情', true),
    },
    {
        path: '/market',
        component: b((s: any) => import('./pages/market').then(l(s)), '大盘财务行情', true),
    },
    {
        path: '/knowledge',
        component: b((s: any) => import('./pages/knowledge').then(l(s)), '知识图谱', true),
    },
    {
        path: '/enterprise',
        component: b((s: any) => import('./pages/enterprise').then(l(s)), '企业监控', true),
    },
    {
        path: '/market/riskProfile',
        component: b((s: any) => import('./pages/market/riskProfile').then(l(s)), '财务风险概况', true),
    },
    {
        path: '/market/riskDetails',
        component: b((s: any) => import('./pages/market/riskDetails').then(l(s)), '风险详情', true),
    },
    

]

export default Pages
