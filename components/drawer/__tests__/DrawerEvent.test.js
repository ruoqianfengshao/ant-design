import React from 'react';
import { mount } from 'enzyme';
import Drawer from '..';
import Button from '../../button';

class DrawerEventTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  componentDidMount() {
    this.setState({ visible: true }); // eslint-disable-line react/no-did-mount-set-state
  }
  saveContainer = (container) => {
    this.container = container;
  };
  getContainer = () => {
    return this.container;
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  open = () => {
    this.setState({
      visible: true,
    });
  }
  render() {
    return (
      <div>
        <Button onClick={this.open}>open</Button>
        <div ref={this.saveContainer} />
        <Drawer
          visible={this.state.visible}
          onClose={this.onClose}
          destroyOnClose
          getContainer={this.getContainer}
          {...this.props}
        >
          Here is content of Drawer
        </Drawer>
      </div>
    );
  }
}


describe('Drawer', () => {
  it('render correctly', () => {
    const wrapper = mount(<DrawerEventTester />);
    const body = wrapper.find('.ant-drawer-body').exists();

    expect(body).toBe(true);
    wrapper.find('button.ant-btn').simulate('click');

    const content = wrapper.find('.ant-drawer-body').getDOMNode().innerHTML;
    expect(content).toBe('Here is content of Drawer');

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('mask trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester />);

    wrapper.find('button.ant-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.ant-drawer-mask').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });

  it('close button trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester />);

    wrapper.find('button.ant-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.ant-drawer-close').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });

  it('maskClosable no trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester maskClosable={false} />);

    wrapper.find('button.ant-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.ant-drawer-mask').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);
  });
});