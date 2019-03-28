---
order: 1
title:
  zh-CN: 默认值
  en-US: Default value
---

## zh-CN

有默认值的筛选器

## en-US

Filter with default value

````jsx
import {
  Filter,
} from 'antd';

const fields = [{
  name: 'userName',
  type: 'text',
  label: '用户名称',
  initialValue: 'vico',
}, {
  name: 'age',
  label: '年龄',
  type: 'text',
}, {
  name: 'status',
  type: 'select',
  label: '用户状态',
  elementProps: {
    options: [{
      title: '正常',
      value: '1',
    },{
      title: '冻结',
      value: '-1',
    },{
      title: '未激活',
      value: '0',
    }],
  },
  initialValue: '1',
}, {
  name: 'job',
  type: 'text',
  label: '岗位',
}, {
  name: 'department',
  label: '部门',
  type: 'text',
}, {
  name: 'birthday',
  label: '出生日期',
  type: 'date',
}, {
  name: 'educationDay',
  label: '上学日期',
  type: 'date',
}, {
  name: 'id',
  type: 'text',
  label: '编号',
  show: false,
}]

const FilterDemo = () => (
  <div>
    <Filter fields={fields} firstLineCount={3} />
  </div>
);


ReactDOM.render(<FilterDemo />, mountNode);
````
