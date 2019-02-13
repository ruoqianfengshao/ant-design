import * as React from 'react';
import * as merge from 'lodash/merge';
import * as chunk from 'lodash/chunk';
import classNames from 'classnames';
import { FormConsumer } from './common';
import { FieldItemProps } from './Field';
import Row from '../row';
import Col from '../col';
import Field from './Field';
import warning from '../_util/warning';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export type FieldsProps = {
  fields: any;
  columns: number;
  labelWidth: string;
  prefixCls: string;
  syncFields: (fields: { [x: string]: FieldItemProps }) => void;
};

export default class Fields extends React.Component<FieldsProps> {
  componentDidMount() {
    warning(
      Object.prototype.toString.call(this.props.fields) === '[object Array]',
      'Formbuilder: fields 应为数组类型',
    );
  }

  renderFields = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls } = this.props;
    const prefixCls = getPrefixCls('form-builder-fields', customizePrefixCls);
    const fieldsClassName = classNames(prefixCls);

    return (
      <FormConsumer>
        {({ fields, columns, ...other }) => {
          const span = 24 / columns;
          const chunkFields = chunk(
            this.props.fields,
            Math.ceil(this.props.fields.length / columns),
          );

          return (
            <Row gutter={16} className={fieldsClassName}>
              {chunkFields.map((colFields: any, index: number) => {
                return (
                  <Col span={span} key={index}>
                    {colFields.map((field: any, idx: number) => (
                      <Field
                        key={field.name || idx}
                        field={merge(field, fields[field.name])}
                        {...other}
                      />
                    ))}
                  </Col>
                );
              })}
            </Row>
          );
        }}
      </FormConsumer>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderFields}</ConfigConsumer>;
  }
}
