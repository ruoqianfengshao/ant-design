import * as React from 'react';
import classNames from 'classnames';
import Input from '../input';
import InputNumber from '../input-number';
import Tree from '../tree';
import TreeSelect from '../tree-select';
import Radio from '../radio';
import Checkbox from '../checkbox';
import Select from './elements/select';
import Cascader from '../cascader';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import Upload from '../upload';
import Switch from '../switch';
import Transfer from '../transfer';
import Slider from '../slider';
import Form from '../form';
import { FormItemProps } from '../form/FormItem';
import { defaultGetValueFromEvent } from './common';
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
  show?: boolean;
  name: string;
  fieldNames: string[];
  value?: any;
  initialValue?: any;
  elementProps?: ElementProps;
  validator?: { [key: string]: any }[];
  follow?: any;
  resetValue?: boolean;
  emptyMessage?: string;
  getValueFromEvent?: (e: any) => any;
  initValue?: (value: any) => any;
  onFieldChange?:
    | ((values: { [key: string]: any }, form: any, options: any) => FieldItemProps[])
    | FieldItemProps[];
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
  radio: Radio.Group,
  checkbox: Checkbox.Group,
  select: Select,
  cascader: Cascader,
  date: DatePicker,
  time: TimePicker,
  upload: Upload,
  switch: Switch,
  transfer: Transfer,
  slider: Slider,
  textarea: Input.TextArea,
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

  dealRelations = async (value: any, currentInfo?: any) => {
    const relationFieldsProps = {};
    const relationValues = {};
    const { onFieldChange, name } = this.props.field;

    if (onFieldChange) {
      await new Promise(async resolve => {
        const actionFields =
          onFieldChange instanceof Array
            ? onFieldChange
            : (await onFieldChange(
                {
                  ...this.props.form.getFieldsValue(),
                  [name]: value,
                },
                this.props.form,
                currentInfo,
              )) || [];

        actionFields.forEach(field => {
          const realField = field;
          if (realField.value !== undefined) {
            Object.assign(relationValues, { [realField.name]: realField.value });
          }

          if (realField.resetValue === true) {
            Object.assign(relationValues, { [realField.name]: undefined });
          }

          delete realField.value;
          Object.assign(relationFieldsProps, { [realField.name]: realField });
          resolve();
        });
      });

      this.props.form.setFieldsValue(relationValues);
      this.props.syncFields(relationFieldsProps);
    }
  };

  commonValueHandler = (e: any) => {
    const value = this.props.field.getValueFromEvent
      ? this.props.field.getValueFromEvent(e)
      : defaultGetValueFromEvent(e);
    this.dealRelations(value);

    return value;
  };

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
          getValueFromEvent: this.commonValueHandler,
        })(<Element {...elementProps} />)}
        <span className={`${prefixCls}-follow`}>{follow}</span>
      </Item>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderField}</ConfigConsumer>;
  }
}
