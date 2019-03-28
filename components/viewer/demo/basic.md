---
order: 0
title:
  zh-CN: 点击预览
  en-US: Preview by clicking
---

## zh-CN

简单场景下预览图片

## en-US

Preview image after click button.

````jsx
import {
  Viewer, Button
} from 'antd';

class ViewDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>show</Button>
        <Viewer
          visible={this.state.visible}
          zIndex={4000}
          onClose={this.handleClick}
          images={[{
            src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            alt: 'logo',
          }]}
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
