/**
 * 伪标签：icons
 */
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1137351_6orhia7r9t3.js',
});

export default class Icons extends React.Component<any, any>  {
  static propTypes = {
    className: PropTypes.string,
    type:PropTypes.string.isRequired
  }

  render() {
    const class_name = this.props.className
    const type = this.props.type

    return (
      <IconFont type={type} className={class_name} />
    )
  }
}
