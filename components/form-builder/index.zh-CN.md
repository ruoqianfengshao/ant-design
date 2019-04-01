---
category: Components
subtitle: 表单构造器
type: 数据录入
cols: 1
title: Formbuilder
---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

## 表单排列

我们为 `Formbuilder` 提供了以下三种排列方式：

- 水平排列：标签和表单控件水平排列；（默认）
- 垂直排列：标签和表单控件上下垂直排列；
- 行内排列：表单项水平行内排列。

## 表单域

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

这里我们封装了表单域 `<Form.Item />` 。

```jsx
<Form.Item {...props}>
  {children}
</Form.Item>
```

## API

### FormBuilder

`Formbuilder` 作为容器使用，内部 field 的逻辑，请使用 `Formbuilder.Fields` 或 `Formbuilder.Field` 组件，
`Formbuilder` 采用 `@form.create()` 的形式装饰组件。

**更多示例参考 [rc-form](http://react-component.github.io/form/)**。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columnMode | Formbuilder 内置两种列模式，`static` 和 `dynamic`, `static` 在任何情况下都是固定列；`dynamic` 会随表单容器宽度响应 | string | `dynamic` |
| layout | 表单布局 | 'horizontal'\|'vertical'\|'inline' | 'vertical' |
| onSubmit | 数据验证成功后回调事件 | Function({err, values}, form, e) |  |
| validateScroll | 是否滚动至校验出错误的 field | 'boolean' | true |
| customFields | 注册自定义 field, 可以在 field 中指定 type 调用到 | `object<Component>` | {} |

其余参数和 `Form` 保持一致

### formRef 获取实例

通过 wrappedComponentRef 调用 formbuilder 实例方法
```jsx
  <FormBuilder wrappedComponentRef={ref => this.form = ref}/>

  this.form.getFormData()
```

* getReadyValue
  若所有校验项通过，返回 { values, form}, 若有检验项不通过则返回 false
* getSerializeValue
  获取所有field 的 value, 所有数据都会经过一次 getData(format) 处理
* syncFields
  可以从外部修改 fields 的参数将会和 Formbuilder 内的 fields 合并，**注意**通过此方法直接写 field 值的话会绕过 field 的校验规则，慎用
* 其他方法和 Form 的实例方法一致


### field

`Field` 接收的参数为 `field`
`Fields` 接收的参数为 fields: `Array<field>`

| 参数 | 说明   |  类型    | 默认值     |
| ---- | ---- | ------ | -------- |
| type | 表单元素类型: `text`,`number`,`select`,`cascader`,`textarea`,`radio`,`checkbox`,`date`,`dateTime`,`time`,`custom`,`upload`, `treeSelect`, 不支持的 type 会尝试用 `text` 接收 | `string` | `text` |
| show | 是否显示 | `boolean` | null |
| initialValue | 表单项的默认值 | 随表单元素类型不同 | null |
| label | 字段显示文本 | `string\| ReactNode`  | null |
| labelDesc | 字段解释描述 | `string\| ReactNode` | null|
| name | 字段名，必填 | `string` | '' |
| required | 是否必填 | `boolean` | true |
| hide | 隐藏字段 | `Array<field>` | null |
| showType | field 的显示类型, 编辑态和只读态两种，只读态不会显示输入项，想要编辑态 readonly 或 disabled 状态的单独在 fieldProps 中单独传 | `form\|panel` | `form` |
| validator | 额外校验逻辑, 支持直接使用 [business-validator]() 中的业务校验规则 |`Array<Rule>` | [] |
| onFieldChange | 基于数据变化的联动 | `Function(values, form, options) => Array<Relation>` | [] |
| labelWidth | field 里的 label 宽度，如果设置会覆盖 css 和 Fields 的 labelWidth | `string\|null` | null |
| wrapWidth | field 里的 wrap 宽度，如果设置会覆盖 css 和 Fields 的 wrapWidth | `string\|null` |
| format | 搜集表单数据时，自动转换数据 | 时间组件可直接写`moment`支持的`format`格式，其他表单元素拿到的是一个`Function(value)` | null |
| initValue | 初始化时对 initialValue 的处理, 根据不同的 field type 会有默认处理 | null |
| elementProps | 表单元素原有的属性，将会以高优先级赋予输入项组件，根据type 中表单元素的不同，会有不同的参数 |
| placeholder | 默认提示文案 | 根据type有不同的默认值 |
| emptyMessage | 为空时文案 | 根据type有不同的默认值 |
| valueKey | 指定 value 字段 | 'value' |
| labelKey | 指定 label 字段 | 'label' |

<style>
.code-box-demo .ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
}
.markdown.api-container table td:last-child {
  white-space: nowrap;
  word-wrap: break-word;
}
</style>
