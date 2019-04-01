---
order: 30
title:
  zh-CN: 简单配置
  en-US: Simple generate
---

## zh-CN

使用配置简单生成下拉选择器。

## en-US

Simple config to generate select.

````jsx
import { Select } from 'antd';

const config1 = {
  options: [{
    label: 'jack',
    value: 'jack',
  },{
    label: 'lucy',
    value: 'lucy',
  },{
    label: 'disabled',
    value: 'disabled',
    disabled: true,
  },{
    label: 'Yiminghe',
    value: 'Yiminghe',
  }],
}

const config2 = {
  showSearch: true,
  filterOption: false,
  style: { width: 120 },
  onSearch: (val) => new Promise((resolve) => resolve([1,2,3,4,5].map(i => ({
    label: val + i,
    value: val + i,
  })))),
}

ReactDOM.render(
  <div>
    <Select defaultValue="lucy" style={{ width: 120 }} {...config1} />
    <Select {...config2} />
  </div>,
  mountNode
);
````
