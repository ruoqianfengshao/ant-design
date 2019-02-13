---
order: 1
title:
  zh-CN: 简单表单
  en-US: Simple Form
---

## zh-CN

用表单构造器快速构造简单表单。

## en-US

Use Formbuilder build simle form quickly.

````jsx
import {
  Formbuilder, Button,
} from 'antd';

const fields = [{
  name: 'id',
  type: 'text',
  label: '编号',
  show: false,
}, {
  name: 'userName',
  type: 'select',
  label: '用户名称',
  elementProps: {

  },
}, {
  name: 'age',
  label: '年龄',
  type: 'text',
}, {
  name: 'birthday',
  label: '出生日期',
  type: 'date',
}, {
  name: 'educationDay',
  label: '上学日期',
  type: 'date',
}]

const { Fields } = Formbuilder

const FormbuilderDemo = () => (
  <div>
    <Formbuilder>
      <Fields fields={fields} />
      <Button htmlType="submit">保存</Button>
    </Formbuilder>
  </div>
);


ReactDOM.render(<FormbuilderDemo />, mountNode);
````
