import * as React from 'react';

export default class Nothing extends React.Component<any, any> { 
    constructor(props:any) {
        super(props)
    }
    render() {
        if (this.props.data) {
            return (
                <div className="financeDetail" style={{ width: "100%" }}>
                    <div className="content-null">{this.props.data}</div>
                </div>
            );
        } else { 
            return null
        }
    }
}