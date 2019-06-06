import React, { Component } from 'react';
import { Icon } from 'antd';
import uniqueId from 'lodash/uniqueId';
import Sortable from 'react-sortablejs';

// Functional Component
class SharedGroup extends Component {
  render() {
    const items = this.props.items.map((val, index) => (
      <li key={uniqueId()} data-id={val}>
        <span>{index + 1}、</span>
        {val}
        <span className="del">
          <Icon
            type="close"
            onClick={() => {
              this.props.delete(this.props.index, index);
            }}
          />
        </span>
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
          onChange={(order, sort, evt) => {
            this.props.change({ order, sort, evt }, this.props.index);
          }}
        >
          {items}
        </Sortable>
      </div>
    );
  }
}

export default SharedGroup;
