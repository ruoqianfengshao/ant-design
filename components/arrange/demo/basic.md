---
order: 1
title:
  zh-CN: 简单的行内排列
  en-US: Simple Arrange
---

## zh-CN

用排列器快速构造简单排列。

## en-US

Use Arrange build simle group arrange.

```jsx
import { Arrange, Button } from 'antd'

const layout1 = {
  marginLeft: 0,
  marginRight: 0,
  middle: 20,
  marginBottom: 0,
  marginTop: 0,
  align: 'vertical',
}

const layout2 = {
  marginLeft: 100,
  marginRight: 0,
  middle: 10,
  marginBottom: 0,
  marginTop: 0,
}

ReactDOM.render(
  <React.Fragment>
    <div style={{ border: '1px solid #000', margin: '20px', padding: '20px'}}>
      <Arrange
        key='1'
        style={{width: '70px'}}
        {...layout1}>
        <Button key='search' type='primary'>搜索</Button>
        <Button key='cancel' type='info'>取消</Button>
      </Arrange>
    </div>
    <div style={{ border: '1px solid #000', margin: '20px', padding: '20px'}}>
      <Arrange key='2' {...layout2}>
        <Button key='export' type='info'>导出</Button>
        <Button key='search' type='primary'>搜索</Button>
        <Button key='cancel' type='info'>取消</Button>
      </Arrange>
    </div>
  </React.Fragment>,
  mountNode
);
```
