import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import Sortable from 'react-sortablejs';

// Functional Component
class SharedGroup extends Component {
  render() {
    const items = this.props.items.map(val => (
      <li key={uniqueId()} data-id={val}>
        {val}
      </li>
    ));
    return (
      <div className="sort-cont">
        <p className="title">{this.props.title}</p>
        <Sortable
          // See all Sortable options at https://github.com/RubaXa/Sortable#options
          options={{
            group: 'shared'
          }}
          tag="ul"
        >
          {items}
        </Sortable>
      </div>
    );
  }
}

export default SharedGroup;
