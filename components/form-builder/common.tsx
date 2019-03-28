import * as React from 'react';
import { FieldItemProps } from './Field';
import { FormEvent } from 'react';

const FormContext = React.createContext({
  fields: [],
  columns: 1,
  form: {},
  columnMode: 'dynamic',
  syncFields(fields: { [x: string]: FieldItemProps }) {
    this.setState({ fields });
  },
});

export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;

export const defaultGetValueFromEvent = (e: FormEvent) => {
  if (!e || !e.target) {
    return e;
  }
  const target: any = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  return value;
};
