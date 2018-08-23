import React, {Component} from 'react';

import {Menu} from '../../../src/client/components/menu/menu';
import routesIds from '../../../src/client/constants/navigation-routes';

export default class MenuWithState extends Component {
  state = {
    active: routesIds.messages,
  }

  handleMenuItemClick = (routeId) => {
    this.setState({
      active: routeId,
    })

    this.props.onChange(routeId);
  }

  render() {
    const {active} = this.state;

    return (
      <Menu active={active} onChange={this.handleMenuItemClick}/>
    );
  }
}
