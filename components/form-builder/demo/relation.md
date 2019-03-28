---
order: 2
title:
  zh-CN: 表单联动
  en-US: Form Relation
---

## zh-CN

用表单构造器快速构造带联动的表单。

## en-US

Use Formbuilder build form relation quickly.

````jsx
import {
  Formbuilder, Button,
} from 'antd';

const fields = [{
  name: 'userName',
  type: 'select',
  label: '用户名称',
}, {
  name: 'sex',
  type: 'radio',
  label: '性别',
  elementProps: {
    options: [{
      label: '女',
      value: 'female',
    }, {
      label: '男',
      value: 'male',
    }]
  },
  onFieldChange: (values) => {
    return [{
      name: 'info',
      value: values.sex === 'male' ? '李雷' : '韩梅梅'
    }]
  }
}, {
  name: 'educationDay',
  label: '上学日期',
  type: 'date',
  onFieldChange: (values) => {
    return new Promise((resolve) => resolve([{
      name: 'info',
      value: `educated at ${values.educationDay}`
    }]))
  }
}, {
  name: 'info',
  label: '履历',
  type: 'textarea',
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
