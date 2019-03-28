import React, { Component, FormEvent } from 'react';
import classNames from 'classnames';
import * as CssElementQuery from 'css-element-queries';
import omit from 'omit.js';
import Form from '../form';
import Fields from './Fields';
import Field from './Field';
import { FormProvider } from './common';
import { FormProps, FormComponentProps, FormLayout } from '../Form/Form';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

type FormbuilderProps = {
  style?: Object;
  columnMode: string;
  validateScroll?: Boolean;
  customFields?: Object;
  onSimpleSubmit?: (props: any, form: FormProps, event: FormEvent<HTMLFormElement>) => void;
  form: FormComponentProps;
};

type FormbuilderState = {
  fields: any;
  columns: number;
};

const getColumnsByWidth = (width: number) => {
  let columns = 1;
  if (width <= 600) {
    columns = 1;
  } else if (width <= 1024) {
    columns = 2;
  } else if (width <= 1440) {
    columns = 3;
  } else if (width > 1440) {
    columns = 4;
  }

  return columns;
};

class Formbuilder extends Component<FormbuilderProps & FormProps, FormbuilderState> {
  static Fields = Fields;
  static Field = Field;

  static defaultProps = {
    layout: 'horizontal' as FormLayout,
    hideRequiredMark: false,
    validateScroll: true,
    columnMode: 'dynamic',
    onSimpleSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
  };

  private formRef: React.RefObject<HTMLDivElement>;

  constructor(props: FormbuilderProps & FormProps) {
    super(props);
    Object.assign(this, props.form);
    this.state = {
      fields: {},
      columns: 1,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const formNode = this.formRef.current;
    if (formNode) {
      this.calculateColumns(formNode);
    }

    CssElementQuery.ResizeSensor(formNode, () => {
      if (formNode) {
        this.calculateColumns(formNode);
      }
    });
  }

  calculateColumns = (formNode: HTMLElement) => {
    const width = formNode.getBoundingClientRect().width;
    const columns = getColumnsByWidth(width);

    this.setState({ columns });
  };

  getSerializeValues() {
    return this.serializeData(this.props.form.getFieldsValue());
  }

  serializeData = (values: any) => {
    const result: any = {};
    Object.keys(values).forEach(name => {
      const field = this.state.fields[name] || {};
      if (values[name] !== null && values[name] !== undefined) {
        if (field.getData) {
          result[name] = field.getData(values[name]);
        } else {
          result[name] = values[name]
        }
      }
    });
    return result;
  };

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { validateScroll, form, onSimpleSubmit, onSubmit } = this.props;
    if (onSimpleSubmit) {
      if (validateScroll) {
        this.props.form.validateFieldsAndScroll((err, values) => {
          onSimpleSubmit({ err, values: this.serializeData(values) }, form, event);
        });
      } else {
        this.props.form.validateFields((err, values) => {
          onSimpleSubmit({ err, values: this.serializeData(values) }, form, event);
        });
      }
    } else if (onSubmit) {
      onSubmit(event);
    }
  }

  syncFields = (fields: any) => {
    this.setState(state => {
      const mergeFields: any = {};
      Object.keys(fields).forEach(key => {
        mergeFields[key] = { ...state.fields[key], ...fields[key] };
      });
      return {
        fields: { ...state.fields, ...mergeFields },
      };
    });
  };

  renderFormbuilder = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, children } = this.props;
    const prefixCls = getPrefixCls('form-builder', customizePrefixCls);
    const formClassName = classNames(prefixCls);

    const formProps = omit(this.props, [
      'onSimpleSubmit',
      'columnMode',
      'validateScroll',
      'customFields',
      'form',
    ]);

    return (
      <div className={formClassName} ref={this.formRef}>
        <FormProvider value={{ ...this.props, syncFields: this.syncFields, ...this.state }}>
          <Form {...formProps} onSubmit={this.handleSubmit}>
            {children}
          </Form>
        </FormProvider>
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderFormbuilder}</ConfigConsumer>;
  }
}

export default Form.create()(Formbuilder);
