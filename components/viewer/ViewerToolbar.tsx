import * as React from 'react';
import Icon, { ActionType } from './Icon';
import { ToolbarConfig } from './ViewerProps';

export interface ViewerToolbarProps {
  prefixCls: string;
  onAction: (config: ToolbarConfig) => void;
  alt: string;
  width: number;
  height: number;
  attribute: boolean;
  zoomable: boolean;
  rotatable: boolean;
  scalable: boolean;
  changeable: boolean;
  downloadable: boolean;
  noImgDetails: boolean;
  toolbars: ToolbarConfig[];
}

export const defaultToolbars: ToolbarConfig[] = [
  {
    key: 'zoomIn',
    actionType: ActionType.zoomIn,
  },
  {
    key: 'zoomOut',
    actionType: ActionType.zoomOut,
  },
  {
    key: 'prev',
    actionType: ActionType.prev,
  },
  {
    key: 'reset',
    actionType: ActionType.reset,
  },
  {
    key: 'next',
    actionType: ActionType.next,
  },
  {
    key: 'rotateLeft',
    actionType: ActionType.rotateLeft,
  },
  {
    key: 'rotateRight',
    actionType: ActionType.rotateRight,
  },
  {
    key: 'scaleX',
    actionType: ActionType.scaleX,
  },
  {
    key: 'scaleY',
    actionType: ActionType.scaleY,
  },
  {
    key: 'download',
    actionType: ActionType.download,
  },
];

function deleteToolbarFromKey(toolbars: ToolbarConfig[], keys: string[]) {
  const targetToolbar = toolbars.filter(item => keys.indexOf(item.key) < 0);

  return targetToolbar;
}

export default class ViewerToolbar extends React.Component<ViewerToolbarProps, any> {

  handleAction(config: ToolbarConfig) {
    this.props.onAction(config);
  }

  renderAction = (config: ToolbarConfig) => {
    let content = null;
    // default toolbar
    if (typeof ActionType[config.actionType!] !== 'undefined') {
      content = <Icon type={config.actionType!} prefixCls={this.props.prefixCls} />;
    }
    // extra toolbar
    if (config.render) {
      content = config.render;
    }
    return (
      <li
        key={config.key}
        className={`${this.props.prefixCls}-btn`}
        onClick={() => { this.handleAction(config); }}
        data-key={config.key}
      >
        {content}
      </li>
    );
  }

  render() {
    const {
      prefixCls,
      attribute,
      alt,
      noImgDetails,
      width,
      height,
      zoomable,
      changeable,
      rotatable,
      scalable,
      downloadable,
    } = this.props

    let attributeNode = attribute ? (
      <p className={`${prefixCls}-attribute`}>
        {alt && `${alt}`}
        {noImgDetails || <span className={`${prefixCls}-img-details`}>
          {`(${width} x ${height})`}
        </span>}
      </p>
    ) : null;
    let toolbars = this.props.toolbars;
    if (!zoomable) {
      toolbars = deleteToolbarFromKey(toolbars, ['zoomIn', 'zoomOut']);
    }
    if (!changeable) {
      toolbars = deleteToolbarFromKey(toolbars, ['prev', 'next']);
    }
    if (!rotatable) {
      toolbars = deleteToolbarFromKey(toolbars, ['rotateLeft', 'rotateRight']);
    }
    if (!scalable) {
      toolbars = deleteToolbarFromKey(toolbars, ['scaleX', 'scaleY']);
    }
    if (!downloadable) {
      toolbars = deleteToolbarFromKey(toolbars, ['download']);
    }
    return (
      <div>
        {attributeNode}
        <ul className={`${prefixCls}-toolbar`}>
          {toolbars.map(item => {
            return this.renderAction(item);
          })}
        </ul>
      </div>
    );
  }
}
