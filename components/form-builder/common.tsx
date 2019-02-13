import * as React from 'react';
import { FieldItemProps } from './Field';

const FormContext = React.createContext({
  fields: [],
  columns: 1,
  form: {},
  syncFields(fields: { [x: string]: FieldItemProps }) {
    this.setState({ fields });
  },
});

export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;
