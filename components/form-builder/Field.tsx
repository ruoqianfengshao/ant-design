import * as React from 'react';
import classNames from 'classnames';
import Input from '../input';
import InputNumber from '../input-number';
import Tree from '../tree';
import TreeSelect from '../tree-select';
import Radio from '../radio';
import Checkbox from '../checkbox';
import Select from '../select';
import Cascader from '../cascader';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import Upload from '../upload';
import Switch from '../switch';
import Transfer from '../transfer';
import Slider from '../slider';
import Form from '../form';
import { FormItemProps } from '../form/FormItem';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export type FieldProps = {
  field: FieldItemProps;
  labelWidth?: string;
  wrapWidth?: string;
  customFields?: any;
  syncFields: (fields: { [x: string]: FieldItemProps }) => void;
  form?: any;
  prefixCls?: string;
};

export interface FieldItemProps extends FormItemProps {
  type: string;
  show: boolean;
  name: string;
  initialValue: any;
  elementProps: any;
  validator: Array<Object>;
  follow: any;
  emptyMessage: string;
}

export type ElementProps = {
  [index: string]: any;
};

const { Item } = Form;

const elements: {
  [index: string]: any;
} = {
  text: Input,
  number: InputNumber,
  treeSelect: TreeSelect,
  tree: Tree,
  radio: Radio,
  checkbox: Checkbox,
  select: Select,
  cascader: Cascader,
  date: DatePicker,
  time: TimePicker,
  upload: Upload,
  switch: Switch,
  transfer: Transfer,
  slider: Slider,
};

export default class Field extends React.Component<FieldProps> {
  static defaultProps = {
    field: {
      validator: [],
      required: true,
      show: true,
      syncFields() {},
    },
  };

  componentDidMount() {
    this.props.syncFields({
      [this.props.field.name]: this.props.field,
    });
  }

  renderField = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      type,
      elementProps,
      show = true,
      name,
      label,
      extra,
      required = true,
      initialValue,
      emptyMessage,
      validator = [],
      follow,
    } = this.props.field;
    const { form, prefixCls: customizePrefixCls } = this.props;
    const { getFieldDecorator } = form;
    const Element = elements[type];
    const prefixCls = getPrefixCls('form-builder-field', customizePrefixCls);
    const fieldClassName = classNames(prefixCls, {
      [`${prefixCls}-hidden`]: !show,
    });

    return (
      <Item label={label} extra={extra} className={fieldClassName}>
        {getFieldDecorator(name, {
          initialValue,
          rules: [
            {
              required,
              message: emptyMessage || `${label}不能为空`,
            },
            ...validator,
          ],
        })(<Element {...elementProps} />)}
        <span className={`${prefixCls}-follow`}>{follow}</span>
      </Item>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderField}</ConfigConsumer>;
  }
}
