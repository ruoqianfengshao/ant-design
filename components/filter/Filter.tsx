import * as React from 'react'
import classNames from 'classnames'
import Animate from 'rc-animate';
import Formbuilder, {FieldItemProps, Fields} from '../form-builder'
import Icon from '../icon'
import { Omit, tuple } from '../_util/type';
import Arrange from '../arrange'
import Tag from '../tag'
import Button from '../button'
import Row from '../row'
import Col from '../col'
import { ConfigConsumerProps, ConfigConsumer } from '../config-provider'


const Modes = tuple('compact', 'normal');
export type Mode = (typeof Modes)[number];

export interface FilterProps {
  history: any;
  prefixCls?: string;
  firstLineCount: number;
  fields: FieldItemProps[];
  isHistoryChange: boolean;
  mode?: Mode;
  onPanelVisible: (status: boolean, e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Condition = (props: any) => {
  const { className, show, conditions, deleteCondition, ...restProps } = props;
  return (<div
    style={{display: show ? 'none' : ''}}
    className={className}
  >
    {
      conditions.map((condition: any) => {
        <Tag key={condition.name} closable onClose={deleteCondition}>{condition.label}</Tag>
      })
    }
  </div>);
};

const FieldsPanel = (props: any) => {
  const { className, show, fields, ...restProps } = props;
  return (<div
    style={{display: show ? '' : 'none'}}
     className={className}
  >
    <Fields fields={fields} columnMode="static" columns={3} required={false} />
  </div>);
};


export default class Filter extends React.Component<FilterProps> {
  static defaultProps = {
    firstLineCount: 3,
    fields: [],
    customCount: 1,
    mode: 'compact',
    isHistoryChange: true,
  }

  state = {
    expandStatus: false,
    conditions: [],
  }
  formRef = React.createRef();

  serializeFilter = () => {
    console.log(this.formRef.current!.getSerializeValues())
  }

  componentDidMount() {
    this.serializeFilter()
  }

  deleteCondition = () => {

  }

  expandFilter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({
      expandStatus: !this.state.expandStatus
    }, () => {
      this.props.onPanelVisible && this.props.onPanelVisible(this.state.expandStatus, e)
    })
  }

  renderFilter = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, firstLineCount, mode } = this.props;
    const prefixCls = getPrefixCls('filter', customizePrefixCls);
    const filterClassName = classNames(prefixCls)
    const firstLineFields = this.props.fields.slice(0, firstLineCount)
    const restFields = this.props.fields.slice(firstLineCount)

    return (
      <div className={filterClassName}>
        <Formbuilder
          layout='horizontal'
          wrappedComponentRef={this.formRef}
        >
          <div className={classNames(`${prefixCls}-first-line`)}>
            <div className={`${prefixCls}-line-fields`}>
              <Fields fields={firstLineFields} columnMode="static" columns={firstLineCount} required={false} />
            </div>
            <div className={`${prefixCls}-operation-area`}>
              <Arrange space="7px">
                {
                  restFields.length && <a href="javascript:;" onClick={this.expandFilter}>更多<Icon type="down"></Icon></a>
                }
                <Button icon='setting' />
                <Button type='primary' icon="search">{mode !== 'compact' && '查询'}</Button>
                <Button icon="reload">{mode !== 'compact' && '重置'}</Button>
              </Arrange>
            </div>
          </div>
          <Animate
            component="div"
            showProp="show"
            transitionName="fade"
          >
            <FieldsPanel
              key={'fields'}
              className={classNames(`${prefixCls}-panel`)}
              fields={restFields}
              show={this.state.expandStatus}
            />
            <Condition
              key={'condition'}
              className={classNames(`${prefixCls}-conditions`)}
              show={this.state.expandStatus}
              conditions={this.state.conditions}
              deleteCondition={this.deleteCondition}
            />
          </Animate>
        </Formbuilder>

      </div>
    )
  }

  render() {
    return (<ConfigConsumer>{this.renderFilter}</ConfigConsumer>)
  }
}
