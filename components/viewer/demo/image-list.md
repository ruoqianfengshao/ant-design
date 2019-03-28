---
order: 1
title:
  zh-CN: 预览图片列表
  en-US: Preview image list
---

## zh-CN

简单场景下预览图片列表

## en-US

Classic mode. Preview images in simple scene.

````jsx
import {
  Viewer, Button
} from 'antd';

const images = [{
  src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  alt: 'Ant Design',
}, {
  src: 'https://infeng.github.io/react-viewer/59111ff2c38954887bc313887fe76e27.jpg',
  alt: '设计价值观',
}, {
  src: 'https://infeng.github.io/react-viewer/bbbc41dac417d9fb4b275223a6a6d3e8.jpg',
  alt: '视觉',
}, {
  src: 'https://infeng.github.io/react-viewer/418f4037db8ad4685aa604c503a09604.jpg',
  alt: '可视化',
}, {
  src: 'https://infeng.github.io/react-viewer/ec4b8eafcc40e8bedad7ac34afedc6b6.jpg',
  alt: '动效',
}]

class ViewDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      activeIndex: 0,
    };
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible });
  }

  showImage = (index) => {
    this.setState({
      activeIndex: index,
    })
    this.handleClick()
  }

  render() {
    return (
      <div>
        <div>
          {
            images.map((image, index) => {
              return (<img style={{width: '60px', margin: '0 8px'}} key={image.src} onClick={() => this.showImage(index)} alt={image.alt} src={image.src} />)
            })
          }
        </div>
        <Viewer
          visible={this.state.visible}
          zIndex={4000}
          activeIndex={this.state.activeIndex}
          onClose={this.handleClick}
          images={images}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <ViewDemo />,
  mountNode
);
````
