import PropTypes from 'prop-types';
/**
 * 伪标签：icon
 */
import React from 'react';

// import classnames from 'classnames'

export default class Icon extends React.Component<any, any>  {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  render() {
    console.log(this.props.name)
    const name = `#icon-${this.props.name}`
    const class_name = this.props.className
    return (
      <svg
        {...this.props}
        className={`icon ${class_name}`}
        aria-hidden="true"
      >
        <use xlinkHref={name} />
      </svg>
    )
  }
}
