---
category: Components
type: 数据展示
title: Viewer
subtitle: 文件预览
---

## 何时使用

图片、文档、视频等文件需要预览时使用。

## API

### Viewer props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否可见 | boolean | false |
| onClose | 关于预览时的回调 | function | null |
| images | 图片数据源，必填 | [ImageDecorator](#imagedecorator)[] | [] |
| activeIndex | 当前展示的图片下标，可选 | number | 0 |
| zIndex | 视图层级，同css zIndex，越大越上层 | number | 1000 |
| container | Viewer 打开的容器，可选 | HTMLElement | null |
| drag | 是否可拖拽 | boolean | true |
| attribute | 是否展示图片属性 | boolean | true |
| zoomable | 是否允许图片缩放 | boolean | true |
| rotatable | 是否允许图片旋转 | boolean | true |
| scalable | 是否允许图片翻转 | boolean | true |
| onMaskClick | 点击蒙层时的回调 | function(e) => void | - |
| downloadable | 是否显示下载图标 | boolean | false |
| noClose | 是否隐藏显式关闭图标 | boolean | false |
| noNavbar | 是否隐藏图片导航栏 | boolean | false |
| noToolbar | 是否隐藏操作栏 | boolean | false |
| noImgDetails | 是否不显示图片宽高信息 | boolean | false |
| noFooter | 是否不显示整个底部 | boolean | false |
| changeable | 是否展示可更改按钮 | boolean | true |
| customToolbar | 自定义操作栏 | (defaultToolbarConfigs: [ToolbarConfig](#toolbarconfig)[]) => ToolbarConfig[] | - |
| zoomSpeed | 缩放速率 | number | 0.05 |
| defaultSize | 默认图片大小 | [ViewerImageSize](#viewerimagesize) | - |
| defaultImg | 默认图片，如果指定的图片加载失败即显示默认图片 | [viewerdefaultimg](#viewerimagesize) | - |
| disableKeyboardSupport | 是否关闭键盘操作 | boolean | false |
| noResetZoomAfterChange | preserve zoom after image change | boolean | false |
| noLimitInitializationSize | 不限制图片的初始大小 | boolean | false |
| defaultScale | 设置默认的缩放比例 | number | 1 |
| onChange | 图片更改后的回调 | (activeImage: [ImageDecorator](#imagedecorator), index: number) => void | - |

### ImageDecorator

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片的源地址 | string | - |
| alt | 图片的可替换描述文案 | string | |
| downloadUrl | 图片的下载地址 | string | - |
| defaultSize | 图片的默认尺寸 | [ViewerImageSize](#viewerimagesize) | - |

### ViewerImageSize

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 图片的宽度 | number | - |
| height | 图片的高度 | number | - |

### ViewerDefaultImg

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 默认图片的源地址 | number | - |
| width | 默认图片的宽度 | number | - |
| height | 默认图片的高度 | number | - |

### ToolbarConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 操作的唯一标识 | string | - |
| render | 操作的react节点 | React.ReactNode | - |
| onClick | 点击操作后的回调 | function | - |

## Keyboard support

- `Esc`: Close viewer.
- `←`: View the previous image.
- `→`: View the next image.
- `↑`: Zoom in the image.
- `↓`: Zoom out the image.
- `Ctrl + 1`: Reset the image.
- `Ctrl + ←`: Rotate left the image.
- `Ctrl + →`: Rotate right the image.

