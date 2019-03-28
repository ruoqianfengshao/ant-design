import * as React from 'react';
import { ImageDecorator } from './ViewerProps';

export interface ViewerNavProps {
  prefixCls?: string;
  images: ImageDecorator[];
  activeIndex: number;
  onChangeImg: (index: number) => void;
}

export default class ViewerNav extends React.Component<ViewerNavProps, any> {
  static defaultProps = {
    activeIndex: 0,
  };

  handleChangeImg = (newIndex: number) => {
    if (this.props.activeIndex === newIndex) {
      return;
    }
    this.props.onChangeImg(newIndex);
  }

  render() {
    const {
      prefixCls,
      images,
      activeIndex,
    } = this.props

    let marginLeft = `calc(50% - ${activeIndex + 1} * 31px)`;
    let listStyle = {
      marginLeft: marginLeft
    };

    return (
      <div className={`${prefixCls}-navbar`}>
        <ul className={`${prefixCls}-list ${prefixCls}-list-transition`} style={listStyle}>
          {
            images.map((item, index) => (
              <li
                key={index}
                className={index === activeIndex ? 'active' : ''}
                onClick={() => { this.handleChangeImg(index); }}
              >
                <img src={item.src} alt={item.alt} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
