import React from 'react'
import get from 'lodash/get'
import Select from '../../select'

export default class ComplexSelect extends React.Component {
  static defaultProps = {
    labelKey: 'label',
    valueKey: 'value',
  }

  static getDerivedStateFromProps (nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value ? { selectedOptions: nextProps.value } : {}),
      }
    }
    return null
  }

  state = {
    selectedOptions: this.props.value || [],
  }

  initValue (value) {
    const { valueKey } = this.props
    return value.map(option => get(option, valueKey))
  }

  handleChange = (value, selectedOptions) => {
    const options = [].concat(selectedOptions)
    const result = options.map(o => o.props.option)
    if (!('value' in this.props)) {
      this.setState({ selectedOptions: result })
    }
    this.triggerChange(result, selectedOptions: options)
  }

  triggerChange = (changedValue, selectedOptions) => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props
    if (onChange) {
      onChange(changedValue, selectedOptions)
    }
  }

  render () {
    return (
      <React.Fragment>
        <Select
          {...this.props}
          value={this.initValue(this.state.selectedOptions)}
          onChange={this.handleChange}
        />
      </React.Fragment>
    )
  }
}
