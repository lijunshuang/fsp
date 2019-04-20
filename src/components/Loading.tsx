import { Spin } from 'antd';
/**
 * 正在加载提示的样式
 */
import * as React from 'react';

// import { LANG } from './internationalization'

const STYLES: any = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 10000000,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
}

const STYLES_INNER: any = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    fontSize: '24px',
    width: '180px',
    height: '40px',
    lineHeight: '40px',
    position: 'fixed',
    left: '50%',
    top: '50%',
    marginLeft: '-90px',
    marginTop: '-80px',
    textAlign: 'center',
}

/**
 * 载入标志
 */
export default class Loading extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
    }

    public render() {
        if (this.props.loading) {
            return (
                <div style={STYLES}>
                    <div style={STYLES_INNER}>
                        <Spin
                            style={{
                                marginLeft: '-15px',
                                marginBottom: '-3px',
                                marginRight: '5px',
                            }}
                        />
                        {Loading}...
                    </div>
                </div>
            )
        }
        return null
    }

}
