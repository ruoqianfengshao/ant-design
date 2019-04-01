import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Row from '../row';
import Col from '../col';
// import More from '../common/render-more'

export default class extends PureComponent {
  static defaultProps = {
    className: '',
    style: {},
    footer: null,
    title: null,
    operation: null,
    operationItemLength: 2,
    children: null,
    footerBorder: false,
  };

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    footer: PropTypes.element,
    operation: PropTypes.arrayOf(PropTypes.element),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    operationItemLength: PropTypes.number,
    children: PropTypes.element,
    footerBorder: PropTypes.bool,
  };

  render() {
    const {
      className,
      style,
      footer,
      title,
      operation,
      children,
      operationItemLength,
      footerBorder,
    } = this.props;
    return (
      <div className={classnames('pk-container', className)} style={style}>
        {(title || operation) && (
          <Row className="pk-container-header">
            {title ? (
              <Col span={operation ? 10 : 24} className="pk-container-title">
                {title}
              </Col>
            ) : null}
            {operation ? (
              <Col span={title ? 14 : 24} className="pk-container-operation">
                <div className="pull-right">
                  {/* <More els={operation} operationItemLength={operationItemLength} /> */}
                </div>
              </Col>
            ) : null}
          </Row>
        )}
        <Row className="pk-container-content">{children}</Row>
        {footer && (
          <Row className={footerBorder ? 'pk-container-footer top-border' : 'pk-container-footer'}>
            <Col span={24}>{footer}</Col>
          </Row>
        )}
      </div>
    );
  }
}
