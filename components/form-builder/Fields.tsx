import * as React from 'react';
import * as merge from 'lodash/merge';
import * as chunk from 'lodash/chunk';
import * as get from 'lodash/get';
import classNames from 'classnames';
import moment from 'moment';
import { FormConsumer } from './common';
import Row from '../row';
import Col from '../col';
import Field, { FieldItemProps } from './Field';
import warning from '../_util/warning';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export type FieldsProps = {
  fields: FieldItemProps[];
  required: boolean;
  columns?: number;
  columnMode?: string;
  labelWidth?: string;
  prefixCls?: string;
  initialFieldData?: { [x: string]: any };
  syncFields?: (fields: { [x: string]: FieldItemProps }) => void;
};

const initValueMap: {
  [index: string]: any;
} = {
  date: (value: any) => (typeof value === 'string' ? moment(value) : value),
  time: (value: any) => (typeof value === 'string' ? moment(value) : value),
  dateTime: (value: any) => (typeof value === 'string' ? moment(value) : value),
  month: (value: any) => (typeof value === 'string' ? moment(value) : value),
};

export default class Fields extends React.Component<FieldsProps> {
  static defaultProps = {
    columns: 1,
    required: false,
    columnMode: 'dynamic',
    fields: [],
    initialFieldData: {},
  };

  componentDidMount() {
    warning(
      Object.prototype.toString.call(this.props.fields) === '[object Array]',
      'Formbuilder',
      'fields 应为数组类型',
    );
  }

  renderHideFields = (hideFields: any, otherAttrs: any) => {
    return hideFields.map((field: any, idx: number) => {
      return <Field key={field.name || idx} field={field} {...otherAttrs} />;
    });
  };

  renderFields = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, columnMode, required, initialFieldData } = this.props;
    const prefixCls = getPrefixCls('form-builder-fields', customizePrefixCls);
    const fieldsClassName = classNames(prefixCls);

    return (
      <FormConsumer>
        {({ fields, columns, ...other }) => {
          const fieldsColumn = columnMode === 'static' ? this.props.columns || columns : columns;

          const showFields: FieldItemProps[] = [];
          const hideFields: FieldItemProps[] = [];

          this.props.fields.forEach((field: FieldItemProps) => {
            let originInitialValue;
            if (field.fieldNames) {
              originInitialValue =
                field.initialValue === undefined
                  ? field.fieldNames.map(name => get(initialFieldData, name))
                  : field.initialValue;
            } else {
              originInitialValue =
                field.initialValue === undefined
                  ? get(initialFieldData, field.name)
                  : field.initialValue;
            }
            const initValue = field.initValue || initValueMap[field.type];
            const initialValue = initValue ? initValue(originInitialValue) : originInitialValue;

            const mergedField = merge(
              { required },
              field,
              fields[(field as { [key: string]: any }).name],
              { initialValue },
            );
            if (field.show !== false) {
              showFields.push(mergedField);
            } else {
              hideFields.push(mergedField);
            }
          });
          const span = 24 / fieldsColumn;
          const chunkFields = chunk(showFields, Math.ceil(this.props.fields.length / fieldsColumn));

          if (columnMode === 'static') {
            const columnFields = chunk(showFields, fieldsColumn);
            return (
              <React.Fragment>
                {columnFields.map((colFields: any, rowIndex: number) => {
                  return (
                    <Row key={`fields-row-${rowIndex}`}>
                      {colFields.map((field: any, idx: number) => {
                        return (
                          <Col span={span} key={`col-${idx}`}>
                            <Field key={field.name || idx} field={field} {...other} />
                          </Col>
                        );
                      })}
                    </Row>
                  );
                })}
                {this.renderHideFields(hideFields, other)}
              </React.Fragment>
            );
          }

          return (
            <Row gutter={16} className={fieldsClassName}>
              {chunkFields.map((colFields: any, index: number) => {
                return (
                  <Col span={span} key={index}>
                    {colFields.map((field: any, idx: number) => (
                      <Field key={field.name || idx} field={field} {...other} />
                    ))}
                  </Col>
                );
              })}
              {this.renderHideFields(hideFields, other)}
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
