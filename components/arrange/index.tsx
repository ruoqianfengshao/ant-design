import React, { Component, CSSProperties } from 'react'
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

interface ArrangeProps {
  prefixCls?: string;
  style?: CSSProperties;
  align?: string;
  space?: string;
  itemStyle?: CSSProperties;
  children: React.ReactNodeArray;
}

export default class Arrange extends Component<ArrangeProps> {

  renderArrange = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      align = 'horizontal',
      children = [],
      style = {},
      space = '16px',
      itemStyle = {},
    } = this.props
    const prefixCls = getPrefixCls('arrange', customizePrefixCls);

    return (
      <div
        className={prefixCls}
        style={style}
      >
        {
          children.map((child: any, index: number) => {
            return React.cloneElement(child, {
              ...child.props,
              key: child.key ? child.key : `${prefixCls}-item-${index}`,
              style: {
                ...itemStyle,
                marginLeft: align === 'horizontal' && index ? space : 0,
                marginRight: 0,
                marginTop: align === 'vertical' && index ? space : 0,
                marginBottom: 0,
                display: 'inline',
              },
            })
          })
        }
      </div>
    )
  }

  render () {
    return <ConfigConsumer>{this.renderArrange}</ConfigConsumer>
  }
}
