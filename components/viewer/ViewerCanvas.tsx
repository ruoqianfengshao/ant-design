import * as React from 'react';
import Spin from '../spin';
import classnames from 'classnames';

export interface ViewerCanvasProps {
  prefixCls: string;
  imgSrc: string;
  visible: boolean;
  width: number;
  height: number;
  top: number;
  left: number | null;
  rotate: number;
  onChangeImgState: (width: number, height: number, top: number, left: number) => void;
  onResize: () => void;
  zIndex: number;
  scaleX: number;
  scaleY: number;
  loading: boolean;
  drag: boolean;
  container?: HTMLElement;
  onCanvasMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface ViewerCanvasState {
  isMouseDown?: boolean;
  mouseX?: number;
  mouseY?: number;
}

interface WindowExtend extends Window {
  [key: string]: any;
}

interface DocumentExtend extends Document {
  [key: string]: any;
}

export default class ViewerCanvas extends React.Component<ViewerCanvasProps, ViewerCanvasState> {

  constructor(props: ViewerCanvasProps) {
    super(props);

    this.state = {
      isMouseDown: false,
      mouseX: 0,
      mouseY: 0,
    };
  }

  componentDidMount() {
    if (this.props.drag) {
      this.bindEvent();
    }
  }

  handleResize = () => {
    this.props.onResize();
  }

  handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.props.onCanvasMouseDown(e);
    this.handleMouseDown(e);
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!this.props.visible || !this.props.drag) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isMouseDown: true,
      mouseX: e.nativeEvent.clientX,
      mouseY: e.nativeEvent.clientY,
    });
  }

  handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.isMouseDown) {
      let diffX = e.clientX - this.state.mouseX!;
      let diffY = e.clientY - this.state.mouseY!;
      this.setState({
        mouseX: e.clientX,
        mouseY: e.clientY,
      });
      this.props.onChangeImgState(this.props.width, this.props.height, this.props.top + diffY, this.props.left! + diffX);
    }
  }

  handleMouseUp = () => {
    this.setState({
      isMouseDown: false,
    });
  }

  bindEvent = (remove?: boolean) => {
    let funcName = 'addEventListener';
    if (remove) {
      funcName = 'removeEventListener';
    }

    (document as DocumentExtend)[funcName]('click', this.handleMouseUp, false);
    (document as DocumentExtend)[funcName]('mousemove', this.handleMouseMove, false);
    (window as WindowExtend)[funcName]('resize', this.handleResize, false);
  }

  componentWillReceiveProps(nextProps: ViewerCanvasProps) {
    if (!this.props.visible && nextProps.visible) {
      if (nextProps.drag) {
        return this.bindEvent();
      }
    }
    if (this.props.visible && !nextProps.visible) {
      this.handleMouseUp();
      if (nextProps.drag) {
        return this.bindEvent(true);
      }
    }
    if (this.props.drag && !nextProps.drag) {
      return this.bindEvent(true);
    }
    if (!this.props.drag && nextProps.drag) {
      if (nextProps.visible) {
        return this.bindEvent(true);
      }
    }
  }

  componentWillUnmount() {
    this.bindEvent(true);
  }

  render() {
    const {
      prefixCls,
      zIndex,
      width,
      height,
      left,
      scaleX,
      scaleY,
      top,
      imgSrc,
      loading,
      drag,
      rotate,
    } = this.props

    let imgStyle: React.CSSProperties = {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translateX(${left !== null ? left + 'px' : 'auto'}) translateY(${top}px)
      rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
    };

    const imgClass = classnames(`${prefixCls}-image`, {
      drag: drag,
      [`${prefixCls}-image-transition`]: !this.state.isMouseDown,
    });

    let style = {
      zIndex: zIndex,
    };

    let imgNode = null;
    if (imgSrc !== '') {
      imgNode = <img
        className={imgClass}
        src={imgSrc}
        style={imgStyle}
        onMouseDown={this.handleMouseDown}
      />;
    }

    if (loading) {
      imgNode = (
        <div
          style={{
            display: 'flex',
            height: `${window.innerHeight - 84}px`,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin size='large' />
        </div>
      );
    }

    return (
      <div
        className={`${prefixCls}-canvas`}
        onMouseDown={this.handleCanvasMouseDown}
        style={style}
      >
        {imgNode}
      </div>
    );
  }
}
