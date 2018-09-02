import React, {Component} from 'react';

import {MessagesFilter} from '../../../src/client/components/message/messages-filter';
import messagesFilters from '../../../src/client/constants/status-filters';

export default class MenuWithState extends Component {
  state = {
    active: messagesFilters.all,
  };

  handleChange = (routeId) => {
    this.setState({
      active: routeId,
    });

    this.props.onChange(routeId);
  };

  render() {
    const {active} = this.state;

    return (
      <MessagesFilter active={active} onChange={this.handleChange} />
    );
  }
}
