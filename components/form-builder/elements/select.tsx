import React from 'react';
import get from 'lodash/get';
import Select, { SelectProps } from '../../select';

export default class ComplexSelect extends React.Component<SelectProps> {
  static defaultProps = {
    labelKey: 'label',
    valueKey: 'value',
  };

  static getDerivedStateFromProps(nextProps: SelectProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value ? { selectedOptions: nextProps.value } : {}),
      };
    }
    return null;
  }

  state = {
    selectedOptions: this.props.value || [],
  };

  initValue(value: any) {
    const { valueKey } = this.props;
    return value.map((option: any) => get(option, valueKey));
  }

  handleChange = (value: any, selectedOptions: any) => {
    const options = [].concat(selectedOptions);
    const result = options.map(o => o!.props.option);
    if (!('value' in this.props)) {
      this.setState({ selectedOptions: result });
    }
    this.triggerChange(result, selectedOptions);
  };

  triggerChange = (changedValue: any, selectedOptions: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue, selectedOptions);
    }
  };

  render() {
    return (
      <Select
        {...this.props}
        value={this.initValue(this.state.selectedOptions)}
        onChange={this.handleChange}
      />
    );
  }
}
